'use client';

import React from 'react';
import { Search, Sparkles, TrendingUp, DollarSign, Award, Clock, Globe2 } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTagClick: (tag: string) => void;
  totalOpportunities: number;
}

export default function Hero({
  searchQuery,
  onSearchChange,
  onTagClick,
  totalOpportunities
}: HeroProps) {
  const trendingTags = ['Fully Funded', 'AI & DeepTech', 'Remote', 'GSoC 2026', 'Oxford', 'Equity Free', 'Undergraduate'];

  const stats = [
    { value: `${totalOpportunities}+`, label: 'Active listings', detail: 'Hand-verified', icon: Award, tone: 'text-[#9bb6ff]' },
    { value: '$12.4M+', label: 'Funding pool', detail: 'Grants & stipends', icon: DollarSign, tone: 'text-[#7ee1b2]' },
    { value: '4', label: 'Closing soon', detail: 'This week', icon: Clock, tone: 'text-[#f4c46b]' },
    { value: '120+', label: 'Countries', detail: 'Global access', icon: Globe2, tone: 'text-[#a9d8ff]' }
  ];

  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-[#0b1220] via-[#111d2f] to-[#0b1220]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-35">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#4d68d7]/18 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-96 h-96 bg-[#8fb3ff]/10 rounded-full blur-3xl" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-[#2c4478]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#1d2d47] border border-[#4e6ba8]/30 text-[#d8e5ff] text-xs sm:text-sm font-medium mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#9bb6ff]" />
          <span>Fall & Spring 2026-2027 Cohorts Now Accepting Applications</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[0.96] tracking-[-0.06em] mb-5">
          Find your next breakthrough{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfe9ff] via-[#bcd4ff] to-[#93d9ff]">
            opportunity
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-7">
          A high-signal discovery platform for researchers, builders, and students seeking verified scholarships, jobs, grants, hackathons, and fellowships worldwide.
        </p>

        <div className="max-w-2xl mx-auto mb-5">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5b7cff] to-[#7cc7e9] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative flex items-center bg-[#121d2c]/90 border border-[#2d3f5e]/80 rounded-2xl p-1.5 shadow-[0_18px_40px_rgba(14,23,38,0.2)] backdrop-blur-xl">
              <Search className="w-5 h-5 ml-3.5 text-slate-400 group-focus-within:text-[#9bb6ff] transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by role, company, fellowship, skill, or keyword..."
                className="w-full bg-transparent border-0 px-3 py-2.5 text-sm sm:text-base text-white placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="px-2 py-1 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg mr-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 mr-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#9bb6ff]" />
            Trending:
          </span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-[#101b2d] hover:bg-[#18253d] border border-[#23314a] rounded-lg transition-all"
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl border border-[#23314a] bg-[#101b2d]/80 p-2 shadow-[0_20px_45px_rgba(8,11,18,0.18)] backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {stats.map(({ value, label, detail, icon: Icon, tone }) => (
              <div key={label} className="rounded-xl bg-[#121f33]/80 border border-[#22314d] p-3 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-[#18253d] ${tone}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{label}</span>
                </div>
                <div className="text-2xl font-semibold text-white tracking-tight">{value}</div>
                <div className="text-[11px] text-slate-500 mt-1">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
