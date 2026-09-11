'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Opportunity,
  OpportunityCategory,
  FilterState,
  EducationLevel,
  DeadlineFilter,
  FundingFilter
} from '../data/types';
import { INITIAL_OPPORTUNITIES } from '../data/mockOpportunities';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityDetailModal from '../components/OpportunityDetailModal';
import SubmitOpportunityModal from '../components/SubmitOpportunityModal';
import NewsletterModal from '../components/NewsletterModal';
import SavedBookmarksDrawer from '../components/SavedBookmarksDrawer';
import Footer from '../components/Footer';

import {
  Sparkles,
  Inbox,
  RotateCcw,
  Bookmark,
  TrendingUp,
  Award
} from 'lucide-react';

const STORAGE_KEY_OPPORTUNITIES = 'opporsphere_catalog_v1';
const STORAGE_KEY_BOOKMARKS = 'opporsphere_bookmarks_v1';

export default function Home() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Filters State
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    category: 'All',
    isRemoteOnly: false,
    deadlineStatus: 'all',
    fundingType: 'all',
    educationLevel: 'all',
    sortBy: 'featured',
    savedOnly: false
  });

  // UI view state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Load persistence from localStorage on client mount
  useEffect(() => {
    setIsClient(true);
    try {
      const storedOpps = localStorage.getItem(STORAGE_KEY_OPPORTUNITIES);
      if (storedOpps) {
        const parsedOpps: Opportunity[] = JSON.parse(storedOpps);
        // Merge initial with stored custom
        const customIds = new Set(parsedOpps.map((o) => o.id));
        const merged = [
          ...parsedOpps,
          ...INITIAL_OPPORTUNITIES.filter((o) => !customIds.has(o.id))
        ];
        setOpportunities(merged);
      }

      const storedBookmarks = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      if (storedBookmarks) {
        setBookmarkedIds(JSON.parse(storedBookmarks));
      }
    } catch {
      // Fallback
    }
  }, []);

  // Save bookmarks to localStorage
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(next));
      } catch {
        // Fallback
      }
      return next;
    });
  };

  // Handle new opportunity submission
  const handleNewOpportunity = (newOpp: Opportunity) => {
    setOpportunities((prev) => {
      const next = [newOpp, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_OPPORTUNITIES, JSON.stringify(next));
      } catch {
        // Fallback
      }
      return next;
    });
    // Auto-select or view new opportunity
    setSelectedOpportunity(newOpp);
  };

  const handleFilterUpdate = (newFilters: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...newFilters }));
  };

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<OpportunityCategory, number> = {
      All: opportunities.length,
      Jobs: 0,
      Internships: 0,
      Scholarships: 0,
      Grants: 0,
      Hackathons: 0,
      Fellowships: 0
    };

    opportunities.forEach((opp) => {
      if (counts[opp.category] !== undefined) {
        counts[opp.category] += 1;
      }
    });

    return counts;
  }, [opportunities]);

  // Filtering & Sorting Logic
  const filteredOpportunities = useMemo(() => {
    const referenceDate = new Date('2026-09-11');

    return opportunities.filter((opp) => {
      // 1. Saved only filter
      if (filterState.savedOnly && !bookmarkedIds.includes(opp.id)) {
        return false;
      }

      // 2. Category filter
      if (filterState.category !== 'All' && opp.category !== filterState.category) {
        return false;
      }

      // 3. Remote only filter
      if (filterState.isRemoteOnly && !opp.isRemote) {
        return false;
      }

      // 4. Education level filter
      if (
        filterState.educationLevel !== 'all' &&
        opp.educationLevel &&
        opp.educationLevel !== 'Any / All Levels' &&
        opp.educationLevel !== filterState.educationLevel
      ) {
        return false;
      }

      // 5. Deadline urgency filter
      if (filterState.deadlineStatus !== 'all') {
        const isRolling = opp.deadline.toLowerCase() === 'rolling';
        if (filterState.deadlineStatus === 'rolling' && !isRolling) return false;
        if (filterState.deadlineStatus === 'closing-soon') {
          if (isRolling) return false;
          const deadlineDate = new Date(opp.deadline);
          const diffDays = Math.ceil(
            (deadlineDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24)
          );
          if (diffDays < 0 || diffDays > 7) return false;
        }
        if (filterState.deadlineStatus === 'active') {
          if (!isRolling) {
            const deadlineDate = new Date(opp.deadline);
            if (deadlineDate < referenceDate) return false;
          }
        }
      }

      // 6. Funding filter
      if (filterState.fundingType !== 'all') {
        const fundingText = (opp.fundingAmount || '').toLowerCase();
        if (filterState.fundingType === 'fully-funded') {
          if (!fundingText.includes('fully funded')) return false;
        } else if (filterState.fundingType === 'paid') {
          const isPaid =
            fundingText.includes('$') ||
            fundingText.includes('£') ||
            fundingText.includes('€') ||
            fundingText.includes('stipend') ||
            fundingText.includes('chf');
          if (!isPaid) return false;
        } else if (filterState.fundingType === 'high-reward') {
          const isHigh =
            fundingText.includes('100,000') ||
            fundingText.includes('250,000') ||
            fundingText.includes('350,000') ||
            fundingText.includes('150,000') ||
            fundingText.includes('170,000') ||
            fundingText.includes('225,000') ||
            fundingText.includes('110,000');
          if (!isHigh) return false;
        }
      }

      // 7. Search query filter
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase().trim();
        const matchesTitle = opp.title.toLowerCase().includes(query);
        const matchesOrg = opp.organization.toLowerCase().includes(query);
        const matchesDesc = opp.description.toLowerCase().includes(query);
        const matchesLocation = opp.location.toLowerCase().includes(query);
        const matchesTags = opp.tags.some((t) => t.toLowerCase().includes(query));
        const matchesEligibility = opp.eligibility.some((e) => e.toLowerCase().includes(query));

        if (
          !matchesTitle &&
          !matchesOrg &&
          !matchesDesc &&
          !matchesLocation &&
          !matchesTags &&
          !matchesEligibility
        ) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (filterState.sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.verified && !b.verified) return -1;
        if (!a.verified && b.verified) return 1;
        return 0;
      }

      if (filterState.sortBy === 'deadline-asc') {
        const aRolling = a.deadline.toLowerCase() === 'rolling';
        const bRolling = b.deadline.toLowerCase() === 'rolling';
        if (aRolling && !bRolling) return 1;
        if (!aRolling && bRolling) return -1;
        if (aRolling && bRolling) return 0;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }

      if (filterState.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      if (filterState.sortBy === 'highest-funding') {
        const extractNum = (str?: string) => {
          if (!str) return 0;
          const match = str.replace(/,/g, '').match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        };
        return extractNum(b.fundingAmount) - extractNum(a.fundingAmount);
      }

      return 0;
    });
  }, [opportunities, filterState, bookmarkedIds]);

  const renderOpportunityGrid = (items: Opportunity[]) => (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7'
          : 'flex flex-col space-y-3.5'
      }
    >
      {items.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          isBookmarked={bookmarkedIds.includes(opportunity.id)}
          onToggleBookmark={handleToggleBookmark}
          onSelect={(opp) => setSelectedOpportunity(opp)}
          viewMode={viewMode}
        />
      ))}
    </div>
  );

  const latestOpportunities = useMemo(
    () => [...opportunities].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3),
    [opportunities]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8fc] text-[#182338] selection:bg-[#cbd9f8] selection:text-[#182338]">
      {/* Top Navigation */}
      <Navbar
        savedCount={isClient ? bookmarkedIds.length : 0}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
        selectedCategory={filterState.category}
        onSelectCategory={(cat) => handleFilterUpdate({ category: cat })}
      />

      {/* Hero Section */}
      {filterState.category === 'All' && (
        <Hero
          searchQuery={filterState.searchQuery}
          onSearchChange={(query) => handleFilterUpdate({ searchQuery: query })}
          totalOpportunities={opportunities.length}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Filter Navigation Bar */}
        <FilterBar
          filterState={filterState}
          onFilterChange={handleFilterUpdate}
          categoryCounts={categoryCounts}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalFilteredCount={filteredOpportunities.length}
        />

        {filterState.category === 'All' && (
          <section className="mt-16" aria-labelledby="latest-opportunities-heading">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3159c9]">Freshly added</p>
                <h2 id="latest-opportunities-heading" className="mt-2 font-display text-3xl sm:text-4xl font-bold text-[#182338]">
                  Latest opportunities
                </h2>
                <p className="mt-2 text-base text-slate-500">A short list of new possibilities worth a closer look.</p>
              </div>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#3159c9] hover:text-[#2447a7]"
              >
                Explore categories
                <span aria-hidden="true" className="text-lg">-&gt;</span>
              </button>
            </div>
            {renderOpportunityGrid(latestOpportunities)}
          </section>
        )}

        {/* Active Filter Indicators if any */}
        {(filterState.savedOnly || filterState.searchQuery) && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-slate-400">Active filter:</span>
            {filterState.savedOnly && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-violet-950 text-violet-300 border border-violet-700">
                <Bookmark className="w-3 h-3 fill-violet-400" />
                Saved Bookmarks Only ({bookmarkedIds.length})
                <button
                  onClick={() => handleFilterUpdate({ savedOnly: false })}
                  className="ml-1 text-slate-400 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
            {filterState.searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800">
                Search: &quot;{filterState.searchQuery}&quot;
                <button
                  onClick={() => handleFilterUpdate({ searchQuery: '' })}
                  className="ml-1 text-slate-400 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* Feed Listing */}
        {filterState.category !== 'All' && filteredOpportunities.length > 0 ? (
          renderOpportunityGrid(filteredOpportunities)
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 shadow-xl">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No opportunities found</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We couldn&apos;t find any active listings matching your current filter combinations. Try loosening your criteria or resetting your search.
            </p>
            <div className="pt-2">
              <button
                onClick={() =>
                  handleFilterUpdate({
                    category: 'All',
                    isRemoteOnly: false,
                    deadlineStatus: 'all',
                    fundingType: 'all',
                    educationLevel: 'all',
                    searchQuery: '',
                    savedOnly: false
                  })
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-violet-600/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Organizer Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-violet-950/50 via-slate-900/80 to-slate-900 border border-violet-900/40 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-950/80 border border-violet-700/60 text-violet-300">
                <Sparkles className="w-3.5 h-3.5" /> For Foundations, Labs &amp; Companies
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Hosting a scholarship, grant, or fellowship?
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                OpporSphere distributes your listings directly to thousands of high-achieving builders, researchers, and university students globally.
              </p>
            </div>

            <button
              onClick={() => setIsSubmitOpen(true)}
              className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-violet-600/30 hover:scale-[1.02] transition-all flex-shrink-0"
            >
              Post Your Opportunity Now
            </button>
          </div>
        </div>
      </main>

      {/* Opportunity Detail & Interactive Eligibility Modal */}
      <OpportunityDetailModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        isBookmarked={selectedOpportunity ? bookmarkedIds.includes(selectedOpportunity.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Post Opportunity Portal Dialog */}
      <SubmitOpportunityModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSubmitSuccess={handleNewOpportunity}
      />

      {/* Deadline Alert Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

      {/* Saved Bookmarks Slide-over Drawer */}
      <SavedBookmarksDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        opportunities={opportunities}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={handleToggleBookmark}
        onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
      />

      {/* Site Footer */}
      <Footer
        onSelectCategory={(cat) => handleFilterUpdate({ category: cat })}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />
    </div>
  );
}
