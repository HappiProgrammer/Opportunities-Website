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
    <footer className="w-full bg-[#0b1220] border-t border-[#23314a]/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#23314a]/80">
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4d68d7] via-[#6f8cff] to-[#9ad0ff] p-[1px]">
                <div className="w-full h-full bg-[#0b1220] rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#9bb6ff]" />
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Oppor<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bfd3ff] to-[#7cc7e9]">Sphere</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier open directory connecting ambitious builders, students, researchers, and creators with world-class opportunities, scholarships, and funding.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                <Globe className="w-4 h-4 text-cyan-400" /> Global Directory
              </span>
              <span className="text-slate-600">•</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                <Code2 className="w-4 h-4 text-violet-400" /> Open Web
              </span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore Categories
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

          {/* Col 3: Community & Organizers */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              For Organizers
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={onOpenSubmit} className="hover:text-violet-300 transition-colors text-left">
                  Submit an Opportunity
                </button>
              </li>
              <li>
                <button onClick={onOpenNewsletter} className="hover:text-violet-300 transition-colors text-left">
                  Subscribe to Weekly Digest
                </button>
              </li>
              <li>
                <span className="text-slate-500">Recruiter Partnerships (Coming Soon)</span>
              </li>
              <li>
                <span className="text-slate-500">Sponsorship Packages</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter prompt */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Stay Ahead of Deadlines
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get notified 48 hours before major grant, fellowship, and scholarship cutoff dates.
            </p>
            <button
              onClick={onOpenNewsletter}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Configure Alerts</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} OpporSphere. All rights reserved. Handcrafted for global opportunity seekers.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with precision for world changers</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500/30 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
