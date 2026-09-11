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
  Globe2,
  Search,
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
        {filterState.category === 'All' ? (
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

        </div>
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#182338]">{filterState.category}</h1>
              <p className="mt-2 text-lg text-slate-500">{totalFilteredCount} {totalFilteredCount === 1 ? 'opportunity' : 'opportunities'} found</p>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <label className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={filterState.searchQuery}
                  onChange={(event) => onFilterChange({ searchQuery: event.target.value })}
                  placeholder="Search opportunities..."
                  aria-label={`Search ${filterState.category}`}
                  className="w-full rounded-xl border border-[#cbd9e8] bg-white px-12 py-4 text-base text-[#182338] outline-none placeholder:text-slate-400 focus:border-[#3159c9] focus:ring-2 focus:ring-[#edf3ff]"
                />
              </label>
              <select
                value={filterState.category}
                onChange={(event) => onFilterChange({ category: event.target.value as OpportunityCategory })}
                aria-label="Choose opportunity category"
                className="rounded-xl border border-[#cbd9e8] bg-white px-4 py-4 text-base text-[#182338] outline-none focus:border-[#3159c9] focus:ring-2 focus:ring-[#edf3ff]"
              >
                {CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.id === 'All' ? 'All Opportunities' : category.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => onFilterChange({ isRemoteOnly: !filterState.isRemoteOnly })}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-base transition-colors ${
                  filterState.isRemoteOnly
                    ? 'border-[#9eb5eb] bg-[#edf3ff] text-[#3159c9]'
                    : 'border-[#cbd9e8] bg-white text-slate-600 hover:border-[#9eb5eb]'
                }`}
              >
                <span className={`h-5 w-5 rounded border ${filterState.isRemoteOnly ? 'border-[#3159c9] bg-[#3159c9]' : 'border-slate-400 bg-white'}`}>
                  {filterState.isRemoteOnly && <CheckCircle2 className="h-4 w-4 text-white" />}
                </span>
                Remote only
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              {isAnyFilterActive && (
                <button onClick={handleReset} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3159c9] hover:text-[#2447a7]">
                  <RotateCcw className="h-4 w-4" />
                  Back to all categories
                </button>
              )}
              <span className="ml-auto text-sm text-slate-500">Showing {totalFilteredCount} opportunities</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
