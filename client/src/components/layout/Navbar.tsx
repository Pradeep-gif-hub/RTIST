import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';

const whatsappGroupUrl = 'https://chat.whatsapp.com/BqxuUKu2RPXJMMZEBIV7ot?s=cl&p=i&ilr=0';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Builds', path: '/builds' },
    { name: 'Team', path: '/team' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Documentation Hub', path: '/lab' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-rtist-bg/90 backdrop-blur-md border-b border-rtist-border py-3 shadow-lg'
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex min-h-14 items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
          <img
            src="/logo.png"
            alt="R-Tist NITJ Robotics Club"
            className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
          />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2 font-sans text-base font-bold tracking-wider text-white">
              <span>R-TIST</span>
              <span className="border border-rtist-accent/40 bg-rtist-accent/20 px-1.5 py-0.5 font-mono text-[10px] text-rtist-accent">
                NITJ
              </span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-rtist-textMuted">
              ROBOTICS &amp; TECH CLUB
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden min-w-0 flex-1 items-center justify-end gap-0 overflow-x-auto lg:flex xl:gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative shrink-0 whitespace-nowrap px-2 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors xl:px-2.5 ${
                  active
                    ? 'text-rtist-accent font-semibold'
                    : 'text-rtist-textMuted hover:text-white hover:bg-rtist-surface/60'
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-rtist-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Status */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-1.5 font-mono text-[11px] text-rtist-green">
    
          </div>

          <Button
            href={whatsappGroupUrl}
            variant="primary"
            size="sm"
            className="shrink-0"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            JOIN RTIST
          </Button>
        </div>

        {/* Mobile menu hamburger button */}
        <div className="flex lg:hidden items-center gap-2">
          <Button
            href={whatsappGroupUrl}
            variant="primary"
            size="sm"
            className="text-[11px] px-2.5 py-1 sm:hidden"
          >
            JOIN
          </Button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-rtist-text hover:text-white bg-rtist-surface border border-rtist-border hover:border-rtist-accent transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5 text-rtist-accent" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-rtist-bg/95 backdrop-blur-xl border-b border-rtist-border p-5 shadow-2xl transition-all">
          <div className="flex flex-col space-y-2">
            <div className="text-[10px] font-mono text-rtist-textMuted uppercase tracking-widest pb-2 border-b border-rtist-border flex items-center justify-between">
              <span>SYSTEM NAVIGATION</span>
              <span className="text-rtist-accent">NIT JALANDHAR</span>
            </div>

            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-mono uppercase tracking-wider flex items-center justify-between border ${
                    active
                      ? 'bg-rtist-accent/10 border-rtist-accent text-rtist-accent'
                      : 'border-transparent text-rtist-textMuted hover:text-white hover:bg-rtist-surface'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="text-xs text-rtist-accent">●</span>}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-rtist-border flex flex-col gap-3">
              <Button
                to="/join"
                variant="primary"
                size="md"
                className="w-full"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                APPLY FOR RECRUITMENT
              </Button>
              <div className="text-[11px] font-mono text-center text-rtist-textMuted flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-rtist-cyan" />
                <span>OFFICIAL CLUB PORTAL</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
