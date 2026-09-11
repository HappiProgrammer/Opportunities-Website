'use client';

import React from 'react';
import {
  OpportunityCategory,
  FilterState,
  EducationLevel,
  DeadlineFilter,
  FundingFilter
} from '../data/types';
import {
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Code,
  Users,
  Compass,
  LayoutGrid,
  List,
  Filter,
  RotateCcw,
  CheckCircle2,
  Globe2
} from 'lucide-react';

interface FilterBarProps {
  filterState: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  categoryCounts: Record<OpportunityCategory, number>;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalFilteredCount: number;
}

const CATEGORIES: { id: OpportunityCategory; label: string; icon: React.ReactNode }[] = [
  { id: 'All', label: 'All Opportunities', icon: <Compass className="w-4 h-4" /> },
  { id: 'Jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'Internships', label: 'Internships', icon: <Layers className="w-4 h-4" /> },
  { id: 'Scholarships', label: 'Scholarships', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'Grants', label: 'Grants', icon: <Award className="w-4 h-4" /> },
  { id: 'Hackathons', label: 'Hackathons', icon: <Code className="w-4 h-4" /> },
  { id: 'Fellowships', label: 'Fellowships', icon: <Users className="w-4 h-4" /> },
];

export default function FilterBar({
  filterState,
  onFilterChange,
  categoryCounts,
  viewMode,
  onViewModeChange,
  totalFilteredCount
}: FilterBarProps) {
  const isAnyFilterActive =
    filterState.category !== 'All' ||
    filterState.isRemoteOnly ||
    filterState.deadlineStatus !== 'all' ||
    filterState.fundingType !== 'all' ||
    filterState.educationLevel !== 'all' ||
    filterState.savedOnly ||
    filterState.searchQuery !== '';

  const handleReset = () => {
    onFilterChange({
      category: 'All',
      isRemoteOnly: false,
      deadlineStatus: 'all',
      fundingType: 'all',
      educationLevel: 'all',
      sortBy: 'featured',
      savedOnly: false,
      searchQuery: ''
    });
  };

  return (
    <div className="w-full mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#23314a] bg-[#101b2d]/80 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected = filterState.category === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => onFilterChange({ category: cat.id })}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#3f63ed] to-[#5b7cff] text-white shadow-lg shadow-[#3f63ed]/20 scale-[1.01]'
                      : 'bg-[#121f33] text-slate-300 hover:text-white hover:bg-[#172845] border border-[#22314d]'
                  }`}
                >
                  <span className={isSelected ? 'text-white' : 'text-[#9bb6ff]'}>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isSelected ? 'bg-white/15 text-white' : 'bg-[#1a2c43] text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#23314a]">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onFilterChange({ isRemoteOnly: !filterState.isRemoteOnly })}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  filterState.isRemoteOnly
                    ? 'bg-[#13263d] border-[#4f7acb] text-[#cfe0ff]'
                    : 'bg-[#121f33] border-[#22314d] text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>Remote / Worldwide</span>
                {filterState.isRemoteOnly && <CheckCircle2 className="w-3.5 h-3.5 text-[#9bb6ff]" />}
              </button>

              <select
                value={filterState.deadlineStatus}
                onChange={(e) => onFilterChange({ deadlineStatus: e.target.value as DeadlineFilter })}
                aria-label="Filter by deadline status"
                className="bg-[#121f33] border border-[#22314d] text-slate-300 hover:border-[#35508f] text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#5b7cff]"
              >
                <option value="all">Deadlines: All</option>
                <option value="closing-soon">⏳ Closing Soon (&lt; 7 Days)</option>
                <option value="active">🟢 Active / Open</option>
                <option value="rolling">🔄 Rolling Deadlines</option>
              </select>

              <select
                value={filterState.fundingType}
                onChange={(e) => onFilterChange({ fundingType: e.target.value as FundingFilter })}
                aria-label="Filter by funding type"
                className="bg-[#121f33] border border-[#22314d] text-slate-300 hover:border-[#35508f] text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#5b7cff]"
              >
                <option value="all">Funding: Any</option>
                <option value="fully-funded">✨ Fully Funded</option>
                <option value="paid">💰 Paid / Stipend</option>
                <option value="high-reward">🏆 High Reward / &gt;$50k</option>
              </select>

              <select
                value={filterState.educationLevel}
                onChange={(e) =>
                  onFilterChange({
                    educationLevel: e.target.value as EducationLevel | 'all'
                  })
                }
                aria-label="Filter by education level"
                className="bg-[#121f33] border border-[#22314d] text-slate-300 hover:border-[#35508f] text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#5b7cff] hidden sm:inline-block"
              >
                <option value="all">Target Level: All</option>
                <option value="Any / All Levels">Any / Open to All</option>
                <option value="Undergraduate">Undergraduate Students</option>
                <option value="Graduate">Graduate / Masters</option>
                <option value="Post-Doc / Professional">Post-Doc / Professional</option>
              </select>

              {isAnyFilterActive && (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-[#f6b3b3] hover:text-[#ffc7c7] bg-[#2c1920]/70 border border-[#61363d] rounded-lg hover:bg-[#3c2027] transition-colors"
                  title="Reset all applied filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden lg:inline">
                Showing <strong className="text-white">{totalFilteredCount}</strong> opportunities
              </span>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="hidden sm:inline">Sort:</span>
                <select
                  value={filterState.sortBy}
                  onChange={(e) =>
                    onFilterChange({
                      sortBy: e.target.value as FilterState['sortBy']
                    })
                  }
                  aria-label="Sort opportunities"
                  className="bg-[#121f33] border border-[#22314d] text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#5b7cff]"
                >
                  <option value="featured">Featured &amp; Top Picks</option>
                  <option value="deadline-asc">Deadline (Soonest First)</option>
                  <option value="newest">Newest Added</option>
                  <option value="highest-funding">Highest Funding</option>
                </select>
              </div>

              <div className="flex items-center bg-[#121f33] border border-[#22314d] rounded-lg p-0.5">
                <button
                  onClick={() => onViewModeChange('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#3f63ed] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Grid view"
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onViewModeChange('list')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="List view"
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
