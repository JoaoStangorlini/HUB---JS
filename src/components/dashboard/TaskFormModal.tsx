'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types';
import { saveTask, deleteTask } from '@/app/(dashboard)/actions';
import { getBadgeColorClass } from './Badge';
import { CustomSelect } from './CustomSelect';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  uniqueCategories?: string[];
  uniqueDimensions?: string[];
}

export function TaskFormModal({ isOpen, onClose, task, uniqueCategories, uniqueDimensions }: TaskFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [freqType, setFreqType] = useState('');
  const [freqDetail, setFreqDetail] = useState('');
  const [subtasks, setSubtasks] = useState<{ id: string; title: string; completed: boolean }[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [formData, setFormData] = useState<Partial<Task>>({
    nome: '',
    status: 'não iniciada',
    prioridade: 'Baixa',
    categoria: 'Programar',
    responsavel: 'João',
    dimensao: 'HUB',
    inicio: '',
    prazo: '',
    descricao: '',
    frequencia: ''
  });

  useEffect(() => {
    if (task) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        id: task.id,
        nome: task.nome,
        status: task.status,
        prioridade: task.prioridade || '',
        categoria: task.categoria || '',
        responsavel: task.responsavel || '',
        dimensao: task.dimensao || '',
        inicio: task.inicio ? task.inicio.split('T')[0] : '',
        prazo: task.prazo ? task.prazo.split('T')[0] : '',
        descricao: task.descricao || '',
        frequencia: task.frequencia || ''
      });

      let fType = '';
      let fDetail = '';
      if (task.frequencia) {
        if (task.frequencia.startsWith('Semanal')) {
          fType = 'Semanal';
          fDetail = task.frequencia.split(' - ')[1] || 'Segunda';
        } else if (task.frequencia.startsWith('Mensal')) {
          fType = 'Mensal';
          fDetail = task.frequencia.split(' - ')[1]?.replace('Dia ', '') || '1';
        } else {
          fType = task.frequencia;
        }
      }
      setFreqType(fType);
      setFreqDetail(fDetail);
      setSubtasks(task.subtasks || []);
    } else {
      setFormData({
        nome: '',
        status: 'não iniciada',
        prioridade: 'Baixa',
        categoria: 'Programar',
        responsavel: 'João',
        dimensao: 'HUB',
        inicio: '',
        prazo: '',
        descricao: '',
        frequencia: ''
      });
      setFreqType('');
      setFreqDetail('');
      setSubtasks([]);
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveTask({ ...formData, subtasks });
      onClose();
    } catch (err) {
      alert('Erro ao salvar tarefa: ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!task || !task.id) return;
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    setLoading(true);
    try {
      await deleteTask(task.id);
      onClose();
    } catch (err) {
      alert('Erro ao deletar: ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddSubtask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (newSubtaskTitle.trim() === '') return;
      setSubtasks([...subtasks, { id: crypto.randomUUID(), title: newSubtaskTitle.trim(), completed: false }]);
      setNewSubtaskTitle('');
    }
  };

  const toggleSubtask = (id: string) => {
    setSubtasks(subtasks.map(st => st.id === id ? { ...st, completed: !st.completed } : st));
  };

  const deleteSubtask = (id: string) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-3xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        
        <div className="flex justify-between items-center p-6 border-b border-[#2D2D2D]">
          <h2 className="text-xl font-bold text-[#FFCC00]">{task ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
          <button onClick={onClose} className="text-[#A0A0A0] hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2">
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Nome da Tarefa *</label>
              <input required name="nome" value={formData.nome || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00]" />
            </div>

            {(() => {
              const catOptions = [
                { value: "", label: "Nenhuma" },
                ...Array.from(new Set([...(["Programar", "Pesquisar", "touch the grass", "reunir", "post", "outros"]), ...(uniqueCategories || [])])).map(c => ({ value: c, label: c }))
              ];
              
              const dimOptions = [
                { value: "", label: "Nenhuma" },
                ...Array.from(new Set([...(["HUB", "urgente", "USP", "filmes/series", "cin", "tatuagens", "compras", "hobbys", "livros"]), ...(uniqueDimensions || [])])).map(d => ({ value: d, label: d }))
              ];

              return (
                <>
                  <div>
                    <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Status</label>
                    <CustomSelect name="status" value={formData.status || ''} onChange={handleChange} type="status" options={[{"value":"não iniciada","label":"Não iniciada"},{"value":"em progresso","label":"Em progresso"},{"value":"falta testar","label":"Falta testar"},{"value":"completa","label":"Completa"},{"value":"descartada","label":"Descartada"}]} />
                  </div>

                  <div>
                    <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Prioridade</label>
                    <CustomSelect name="prioridade" value={formData.prioridade || ''} onChange={handleChange} type="prioridade" options={[{"value":"","label":"Nenhuma"},{"value":"Baixa","label":"Baixa"},{"value":"Média","label":"Média"},{"value":"Alta","label":"Alta"}]} />
                  </div>

                  <div>
                    <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Categoria</label>
                    <CustomSelect name="categoria" value={formData.categoria || ''} onChange={handleChange} type="categoria" options={catOptions} allowCustom={true} />
                  </div>

                  <div>
                    <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Responsável</label>
                    <CustomSelect name="responsavel" value={formData.responsavel || ''} onChange={handleChange} type="responsavel" options={[{"value":"","label":"Nenhum"},{"value":"João","label":"João"},{"value":"Andy","label":"Andy"},{"value":"Leo","label":"Leo"},{"value":"Dani","label":"Dani"},{"value":"Lorenzo","label":"Lorenzo"},{"value":"Nacky","label":"Nacky"}]} />
                  </div>

                  <div>
                    <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Dimensão</label>
                    <CustomSelect name="dimensao" value={formData.dimensao || ''} onChange={handleChange} type="dimensao" options={dimOptions} allowCustom={true} />
                  </div>
                </>
              );
            })()}

            <div>
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Frequência</label>
              <div className="flex gap-2">
                <select
                  value={freqType}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFreqType(val);
                    let newDetail = '';
                    if (val === 'Semanal') newDetail = 'Segunda';
                    if (val === 'Mensal') newDetail = '1';
                    setFreqDetail(newDetail);
                    
                    let newFreq = val;
                    if (val === 'Semanal') newFreq = `Semanal - ${newDetail}`;
                    if (val === 'Mensal') newFreq = `Mensal - Dia ${newDetail}`;
                    setFormData(prev => ({ ...prev, frequencia: newFreq }));
                  }}
                  className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00]"
                >
                  <option value="">Nenhuma</option>
                  <option value="Diária">Diária</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Mensal">Mensal</option>
                </select>
                {freqType === 'Semanal' && (
                  <select
                    value={freqDetail}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFreqDetail(val);
                      setFormData(prev => ({ ...prev, frequencia: `Semanal - ${val}` }));
                    }}
                    className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00]"
                  >
                    <option value="Segunda">Segunda</option>
                    <option value="Terça">Terça</option>
                    <option value="Quarta">Quarta</option>
                    <option value="Quinta">Quinta</option>
                    <option value="Sexta">Sexta</option>
                    <option value="Sábado">Sábado</option>
                    <option value="Domingo">Domingo</option>
                  </select>
                )}
                {freqType === 'Mensal' && (
                  <select
                    value={freqDetail}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFreqDetail(val);
                      setFormData(prev => ({ ...prev, frequencia: `Mensal - Dia ${val}` }));
                    }}
                    className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00]"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                      <option key={d} value={d.toString()}>Dia {d}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Início</label>
              <input type="date" name="inicio" value={formData.inicio || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00] [color-scheme:dark]" />
            </div>

            <div>
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Prazo</label>
              <input type="date" name="prazo" value={formData.prazo || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00] [color-scheme:dark]" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Descrição</label>
              <textarea name="descricao" value={formData.descricao || ''} onChange={handleChange} rows={3} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00] resize-y" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Sub-tarefas</label>
              <div className="bg-[#121212] border border-[#2D2D2D] rounded-xl p-4">
                <div className="space-y-2 mb-4 max-h-[150px] overflow-y-auto pr-2">
                  {subtasks.map(st => (
                    <div key={st.id} className="flex items-center gap-3 group">
                      <input 
                        type="checkbox" 
                        checked={st.completed} 
                        onChange={() => toggleSubtask(st.id)}
                        className="w-4 h-4 rounded-sm border-[#444] bg-[#1a1a1a] checked:bg-[#9D4EDD] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className={`flex-1 text-sm ${st.completed ? 'text-[#8E8E8E] line-through' : 'text-[#E0E0E0]'}`}>{st.title}</span>
                      <button type="button" onClick={() => deleteSubtask(st.id)} className="text-[#8E8E8E] hover:text-[#db4437] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}
                  {subtasks.length === 0 && (
                    <div className="text-center text-[#8E8E8E] text-xs py-2">Nenhuma sub-tarefa.</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    onKeyDown={handleAddSubtask}
                    placeholder="Adicionar item (pressione Enter)" 
                    className="flex-1 bg-transparent border border-[#2D2D2D] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9D4EDD]" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            {task ? (
              <button type="button" onClick={handleDelete} disabled={loading} className="text-[#db4437] text-sm hover:underline font-semibold">Excluir Tarefa</button>
            ) : <div />}
            <div className="flex gap-4">
              <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2 border border-[#2D2D2D] text-white rounded-md hover:bg-[#252525] text-sm font-semibold transition-colors">Cancelar</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-[#FFCC00] text-black rounded-md hover:bg-[#e6b800] text-sm font-bold transition-colors shadow-sm disabled:opacity-50">
                {loading ? 'Salvando...' : 'Salvar Tarefa'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
