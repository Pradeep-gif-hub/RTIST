import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { TechnicalHeader } from '../components/common/TechnicalHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  Terminal,
  CheckCircle,
  AlertCircle,
  Wrench,
  Cpu,
  ShieldCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { apiService } from '../services/api';
import { RecruitmentApplication } from '../types';

const INTEREST_AREAS = [
  'Electronics & Hardware Design',
  'Embedded Systems (C / FreeRTOS)',
  'Mechanical CAD & FEA Analysis',
  'CNC Machining & 3D Fabrication',
  'Autonomous Robotics & ROS 2',
  'Computer Vision (OpenCV)',
  'RC Powertrains & ESC Tuning',
  'Competition Track Operations',
  'Design, UI & Technical Media'
];

export const Join: React.FC = () => {
  const [formData, setFormData] = useState<RecruitmentApplication>({
    name: '',
    email: '',
    rollNumber: '',
    branch: '',
    year: '1st Year',
    areasOfInterest: [],
    technicalSkills: '',
    priorExperience: '',
    whyJoin: '',
    githubOrPortfolio: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleInterest = (area: string) => {
    if (formData.areasOfInterest.includes(area)) {
      setFormData({
        ...formData,
        areasOfInterest: formData.areasOfInterest.filter((a: string) => a !== area)
      });
    } else {
      setFormData({
        ...formData,
        areasOfInterest: [...formData.areasOfInterest, area]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.areasOfInterest.length === 0) {
      setErrorMessage('Please select at least one area of interest.');
      return;
    }

    setLoading(true);
    try {
      const res = await apiService.submitRecruitment(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(res.message || 'Submission failed. Please try again.');
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper
      title="Join RTIST — Recruitment"
      description="Apply to join the RTIST robotics club at NIT Jalandhar. We recruit student engineers across mechanical, electronics, embedded firmware, and autonomous software."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalHeader
          label="RECRUITMENT // SEASON 2026-27"
          title="JOIN THE RTIST PIT CREW"
          subtitle="Submit your candidate application. We welcome driven 1st, 2nd, and 3rd year engineering students eager to build physical robots and compete."
          align="center"
        />

        {submitted ? (
          <Card tag="APPLICATION RECORDED" className="p-8 sm:p-12 text-center space-y-6 tech-bracket">
            <div className="w-16 h-16 bg-rtist-green/10 border border-rtist-green flex items-center justify-center text-rtist-green mx-auto rounded-none">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white font-sans uppercase">
                APPLICATION RECEIVED SUCCESSFULLY
              </h2>
              <p className="text-xs sm:text-sm font-mono text-rtist-accent">
                CANDIDATE ID: RTIST-REC-{Math.floor(1000 + Math.random() * 9000)} // CONFIRMED
              </p>
            </div>

            <p className="text-xs sm:text-sm text-rtist-textMuted max-w-lg mx-auto leading-relaxed">
              Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your application has been logged into the RTIST candidate database. Our core leads will review your domain interests and contact you via email at <span className="text-white font-semibold">{formData.email}</span> for the Phase 2 technical task round.
            </p>

            <div className="pt-4 border-t border-rtist-border flex flex-wrap justify-center gap-4">
              <Button to="/builds" variant="primary" size="md">
                EXPLORE CURRENT BUILDS
              </Button>
              <Button to="/lab" variant="secondary" size="md">
                PREPARE WITH RTIST LAB
              </Button>
            </div>
          </Card>
        ) : (
          <div className="bg-rtist-card border border-rtist-border p-6 sm:p-10 tech-bracket">
            {/* Form Introduction Alert */}
            <div className="bg-rtist-surface p-4 border border-rtist-border mb-8 flex items-start gap-3 text-xs font-mono text-rtist-textMuted">
              <Terminal className="w-4 h-4 text-rtist-accent shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold">NO EXPERT EXPERIENCE MANDATORY: </span>
                For 1st-year candidates, willingness to work in the workshop and learn on the bench is our primary evaluation metric.
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-950/40 border border-red-500 p-4 mb-6 flex items-center gap-3 text-xs font-mono text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
              {/* Personal Details */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-rtist-accent uppercase tracking-wider pb-1 border-b border-rtist-border flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>1. CANDIDATE IDENTIFICATION</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-rtist-textMuted block mb-1 uppercase text-[11px]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pradeep Kumar Awasthi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                    />
                  </div>

                  <div>
                    <label className="text-rtist-textMuted block mb-1 uppercase text-[11px]">
                      College Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. pradeepka.ic.24@nitj.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-rtist-textMuted block mb-1 uppercase text-[11px]">
                      Roll Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 24106066"
                      value={formData.rollNumber}
                      onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                      className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                    />
                  </div>

                  <div>
                    <label className="text-rtist-textMuted block mb-1 uppercase text-[11px]">
                      Branch / Department *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mechanical / ECE / CSE / ICE"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                    />
                  </div>

                  <div>
                    <label className="text-rtist-textMuted block mb-1 uppercase text-[11px]">
                      Academic Year *
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value as any })}
                      className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white focus:outline-none focus:border-rtist-accent"
                    >
                      <option value="1st Year">1st Year (Batch 2026-30)</option>
                      <option value="2nd Year">2nd Year (Batch 2025-29)</option>
                      <option value="3rd Year">3rd Year (Batch 2024-28)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Areas of Interest */}
              <div className="space-y-3 pt-4">
                <div className="text-xs font-bold text-rtist-accent uppercase tracking-wider pb-1 border-b border-rtist-border flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>2. TECHNICAL DOMAINS &amp; INTERESTS (SELECT ALL THAT APPLY) *</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {INTEREST_AREAS.map((area) => {
                    const selected = formData.areasOfInterest.includes(area);
                    return (
                      <div
                        key={area}
                        onClick={() => toggleInterest(area)}
                        className={`p-3 border cursor-pointer select-none transition-colors flex items-center justify-between ${
                          selected
                            ? 'bg-rtist-accent/15 border-rtist-accent text-white'
                            : 'bg-rtist-surface border-rtist-border text-rtist-textMuted hover:border-rtist-accent/40'
                        }`}
                      >
                        <span className="text-xs">{area}</span>
                        {selected ? (
                          <CheckCircle className="w-4 h-4 text-rtist-accent shrink-0 ml-2" />
                        ) : (
                          <span className="w-4 h-4 border border-rtist-border shrink-0 ml-2" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technical Experience & Motivation */}
              <div className="space-y-4 pt-4">
                <div className="text-xs font-bold text-rtist-accent uppercase tracking-wider pb-1 border-b border-rtist-border flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>3. SKILLS &amp; MOTIVATION</span>
                </div>

                <div>
                  <label className="text-rtist-textMuted block mb-1 uppercase text-[11px]">
                    Technical Skills / Software / Tools Known *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. C++, Python, Arduino, SolidWorks, KiCad, Soldering, Git, ROS, or None / Beginner"
                    value={formData.technicalSkills}
                    onChange={(e) => setFormData({ ...formData, technicalSkills: e.target.value })}
                    className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                  />
                </div>

                <div>
                  <label className="text-rtist-textMuted block mb-1 uppercase text-[11px]">
                    Why do you want to join RTIST? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us what you hope to build, learn, or contribute in the robotics workshop..."
                    value={formData.whyJoin}
                    onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                    className="w-full bg-rtist-surface border border-rtist-border p-3 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                  />
                </div>

                <div>
                  <label className="text-rtist-textMuted block mb-1 uppercase text-[11px]">
                    GitHub Profile, Portfolio, or CAD Models (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/your-handle or portfolio link"
                    value={formData.githubOrPortfolio}
                    onChange={(e) => setFormData({ ...formData, githubOrPortfolio: e.target.value })}
                    className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-rtist-border">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full sm:w-auto"
                  icon={loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                >
                  {loading ? 'TRANSMITTING APPLICATION...' : 'SUBMIT CANDIDATE APPLICATION'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
