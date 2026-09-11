'use client';

import React, { useState, useEffect } from 'react';
import { Opportunity } from '../data/types';
import {
  X,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle2,
  Bookmark,
  Share2,
  ExternalLink,
  Sparkles,
  Award,
  GraduationCap,
  Mail,
  CheckSquare,
  Square,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export default function OpportunityDetailModal({
  opportunity,
  onClose,
  isBookmarked,
  onToggleBookmark
}: OpportunityDetailModalProps) {
  const [checkedEligibility, setCheckedEligibility] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  // Reset eligibility state when opportunity changes
  useEffect(() => {
    if (opportunity) {
      setCheckedEligibility({});
      setCopied(false);
    }
  }, [opportunity?.id]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!opportunity) return null;

  const totalCriteria = opportunity.eligibility.length;
  const checkedCount = Object.values(checkedEligibility).filter(Boolean).length;
  const matchPercentage = totalCriteria > 0 ? Math.round((checkedCount / totalCriteria) * 100) : 100;

  const toggleCriterion = (idx: number) => {
    setCheckedEligibility((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleSelectAll = () => {
    if (checkedCount === totalCriteria) {
      setCheckedEligibility({});
    } else {
      const all: Record<number, boolean> = {};
      opportunity.eligibility.forEach((_, idx) => {
        all[idx] = true;
      });
      setCheckedEligibility(all);
    }
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-[#182338]/35 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-[0_24px_80px_rgba(24,35,56,0.22)] overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]">
        {/* Modal Header bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#edf3ff] text-[#3159c9] border border-[#cbd9f8]">
              {opportunity.category}
            </span>
            {opportunity.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(opportunity.id)}
                className={`p-2 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-[#edf3ff] border-[#9eb5eb] text-[#3159c9]'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-[#3159c9]'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
              aria-label={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-violet-400' : ''}`} />
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-[#3159c9] transition-colors"
              title="Copy opportunity link"
              aria-label="Copy link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-[#3159c9] transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-7">
          {/* Main Identity */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#f7f9fc] border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
              {opportunity.orgLogo ? (
                <img
                  src={opportunity.orgLogo}
                  alt={opportunity.organization}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-violet-400">
                  {opportunity.organization.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-black text-[#182338] leading-tight mb-1.5">
                {opportunity.title}
              </h2>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-sm text-slate-400">
                <span className="font-semibold text-slate-700">{opportunity.organization}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {opportunity.location}
                </span>
                {opportunity.isRemote && (
                    <span className="text-[#187ca5] font-medium bg-[#edf8fc] px-2 py-0.5 rounded-full border border-[#c8ebf6] text-xs">
                    Remote Eligible
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f7f9fc] p-4 rounded-2xl border border-slate-200">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Funding / Stipend</span>
              </div>
              <div className="text-sm font-bold text-[#159a6a] truncate">
                {opportunity.fundingAmount || 'Fully Funded / N/A'}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Deadline</span>
              </div>
              <div className="text-sm font-bold text-[#182338] truncate">
                {opportunity.deadline}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>Role Type</span>
              </div>
              <div className="text-sm font-bold text-[#182338] truncate">
                {opportunity.type}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Target Level</span>
              </div>
              <div className="text-sm font-bold text-[#182338] truncate">
                {opportunity.educationLevel || 'All Levels'}
              </div>
            </div>
          </div>

          {/* Overview / Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              Program Overview
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal whitespace-pre-line">
              {opportunity.description}
            </p>
          </div>

          {/* Interactive Eligibility Matcher */}
          <div className="bg-[#f7f9fc] border border-[#dbe4f1] rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#182338] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3159c9]" />
                  Interactive Eligibility Checker
                </h3>
                <p className="text-xs text-slate-500">
                  Check off the requirements below to verify your qualification match
                </p>
              </div>

              <button
                onClick={handleSelectAll}
                className="text-xs font-semibold text-[#3159c9] hover:text-[#2447a7] self-start sm:self-auto"
              >
                {checkedCount === totalCriteria ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            {/* Match Meter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-300">
                  Match Score:{' '}
                  <strong className={matchPercentage === 100 ? 'text-[#159a6a]' : 'text-[#3159c9]'}>
                    {checkedCount}/{totalCriteria} requirements ({matchPercentage}%)
                  </strong>
                </span>
                <span className="text-slate-400">
                  {matchPercentage === 100
                    ? '🎉 100% Match - Highly Qualified!'
                    : matchPercentage >= 50
                    ? '👍 Strong Potential Candidate'
                    : 'Check your eligibility'}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    matchPercentage === 100
                      ? 'bg-[#159a6a]'
                      : 'bg-[#3159c9]'
                  }`}
                  style={{ width: `${matchPercentage}%` }}
                />
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 pt-1">
              {opportunity.eligibility.map((item, idx) => {
                const isChecked = !!checkedEligibility[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCriterion(idx)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-[#edf3ff] border-[#9eb5eb] text-[#182338]'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-[#f7f9fc]'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-[#3159c9]" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm leading-snug">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Benefits & Perks */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#3159c9]" />
              What You Receive / Key Benefits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {opportunity.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f7f9fc] border border-slate-200"
                >
                  <span className="text-[#3159c9] mt-0.5 font-bold">•</span>
                  <span className="text-xs sm:text-sm text-slate-600">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Steps */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              Application Process &amp; How to Apply
            </h3>
            <div className="space-y-2.5">
              {opportunity.applicationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f7f9fc] border border-slate-200"
                >
                  <span className="w-6 h-6 rounded-full bg-[#3159c9] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-0.5">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200">
            <span className="text-xs text-slate-500 mr-1">Tags:</span>
            {opportunity.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#f7f9fc] text-slate-600 border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-white/95 backdrop-blur-md border-t border-slate-200">
          <div className="text-xs text-slate-400">
            {opportunity.contactEmail && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                Contact: <a href={`mailto:${opportunity.contactEmail}`} className="text-[#3159c9] hover:underline">{opportunity.contactEmail}</a>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {copied && (
              <span className="text-xs text-cyan-400 font-medium animate-in fade-in">
                Link copied to clipboard!
              </span>
            )}
            <a
              href={opportunity.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#3159c9] hover:bg-[#2447a7] rounded-xl shadow-md shadow-[#3159c9]/20 transition-all"
            >
              <span>Apply on Official Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
