/*
 * Este programa é um software livre; você pode redistribuí-lo e/ou 
 * modificá-lo sob os termos da Licença Pública Geral GNU Affero (AGPLv3).
 */
import { supabase } from '@/lib/supabase';

// Forçando renderização dinâmica já que busca no BD
export const dynamic = 'force-dynamic';

export default async function TarefasPage() {
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar tarefas:', error);
  }

  const columns = [
    { id: 'BACKLOG', title: 'Backlog' },
    { id: 'IN_PROGRESS', title: 'In Progress' },
    { id: 'COMPLETED', title: 'Completed' }
  ];

  return (
    <div className="p-8 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-[#FFD700] mb-8 font-title">Gerenciador de Tarefas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {columns.map((col) => (
          <div key={col.id} className="bg-[#1E1E1E] p-4 rounded-lg shadow-lg border border-[#2A2A2A] flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4 text-[#4B0082] border-b border-[#2A2A2A] pb-2">
              {col.title}
            </h2>
            <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {tasks?.filter(t => t.status === col.id).map(task => (
                <div key={task.id} className="bg-[#121212] p-4 rounded border border-[#2A2A2A] hover:border-[#4B0082] transition-colors relative">
                  {task.priority === 'Alta' && (
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FFD700] rounded-l"></div>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold px-2 py-1 bg-[#2A2A2A] text-[#A0A0A0] rounded uppercase">
                      {task.dimension}
                    </span>
                    {task.priority === 'Alta' && <span className="text-[#FFD700] text-xs font-bold">ALTA</span>}
                  </div>
                  <h3 className="font-bold text-base mb-1 text-[#F5F5F5]">{task.title}</h3>
                  {task.description && (
                    <p className="text-sm text-[#A0A0A0] mb-3 line-clamp-2">{task.description}</p>
                  )}
                  <div className="flex justify-between items-center text-xs text-[#A0A0A0]">
                    <span>{task.assignee || 'Sem resposável'}</span>
                    {task.due_date && <span>{new Date(task.due_date).toLocaleDateString('pt-BR')}</span>}
                  </div>
                </div>
              ))}
              {(!tasks || tasks.filter(t => t.status === col.id).length === 0) && (
                <p className="text-[#A0A0A0] text-sm text-center py-4">Nenhuma tarefa</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
