'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Opportunity,
  OpportunityCategory,
  EducationLevel,
  OpportunityFormData
} from '../data/types';
import OpportunityCard from './OpportunityCard';
import {
  X,
  Plus,
  Trash2,
  Send,
  Sparkles,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface SubmitOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (newOpp: Opportunity) => void;
}

const DEFAULT_FORM: OpportunityFormData = {
  title: 'Open Source AI Research Fellow',
  organization: 'Nexus Frontier Lab',
  category: 'Fellowships',
  type: '6-Month Remote Fellowship',
  location: 'Global (Remote)',
  isRemote: true,
  fundingAmount: '$45,000 Stipend + GPU Cluster Access',
  deadline: '2026-10-31',
  description: 'Join our decentralized research cohort building open weight models and interpretability tooling for next-generation intelligence.',
  eligibility: [
    'Demonstrated proficiency with PyTorch, JAX, or CUDA',
    'Open source contributions or arXiv preprint in machine learning',
    'Availability for 20-40 hours per week during fellowship'
  ],
  benefits: [
    '$45,000 tax-free stipend paid monthly',
    'Dedicated access to cluster with 64x H100 SXM GPUs',
    'Co-authorship on high-impact publications and conference presentations'
  ],
  applyUrl: 'https://nexuslab.org/apply',
  tags: ['Machine Learning', 'PyTorch', 'GPU Credits', 'Open Science'],
  contactEmail: 'fellows@nexuslab.org',
  educationLevel: 'Graduate'
};

