export interface TaskColumnOption {
  value: string;
  label: string;
  color?: string;
  id?: string;
}

export interface TaskColumn {
  id: string;
  key: string;
  name: string;
  type: 'select' | 'text' | 'date' | 'checkbox';
  options: TaskColumnOption[];
  is_native: boolean;
  order_num: number;
}

export interface Task {
  is_personal?: boolean;
  id: string;
  created_at: string;
  nome: string;
  status: string;
  prioridade: string | null;
  categoria: string | null;
  responsavel: string | null;
  inicio: string | null;
  prazo: string | null;
  descricao: string | null;
  frequencia: string | null;
  dimensao: string | null;
  concluida_em: string | null;
  user_id: string;
  ordem_manual?: number;
  is_favorite?: boolean;
  parent_id?: string | null;
  custom_fields?: Record<string, any>;
}
