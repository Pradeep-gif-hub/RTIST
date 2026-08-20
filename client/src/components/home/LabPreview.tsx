import React from 'react';
import { TechnicalHeader } from '../common/TechnicalHeader';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { BookOpen, ArrowRight, Code, Clock, Tag } from 'lucide-react';
import { DocArticle } from '../../types';

interface LabPreviewProps {
  docs: DocArticle[];
}

export const LabPreview: React.FC<LabPreviewProps> = ({ docs }) => {
  const featuredDoc = docs[0];

  const categories = [
    { name: 'Microcontrollers', count: 'ESP32 / STM32' },
    { name: 'Robotics', count: 'PID & Kinematics' },
    { name: 'Motor Drivers', count: 'H-Bridges & ESCs' },
    { name: 'Electronics', count: 'Power & LiPo' },
    { name: 'Advanced', count: 'ROS 2 & SLAM' }
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-rtist-border relative bg-rtist-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left info & categories */}
          <div className="lg:col-span-6 space-y-6">
            <TechnicalHeader
              label="SECTION // 03: OPEN DOCUMENTATION"
              title="RTIST LAB: ENGINEERING KNOWLEDGE BASE"
              subtitle="We believe in sharing raw engineering knowledge. Tested schematics, low-level C firmware, PID tuning guides, and ROS 2 tutorials written by students for students."
              className="mb-0"
            />

            <div className="space-y-2">
              <div className="text-xs font-mono text-rtist-textMuted uppercase tracking-wider">
                CORE TECHNICAL DOMAINS COVERED:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-rtist-surface border border-rtist-border flex items-center justify-between text-xs font-mono"
                  >
                    <span className="text-white font-medium">{cat.name}</span>
                    <span className="text-rtist-accent text-[11px]">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                to="/lab"
                variant="primary"
                size="md"
                icon={<BookOpen className="w-4 h-4" />}
              >
                Open R-Tist RobuHub
              </Button>
              <span className="text-xs font-mono text-rtist-textMuted">
                {docs.length} articles available with full code
              </span>
            </div>
          </div>

          {/* Right Featured Article Box */}
          {featuredDoc && (
            <div className="lg:col-span-6">
              <Card tag="FEATURED GUIDE // LAB" className="p-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="accent">{featuredDoc.category}</Badge>
                  <span className="text-xs font-mono text-rtist-textMuted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featuredDoc.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-sans">
                  {featuredDoc.title}
                </h3>

                <p className="text-xs sm:text-sm text-rtist-textMuted mb-4 leading-relaxed line-clamp-2">
                  {featuredDoc.summary}
                </p>

                {/* Code preview snippet */}
                {featuredDoc.codeSnippet && (
                  <div className="bg-black/90 p-3.5 border border-rtist-border mb-4 font-mono text-[11px] text-rtist-cyan overflow-hidden rounded-none relative">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-rtist-border/60 text-[10px] text-rtist-textMuted">
                      <span className="flex items-center gap-1">
                        <Code className="w-3 h-3 text-rtist-accent" />
                        {featuredDoc.codeSnippet.language.toUpperCase()} SNIPPET
                      </span>
                      <span>FREE_RTOS // TASK_PIN</span>
                    </div>
                    <pre className="overflow-x-auto text-[11px] leading-tight text-gray-300">
                      <code>{`xTaskCreatePinnedToCore(TaskMotorControl, "MotorPID", 4096, NULL, 5, NULL, 1);
xTaskCreatePinnedToCore(TaskTelemetry, "Telemetry", 4096, NULL, 1, NULL, 0);`}</code>
                    </pre>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-rtist-border font-mono text-xs">
                  <div className="flex items-center gap-1.5 text-rtist-textMuted">
                    <Tag className="w-3 h-3 text-rtist-accent" />
                    <span>{featuredDoc.tags.slice(0, 3).join(', ')}</span>
                  </div>
                  <Button
                    to={`/lab/${featuredDoc.categorySlug}/${featuredDoc.slug}`}
                    variant="ghost"
                    size="sm"
                    className="p-0 text-rtist-accent hover:text-white"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    READ ARTICLE
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
