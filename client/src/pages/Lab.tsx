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
  'Getting Started',
  'Microcontrollers',
  'Sensors',
  'Motors & Actuators',
  'Motor Drivers',
  'Communication & Wireless',
  'Power Systems',
  'Protocols',
  'Control Systems',
  'Robotics',
  'ROS 2 & Advanced',
  'Computer Vision',
  'Mechanical Design'
];

export const Lab: React.FC = () => {
  const [docs, setDocs] = useState<DocArticle[]>(documentationData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | DocCategory>('All');

  const handlePathSelection = (category: 'All' | DocCategory) => {
    setSearchTerm('');
    setSelectedCategory(category);
    window.scrollTo({ top: 420, behavior: 'smooth' });
  };

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
                {/* Learning Paths Hero Section */}
                <div className="mb-12 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Beginner Path */}
                    <div className="bg-gradient-to-br from-rtist-accent/10 to-transparent border border-rtist-accent/30 p-8 rounded-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-rtist-accent flex items-center justify-center text-white font-mono text-sm font-bold">🌱</div>
                        <h2 className="text-xl font-bold text-white font-sans">NEW TO ROBOTICS? START HERE</h2>
                      </div>
                      <p className="text-sm text-rtist-textMuted mb-6 font-mono">
                        From your first GPIO connection to autonomous navigation — practical robotics documentation, code examples, and engineering guides.
                      </p>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex items-center gap-2 text-rtist-text">
                          <span className="text-rtist-accent">→</span>
                          <span>1. Electronics Basics: Your First Circuit</span>
                        </div>
                        <div className="flex items-center gap-2 text-rtist-text">
                          <span className="text-rtist-accent">→</span>
                          <span>2. Arduino UNO: Getting Started with Microcontrollers</span>
                        </div>
                        <div className="flex items-center gap-2 text-rtist-text">
                          <span className="text-rtist-accent">→</span>
                          <span>3-5. GPIO, PWM, and Analog Input Fundamentals</span>
                        </div>
                        <div className="flex items-center gap-2 text-rtist-text">
                          <span className="text-rtist-accent">→</span>
                          <span>6-8. Sensors: HC-SR04, IR, Encoders</span>
                        </div>
                        <div className="flex items-center gap-2 text-rtist-text">
                          <span className="text-rtist-accent">→</span>
                          <span>9-11. Motors & Motor Drivers: Practical Control</span>
                        </div>
                        <div className="flex items-center gap-2 text-rtist-text">
                          <span className="text-rtist-accent">→</span>
                          <span>12-15. Build Your First Robot: Line Follower to Navigation</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handlePathSelection('Getting Started')}
                        variant="outline"
                        size="sm"
                        className="mt-6 text-rtist-accent border-rtist-accent hover:bg-rtist-accent/10"
                      >
                        VIEW LEARNING PATH →
                      </Button>
                    </div>

                    {/* Advanced Path */}
                    <div className="bg-gradient-to-br from-rtist-cyan/10 to-transparent border border-rtist-cyan/30 p-8 rounded-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-rtist-cyan flex items-center justify-center text-white font-mono text-sm font-bold">🚀</div>
                        <h2 className="text-xl font-bold text-white font-sans">ADVANCED ROBOTICS TRACK</h2>
                      </div>
                      <p className="text-sm text-rtist-textMuted mb-6 font-mono">
                        ROS 2, SLAM, computer vision, sensor fusion, and real-time embedded control for serious builders.
                      </p>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex items-center gap-2 text-rtist-text">
                          <span className="text-rtist-cyan">→</span>
                          <span>PID Control & Motor Velocity Regulation</span>
                        </div>
                        <div className="flex items-center gap-2 text-rtist-text">
                          <span className="text-rtist-cyan">→</span>
                          <span>ESP32 FreeRTOS Multi-Core Programming</span>
                        </div>
                        <div className="flex items-center gap-2 text-rtist-text">
                          <span className="text-rtist-cyan">→</span>
                          <span>MOSFET H-Bridges & Custom ESC Design</span>
                        </div>
                        <div className="flex items-center gap-2 text-rtist-text">
                          <span className="text-rtist-cyan">→</span>
                          <span>IMU Sensor Fusion & Kalman Filtering</span>
                        </div>
                        <div className="flex items-center gap-2 text-rtist-text">
                          <span className="text-rtist-cyan">→</span>
                          <span>ROS 2 Humble: Nav2, SLAM, Autonomous Navigation</span>
                        </div>
                        <div className="flex items-center gap-2 text-rtist-text">
                          <span className="text-rtist-cyan">→</span>
                          <span>Computer Vision & Object Detection</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handlePathSelection('ROS 2 & Advanced')}
                        variant="outline"
                        size="sm"
                        className="mt-6 text-rtist-cyan border-rtist-cyan hover:bg-rtist-cyan/10"
                      >
                        EXPLORE ADVANCED →
                      </Button>
                    </div>
                  </div>
                </div>
        <TechnicalHeader
          label="RTIST Robotics Engineering Knowledge Base"
          title="DOCUMENTATION HUB"
          subtitle="From your first GPIO connection to autonomous navigation — practical robotics documentation, component references, schematics, code examples, and engineering guides."
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
