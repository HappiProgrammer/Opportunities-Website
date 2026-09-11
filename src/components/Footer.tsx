'use client';

import React from 'react';
import { Compass, Sparkles, Heart, Globe, Code2, Share2, Mail } from 'lucide-react';
import { OpportunityCategory } from '../data/types';

interface FooterProps {
  onSelectCategory: (category: OpportunityCategory) => void;
  onOpenSubmit: () => void;
  onOpenNewsletter: () => void;
}

export default function Footer({
  onSelectCategory,
  onOpenSubmit,
  onOpenNewsletter
}: FooterProps) {
  return (
    <footer className="w-full bg-white border-t border-slate-200 pt-16 pb-12 text-slate-500 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-200">
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4d68d7] via-[#6f8cff] to-[#9ad0ff] p-[1px]">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#3159c9]" />
                </div>
              </div>
              <span className="text-xl font-bold text-[#182338] tracking-tight">
                Oppor<span className="text-[#3159c9]">Sphere</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A curated directory of scholarships, grants, fellowships, jobs, and internships for ambitious students and builders.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#182338] uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              {(['Jobs', 'Internships', 'Scholarships', 'Grants', 'Hackathons', 'Fellowships'] as OpportunityCategory[]).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-violet-300 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#182338] uppercase tracking-wider">
              Get updates
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Weekly deadline alerts for the most relevant opportunities and funding rounds.
            </p>
            <button
              onClick={onOpenNewsletter}
              className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-[#3159c9] hover:bg-[#2447a7] rounded-xl px-4 py-2.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Subscribe</span>
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} OpporSphere.
          </div>
          <div className="flex items-center gap-1">
            <span>Built for global opportunity seekers</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500/30 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
