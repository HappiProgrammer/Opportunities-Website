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
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_12px_30px_rgba(52,72,106,0.08)]">
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
                      ? 'bg-[#3159c9] text-white shadow-md shadow-[#3159c9]/20 scale-[1.01]'
                      : 'bg-[#f7f9fc] text-slate-600 hover:text-[#3159c9] hover:bg-[#edf3ff] border border-slate-200'
                  }`}
                >
                  <span className={isSelected ? 'text-white' : 'text-[#3159c9]'}>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isSelected ? 'bg-white/15 text-white' : 'bg-[#e8eef7] text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onFilterChange({ isRemoteOnly: !filterState.isRemoteOnly })}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  filterState.isRemoteOnly
                    ? 'bg-[#edf3ff] border-[#9eb5eb] text-[#3159c9]'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>Remote / Worldwide</span>
                {filterState.isRemoteOnly && <CheckCircle2 className="w-3.5 h-3.5 text-[#3159c9]" />}
              </button>

              {isAnyFilterActive && (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-[#b42318] hover:text-[#8f1d14] bg-[#fff4f2] border border-[#f3c3bd] rounded-lg hover:bg-[#ffe9e5] transition-colors"
                  title="Reset all applied filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 hidden lg:inline">
                Showing <strong className="text-[#182338]">{totalFilteredCount}</strong> opportunities
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
                  className="bg-white border border-slate-200 text-slate-600 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#3159c9]"
                >
                  <option value="featured">Featured &amp; Top Picks</option>
                  <option value="deadline-asc">Deadline (Soonest First)</option>
                  <option value="newest">Newest Added</option>
                  <option value="highest-funding">Highest Funding</option>
                </select>
              </div>

              <div className="flex items-center bg-[#f7f9fc] border border-slate-200 rounded-lg p-0.5">
                <button
                  onClick={() => onViewModeChange('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#3159c9] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-700'
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
                      ? 'bg-[#3159c9] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-700'
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
