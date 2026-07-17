'use client';

import React, { useState } from 'react';
import { saveQuickLinks } from '@/app/(dashboard)/actions';

interface QuickLink {
  name: string;
  href: string;
}

export function AurtisticQuickLinks({ initialLinks }: { initialLinks: QuickLink[] }) {
  const [links, setLinks] = useState<QuickLink[]>(initialLinks);
  const [isEditing, setIsEditing] = useState(false);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkHref, setNewLinkHref] = useState('');

  const handleSave = async (updatedLinks: QuickLink[]) => {
    setLinks(updatedLinks);
    try {
      await saveQuickLinks(updatedLinks);
    } catch (e: any) {
      alert("Erro ao salvar links: " + e.message);
    }
  };

  const addLink = () => {
    if (!newLinkName || !newLinkHref) return;
    const updated = [...links, { name: newLinkName, href: newLinkHref }];
    handleSave(updated);
    setNewLinkName('');
    setNewLinkHref('');
  };

  const removeLink = (index: number) => {
    const updated = links.filter((_, i) => i !== index);
    handleSave(updated);
  };

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-[#8E8E8E] uppercase tracking-wider mr-2 hidden md:inline">Meus Links:</span>
        
        {links.map((link, idx) => (
          <div key={idx} className="relative group flex items-center">
            <a 
              href={link.href} 
              target="_blank" 
              rel="noreferrer" 
              className="group flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] border border-[#FFCC00]/50 hover:border-[#FFCC00] hover:text-[#FFCC00] rounded-full text-xs font-medium text-[#A0A0A0] transition-all duration-300"
            >
              <span className="material-symbols-outlined text-[16px]">link</span>
              {link.name}
            </a>
            {isEditing && (
              <button 
                onClick={() => removeLink(idx)}
                className="absolute -top-1.5 -right-1.5 bg-[#F14343] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] hover:scale-110 transition-transform"
              >
                <span className="material-symbols-outlined text-[12px]">close</span>
              </button>
            )}
          </div>
        ))}

        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`ml-2 px-2 py-1 rounded text-xs font-bold transition-colors ${isEditing ? 'bg-[#9D4EDD] text-white' : 'bg-[#2D2D2D] text-[#8E8E8E] hover:text-white hover:bg-[#3D3D3D]'}`}
        >
          {isEditing ? 'Concluir' : '+ Adicionar'}
        </button>
      </div>

      {isEditing && (
        <div className="flex flex-wrap items-center gap-2 mt-2 bg-[#1A1A1A] p-3 rounded-md border border-[#2D2D2D] w-fit">
          <input 
            type="text" 
            placeholder="Nome (ex: Meu Drive)" 
            value={newLinkName}
            onChange={(e) => setNewLinkName(e.target.value)}
            className="bg-[#252525] text-sm text-white px-3 py-1.5 rounded border border-[#2D2D2D] focus:border-[#FFCC00] focus:outline-none"
          />
          <input 
            type="url" 
            placeholder="URL (https://...)" 
            value={newLinkHref}
            onChange={(e) => setNewLinkHref(e.target.value)}
            className="bg-[#252525] text-sm text-white px-3 py-1.5 rounded border border-[#2D2D2D] focus:border-[#FFCC00] focus:outline-none w-[200px]"
          />
          <button 
            onClick={addLink}
            disabled={!newLinkName || !newLinkHref}
            className="bg-[#FFCC00] text-[#121212] px-3 py-1.5 rounded text-sm font-bold disabled:opacity-50 hover:bg-[#e6b800] transition-colors"
          >
            Adicionar Link
          </button>
        </div>
      )}
    </div>
  );
}
