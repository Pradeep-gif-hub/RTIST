import React from 'react';
import { ArrowRight, BookOpen, Terminal, Activity, Instagram, Linkedin, Facebook, Github, MessageCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { RobotViewer } from '../3d/RobotViewer';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-6 sm:pt-10 pb-16 sm:pb-24 overflow-hidden border-b border-rtist-border">
      {/* Background blueprint grid overlay */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Technical Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 sm:mb-10 border-b border-rtist-border/60 text-[11px] font-mono text-rtist-textMuted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-rtist-accent">
              <Terminal className="w-3.5 h-3.5" />
              <span>RTIST THE ROBOTICS &amp; TECH</span>
            </span>
            <span className="text-rtist-border">|</span>
            <span>NIT JALANDHAR</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-rtist-green">
              <Activity className="w-3.5 h-3.5" />
              <span>Lets Get Connected </span>
            </span>
            <span className="text-rtist-border hidden sm:inline">|</span>
          </div>
        </div>

        {/* Hero Grid: Left Content, Right 3D Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle & Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="accent" dot={true}>
                NIT JALANDHAR OFFICIAL ROBOTICS CLUB
              </Badge>
              <Badge variant="muted">Think Build Conquer </Badge>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase font-sans leading-[1.05]">
                BUILD.. TEST..<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rtist-accent via-orange-400 to-amber-500 glow-accent">
                  RACE... REPEAT...
                </span>
              </h1>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-rtist-textMuted max-w-2xl leading-relaxed font-sans">
             RTIST is a student-led robotics and innovation club at NIT Jalandhar.
We design, build, and compete with RC cars, sumo bots, robo-soccer systems, and autonomous machines.
From electronics and embedded systems to mechanics and software, we learn by building, testing, and competing.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                to="/builds"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                EXPLORE BUILDS
              </Button>
              <Button
                to="/lab"
                variant="secondary"
                size="md"
                icon={<BookOpen className="w-4 h-4" />}
              >
                RTIST LAB DOCS
              </Button>
              <Button
                to="/join"
                variant="outline"
                size="md"
              >
                JOIN CLUB
              </Button>
            </div>

            <div className="flex items-center gap-3 pt-2" aria-label="RTIST social links">
              <a
                href="https://instagram.com/rtist_nitj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RTIST on Instagram"
                title="Instagram"
                className="flex h-11 w-11 items-center justify-center border border-rtist-border bg-rtist-card text-rtist-textMuted transition-colors hover:border-rtist-accent hover:text-rtist-accent"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/rtist-society-nitj/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RTIST on LinkedIn"
                title="LinkedIn"
                className="flex h-11 w-11 items-center justify-center border border-rtist-border bg-rtist-card text-rtist-textMuted transition-colors hover:border-rtist-accent hover:text-rtist-accent"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/rtistnitj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RTIST on Facebook"
                title="Facebook"
                className="flex h-11 w-11 items-center justify-center border border-rtist-border bg-rtist-card text-rtist-textMuted transition-colors hover:border-rtist-accent hover:text-rtist-accent"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://chat.whatsapp.com/BqxuUKu2RPXJMMZEBIV7ot?s=cl&p=i&ilr=0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join the RTIST WhatsApp group"
                title="WhatsApp Group"
                className="flex h-11 w-11 items-center justify-center border border-rtist-border bg-rtist-card text-rtist-textMuted transition-colors hover:border-rtist-accent hover:text-rtist-accent"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/pradeep-gif-hub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RTIST on GitHub"
                title="GitHub"
                className="flex h-11 w-11 items-center justify-center border border-rtist-border bg-rtist-card text-rtist-textMuted transition-colors hover:border-rtist-accent hover:text-rtist-accent"
              >
                <Github className="h-6 w-6" />
              </a>
            
            </div>
          </div>

          {/* Right Column: Interactive 3D Chassis Visualizer */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -top-3 left-4 bg-rtist-surface px-2 py-0.5 text-[10px] font-mono text-rtist-accent border border-rtist-accent/40 z-20">
                HARDWARE_VIEWPORT // 3D ASSET
              </div>
              <RobotViewer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
