'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { logoutAurtistic } from '@/app/(dashboard)/aurtistic/actions';

export default function AurtisticNavbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleLogout = async () => {
    try {
      await logoutAurtistic();
    } catch (e) {
      console.error(e);
      // Fallback
      await supabase.auth.signOut();
      router.push('/aurtistic/login');
    }
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário';

  return (
    <header className="sticky top-0 w-full z-50 bg-[#121212]/90 backdrop-blur-xl border-b border-[#2D2D2D] shrink-0">
      <div className="flex justify-between items-center px-4 md:px-6 py-4 max-w-7xl mx-auto w-full gap-4">
        
        {/* Left: Logo */}
        <div className="flex justify-start items-center gap-2">
          <Link href="/aurtistic" className="text-xl font-['Bukra'] font-black tracking-tighter text-[#FFCC00] flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">psychology</span>
            <span className="hidden sm:inline">Aurtistic Planner</span>
          </Link>
        </div>

        {/* Center: Outros Projetos */}
        <div className="flex justify-center items-center flex-1">
          <Link 
            href="/"
            className="text-[#8E8E8E] hover:text-[#FFCC00] font-bold text-sm transition-colors flex items-center gap-2"
            title="Outros projetos do autor"
          >
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            <span className="hidden md:inline">Outros projetos do autor</span>
          </Link>
        </div>

        {/* Right: Auth State */}
        <div className="flex justify-end items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-[#A0A0A0] text-sm hidden sm:inline">Olá, <strong className="text-white">{displayName}</strong></span>
              <button 
                onClick={handleLogout}
                className="bg-[#2D2D2D] hover:bg-[#FF4343] text-white hover:text-white px-4 py-2 rounded-md text-sm font-bold transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          ) : (
            <Link 
              href="/aurtistic/login"
              className="bg-[#FFCC00] text-[#121212] px-5 py-2 rounded-md text-sm font-bold hover:bg-[#e6b800] transition-colors"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
