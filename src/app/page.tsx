/*
 * Este programa é um software livre; você pode redistribuí-lo e/ou 
 * modificá-lo sob os termos da Licença Pública Geral GNU Affero (AGPLv3).
 */
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-[#4B0082] mb-6">Hub Pessoal</h1>
      <p className="text-lg text-[#A0A0A0] max-w-2xl text-center mb-12">
        Bem-vindo ao seu ecossistema digital centralizado. Selecione um módulo abaixo para acessar suas ferramentas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Link href="/tarefas" className="group bg-[#1E1E1E] border border-[#2A2A2A] hover:border-[#FFD700] p-8 rounded-xl transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFD700]/10">
             <span className="text-3xl">📋</span>
          </div>
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2">Gerenciador de Tarefas</h2>
          <p className="text-[#A0A0A0]">Acesse o Kanban para organizar os projetos do HUB, USP e Vida Pessoal.</p>
        </Link>

        <Link href="/galeria" className="group bg-[#1E1E1E] border border-[#2A2A2A] hover:border-[#FFD700] p-8 rounded-xl transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFD700]/10">
             <span className="text-3xl">📸</span>
          </div>
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2">Fotografia (Galeria)</h2>
          <p className="text-[#A0A0A0]">Acesse seu portfólio Pic-Time integrado diretamente no Hub.</p>
        </Link>
      </div>
    </div>
  );
}
