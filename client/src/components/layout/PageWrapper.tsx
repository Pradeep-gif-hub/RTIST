import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  description,
  children,
  className = ''
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (title) {
      document.title = `${title} | RTIST — NIT Jalandhar`;
    } else {
      document.title = 'RTIST — Robotics & Technology Club | NIT Jalandhar';
    }

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  }, [title, description]);

  return (
    <main className={`min-h-screen pt-20 pb-16 relative ${className}`}>
      {/* Background Subtle Technical Grid */}
      <div className="fixed inset-0 tech-grid-bg pointer-events-none opacity-40 -z-10" />
      {children}
    </main>
  );
};
