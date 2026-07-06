const fs = require('fs');
const path = require('path');

const tasksJsonPath = path.join(__dirname, 'Tarefas', 'Tasks.json');
const notionCsvPath = path.join(__dirname, 'Notion', 'HUB - LabDiv 32b4f396a86b80d690a6de0902328039.csv');
const seedSqlPath = path.join(__dirname, 'seed.sql');

function escapeSql(str) {
  if (!str) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

let seedSql = '-- Script de Importacao de Tarefas\n\n';

// 1. Google Tasks
if (fs.existsSync(tasksJsonPath)) {
  const tasksData = JSON.parse(fs.readFileSync(tasksJsonPath, 'utf8'));
  tasksData.items.forEach(list => {
    const listTitle = list.title || '';
    let dimension = 'PESSOAL';
    if (listTitle.toUpperCase().includes('USP')) dimension = 'USP';
    
    if (list.items) {
      list.items.forEach(task => {
        if (!task.title) return;
        const title = escapeSql(task.title);
        const desc = escapeSql(task.notes || '');
        const status = task.status === 'completed' ? "'COMPLETED'" : "'BACKLOG'";
        const dimensionVal = `'${dimension}'`;
        
        let due = 'NULL';
        if (task.due) due = `'${task.due}'`;
        else if (task.scheduled_time && task.scheduled_time[0]) {
          due = `'${task.scheduled_time[0].start}'`;
        }

        seedSql += `INSERT INTO tasks (title, description, status, dimension, due_date) VALUES (${title}, ${desc}, ${status}, ${dimensionVal}, ${due});\n`;
      });
    }
  });
}

// 2. Notion CSV
if (fs.existsSync(notionCsvPath)) {
  // Simple CSV parser (assuming no quotes with commas inside except where obvious)
  const csvContent = fs.readFileSync(notionCsvPath, 'utf8');
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // regex to split by comma except inside quotes
    const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
    const cols = line.split(regex).map(col => col.replace(/^"|"$/g, '').trim());
    
    if (cols.length < 7) continue;
    
    const title = escapeSql(cols[0]);
    const category = escapeSql(cols[1]);
    let dateVal = cols[2];
    const desc = escapeSql(cols[3]);
    const priority = escapeSql(cols[4]);
    const assignee = escapeSql(cols[5]);
    const statusRaw = cols[6] || '';
    
    let due = 'NULL';
    if (dateVal) {
      // Assuming DD/MM/YYYY
      const parts = dateVal.split('/');
      if (parts.length === 3) due = `'${parts[2]}-${parts[1]}-${parts[0]} 00:00:00Z'`;
    }
    
    let status = "'BACKLOG'";
    const sr = statusRaw.toLowerCase();
    if (sr.includes('concluído')) status = "'COMPLETED'";
    else if (sr.includes('andamento')) status = "'IN_PROGRESS'";
    else if (sr.includes('descartada')) status = "'DISCARDED'";
    
    seedSql += `INSERT INTO tasks (title, category, due_date, description, priority, assignee, status, dimension) VALUES (${title}, ${category}, ${due}, ${desc}, ${priority}, ${assignee}, ${status}, 'HUB_LABDIV');\n`;
  }
}

fs.writeFileSync(seedSqlPath, seedSql);
console.log('Gerado seed.sql com sucesso!');
