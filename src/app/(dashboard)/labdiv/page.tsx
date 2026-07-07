
import { createClient } from '@/utils/supabase/server';

export default async function LabDivPage() {
  const supabase = await createClient();

  // Fetch tasks filtered by dimension 'HUB'
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('dimensao', 'HUB')
    .order('created_at', { ascending: false });

  return (
    <div className="h-full flex flex-col p-8 bg-[#121212] overflow-y-auto">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#e5e2e1]">LabDiv Tasks</h2>
          <p className="text-sm text-[#8E8E8E] mt-1">Tarefas filtradas pela dimensão HUB</p>
        </div>
        <div>
          <button className="bg-[#FFCC00] text-[#121212] font-bold text-sm px-4 py-2 rounded-md hover:bg-[#e6b800] transition-colors shadow-sm">
            + Nova Tarefa
          </button>
        </div>
      </header>

      {error ? (
        <div className="p-4 bg-[#93000a]/20 border border-[#93000a] text-[#ffdad6] rounded-md text-sm">
          Erro ao carregar tarefas: {error.message}
        </div>
      ) : (
        <div className="flex-1 bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg overflow-hidden flex flex-col">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#2D2D2D] bg-[#1A1A1A] text-xs font-semibold text-[#8E8E8E] uppercase tracking-wider">
            <div className="col-span-5">Nome</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Responsável</div>
            <div className="col-span-3">Prazo</div>
          </div>

          {/* Table Body */}
          <div className="flex-1 overflow-y-auto">
            {tasks && tasks.length > 0 ? tasks.map((task) => (
              <div key={task.id} className="grid grid-cols-12 gap-4 p-4 border-b border-[#2D2D2D] hover:bg-[#252525] transition-colors text-sm items-center">
                <div className="col-span-5 font-medium text-[#e5e2e1] truncate">{task.nome}</div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 text-[11px] rounded-md font-medium border ${task.status.toLowerCase().includes('andamento')
                      ? 'bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/30'
                      : task.status.toLowerCase().includes('conclu')
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                        : 'bg-[#2D2D2D] text-[#A0A0A0] border-[#353534]'
                    }`}>
                    {task.status}
                  </span>
                </div>
                <div className="col-span-2 text-[#A0A0A0] truncate">{task.responsavel || '-'}</div>
                <div className="col-span-3 text-[#A0A0A0]">
                  {task.prazo ? new Date(task.prazo).toLocaleDateString('pt-BR') : '-'}
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-[#8E8E8E] text-sm">Nenhuma tarefa encontrada.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
