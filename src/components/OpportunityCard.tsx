'use client';

import React from 'react';
import { Opportunity } from '../data/types';
import {
  Calendar,
  MapPin,
  DollarSign,
  Bookmark,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Clock,
  ArrowUpRight,
  Globe2,
  GraduationCap
} from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelect: (opportunity: Opportunity) => void;
  viewMode?: 'grid' | 'list';
}

export default function OpportunityCard({
  opportunity,
  isBookmarked,
  onToggleBookmark,
  onSelect,
  viewMode = 'grid'
}: OpportunityCardProps) {
  // Helper to determine if deadline is closing soon (< 7 days from now)
  const isClosingSoon = React.useMemo(() => {
    if (!opportunity.deadline || opportunity.deadline.toLowerCase() === 'rolling') {
      return false;
    }
    const deadlineDate = new Date(opportunity.deadline);
    const now = new Date('2026-09-11'); // aligned with current simulation date
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }, [opportunity.deadline]);

  // Days remaining calculation
  const daysRemainingText = React.useMemo(() => {
    if (!opportunity.deadline || opportunity.deadline.toLowerCase() === 'rolling') {
      return 'Rolling Applications';
    }
    const deadlineDate = new Date(opportunity.deadline);
    const now = new Date('2026-09-11');
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Deadline Passed';
    if (diffDays === 0) return 'Closes Today!';
    if (diffDays === 1) return 'Closes Tomorrow!';
    if (diffDays <= 7) return `${diffDays} days left`;
    return `Deadline: ${opportunity.deadline}`;
  }, [opportunity.deadline]);

  const categoryColor = {
    Jobs: 'bg-[#eaf2ff] text-[#2f4ec5] border-[#c7d8ff]',
    Internships: 'bg-[#e9f8ff] text-[#1f6d8a] border-[#c8ebf6]',
    Scholarships: 'bg-[#ebfff3] text-[#1f7a4d] border-[#cfeed9]',
    Grants: 'bg-[#fff6e7] text-[#a16207] border-[#f7ddb9]',
    Hackathons: 'bg-[#fff0f2] text-[#c12d5d] border-[#f5c7d3]',
    Fellowships: 'bg-[#f3ebff] text-[#5b3d99] border-[#ddceff]'
  }[opportunity.category] || 'bg-slate-800 text-slate-300 border-slate-700';

  const urgencyStyle = isClosingSoon
    ? 'bg-[#2f1820] text-[#f7b9c0] border border-[#7a3342]'
    : opportunity.deadline.toLowerCase() === 'rolling'
      ? 'bg-[#112a2d] text-[#9fe4d4] border border-[#285a5a]'
      : 'bg-[#121f33] text-slate-300 border border-[#22314d]';

  if (viewMode === 'list') {
    return (
      <div className="group relative bg-white hover:bg-[#fbfcfe] border border-slate-200 hover:border-[#9eb5eb] rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(52,72,106,0.12)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left main info */}
        <div className="flex items-start gap-4 flex-1">
          {/* Organization Avatar */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center shadow-sm">
            {opportunity.orgLogo ? (
              <img
                src={opportunity.orgLogo}
                alt={opportunity.organization}
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            ) : (
              <span className="text-base font-bold text-violet-400">
                {opportunity.organization.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${categoryColor}`}>
                {opportunity.category}
              </span>
              {opportunity.featured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-950/70 border border-amber-700/60 text-amber-300">
                  <Sparkles className="w-2.5 h-2.5" /> Featured
                </span>
              )}
              {isClosingSoon && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-950/80 border border-rose-700/70 text-rose-300 animate-pulse">
                  <Clock className="w-2.5 h-2.5" /> {daysRemainingText}
                </span>
              )}
            </div>

            <h3
              onClick={() => onSelect(opportunity)}
              className="text-base sm:text-lg font-bold text-[#182338] group-hover:text-[#3159c9] cursor-pointer transition-colors truncate"
            >
              {opportunity.title}
            </h3>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-400 mt-1">
              <span className="font-medium text-slate-700">{opportunity.organization}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                {opportunity.location}
              </span>
              {opportunity.fundingAmount && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <DollarSign className="w-3 h-3" />
                    {opportunity.fundingAmount}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 self-end md:self-center">
          <button
            onClick={() => onToggleBookmark(opportunity.id)}
            className={`p-2.5 rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-[#1d2d47] border-[#4f7acb] text-[#cfe0ff]'
                : 'bg-[#121f33] border-[#22314d] text-slate-400 hover:text-white hover:bg-[#18253d]'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
            aria-label={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#cfe0ff]' : ''}`} />
          </button>

          <button
            onClick={() => onSelect(opportunity)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#3f63ed] hover:bg-[#3357d7] rounded-xl transition-all shadow-md shadow-[#3f63ed]/20"
          >
            <span>Official source</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Default: Grid Card view
  return (
    <div className="group relative bg-white hover:bg-[#fbfcfe] border border-slate-200 hover:border-[#9eb5eb] rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(52,72,106,0.12)] flex flex-col justify-between min-h-[360px]">
      <div>
        {/* Top bar: Category + Badges + Bookmark */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${categoryColor}`}>
              {opportunity.category}
            </span>

            {opportunity.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-[#fff5df] border border-[#f7dcae] text-[#9a6200]">
                <Sparkles className="w-3 h-3" /> Featured
              </span>
            )}

            {opportunity.verified && (
              <span
                className="group relative inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[10px] font-semibold bg-[#eafaf2] border border-[#bfe8cf] text-[#1d7a56]"
                title="Verified by OpporSphere: checked against official source, eligibility, and application details."
              >
                <CheckCircle2 className="w-3 h-3" /> Verified
                <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0f172a] px-2 py-1 text-[10px] text-slate-200 opacity-0 shadow-lg transition group-hover:opacity-100">
                  Checked against official source
                </span>
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(opportunity.id);
            }}
            className={`p-2 rounded-xl border transition-all ${
              isBookmarked
                ? 'bg-[#1d2d47] border-[#4f7acb] text-[#cfe0ff] shadow-sm shadow-[#3f63ed]/15'
                : 'bg-[#121f33] border-[#22314d] text-slate-400 hover:text-white hover:bg-[#18253d]'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
            aria-label={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#cfe0ff] text-[#cfe0ff]' : ''}`} />
          </button>
        </div>

        {/* Organization Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
            {opportunity.orgLogo ? (
              <img
                src={opportunity.orgLogo}
                alt={opportunity.organization}
                className="w-full h-full object-contain p-1.5"
                loading="lazy"
              />
            ) : (
              <span className="text-xs font-bold text-violet-400">
                {opportunity.organization.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-400 truncate">{opportunity.organization}</p>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
              <span className="truncate">{opportunity.location}</span>
              {opportunity.isRemote && (
                <span className="text-cyan-400 font-medium ml-1">• Remote OK</span>
              )}
            </div>
          </div>
        </div>

        {/* Opportunity Title */}
        <h3
          onClick={() => onSelect(opportunity)}
          className="text-lg font-bold text-[#182338] group-hover:text-[#3159c9] cursor-pointer transition-colors line-clamp-2 mb-2 leading-snug"
        >
          {opportunity.title}
        </h3>

        {/* Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {opportunity.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {opportunity.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-750"
            >
              #{tag}
            </span>
          ))}
          {opportunity.tags.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] text-slate-400 bg-slate-800/50">
              +{opportunity.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Reward & Deadline & Action */}
      <div className="pt-3.5 border-t border-slate-800/80 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs">
          {/* Funding amount or stipend */}
          <div className="flex items-center gap-1 text-emerald-400 font-semibold truncate">
            <DollarSign className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{opportunity.fundingAmount || 'Unspecified Stipend'}</span>
          </div>

          {/* Deadline badge */}
          <div
            className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md ${urgencyStyle}`}
          >
            <Clock className="w-3 h-3" />
            <span>{daysRemainingText}</span>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <button
          onClick={() => onSelect(opportunity)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-semibold text-[#3159c9] bg-[#edf3ff] group-hover:bg-[#3159c9] group-hover:text-white rounded-xl transition-all duration-200"
        >
          <span>View official source</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
