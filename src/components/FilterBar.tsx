'use client';

import React from 'react';
import {
  OpportunityCategory,
  FilterState,
} from '../data/types';
import {
  Compass,
  BriefcaseBusiness,
  GraduationCap,
  Gift,
  Code2,
  UsersRound,
  Layers3,
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

const CATEGORIES: {
  id: OpportunityCategory;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'All', label: 'All opportunities', description: 'Browse every verified opportunity in one place.', icon: Compass },
  { id: 'Jobs', label: 'Jobs', description: 'Roles from organizations hiring ambitious people.', icon: BriefcaseBusiness },
  { id: 'Internships', label: 'Internships', description: 'Practical experience in technology, research, and design.', icon: Layers3 },
  { id: 'Scholarships', label: 'Scholarships', description: 'Funded study opportunities and academic support.', icon: GraduationCap },
  { id: 'Grants', label: 'Grants', description: 'Funding for ideas, research, and growing projects.', icon: Gift },
  { id: 'Hackathons', label: 'Hackathons', description: 'Build, compete, and connect with new communities.', icon: Code2 },
  { id: 'Fellowships', label: 'Fellowships', description: 'Selective programs for future leaders and builders.', icon: UsersRound }
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
        <div>
          <div className="mb-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#182338]">Explore by category</h2>
            <p className="mt-2 text-base sm:text-lg text-slate-500">Choose a category to see what is available right now.</p>
          </div>

          <div
            role="tablist"
            aria-label="Opportunity categories"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CATEGORIES.slice(1).map((category) => {
              const isSelected = filterState.category === category.id;
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onFilterChange({ category: category.id })}
                  className={`group flex min-h-[166px] items-start gap-5 rounded-2xl border bg-white p-6 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(52,72,106,0.1)] ${
                    isSelected
                      ? 'border-[#9eb5eb] ring-2 ring-[#edf3ff]'
                      : 'border-slate-200 hover:border-[#cbd9f8]'
                  }`}
                >
                  <span className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${isSelected ? 'bg-[#3159c9] text-white' : 'bg-[#edf3ff] text-[#3159c9]'}`}>
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg font-bold text-[#182338] group-hover:text-[#3159c9]">{category.label}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-slate-500">{category.description}</span>
                    <span className="mt-3 block text-sm font-semibold text-[#3159c9]">{categoryCounts[category.id]} open</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(52,72,106,0.06)]">
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
