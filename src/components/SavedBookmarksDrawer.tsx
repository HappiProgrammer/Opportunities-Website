'use client';

import React, { useState } from 'react';
import { Opportunity } from '../data/types';
import {
  X,
  Bookmark,
  Trash2,
  ExternalLink,
  Download,
  CheckCircle2,
  Clock,
  ArrowRight,
  FolderOpen
} from 'lucide-react';

interface SavedBookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: Opportunity[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectOpportunity: (opportunity: Opportunity) => void;
}

export default function SavedBookmarksDrawer({
  isOpen,
  onClose,
  opportunities,
  bookmarkedIds,
  onToggleBookmark,
  onSelectOpportunity
}: SavedBookmarksDrawerProps) {
  const [statusMap, setStatusMap] = useState<Record<string, 'Saved' | 'Applied' | 'Reviewing'>>({});

  if (!isOpen) return null;

  const bookmarkedOpps = opportunities.filter((opp) => bookmarkedIds.includes(opp.id));

  const handleStatusChange = (id: string, status: 'Saved' | 'Applied' | 'Reviewing') => {
    setStatusMap((prev) => ({ ...prev, [id]: status }));
  };

  const handleExportJSON = () => {
    const dataToExport = bookmarkedOpps.map((opp) => ({
      title: opp.title,
      organization: opp.organization,
      category: opp.category,
      deadline: opp.deadline,
      funding: opp.fundingAmount,
      applyUrl: opp.applyUrl,
      status: statusMap[opp.id] || 'Saved'
    }));
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `opporsphere-bookmarks-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-violet-950/80 border border-violet-800/60 text-violet-400">
                <Bookmark className="w-5 h-5 fill-violet-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Your Saved Hub</h2>
                <p className="text-xs text-slate-400">
                  {bookmarkedOpps.length} bookmarked opportunities
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {bookmarkedOpps.length > 0 && (
                <button
                  onClick={handleExportJSON}
                  className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors"
                  title="Export Bookmarks as JSON"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {bookmarkedOpps.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white">No saved opportunities yet</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Click the bookmark icon on any opportunity card to save it for later review and application tracking.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all"
                >
                  Browse Directory
                </button>
              </div>
            ) : (
              bookmarkedOpps.map((opp) => {
                const currentStatus = statusMap[opp.id] || 'Saved';

                return (
                  <div
                    key={opp.id}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-violet-500/50 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-violet-950 text-violet-300 border border-violet-800/60 mb-1">
                          {opp.category}
                        </span>
                        <h4
                          onClick={() => {
                            onSelectOpportunity(opp);
                            onClose();
                          }}
                          className="text-sm font-bold text-white hover:text-violet-300 cursor-pointer truncate"
                        >
                          {opp.title}
                        </h4>
                        <p className="text-xs text-slate-400 truncate">{opp.organization}</p>
                      </div>

                      <button
                        onClick={() => onToggleBookmark(opp.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                      <div className="text-emerald-400 font-medium truncate max-w-[140px]">
                        {opp.fundingAmount || 'Stipend'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Due: {opp.deadline}
                      </div>
                    </div>

                    {/* Status tracker badge selector */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="text-[11px] text-slate-400">Status:</span>
                      <div className="flex items-center gap-1">
                        {(['Saved', 'Applied', 'Reviewing'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleStatusChange(opp.id, st)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                              currentStatus === st
                                ? st === 'Applied'
                                  ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-600'
                                  : st === 'Reviewing'
                                  ? 'bg-amber-900/80 text-amber-300 border border-amber-600'
                                  : 'bg-violet-900/80 text-violet-300 border border-violet-600'
                                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          {bookmarkedOpps.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
              <span>Saved locally in browser</span>
              <button
                onClick={handleExportJSON}
                className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                Export JSON
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
