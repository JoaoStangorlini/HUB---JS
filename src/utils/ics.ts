import { Task } from '@/types';

// Utility to generate a unique ID for events
const generateUID = () => Math.random().toString(36).substring(2, 15) + "@hub.stangorlini";

// Format date to ICS required format: YYYYMMDDTHHMMSSZ
const formatICSDate = (date: Date): string => {
  const pad = (n: number) => (n < 10 ? '0' + n : n);
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
};

// Calculate end of semester
const getEndOfSemester = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const endDate = new Date();
  if (month < 6) { // January (0) to June (5)
    endDate.setUTCFullYear(year, 5, 30); // June 30
  } else {
    endDate.setUTCFullYear(year, 11, 15); // Dec 15
  }
  endDate.setUTCHours(23, 59, 59);
  return formatICSDate(endDate);
};

export const generateICSFile = (tasks: Task[]) => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//HUB Stangorlini//NONSGML v1.0//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];

  tasks.forEach(task => {
    if (!task.prazo) return; // Cannot add to calendar without a date/time

    const startDate = new Date(task.prazo);
    if (isNaN(startDate.getTime())) return;
    
    // Assume 1 hour duration if not specified
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${task.id || generateUID()}`);
    lines.push(`DTSTAMP:${formatICSDate(new Date())}`);
    lines.push(`DTSTART:${formatICSDate(startDate)}`);
    lines.push(`DTEND:${formatICSDate(endDate)}`);
    lines.push(`SUMMARY:${task.nome}`);
    if (task.descricao) lines.push(`DESCRIPTION:${task.descricao.replace(/\n/g, '\\n')}`);
    
    // Recurrence logic
    if (task.frequencia) {
      const freqStr = task.frequencia.toLowerCase();
      const until = getEndOfSemester();
      if (freqStr.includes('diária') || freqStr.includes('diaria') || freqStr.includes('dia')) {
        lines.push(`RRULE:FREQ=DAILY;UNTIL=${until}`);
      } else if (freqStr.includes('semanal') || freqStr.includes('semana')) {
        lines.push(`RRULE:FREQ=WEEKLY;UNTIL=${until}`);
      } else if (freqStr.includes('mensal') || freqStr.includes('mês') || freqStr.includes('mes')) {
        lines.push(`RRULE:FREQ=MONTHLY;UNTIL=${until}`);
      }
    }

    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');

  return lines.join('\r\n');
};

export const downloadICS = (tasks: Task[], filename: string = 'tarefas.ics') => {
  const icsContent = generateICSFile(tasks);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
