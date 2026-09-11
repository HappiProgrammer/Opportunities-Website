'use client';

import React, { useState } from 'react';
import { Compass, Bookmark, PlusCircle, Bell, Menu, X, Sparkles } from 'lucide-react';
import { OpportunityCategory } from '../data/types';

interface NavbarProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenSubmit: () => void;
  onOpenNewsletter: () => void;
  selectedCategory: OpportunityCategory;
  onSelectCategory: (cat: OpportunityCategory) => void;
}

export default function Navbar({
  savedCount,
  onOpenSaved,
  onOpenSubmit,
  onOpenNewsletter,
  selectedCategory,
  onSelectCategory
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0b1220]/85 border-b border-[#23314a]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand / Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectCategory('All')}>
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#4d68d7] via-[#6f8cff] to-[#9ad0ff] p-[1px] shadow-lg shadow-[#4d68d7]/20">
              <div className="w-full h-full bg-[#0b1220] rounded-[11px] flex items-center justify-center">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#9bb6ff] animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                  Oppor<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bfd3ff] via-[#a6c3ff] to-[#7cc7e9]">Sphere</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-[#bfdbff] bg-[#182d4b]/80 border border-[#4063a9]/60 rounded-full">
                  Global
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block tracking-wide">
                Jobs • Fellowships • Scholarships • Grants • Hackathons
              </p>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenSaved}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
            >
              <Bookmark className={`w-4 h-4 transition-colors ${savedCount > 0 ? 'text-violet-400 fill-violet-400/30' : 'text-slate-400'}`} />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-[#3f63ed] rounded-full shadow-sm">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenSubmit}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#3f63ed] hover:bg-[#3357d7] rounded-xl shadow-md shadow-[#3f63ed]/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Opportunity</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenSaved}
              className="relative p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
              aria-label="Bookmarks"
            >
              <Bookmark className={`w-5 h-5 ${savedCount > 0 ? 'text-violet-400 fill-violet-400/30' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white bg-violet-600 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg focus:outline-none"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/80 flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => {
                onOpenSubmit();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-[#3f63ed] rounded-xl shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post an Opportunity</span>
            </button>

            <button
              onClick={() => {
                onOpenSaved();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between py-2.5 px-4 text-sm font-medium text-slate-200 bg-slate-900 border border-slate-800 rounded-xl"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-violet-400" />
                Saved
              </span>
              <span className="text-xs font-bold text-white bg-[#3f63ed] px-2 py-0.5 rounded-full">
                {savedCount}
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
