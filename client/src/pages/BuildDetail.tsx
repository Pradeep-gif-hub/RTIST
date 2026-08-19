import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Lightbox } from '../components/common/Lightbox';
import {
  ChevronLeft,
  Wrench,
  Cpu,
  Layers,
  Activity,
  AlertTriangle,
  Trophy,
  Github,
  Gauge,
  Weight,
  Battery,
  Zap,
  Users,
  Eye,
  FileText
} from 'lucide-react';
import { apiService } from '../services/api';
import { Project, GalleryItem } from '../types';
import { projectsData } from '../data/projects';

export const BuildDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    apiService.getProjectBySlug(slug).then((data) => {
      if (data) {
        setProject(data);
      } else {
        const fallback = projectsData.find((p) => p.slug === slug);
        if (fallback) setProject(fallback);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <PageWrapper title="Loading Build...">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono text-xs text-rtist-accent">
          INITIALIZING TELEMETRY &amp; HARDWARE SCHEMATICS...
        </div>
      </PageWrapper>
    );
  }

  if (!project) {
    return (
      <PageWrapper title="Build Not Found">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
          <div className="text-xl font-mono text-rtist-accent uppercase">
            [ ERROR 404: BUILD_SPEC_NOT_FOUND ]
          </div>
          <p className="text-sm text-rtist-textMuted">
            The requested robotics project build does not exist or has been archived.
          </p>
          <Button to="/builds" variant="primary" icon={<ChevronLeft className="w-4 h-4" />} iconPosition="left">
            BACK TO BUILDS REPOSITORY
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title={project.title}
      description={project.overview}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 font-mono text-xs text-rtist-textMuted">
          <Link to="/builds" className="hover:text-rtist-accent transition-colors flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            BUILDS REPOSITORY
          </Link>
          <span>/</span>
          <span className="text-rtist-accent uppercase">{project.category}</span>
          <span>/</span>
          <span className="text-white truncate max-w-xs">{project.title}</span>
        </div>

        {/* Hero Header */}
        <div className="bg-rtist-card border border-rtist-border p-6 sm:p-8 tech-bracket mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{project.category}</Badge>
              <Badge variant={project.status === 'Operational' ? 'green' : 'amber'} dot={true}>
                {project.status}
              </Badge>
              <Badge variant="muted">REV // {project.year}</Badge>
            </div>

            {project.githubRepo && (
              <a
                href={project.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-rtist-surface border border-rtist-border text-xs font-mono text-rtist-text hover:border-rtist-accent transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-rtist-cyan" />
                <span>GITHUB REPO</span>
              </a>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white uppercase font-sans leading-tight">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base text-rtist-textMuted mt-3 max-w-3xl leading-relaxed">
            {project.tagline}
          </p>

          {/* Quick Specs Matrix */}
          <div className="mt-6 pt-6 border-t border-rtist-border grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            {project.specsSummary.topSpeed && (
              <div className="bg-rtist-surface p-3 border border-rtist-border">
                <div className="text-[10px] text-rtist-textMuted flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-rtist-accent" /> TOP VELOCITY
                </div>
                <div className="text-base font-bold text-white mt-1">{project.specsSummary.topSpeed}</div>
              </div>
            )}

            {project.specsSummary.weight && (
              <div className="bg-rtist-surface p-3 border border-rtist-border">
                <div className="text-[10px] text-rtist-textMuted flex items-center gap-1">
                  <Weight className="w-3 h-3 text-rtist-amber" /> TOTAL MASS
                </div>
                <div className="text-base font-bold text-white mt-1">{project.specsSummary.weight}</div>
              </div>
            )}

            {project.specsSummary.batteryLife && (
              <div className="bg-rtist-surface p-3 border border-rtist-border">
                <div className="text-[10px] text-rtist-textMuted flex items-center gap-1">
                  <Battery className="w-3 h-3 text-rtist-green" /> RUNTIME / BATTERY
                </div>
                <div className="text-base font-bold text-white mt-1">{project.specsSummary.batteryLife}</div>
              </div>
            )}

            {project.specsSummary.microcontroller && (
              <div className="bg-rtist-surface p-3 border border-rtist-border">
                <div className="text-[10px] text-rtist-textMuted flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-rtist-cyan" /> MAIN MCU
                </div>
                <div className="text-base font-bold text-white mt-1 truncate">{project.specsSummary.microcontroller}</div>
              </div>
            )}
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Overview & Problem Statement */}
            <Card tag="ENGINEERING BRIEF" className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-rtist-accent" />
                  OVERVIEW &amp; OBJECTIVES
                </h3>
                <p className="text-sm text-rtist-textMuted leading-relaxed">
                  {project.overview}
                </p>
              </div>

              <div className="pt-4 border-t border-rtist-border">
                <h3 className="text-sm font-bold text-rtist-accent font-mono uppercase flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-rtist-amber" />
                  THE ENGINEERING PROBLEM
                </h3>
                <p className="text-xs sm:text-sm text-rtist-textMuted leading-relaxed bg-rtist-surface p-4 border border-rtist-border/60">
                  {project.problemStatement}
                </p>
              </div>
            </Card>

            {/* 2. Mechanical Design & CAD */}
            <Card tag="MECHANICAL SPEC // CAD" className="p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                <Wrench className="w-5 h-5 text-rtist-accent" />
                MECHANICAL ARCHITECTURE &amp; FABRICATION
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-rtist-surface p-3 border border-rtist-border space-y-1">
                  <span className="text-rtist-textMuted uppercase text-[10px]">Chassis Structure</span>
                  <div className="text-white font-medium">{project.mechanicalDesign.chassisType}</div>
                </div>

                <div className="bg-rtist-surface p-3 border border-rtist-border space-y-1">
                  <span className="text-rtist-textMuted uppercase text-[10px]">Dimensions</span>
                  <div className="text-white font-medium">{project.mechanicalDesign.dimensions}</div>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-rtist-textMuted uppercase block mb-2">
                  Primary Materials Used:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.mechanicalDesign.materials.map((mat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-rtist-surface border border-rtist-border text-xs font-mono text-rtist-text"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-rtist-surface p-4 border border-rtist-border text-xs text-rtist-textMuted leading-relaxed">
                <div className="font-mono text-rtist-cyan uppercase text-[11px] mb-1 font-semibold">
                  CAD &amp; FEA ANALYSIS NOTES:
                </div>
                {project.mechanicalDesign.cadNotes}
              </div>
            </Card>

            {/* 3. Hardware Bill of Materials (BOM) */}
            <Card tag="HARDWARE BOM" className="p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                <Cpu className="w-5 h-5 text-rtist-cyan" />
                HARDWARE COMPONENTS &amp; SENSORS
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-rtist-border bg-rtist-surface text-rtist-textMuted uppercase text-[10px]">
                      <th className="p-2.5">Component</th>
                      <th className="p-2.5">Specification</th>
                      <th className="p-2.5 text-center">Qty</th>
                      <th className="p-2.5">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rtist-border">
                    {project.hardware.map((item, idx) => (
                      <tr key={idx} className="hover:bg-rtist-surface/50">
                        <td className="p-2.5 font-medium text-white">{item.name}</td>
                        <td className="p-2.5 text-rtist-accent">{item.spec}</td>
                        <td className="p-2.5 text-center text-rtist-textMuted">{item.qty || 1}</td>
                        <td className="p-2.5 text-rtist-textMuted">{item.purpose || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* 4. Software Stack */}
            <Card tag="SOFTWARE &amp; FIRMWARE" className="p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                <Layers className="w-5 h-5 text-rtist-green" />
                SOFTWARE ARCHITECTURE &amp; CONTROL ALGORITHMS
              </h3>

              <div className="space-y-3">
                {project.software.map((sw, idx) => (
                  <div key={idx} className="bg-rtist-surface p-4 border border-rtist-border space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                      <span className="font-bold text-white uppercase">{sw.layer}</span>
                      <Badge variant="cyan" size="sm">{sw.tech}</Badge>
                    </div>
                    <p className="text-xs text-rtist-textMuted leading-relaxed pt-1">
                      {sw.details}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* 5. Build Process & Pit Logs */}
            <Card tag="WORKSHOP PROCESS" className="p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                <Zap className="w-5 h-5 text-rtist-amber" />
                FABRICATION &amp; ASSEMBLY STAGES
              </h3>

              <ol className="space-y-3">
                {project.buildProcess.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-rtist-textMuted leading-relaxed">
                    <span className="w-6 h-6 bg-rtist-surface border border-rtist-border flex items-center justify-center font-mono text-xs text-rtist-accent shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </Card>

            {/* 6. Testing & Challenges */}
            <Card tag="TEST BENCH TELEMETRY" className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-rtist-accent" />
                  TESTING NOTES &amp; BENCHMARK RESULTS
                </h3>
                <p className="text-xs sm:text-sm text-rtist-textMuted leading-relaxed bg-rtist-surface p-4 border border-rtist-border">
                  {project.testingNotes}
                </p>
              </div>

              <div className="pt-4 border-t border-rtist-border">
                <h4 className="text-xs font-mono font-bold text-white uppercase mb-3">
                  PIT CHALLENGES &amp; HARDWARE WORKAROUNDS:
                </h4>
                <ul className="space-y-2">
                  {project.challengesEncountered.map((chal, idx) => (
                    <li key={idx} className="text-xs text-rtist-textMuted flex items-start gap-2">
                      <span className="text-rtist-accent font-mono font-bold">&gt;</span>
                      <span>{chal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          {/* Right Sidebar: Team, Competition Wins & Gallery */}
          <div className="lg:col-span-4 space-y-6">
            {/* Competition Podium Banner */}
            <Card tag="COMPETITION PODIUM" className="p-5 space-y-3 border-rtist-amber/40">
              <div className="flex items-center gap-2 text-rtist-amber">
                <Trophy className="w-5 h-5 shrink-0" />
                <span className="font-mono text-xs uppercase font-bold">TOURNAMENT FINISH</span>
              </div>
              <p className="text-xs font-mono text-white leading-relaxed">
                {project.competitionResults}
              </p>
            </Card>

            {/* Build Team Contributors */}
            <Card tag="PIT CREW // CONTRIBUTORS" className="p-5 space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                <Users className="w-4 h-4 text-rtist-accent" />
                PROJECT TEAM
              </h4>

              <div className="space-y-2.5">
                {project.teamMembers.map((member, idx) => (
                  <div key={idx} className="p-2.5 bg-rtist-surface border border-rtist-border text-xs font-mono">
                    <div className="font-semibold text-white">{member.name}</div>
                    <div className="text-rtist-accent text-[11px] mt-0.5">{member.role}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Project Photo Gallery */}
            <Card tag="PROJECT PHOTOS" className="p-5 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                <Eye className="w-4 h-4 text-rtist-cyan" />
                GALLERY SHOTS ({project.galleryImages.length})
              </h4>

              <div className="space-y-3">
                {project.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      setSelectedGalleryImage({
                        id: `build-img-${idx}`,
                        title: `${project.title} - View ${idx + 1}`,
                        category: project.category === 'RC Cars' ? 'RC Cars' : 'Robots',
                        date: `${project.year}`,
                        location: 'RTIST Workshop, NIT Jalandhar',
                        thumbnailUrl: img,
                        fullImageUrl: img,
                        caption: `Hardware detail shot of ${project.title}.`,
                        tags: [project.category, 'Hardware', 'NIT Jalandhar']
                      })
                    }
                    className="relative h-36 bg-black border border-rtist-border overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={img}
                      alt={`${project.title} gallery ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-2 right-2 bg-rtist-surface/80 px-2 py-0.5 text-[10px] font-mono text-white border border-rtist-border">
                      EXPAND &gt;
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-12 pt-8 border-t border-rtist-border flex items-center justify-between">
          <Button
            to="/builds"
            variant="outline"
            size="md"
            icon={<ChevronLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            BACK TO ALL BUILDS
          </Button>

          <Button
            to="/join"
            variant="primary"
            size="md"
          >
            JOIN TO BUILD ROBOTS
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={selectedGalleryImage}
        onClose={() => setSelectedGalleryImage(null)}
      />
    </PageWrapper>
  );
};
