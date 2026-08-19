import React from 'react';
import { Button } from '../common/Button';
import { ArrowRight, Wrench, Terminal, CheckCircle } from 'lucide-react';

export const JoinCTA: React.FC = () => {
  return (
    <section className="py-20 border-b border-rtist-border relative bg-rtist-bg overflow-hidden">
      {/* Background technical accents */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-rtist-card border border-rtist-border p-8 sm:p-12 tech-bracket relative shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-rtist-accent uppercase tracking-widest bg-rtist-surface px-2.5 py-1 border border-rtist-border">
                <Terminal className="w-3.5 h-3.5" />
                <span>RECRUITMENT // SEASON 2026</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-sans uppercase leading-tight">
                WANT TO BUILD REAL HARDWARE?<br />
                <span className="text-rtist-accent">JOIN THE RTIST PIT CREW.</span>
              </h2>

              <p className="text-xs sm:text-sm text-rtist-textMuted max-w-xl leading-relaxed">
                Whether you know how to write low-level C firmware, machine aluminum brackets, route KiCad PCBs, or are an eager first-year ready to learn hands-on engineering, there is a place for you in our workshop.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-mono text-rtist-text">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-rtist-green" />
                  All Branches Eligible
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-rtist-green" />
                  Hands-On Training
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-rtist-green" />
                  National Competitions
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
              <Button
                to="/join"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto text-sm"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                APPLY FOR RECRUITMENT
              </Button>
              <Button
                to="/about"
                variant="secondary"
                size="md"
                className="w-full sm:w-auto text-xs"
                icon={<Wrench className="w-3.5 h-3.5" />}
              >
                TOUR OUR LAB FACILITIES
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
