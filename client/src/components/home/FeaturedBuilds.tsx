import React from 'react';
import { TechnicalHeader } from '../common/TechnicalHeader';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ArrowRight, Wrench, Cpu, Gauge, Weight } from 'lucide-react';
import { Project } from '../../types';

interface FeaturedBuildsProps {
  projects: Project[];
}

export const FeaturedBuilds: React.FC<FeaturedBuildsProps> = ({ projects }) => {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-16 sm:py-24 border-b border-rtist-border relative bg-rtist-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <TechnicalHeader
            label="SECTION // 02: HARDWARE LAB"
            title="FEATURED ROBOTS &amp; BUILDS"
            subtitle="Explore our battle-tested competition platforms, telemetry modules, and custom chassis assemblies."
            className="mb-0"
          />

          <Button
            to="/builds"
            variant="outline"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            className="mt-4 md:mt-0 self-start md:self-auto shrink-0"
          >
            ALL BUILDS ({projects.length})
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((build) => (
            <Card
              key={build.id}
              tag={`YEAR // ${build.year}`}
              className="flex flex-col overflow-hidden"
            >
              {/* Image thumbnail with hardware overlay */}
              <div className="relative h-48 sm:h-52 bg-black/40 overflow-hidden">
                <img
                  src={build.thumbnailUrl}
                  alt={build.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rtist-card via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge variant="accent">{build.category}</Badge>
                </div>
                <div className="absolute bottom-2 right-3">
                  <Badge
                    variant={build.status === 'Operational' ? 'green' : 'amber'}
                    dot={true}
                  >
                    {build.status}
                  </Badge>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-rtist-accent transition-colors line-clamp-1 font-sans">
                    {build.title}
                  </h3>

                  <p className="text-xs text-rtist-textMuted mt-2 line-clamp-2 leading-relaxed">
                    {build.tagline}
                  </p>
                </div>

                {/* Specs Pill Matrix */}
                <div className="bg-rtist-surface p-3 border border-rtist-border space-y-1.5 font-mono text-[11px]">
                  {build.specsSummary.topSpeed && (
                    <div className="flex items-center justify-between text-rtist-text">
                      <span className="text-rtist-textMuted flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-rtist-accent" /> Speed:
                      </span>
                      <span className="font-semibold text-white">{build.specsSummary.topSpeed}</span>
                    </div>
                  )}

                  {build.specsSummary.microcontroller && (
                    <div className="flex items-center justify-between text-rtist-text">
                      <span className="text-rtist-textMuted flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-rtist-cyan" /> Brain:
                      </span>
                      <span className="font-semibold text-white truncate max-w-[140px] text-right">
                        {build.specsSummary.microcontroller}
                      </span>
                    </div>
                  )}

                  {build.specsSummary.weight && (
                    <div className="flex items-center justify-between text-rtist-text">
                      <span className="text-rtist-textMuted flex items-center gap-1.5">
                        <Weight className="w-3.5 h-3.5 text-rtist-amber" /> Mass:
                      </span>
                      <span className="font-semibold text-white">{build.specsSummary.weight}</span>
                    </div>
                  )}
                </div>

                {/* Card CTA */}
                <div className="pt-2 flex items-center justify-between font-mono text-xs border-t border-rtist-border">
                  <span className="text-rtist-textMuted flex items-center gap-1">
                    <Wrench className="w-3 h-3 text-rtist-accent" />
                    {build.hardware.length} HW Components
                  </span>
                  <Button
                    to={`/builds/${build.slug}`}
                    variant="ghost"
                    size="sm"
                    className="p-0 text-rtist-accent hover:text-white"
                  >
                    SPECS &amp; CAD &gt;
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
