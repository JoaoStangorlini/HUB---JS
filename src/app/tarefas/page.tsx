/*
 * Este programa é um software livre; você pode redistribuí-lo e/ou 
 * modificá-lo sob os termos da Licença Pública Geral GNU Affero (AGPLv3).
 */
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

import TaskBoard from '@/components/TaskBoard';

export const dynamic = 'force-dynamic';

export default async function TarefasPage() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/admin');
  }

  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar tarefas:', error);
  }

  return (
    <div className="p-8 h-full flex flex-col bg-cosmic-bg">
      <TaskBoard initialTasks={tasks || []} />
    </div>
  );
}
