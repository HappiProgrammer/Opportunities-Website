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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand / Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectCategory('All')}>
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/25">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                  Oppor<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400">Sphere</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-cyan-300 bg-cyan-950/60 border border-cyan-800/50 rounded-full">
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
            {/* Newsletter Alerts */}
            <button
              onClick={onOpenNewsletter}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl transition-all shadow-sm hover:shadow-indigo-500/10"
              title="Get weekly curated deadline alerts"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Deadline Alerts</span>
            </button>

            {/* Saved Bookmarks Button */}
            <button
              onClick={onOpenSaved}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl transition-all shadow-sm group"
            >
              <Bookmark className={`w-4 h-4 transition-colors ${savedCount > 0 ? 'text-violet-400 fill-violet-400/30' : 'text-slate-400 group-hover:text-violet-400'}`} />
              <span>Bookmarks</span>
              {savedCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-sm">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Post an Opportunity Button */}
            <button
              onClick={onOpenSubmit}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all border border-violet-400/20"
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
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post an Opportunity</span>
            </button>

            <button
              onClick={() => {
                onOpenNewsletter();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between py-2.5 px-4 text-sm font-medium text-slate-200 bg-slate-900 border border-slate-800 rounded-xl"
            >
              <span className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                Deadline Alerts & Newsletter
              </span>
              <span className="text-xs text-cyan-400 font-medium">Subscribe</span>
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
                Saved Bookmarks
              </span>
              <span className="text-xs font-bold text-white bg-violet-600 px-2 py-0.5 rounded-full">
                {savedCount}
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
