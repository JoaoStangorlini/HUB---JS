/*
 * Este programa é um software livre; você pode redistribuí-lo e/ou 
 * modificá-lo sob os termos da Licença Pública Geral GNU Affero (AGPLv3).
 */
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-[#1E1E1E] border-b border-[#2A2A2A] px-6 py-4 flex items-center gap-6">
      <h1 className="font-bold text-xl text-[#4B0082]">Hub Pessoal</h1>
      <Link href="/" className="hover:text-[#FFD700] transition-colors">Início</Link>
      <Link href="/galeria" className="hover:text-[#FFD700] transition-colors">Fotografia</Link>
      <Link href="/tarefas" className="hover:text-[#FFD700] transition-colors">Tarefas</Link>
    </nav>
  );
}