export default function SubmitOpportunityModal({
  isOpen,
  onClose,
  onSubmitSuccess
}: SubmitOpportunityModalProps) {
  const [formData, setFormData] = useState<OpportunityFormData>(DEFAULT_FORM);
  const [newEligibility, setNewEligibility] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newTag, setNewTag] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  if (!isOpen) return null;

  // Build live mock opportunity for the split-screen preview
  const previewOpportunity: Opportunity = {
    id: 'preview-draft',
    title: formData.title || 'Untitled Opportunity',
    organization: formData.organization || 'Organization Name',
    category: formData.category,
    type: formData.type || 'Program Type',
    location: formData.location || 'Worldwide',
    isRemote: formData.isRemote,
    fundingAmount: formData.fundingAmount || 'Stipend / Prize',
    deadline: formData.deadline || 'Rolling',
    description: formData.description || 'Description will appear here as you type...',
    eligibility: formData.eligibility.length > 0 ? formData.eligibility : ['Sample eligibility requirement'],
    benefits: formData.benefits.length > 0 ? formData.benefits : ['Sample benefit / stipend'],
    applicationSteps: ['Submit application online', 'Interview with committee', 'Final selection notification'],
    applyUrl: formData.applyUrl || '#',
    tags: formData.tags.length > 0 ? formData.tags : ['Opportunity'],
    featured: true,
    verified: true,
    educationLevel: formData.educationLevel,
    createdAt: new Date().toISOString().split('T')[0],
    contactEmail: formData.contactEmail
  };

  const handleAddEligibility = () => {
    if (newEligibility.trim()) {
      setFormData((prev) => ({
        ...prev,
        eligibility: [...prev.eligibility, newEligibility.trim()]
      }));
      setNewEligibility('');
    }
  };

  const handleRemoveEligibility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      eligibility: prev.eligibility.filter((_, i) => i !== index)
    }));
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().replace(/^#/, '')]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.organization.trim() || !formData.applyUrl.trim()) {
      setErrorMsg('Please fill in Title, Organization, and Application URL.');
      return;
    }

    const newOpp: Opportunity = {
      id: `opp-custom-${Date.now()}`,
      title: formData.title.trim(),
      organization: formData.organization.trim(),
      category: formData.category,
      type: formData.type.trim() || 'General',
      location: formData.location.trim() || 'Worldwide',
      isRemote: formData.isRemote,
      fundingAmount: formData.fundingAmount.trim(),
      deadline: formData.deadline.trim() || 'Rolling',
      description: formData.description.trim(),
      eligibility: formData.eligibility.length > 0 ? formData.eligibility : ['Open to all qualified applicants'],
      benefits: formData.benefits.length > 0 ? formData.benefits : ['Professional mentorship and financial support'],
      applicationSteps: ['Submit application online via direct link', 'Review by host committee', 'Decisions communicated via email'],
      applyUrl: formData.applyUrl.trim().startsWith('http') ? formData.applyUrl.trim() : `https://${formData.applyUrl.trim()}`,
      tags: formData.tags.length > 0 ? formData.tags : [formData.category, 'Featured'],
      featured: true,
      verified: true,
      educationLevel: formData.educationLevel,
      createdAt: new Date().toISOString().split('T')[0],
      contactEmail: formData.contactEmail.trim()
    };

    // Confetti animation celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback
    }

    onSubmitSuccess(newOpp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-750 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-950/80 border border-violet-800/60 text-violet-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Post an Opportunity
              </h2>
              <p className="text-xs text-slate-400">
                Share scholarships, fellowships, grants, internships, hackathons or jobs with 50,000+ candidates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Tab Toggle */}
            <div className="flex lg:hidden bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                  activeTab === 'form' ? 'bg-violet-600 text-white' : 'text-slate-400'
                }`}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                  activeTab === 'preview' ? 'bg-violet-600 text-white' : 'text-slate-400'
                }`}
              >
                Preview
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 border border-slate-750 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body - Split View on Desktop */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Input Form (lg:col-span-7) */}
            <div className={`space-y-5 lg:col-span-7 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
              {errorMsg && (
                <div className="flex items-center gap-2 p-3 text-xs text-rose-300 bg-rose-950/50 border border-rose-800/60 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Opportunity Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Google Summer of Code, AI Safety Grant, etc."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>

                {/* Organization & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Host Organization / Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. OpenAI, Oxford, NASA, Stripe"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as Exclude<OpportunityCategory, 'All'>
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    >
                      <option value="Jobs">Jobs</option>
                      <option value="Internships">Internships</option>
                      <option value="Scholarships">Scholarships</option>
                      <option value="Grants">Grants</option>
                      <option value="Hackathons">Hackathons</option>
                      <option value="Fellowships">Fellowships</option>
                    </select>
                  </div>
                </div>

                {/* Role Type & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Program / Role Type
                    </label>
                    <input
                      type="text"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      placeholder="e.g. 10-Week Paid Fellowship, Full-time"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. San Francisco, London, Global"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>

                {/* Funding & Deadline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Funding / Stipend / Compensation
                    </label>
                    <input
                      type="text"
                      value={formData.fundingAmount}
                      onChange={(e) => setFormData({ ...formData, fundingAmount: e.target.value })}
                      placeholder="e.g. $10,000 Stipend, Fully Funded, $120k"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Application Deadline
                    </label>
                    <input
                      type="text"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      placeholder="YYYY-MM-DD or Rolling"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>

                {/* Target Education & Remote */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Target Education Level
                    </label>
                    <select
                      value={formData.educationLevel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          educationLevel: e.target.value as EducationLevel
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    >
                      <option value="Any / All Levels">Any / All Levels</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Graduate">Graduate / Masters</option>
                      <option value="Post-Doc / Professional">Post-Doc / Professional</option>
                      <option value="High School">High School</option>
                    </select>
                  </div>

                  <div className="pt-5">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isRemote}
                        onChange={(e) => setFormData({ ...formData, isRemote: e.target.checked })}
                        className="w-4 h-4 rounded text-violet-600 bg-slate-950 border-slate-800 focus:ring-violet-500"
                      />
                      <span className="text-xs font-medium text-slate-300">
                        Remote / Worldwide Participation Eligible
                      </span>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Program Overview &amp; Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the opportunity, mission, and what fellows/applicants will work on..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
                  />
                </div>

                {/* Eligibility Requirements Builder */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Eligibility Criteria (for Candidates&apos; Checker)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newEligibility}
                      onChange={(e) => setNewEligibility(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddEligibility())}
                      placeholder="Add an eligibility requirement..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddEligibility}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {formData.eligibility.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-300"
                      >
                        <span className="truncate">{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveEligibility(idx)}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits Builder */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Benefits &amp; Perks
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBenefit())}
                      placeholder="Add a perk (e.g. Travel covered, Laptop provided)..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddBenefit}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-28 overflow-y-auto">
                    {formData.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-300"
                      >
                        <span className="truncate">{benefit}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefit(idx)}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply URL & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Official Application Link *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.applyUrl}
                      onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
                      placeholder="https://yourorg.com/apply"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Organizer Contact Email
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="contact@yourorg.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tags &amp; Keywords
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      placeholder="Add tag (e.g. Remote, DeepTech, Climate)..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-slate-400 hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Publish Opportunity to OpporSphere</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Live Split-Screen Card Preview (lg:col-span-5) */}
            <div className={`space-y-4 lg:col-span-5 ${activeTab === 'form' ? 'hidden lg:block' : 'block'}`}>
              <div className="sticky top-0 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-violet-400" />
                    Live Candidate View Preview
                  </span>
                  <span className="text-emerald-400 font-medium">Real-time</span>
                </div>
                <p className="text-xs text-slate-500">
                  This preview updates in real-time to match how candidates and researchers will discover your listing.
                </p>

                <div className="pt-2">
                  <OpportunityCard
                    opportunity={previewOpportunity}
                    isBookmarked={false}
                    onToggleBookmark={() => {}}
                    onSelect={() => {}}
                    viewMode="grid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
