import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, MapPin, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rtist-surface border-t border-rtist-border relative overflow-hidden text-rtist-text">
      {/* Background blueprint grid overlay */}
      <div className="absolute inset-0 bg-tech-grid-bg opacity-20 pointer-events-none" />

      {/* Brand line banner */}
      <div className="border-b border-rtist-border/60 bg-black/40 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-3 text-rtist-accent tracking-widest font-semibold">
            <span className="w-2 h-2 bg-rtist-accent animate-pulse" />
            <span>BUILD. TEST. RACE. REPEAT.</span>
          </div>
          <div className="text-rtist-textMuted flex items-center gap-4 text-[11px]">
            <span>RoboHub</span>
            <span className="text-rtist-border">|</span>  
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {/* Col 1 & 2: About & Campus info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rtist-card border border-rtist-accent flex items-center justify-center text-rtist-accent">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-wider text-white font-sans">RTIST</h3>
                <p className="text-xs font-mono text-rtist-textMuted uppercase">
                  Robotics Club NIT
                </p>
              </div>
            </div>

            <div className="pt-2 space-y-2 text-xs font-mono text-rtist-textMuted">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rtist-accent shrink-0 mt-0.5" />
                <span>
                  National Institute of Technology<br />
                  Jalandhar, Punjab, India — 144011
                </span>

              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rtist-cyan shrink-0" />
                <span>robotics@nitj.ac.in</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Engineering Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase text-white tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rtist-accent" />
              ENGINEERING
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link to="/builds" className="text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  &gt; Builds &amp; Robots
                </Link>
              </li>
              <li>
                <Link to="/lab" className="text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  &gt; RTIST Lab (Docs)
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  &gt; Events &amp; Races
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  &gt; Achievements Timeline
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  &gt; Pit &amp; Track Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Club & Recruitment */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase text-white tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rtist-cyan" />
              ORGANIZATION
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link to="/about" className="text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  &gt; About the Workshop
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  &gt; Team &amp; Faculty
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  &gt; News &amp; Updates
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  &gt; Join RTIST (Apply)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  &gt; Contact &amp; Location
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-rtist-border flex items-center justify-center text-xs font-mono text-rtist-textMuted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-rtist-green" />
            <span>
              &copy; {currentYear} RTIST — Robotics &amp; Technology Club, NIT Jalandhar. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
