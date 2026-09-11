'use client';

import React from 'react';
import { Search, Sparkles, TrendingUp, DollarSign, Award, Clock, ArrowRight } from 'lucide-react';

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

  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-[#0b1220] via-[#111d2f] to-[#0b1220]">
      {/* Decorative background glow rings */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-35">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#5b7cff]/20 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-96 h-96 bg-[#8fb3ff]/10 rounded-full blur-3xl" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-[#2c4478]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Floating Announcement Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#1d2d47] border border-[#4e6ba8]/40 text-[#cfe0ff] text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-sm animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#8ea9ff]" />
          <span>Fall & Spring 2026-2027 Cohorts Now Accepting Applications</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          Find Your Next Breakthrough{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9bb6ff] via-[#dfe9ff] to-[#7fc8ff]">
            Opportunity
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-8">
          A high-signal discovery platform connecting researchers, builders, students, and engineers with verified jobs, fully-funded scholarships, grants, hackathons, and fellowships worldwide.
        </p>

        {/* Centered Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5b7cff] to-[#7cc7e9] rounded-2xl blur opacity-20 group-hover:opacity-35 transition duration-300"></div>
            <div className="relative flex items-center bg-[#121d2c]/90 border border-[#2d3f5e]/80 rounded-2xl p-1.5 shadow-2xl backdrop-blur-xl">
              <Search className="w-5 h-5 ml-3.5 text-slate-400 group-focus-within:text-[#8ea9ff] transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by role, company, fellowship, skill, or keyword (e.g. Google, Oxford, Rust, AI)..."
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

        {/* Trending tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 mr-1">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            Trending:
          </span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg transition-all"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Live metric stat pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm text-left">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-400">Curated Database</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {totalOpportunities}+ Active
            </div>
            <div className="text-[11px] text-slate-500">Hand-verified listings</div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm text-left">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-400">Total Funding Pool</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              $12.4M+
            </div>
            <div className="text-[11px] text-slate-500">Stipends, grants & prizes</div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm text-left">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-400">Closing This Week</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              4 Upcoming
            </div>
            <div className="text-[11px] text-slate-500">Deadlines approaching</div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm text-left">
            <div className="flex items-center gap-2 text-violet-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-medium text-slate-400">Global Coverage</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              120+ Countries
            </div>
            <div className="text-[11px] text-slate-500">Worldwide & remote-first</div>
          </div>
        </div>
      </div>
    </div>
  );
}
