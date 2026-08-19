import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { TechnicalHeader } from '../components/common/TechnicalHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Search, Filter, Wrench, Cpu, Gauge, Weight, ArrowRight } from 'lucide-react';
import { apiService } from '../services/api';
import { Project, ProjectCategory } from '../types';
import { projectsData } from '../data/projects';

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'RC Cars',
  'Robo Sumo',
  'Robo Soccer',
  'Line Followers',
  'Autonomous Robots',
  'Embedded Systems',
];

export const Builds: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [searchTerm, setSearchTerm] = useState('');
  
  const categoryParam = searchParams.get('category') as ProjectCategory | null;
  const selectedCategory = categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : 'All';

  useEffect(() => {
    apiService.getProjects().then((data) => {
      if (data?.length) setProjects(data);
    });
  }, []);

  const handleCategorySelect = (cat: string) => {
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        searchTerm === '' ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.hardware.some((h) => h.name.toLowerCase().includes(searchTerm.toLowerCase()) || h.spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.software.some((s) => s.tech.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchTerm]);

  return (
    <PageWrapper
      title="Builds &amp; Robots"
      description="Explore RTIST's complete engineering repository: high-speed RC cars, combat sumobots, autonomous ROS 2 rovers, line followers, and embedded electronics."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalHeader
          label="BUILDS // REPOSITORY"
          title="ROBOTS, RC CARS &amp; EMBEDDED SYSTEMS"
          subtitle="All machines designed, machined, soldered, and tuned in our NIT Jalandhar. Explore full CAD specs, schematics, BOM lists, and test telemetry."
        />

        {/* Filter & Search Bar */}
        <div className="bg-rtist-card border border-rtist-border p-4 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-rtist-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by bot name, microcontroller, motor, sensor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-rtist-surface border border-rtist-border pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent transition-colors"
              />
            </div>

            <div className="text-xs font-mono text-rtist-textMuted self-end md:self-auto">
              MATCHES: <span className="text-rtist-accent font-semibold">{filteredProjects.length}</span> BUILDS
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-rtist-border">
            <div className="flex items-center gap-1.5 text-xs font-mono text-rtist-textMuted mr-2 py-1">
              <Filter className="w-3.5 h-3.5 text-rtist-accent" />
              <span>CATEGORY:</span>
            </div>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3 py-1 text-xs font-mono transition-colors border ${
                    active
                      ? 'bg-rtist-accent text-white border-rtist-accent shadow-[0_0_10px_rgba(255,85,0,0.3)]'
                      : 'bg-rtist-surface text-rtist-textMuted border-rtist-border hover:border-rtist-accent/50 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-rtist-card border border-rtist-border p-12 text-center space-y-3">
            <div className="font-mono text-sm text-rtist-accent uppercase">
              NO MATCHING BUILDS FOUND
            </div>
            <p className="text-xs text-rtist-textMuted">
              Try adjusting your search query or selecting "All" categories.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                handleCategorySelect('All');
              }}
              variant="outline"
              size="sm"
            >
              RESET FILTERS
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((build) => (
              <Card
                key={build.id}
                tag={`REV // ${build.year}`}
                className="flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-48 bg-black/40 overflow-hidden">
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
                        size="sm"
                      >
                        {build.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-rtist-accent transition-colors font-sans line-clamp-1">
                      {build.title}
                    </h3>

                    <p className="text-xs text-rtist-textMuted line-clamp-2 leading-relaxed">
                      {build.tagline}
                    </p>

                    {/* Hardware specs summary */}
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
                          <span className="font-semibold text-white truncate max-w-[130px] text-right">
                            {build.specsSummary.microcontroller}
                          </span>
                        </div>
                      )}

                      {build.specsSummary.weight && (
                        <div className="flex items-center justify-between text-rtist-text">
                          <span className="text-rtist-textMuted flex items-center gap-1.5">
                            <Weight className="w-3.5 h-3.5 text-rtist-amber" /> Weight:
                          </span>
                          <span className="font-semibold text-white">{build.specsSummary.weight}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-rtist-border flex items-center justify-between font-mono text-xs">
                    <span className="text-rtist-textMuted flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-rtist-accent" />
                      {build.hardware.length} HW Modules
                    </span>
                    <Button
                      to={`/builds/${build.slug}`}
                      variant="primary"
                      size="sm"
                      className="text-xs py-1.5 px-3"
                      icon={<ArrowRight className="w-3 h-3" />}
                    >
                      SPECS &amp; CAD
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
