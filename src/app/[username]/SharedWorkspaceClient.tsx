// Este programa é um software livre (Licença AGPLv3)
'use client';

import React, { useState } from 'react';
import ResumoClient from '@/components/dashboard/ResumoClient';
import CurriculoClient from '@/components/dashboard/CurriculoClient';
import PortfolioClient from '@/components/dashboard/PortfolioClient';

interface SharedWorkspaceClientProps {
  profile: any;
}

export default function SharedWorkspaceClient({ profile }: SharedWorkspaceClientProps) {
  // Features config from user
  const activeTabs = profile?.features_config?.active || ['resumo', 'curriculo', 'portfolio'];
  const orderedTabs = profile?.features_config?.order || ['resumo', 'curriculo', 'portfolio'];
  const customLabels = profile?.features_config?.labels || {};
  const customLinks = profile?.features_config?.custom_links || {};

  // Dictionaries for labels and routes/types
  const defaultLabels: Record<string, string> = {
    resumo: 'Resumo',
    curriculo: 'Currículo',
    portfolio: 'Portfólio',
    extra: 'Link Extra'
  };

  // Filter out 'tasks' tab for security/privacy
  const visibleTabs = orderedTabs.filter(
    (tab: string) => activeTabs.includes(tab) && tab !== 'tasks'
  );

  const [activeTab, setActiveTab] = useState<string>(visibleTabs[0] || 'resumo');

  // Extract name/role for header from profile data
  let displayName = 'Espaço Aurtistic';
  let tagline = 'Portfólio & Resumo Profissional';

  try {
    if (profile?.resumo) {
      const parsedResumo = typeof profile.resumo === 'string' ? JSON.parse(profile.resumo) : profile.resumo;
      if (parsedResumo.title) displayName = parsedResumo.title;
      if (parsedResumo.tagline) tagline = parsedResumo.tagline;
    }
  } catch (e) {
    console.error("Error reading resumo header:", e);
  }

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'resumo':
        return <ResumoClient initialProfile={profile} isReadOnly={true} />;
      case 'curriculo':
        return <CurriculoClient initialProfile={profile} isReadOnly={true} />;
      case 'portfolio':
        return <PortfolioClient initialProfile={profile} isReadOnly={true} />;
      default:
        return (
          <div className="p-8 text-center bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl max-w-md mx-auto mt-12">
            <span className="material-symbols-outlined text-[48px] text-[#FFCC00] mb-3">info</span>
            <h3 className="text-lg font-bold text-white mb-1">Nenhum conteúdo selecionado</h3>
            <p className="text-sm text-[#A0A0A0]">Navegue pelas abas acima para explorar este espaço.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      {/* Shared Space Navbar Header */}
      <header className="w-full bg-[#1A1A1A] border-b border-[#2D2D2D] sticky top-0 z-40 px-4 md:px-8 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-[#FFCC00] font-black uppercase tracking-widest bg-[#FFCC00]/10 px-2.5 py-1 rounded-md">Espaço Compartilhado</span>
            <h2 className="text-2xl font-black text-white font-['Bukra'] tracking-tight mt-1">{displayName}</h2>
            <p className="text-xs text-[#8E8E8E] mt-0.5">{tagline}</p>
          </div>

          {/* Tabs Navigation */}
          {visibleTabs.length > 0 && (
            <nav className="flex flex-wrap gap-2">
              {visibleTabs.map((key: string) => {
                const isSelected = activeTab === key;
                const label = customLabels[key] || defaultLabels[key] || key;

                if (key === 'extra') {
                  const targetUrl = customLinks.extra || '#';
                  return (
                    <a
                      key={key}
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs font-bold rounded-lg bg-[#242424] hover:bg-[#3D3D3D] text-[#A0A0A0] hover:text-[#FFCC00] border border-[#2D2D2D] transition-all flex items-center gap-1.5 shrink-0"
                    >
                      {label}
                      <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                    </a>
                  );
                }

                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-[#9D4EDD] text-white border-[#9D4EDD] shadow-md shadow-[#9D4EDD]/10'
                        : 'bg-[#242424] text-[#A0A0A0] border-[#2D2D2D] hover:text-white hover:bg-[#2D2D2D]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto h-full">
          {renderActiveTabContent()}
        </div>
      </main>
    </div>
  );
}
