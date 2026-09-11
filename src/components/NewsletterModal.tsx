'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Bell, CheckCircle2, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { OpportunityCategory } from '../data/types';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'weekly' | 'urgent'>('weekly');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Scholarships',
    'Grants',
    'Fellowships'
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const topics = [
    { id: 'Jobs', label: 'Tech & Research Jobs' },
    { id: 'Internships', label: 'Global Internships (GSoC, CERN)' },
    { id: 'Scholarships', label: 'Fully-Funded Scholarships (Rhodes, Gates)' },
    { id: 'Grants', label: 'Pilot & Academic Grants' },
    { id: 'Hackathons', label: 'Hackathons & Competitions' },
    { id: 'Fellowships', label: 'Leadership & Founder Fellowships' }
  ];

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback
    }

    setIsSubmitted(true);
    // Persist in localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('opporsphere_subscribers') || '[]');
      stored.push({ email, frequency, selectedTopics, date: new Date().toISOString() });
      localStorage.setItem('opporsphere_subscribers', JSON.stringify(stored));
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-750 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-emerald-950/80 border border-emerald-700/60 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">You&apos;re on the priority list!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              We&apos;ve configured your custom deadline alerts for <strong className="text-white">{email}</strong>. You will receive notifications based on your chosen criteria.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm rounded-xl transition-all"
              >
                Done &amp; Return to Opportunities
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-950/70 border border-amber-700/60 text-amber-400">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Curated Deadline Alerts</h3>
                <p className="text-xs text-slate-400">
                  Never miss prestigious grant, scholarship, or fellowship cutoff dates
                </p>
              </div>
            </div>

            {/* Email input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Your Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu or you@domain.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Alert Frequency */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Notification Frequency
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFrequency('weekly')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    frequency === 'weekly'
                      ? 'bg-violet-950/60 border-violet-500 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold mb-0.5">Weekly Digest</div>
                  <div className="text-[11px] text-slate-500">Every Sunday morning</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFrequency('urgent')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    frequency === 'urgent'
                      ? 'bg-violet-950/60 border-violet-500 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold mb-0.5">48-Hour Cutoffs</div>
                  <div className="text-[11px] text-slate-500">Closing-soon urgent warnings</div>
                </button>
              </div>
            </div>

            {/* Topic Preferences */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Select Opportunity Categories
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topics.map((t) => {
                  const isChecked = selectedTopics.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTopic(t.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs transition-all ${
                        isChecked
                          ? 'bg-violet-950/40 border-violet-700/60 text-white'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${
                          isChecked ? 'bg-violet-600 border-violet-500' : 'border-slate-700'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <span className="truncate">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-violet-600/30 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Activate Free Deadline Alerts</span>
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Zero spam guarantee. 1-click unsubscribe anytime.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
