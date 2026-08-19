import React from 'react';
import { Award, Flag, Timer, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CompetitionsBanner: React.FC = () => {
  return (
    <section className="bg-black/60 border-y border-rtist-border py-12 relative overflow-hidden">
      {/* Background scanline & grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left info */}
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-rtist-accent uppercase tracking-widest">
              <Flag className="w-4 h-4" />
              <span>RTIST COMPETITIVE CIRCUIT // 2026</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans uppercase">
              BATTLE-TESTED ON NATIONAL PODIUMS
            </h3>
            <p className="text-xs sm:text-sm text-rtist-textMuted leading-relaxed">
              From North India RC Gran Prix asphalt circuits to 3kg steel combat dohyo rings, RTIST robots are designed to meet strict scrutineering specs and win under intense competition pressure.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full lg:w-auto">
            <div className="bg-rtist-card p-4 border border-rtist-border text-center">
              <Award className="w-5 h-5 text-rtist-accent mx-auto mb-1.5" />
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">18+</div>
              <div className="text-[10px] font-mono text-rtist-textMuted uppercase">Podiums Secured</div>
            </div>

            <div className="bg-rtist-card p-4 border border-rtist-border text-center">
              <Timer className="w-5 h-5 text-rtist-cyan mx-auto mb-1.5" />
              <div className="text-xl sm:text-2xl font-bold font-mono text-rtist-cyan">8.42s</div>
              <div className="text-[10px] font-mono text-rtist-textMuted uppercase">Track Lap Record</div>
            </div>

            <div className="bg-rtist-card p-4 border border-rtist-border text-center col-span-2 sm:col-span-1">
              <Zap className="w-5 h-5 text-rtist-green mx-auto mb-1.5" />
              <div className="text-xl sm:text-2xl font-bold font-mono text-rtist-green">100%</div>
              <div className="text-[10px] font-mono text-rtist-textMuted uppercase">Student Built</div>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-8 pt-6 border-t border-rtist-border/60 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <span className="text-rtist-textMuted">
            Review full competition timeline, match videos, and tournament standings:
          </span>
          <Link
            to="/achievements"
            className="text-rtist-accent hover:text-white underline underline-offset-4 flex items-center gap-1.5 font-semibold"
          >
            VIEW ACHIEVEMENTS TIMELINE &gt;
          </Link>
        </div>
      </div>
    </section>
  );
};
