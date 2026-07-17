import { Task } from '@/types';

function escapeCSV(text: string | null | undefined): string {
  if (!text) return '';
  const str = String(text);
  // If the text contains a comma, newline, or double quote, we need to wrap it in quotes
  // and escape any double quotes inside by doubling them.
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function downloadCSV(tasks: Task[], filename: string = 'tarefas.csv') {
  // Define columns
  const headers = [
    'ID',
    'Nome',
    'Status',
    'Prioridade',
    'Categoria',
    'Responsável',
    'Dimensão',
    'Início',
    'Prazo',
    'Concluída Em',
    'Frequência',
    'Descrição',
    'Criada Em'
  ];

  const rows = tasks.map(task => [
    escapeCSV(task.id),
    escapeCSV(task.nome),
    escapeCSV(task.status),
    escapeCSV(task.prioridade),
    escapeCSV(task.categoria),
    escapeCSV(task.responsavel),
    escapeCSV(task.dimensao),
    escapeCSV(task.inicio ? new Date(task.inicio).toLocaleString() : ''),
    escapeCSV(task.prazo ? new Date(task.prazo).toLocaleString() : ''),
    escapeCSV(task.concluida_em ? new Date(task.concluida_em).toLocaleString() : ''),
    escapeCSV(task.frequencia),
    escapeCSV(task.descricao),
    escapeCSV(task.created_at ? new Date(task.created_at).toLocaleString() : '')
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Add BOM for Excel UTF-8 compatibility
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
