import React, { useState, useEffect, useMemo } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { TechnicalHeader } from '../components/common/TechnicalHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Search, Filter, BookOpen, Clock, ArrowRight, Code } from 'lucide-react';
import { apiService } from '../services/api';
import { DocArticle, DocCategory } from '../types';
import { documentationData } from '../data/documentation';

const CATEGORIES: ('All' | DocCategory)[] = [
  'All',
  'Microcontrollers',
  'Robotics',
  'Motor Drivers',
  'Electronics',
  'Advanced'
];

export const Lab: React.FC = () => {
  const [docs, setDocs] = useState<DocArticle[]>(documentationData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | DocCategory>('All');

  useEffect(() => {
    apiService.getDocumentation().then((data) => {
      if (data?.length) setDocs(data);
    });
  }, []);

  const filteredDocs = useMemo(() => {
    return docs.filter((doc) => {
      const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
      const matchesSearch =
        searchTerm === '' ||
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCat && matchesSearch;
    });
  }, [docs, selectedCategory, searchTerm]);

  return (
    <PageWrapper
      title="Documentation Hub"
      description="The open engineering documentation hub of RTIST: low-level C firmware, FreeRTOS multi-core concurrency, PID velocity tuning, H-Bridge drivers, and ROS 2 navigation."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalHeader
          label="Our Documentation "
          title="TECHNICAL DOCUMENTATION &amp; SCHEMATICS"
          subtitle="Real, tested engineering references for student roboticists: circuit schematics, hardware pinouts, mathematical formulations, and copyable C/C++ firmware."
        />

        {/* Search & Filter Matrix */}
        <div className="bg-rtist-card border border-rtist-border p-4 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-rtist-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by topic, e.g. FreeRTOS, PID, MOSFET, ROS2..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-rtist-surface border border-rtist-border pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent transition-colors"
              />
            </div>

            <div className="text-xs font-mono text-rtist-textMuted self-end md:self-auto">
              INDEX: <span className="text-rtist-accent font-semibold">{filteredDocs.length}</span> ARTICLES LOADED
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-rtist-border">
            <div className="flex items-center gap-1.5 text-xs font-mono text-rtist-textMuted mr-2 py-1">
              <Filter className="w-3.5 h-3.5 text-rtist-accent" />
              <span>DOMAIN:</span>
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-mono border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-rtist-accent text-white border-rtist-accent shadow-[0_0_10px_rgba(255,85,0,0.3)]'
                    : 'bg-rtist-surface text-rtist-textMuted border-rtist-border hover:border-rtist-accent/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Documentation Cards Grid */}
        {filteredDocs.length === 0 ? (
          <div className="bg-rtist-card border border-rtist-border p-12 text-center space-y-3">
            <div className="font-mono text-sm text-rtist-accent uppercase">
              NO DOCUMENTATION FOUND
            </div>
            <p className="text-xs text-rtist-textMuted">
              Try adjusting your search terms or browse all categories.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              variant="outline"
              size="sm"
            >
              CLEAR SEARCH
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <Card
                key={doc.id}
                tag={`DIFF // ${doc.difficulty.toUpperCase()}`}
                className="p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="accent">{doc.category}</Badge>
                    <span className="text-xs font-mono text-rtist-textMuted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {doc.readTime}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-rtist-accent transition-colors font-sans line-clamp-2">
                      {doc.title}
                    </h3>

                    <p className="text-xs text-rtist-textMuted mt-2 line-clamp-3 leading-relaxed">
                      {doc.summary}
                    </p>
                  </div>

                  {/* Code presence indicator */}
                  {doc.codeSnippet && (
                    <div className="bg-rtist-surface px-3 py-2 border border-rtist-border flex items-center justify-between text-[11px] font-mono text-rtist-textMuted">
                      <span className="flex items-center gap-1 text-rtist-cyan">
                        <Code className="w-3.5 h-3.5" />
                        {doc.codeSnippet.language.toUpperCase()} Code Included
                      </span>
                      <span>Verified</span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono bg-rtist-surface text-rtist-textMuted px-1.5 py-0.5 border border-rtist-border"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-4 border-t border-rtist-border flex items-center justify-between font-mono text-xs">
                  <span className="text-rtist-textMuted text-[11px] flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-rtist-accent" />
                    {doc.specifications.length} Specs
                  </span>
                  <Button
                    to={`/lab/${doc.categorySlug}/${doc.slug}`}
                    variant="ghost"
                    size="sm"
                    className="p-0 text-rtist-accent hover:text-white"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    READ ARTICLE
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
