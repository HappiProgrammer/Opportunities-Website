'use client';

import React from 'react';
import { Search, DollarSign, Award, Clock, Globe2 } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalOpportunities: number;
}

export default function Hero({
  searchQuery,
  onSearchChange,
  totalOpportunities
}: HeroProps) {
  const stats = [
    { value: `${totalOpportunities}+`, label: 'Active listings', detail: 'Hand-verified', icon: Award, tone: 'text-[#9bb6ff]' },
    { value: '$12.4M+', label: 'Funding pool', detail: 'Grants & stipends', icon: DollarSign, tone: 'text-[#7ee1b2]' },
    { value: '4', label: 'Closing soon', detail: 'This week', icon: Clock, tone: 'text-[#f4c46b]' },
    { value: '120+', label: 'Countries', detail: 'Global access', icon: Globe2, tone: 'text-[#a9d8ff]' }
  ];

  return (
    <div className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-14 bg-[#f6f8fc]">

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#182338] leading-[0.96] tracking-[-0.06em] mb-5">
          Find your next breakthrough{' '}
          <span className="text-[#3159c9]">
            opportunity
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed mb-7">
          A high-signal discovery platform for researchers, builders, and students seeking verified scholarships, jobs, grants, hackathons, and fellowships worldwide.
        </p>

        <div className="max-w-2xl mx-auto mb-5">
          <div className="relative group">
            <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-[0_16px_35px_rgba(52,72,106,0.12)]">
              <Search className="w-5 h-5 ml-3.5 text-slate-400 group-focus-within:text-[#3159c9] transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by role, company, fellowship, skill, or keyword..."
                className="w-full bg-transparent border-0 px-3 py-2.5 text-sm sm:text-base text-[#182338] placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="px-2 py-1 text-xs text-slate-500 hover:text-[#3159c9] bg-slate-100 rounded-lg mr-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_16px_35px_rgba(52,72,106,0.08)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {stats.map(({ value, label, detail, icon: Icon, tone }) => (
              <div key={label} className="rounded-xl bg-[#f7f9fc] border border-slate-200 p-3 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8eefb] ${tone}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-slate-500">{label}</span>
                </div>
                <div className="text-2xl font-semibold text-[#182338] tracking-tight">{value}</div>
                <div className="text-[11px] text-slate-500 mt-1">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
