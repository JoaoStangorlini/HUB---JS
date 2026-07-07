import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="font-['Open_Sans'] relative min-h-screen bg-[#121212] text-[#F5F5F5]">
      
      {/* Background Decorators */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#3B1E43] blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#3B1E43] blur-[150px]"></div>
      </div>
      
      {/* Header / TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-[#121212]/80 backdrop-blur-xl border-b border-[#2D2D2D]">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="text-xl font-['Bukra'] font-black tracking-tighter text-[#FFCC00]">
            stangorlini.web
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
            <Link className="text-[#F5F5F5] font-semibold border-b-2 border-[#FFCC00] pb-1 transition-colors" href="/#about">Resumo</Link>
            <Link className="text-[#A0A0A0] font-medium hover:text-[#FFCC00] transition-colors" href="/#projects">Projetos</Link>
            <Link className="text-[#A0A0A0] font-medium hover:text-[#FFCC00] transition-colors" href="/galeria">Galeria</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/labdiv" className="px-6 py-2 bg-[#FFCC00] text-[#121212] text-sm font-bold rounded-md hover:bg-[#e6b800] transition-all">
              Acesso Restrito
            </Link>
          </div>
        </div>
      </header>
      
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-32 relative z-10">
        
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:grid md:grid-cols-12 gap-12 items-center" id="about">
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#3B1E43] border border-[#5A2E65] text-[#FFCC00] rounded-full text-xs font-bold uppercase tracking-wider">
              Pesquisador & Desenvolvedor
            </div>
            <h1 className="text-5xl md:text-6xl font-['Bukra'] font-black text-white leading-tight">
              JOÃO PAULO <br />
              <span className="text-[#FFCC00]">STANGORLINI</span>
            </h1>
            <p className="text-lg text-[#A0A0A0] max-w-xl mx-auto md:mx-0">
              Focando em pesquisa científica, desenvolvimento full-stack e organização acadêmica através do HUB Pessoal e plataformas LabDiv.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <a href="https://calendar.app.google/tELr1q8ky4G98EL58" target="_blank" rel="noreferrer" className="bg-[#FFCC00] text-[#121212] px-8 py-3 rounded-md text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#e6b800] transition-colors">
                Agendar Reunião
              </a>
              <a href="https://github.com/JoaoStangorlini" target="_blank" rel="noreferrer" className="bg-[#1E1E1E] border border-[#2D2D2D] text-white px-8 py-3 rounded-md text-sm font-bold flex items-center justify-center gap-2 hover:border-[#3B1E43] hover:bg-[#3B1E43]/50 transition-colors">
                Ver GitHub
              </a>
            </div>
          </div>
          <div className="md:col-span-5 relative group w-full max-w-[300px] md:max-w-none mx-auto">
            <div className="absolute -inset-4 bg-[#FFCC00]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="aspect-square bg-[#1E1E1E] border border-[#2D2D2D] rounded-2xl overflow-hidden p-2 transform md:rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700" 
                alt="Profile" 
                src="/hero.jpg" 
              />
            </div>
          </div>
        </section>
        
        {/* Featured Projects / Bento Grid */}
        <section className="space-y-12" id="projects">
          <div>
            <h2 className="text-3xl font-['Bukra'] font-bold text-white">Projetos & Contribuições</h2>
            <p className="text-[#A0A0A0] mt-2">Sistemas, Modelos e documentação de pesquisa ativa.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-[#3B1E43] border border-[#5A2E65] p-8 rounded-2xl flex flex-col justify-between min-h-[400px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                 <span className="text-8xl">✦</span>
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-['Bukra'] font-bold text-white">HUB PESSOAL MK7</h3>
                <p className="text-[#F5F5F5]/80 max-w-md">Sistema integral de gerenciamento acadêmico e pesquisa, utilizando Next.js 14, Supabase e estilos em Roxo e Dourado.</p>
              </div>
              <div className="relative z-10 mt-12">
                <span className="inline-block px-3 py-1 bg-[#121212]/50 text-[#FFCC00] text-xs font-bold rounded-md">
                  Em Desenvolvimento
                </span>
              </div>
            </div>
            
            <div className="md:col-span-4 bg-[#1E1E1E] border border-[#2D2D2D] p-8 rounded-2xl flex flex-col justify-between min-h-[400px] hover:border-[#FFCC00]/50 transition-colors">
              <div className="space-y-4">
                <h3 className="text-2xl font-['Bukra'] font-bold text-white">API LABDIV</h3>
                <p className="text-[#A0A0A0]">Integração de serviços e ferramentas para todos os pesquisadores e membros do laboratório.</p>
              </div>
              <a href="/labdiv" className="w-full py-4 mt-8 border-t border-[#2D2D2D] text-[#FFCC00] text-sm font-bold flex justify-between items-center group">
                Explorar Documentação
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="space-y-12" id="gallery">
          <div>
            <h2 className="text-3xl font-['Bukra'] font-bold text-white">Galeria</h2>
            <p className="text-[#A0A0A0] mt-2">Registros de eventos e desenvolvimento.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/galeria" className="aspect-square bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl overflow-hidden hover:border-[#3B1E43] transition-all group block">
              <img src="/galeria1.jpg" alt="Galeria 1" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </Link>
            <Link href="/galeria" className="aspect-square bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl overflow-hidden hover:border-[#3B1E43] transition-all group block">
              <img src="/galeria2.jpg" alt="Galeria 2" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </Link>
            <Link href="/galeria" className="aspect-square bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl overflow-hidden hover:border-[#3B1E43] transition-all group block">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXnwq7H7F6pHq6hll9SKv-E9uqH1KA0qixi_lmBd-_Q&s=10" alt="Galeria 3" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </Link>
            <Link href="/galeria" className="aspect-square bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl overflow-hidden hover:border-[#3B1E43] transition-all group block">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc9QM4zJd-GuLxWzGiKHLJmzEhFfnmOPxB3pOkhO127siK2SCw4LsNlAI&s=10" alt="Galeria 4" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </Link>
          </div>
          <div className="pt-4 flex justify-center">
            <Link href="/galeria" className="px-8 py-3 bg-[#1E1E1E] border border-[#2D2D2D] text-white text-sm font-bold rounded-md hover:bg-[#3B1E43] hover:border-[#5A2E65] transition-colors">
              Ver Galeria Completa
            </Link>
          </div>
        </section>
        
        {/* Footer / Links */}
        <section className="pt-12 border-t border-[#2D2D2D]">
          <div className="bg-[#1E1E1E] p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-[#2D2D2D]">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-['Bukra'] font-bold text-white">Pronto para colaboração?</h2>
              <p className="text-[#A0A0A0] mt-2 max-w-md">Aberto para consultas sobre desenvolvimento e arquitetura.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link href="/curriculo" className="bg-[#FFCC00] text-[#121212] py-3 px-8 rounded-md text-sm font-bold text-center hover:bg-[#e6b800] transition-colors">
                CURRÍCULO
              </Link>
              <Link href="/labdiv" className="bg-[#3B1E43] text-white py-3 px-8 rounded-md text-sm font-bold text-center hover:bg-[#5A2E65] transition-colors">
                MEMBROS LABDIV
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
