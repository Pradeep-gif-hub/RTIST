import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  ChevronLeft,
  Clock,
  Calendar,
  User,
  Copy,
  Check,
  Cpu,
  Zap,
  HelpCircle,
  FileCode,
  ArrowRight,
  ListOrdered
} from 'lucide-react';
import { apiService } from '../services/api';
import { DocArticle } from '../types';
import { documentationData } from '../data/documentation';

export const LabArticle: React.FC = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [doc, setDoc] = useState<DocArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!category || !slug) return;
    setLoading(true);
    apiService.getDocBySlug(category, slug).then((data) => {
      if (data) {
        setDoc(data);
      } else {
        const fallback = documentationData.find(
          (d) => d.categorySlug === category && d.slug === slug
        );
        if (fallback) setDoc(fallback);
      }
      setLoading(false);
    });
  }, [category, slug]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <PageWrapper title="Loading Documentation...">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono text-xs text-rtist-accent">
          RETRIEVING SCHEMATICS &amp; FIRMWARE MODULES...
        </div>
      </PageWrapper>
    );
  }

  if (!doc) {
    return (
      <PageWrapper title="Article Not Found">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
          <div className="text-xl font-mono text-rtist-accent uppercase">
            [ ERROR 404: LAB_DOC_NOT_FOUND ]
          </div>
          <p className="text-sm text-rtist-textMuted">
            The requested RTIST Lab documentation article does not exist in the engineering repository.
          </p>
          <Button to="/lab" variant="primary" icon={<ChevronLeft className="w-4 h-4" />} iconPosition="left">
            BACK TO RTIST LAB HUB
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title={doc.title}
      description={doc.summary}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 font-mono text-xs text-rtist-textMuted">
          <Link to="/lab" className="hover:text-rtist-accent transition-colors flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            Documentation Hub
          </Link>
          <span>/</span>
          <span className="text-rtist-accent uppercase">{doc.category}</span>
          <span>/</span>
          <span className="text-white truncate max-w-xs">{doc.title}</span>
        </div>

        {/* Hero Header */}
        <div className="bg-rtist-card border border-rtist-border p-6 sm:p-8 tech-bracket mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="accent">{doc.category}</Badge>
            <Badge variant="cyan">DIFF: {doc.difficulty.toUpperCase()}</Badge>
            <Badge variant="muted">VERIFIED REFERENCE</Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white uppercase font-sans leading-tight">
            {doc.title}
          </h1>

          <p className="text-sm sm:text-base text-rtist-textMuted mt-3 max-w-3xl leading-relaxed">
            {doc.summary}
          </p>

          <div className="mt-6 pt-4 border-t border-rtist-border flex flex-wrap items-center gap-6 font-mono text-xs text-rtist-textMuted">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-rtist-accent" />
              <span>{doc.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rtist-cyan" />
              <span>Updated: {doc.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-rtist-green" />
              <span>{doc.readTime}</span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Left Column: Article Body */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Introduction */}
            <section id="introduction" className="bg-rtist-card border border-rtist-border p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-rtist-accent" />
                1. INTRODUCTION &amp; MOTIVATION
              </h2>
              <p className="text-sm text-rtist-textMuted leading-relaxed">
                {doc.introduction}
              </p>
            </section>

            {/* 2. How It Works */}
            <section id="how-it-works" className="bg-rtist-card border border-rtist-border p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-rtist-cyan" />
                2. HOW IT WORKS / THEORY
              </h2>
              <p className="text-sm text-rtist-textMuted leading-relaxed">
                {doc.howItWorks}
              </p>
            </section>

            {/* 3. Specifications */}
            <section id="specifications" className="bg-rtist-card border border-rtist-border p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                <Cpu className="w-5 h-5 text-rtist-accent" />
                3. HARDWARE SPECIFICATIONS
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {doc.specifications.map((spec, idx) => (
                  <div key={idx} className="bg-rtist-surface p-3 border border-rtist-border">
                    <span className="text-rtist-textMuted uppercase text-[10px] block mb-1">
                      {spec.label}
                    </span>
                    <span className="text-white font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Pinout & Wiring (if available) */}
            {doc.pinout && (
              <section id="pinout" className="bg-rtist-card border border-rtist-border p-6 sm:p-8 space-y-4">
                <h2 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                  <Zap className="w-5 h-5 text-rtist-amber" />
                  4. PINOUT &amp; WIRING GUIDE
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-rtist-border bg-rtist-surface text-rtist-textMuted uppercase text-[10px]">
                        <th className="p-2.5">Pin</th>
                        <th className="p-2.5">Signal</th>
                        <th className="p-2.5">Type</th>
                        <th className="p-2.5">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rtist-border">
                      {doc.pinout.map((p, idx) => (
                        <tr key={idx} className="hover:bg-rtist-surface/50">
                          <td className="p-2.5 font-bold text-rtist-accent">{p.pin}</td>
                          <td className="p-2.5 text-white">{p.name}</td>
                          <td className="p-2.5">
                            <Badge variant="cyan" size="sm">{p.type}</Badge>
                          </td>
                          <td className="p-2.5 text-rtist-textMuted">{p.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-rtist-surface p-4 border border-rtist-border text-xs text-rtist-textMuted leading-relaxed">
                  <span className="font-mono text-rtist-accent font-bold uppercase block mb-1">
                    CRITICAL WIRING NOTES:
                  </span>
                  {doc.wiringNotes}
                </div>
              </section>
            )}

            {/* 5. Production Code Implementation */}
            {doc.codeSnippet && (
              <section id="code" className="bg-rtist-card border border-rtist-border p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-rtist-green" />
                    5. CODE IMPLEMENTATION
                  </h2>

                  <button
                    onClick={() => handleCopyCode(doc.codeSnippet!.code)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rtist-surface border border-rtist-border hover:border-rtist-accent text-xs font-mono text-white transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-rtist-green" />
                        <span className="text-rtist-green">COPIED TO CLIPBOARD!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-rtist-accent" />
                        <span>COPY CODE</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-rtist-textMuted font-mono">
                  {doc.codeSnippet.description}
                </p>

                <div className="bg-black/95 p-4 border border-rtist-border font-mono text-xs text-gray-200 overflow-x-auto">
                  <pre className="leading-relaxed font-mono">
                    <code>{doc.codeSnippet.code}</code>
                  </pre>
                </div>
              </section>
            )}

            {/* 6. Applications */}
            <section id="applications" className="bg-rtist-card border border-rtist-border p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-rtist-cyan" />
                6. REAL-WORLD APPLICATIONS
              </h2>

              <ul className="space-y-2">
                {doc.applications.map((app, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-rtist-textMuted flex items-start gap-2">
                    <span className="text-rtist-cyan font-mono font-bold">&gt;</span>
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 7. Troubleshooting */}
            <section id="troubleshooting" className="bg-rtist-card border border-rtist-border p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-rtist-accent" />
                7. PIT TROUBLESHOOTING &amp; COMMON GOTCHAS
              </h2>

              <div className="space-y-3">
                {doc.troubleshooting.map((item, idx) => (
                  <div key={idx} className="bg-rtist-surface p-4 border border-rtist-border space-y-2">
                    <div className="text-xs font-bold text-rtist-amber font-mono flex items-start gap-2">
                      <span>[ISSUE]:</span>
                      <span>{item.issue}</span>
                    </div>
                    <div className="text-xs text-rtist-text leading-relaxed font-mono pl-6 border-l-2 border-rtist-green">
                      <span className="text-rtist-green font-bold">[FIX]: </span>
                      {item.solution}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar: Table of Contents & Related Articles */}
          <div className="lg:col-span-4 space-y-6">
            {/* Table of Contents */}
            <Card tag="TABLE OF CONTENTS" className="p-5 space-y-3 sticky top-24">
              <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                ARTICLE SECTIONS
              </h4>

              <nav className="space-y-1.5 text-xs font-mono">
                <a href="#introduction" className="block text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  1. Introduction &amp; Motivation
                </a>
                <a href="#how-it-works" className="block text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  2. How It Works / Theory
                </a>
                <a href="#specifications" className="block text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  3. Hardware Specifications
                </a>
                {doc.pinout && (
                  <a href="#pinout" className="block text-rtist-textMuted hover:text-rtist-accent transition-colors">
                    4. Pinout &amp; Wiring Guide
                  </a>
                )}
                {doc.codeSnippet && (
                  <a href="#code" className="block text-rtist-textMuted hover:text-rtist-accent transition-colors">
                    5. Code Implementation
                  </a>
                )}
                <a href="#applications" className="block text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  6. Real-World Applications
                </a>
                <a href="#troubleshooting" className="block text-rtist-textMuted hover:text-rtist-accent transition-colors">
                  7. Pit Troubleshooting
                </a>
              </nav>

              {/* Related Articles */}
              {doc.relatedArticles && doc.relatedArticles.length > 0 && (
                <div className="pt-4 mt-4 border-t border-rtist-border space-y-2">
                  <div className="text-[10px] font-mono text-rtist-textMuted uppercase">
                    RELATED ARTICLES:
                  </div>
                  {doc.relatedArticles.map((rel, idx) => (
                    <Link
                      key={idx}
                      to={`/lab/${rel.category.toLowerCase().replace(/\s+/g, '-')}/${rel.slug}`}
                      className="block p-2 bg-rtist-surface border border-rtist-border hover:border-rtist-accent text-xs font-mono text-white transition-colors"
                    >
                      <div className="text-rtist-accent text-[10px]">{rel.category}</div>
                      <div className="line-clamp-1">{rel.title}</div>
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-12 pt-8 border-t border-rtist-border flex items-center justify-between">
          <Button
            to="/lab"
            variant="outline"
            size="md"
            icon={<ChevronLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            BACK TO RTIST LAB
          </Button>

          <Button
            to="/builds"
            variant="secondary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            SEE BUILDS USING THIS TECH
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};
