import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/common/Button';
import { Terminal, Home, Wrench } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <PageWrapper
      title="404 — Module Disconnected"
      description="The requested RTIST webpage module or hardware spec path could not be located in the robotics system."
    >
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-rtist-card border-2 border-rtist-accent flex items-center justify-center text-rtist-accent mx-auto shadow-[0_0_25px_rgba(255,85,0,0.4)]">
          <Terminal className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="font-mono text-xs text-rtist-accent tracking-widest uppercase">
            [ ERROR CODE: 0x404 // MODULE_NOT_FOUND ]
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-sans">
            TRANSMISSION TERMINATED
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-rtist-textMuted max-w-md mx-auto leading-relaxed font-mono">
          The requested system node or route does not exist in the RTIST firmware matrix. Check URL coordinates or re-route via the navigation station.
        </p>

        <div className="pt-6 flex flex-wrap justify-center gap-4">
          <Button
            to="/"
            variant="primary"
            size="md"
            icon={<Home className="w-4 h-4" />}
            iconPosition="left"
          >
            RETURN TO BASE (HOME)
          </Button>

          <Button
            to="/builds"
            variant="secondary"
            size="md"
            icon={<Wrench className="w-4 h-4" />}
          >
            EXPLORE BUILDS
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};
