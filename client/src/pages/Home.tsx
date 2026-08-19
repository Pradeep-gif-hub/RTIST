import React, { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { HeroSection } from '../components/home/HeroSection';
import { WhatWeDo } from '../components/home/WhatWeDo';
import { FeaturedBuilds } from '../components/home/FeaturedBuilds';
import { CompetitionsBanner } from '../components/home/CompetitionsBanner';
import { LabPreview } from '../components/home/LabPreview';
import { LatestEvents } from '../components/home/LatestEvents';
import { AchievementsPreview } from '../components/home/AchievementsPreview';
import { TeamPreview } from '../components/home/TeamPreview';
import { FacultyPreview } from '../components/home/FacultyPreview';
import { GalleryPreview } from '../components/home/GalleryPreview';
import { JoinCTA } from '../components/home/JoinCTA';

import { apiService } from '../services/api';
import { Project, Event, TeamMember, FacultyCoordinator, GalleryItem, Achievement, DocArticle } from '../types';
import { projectsData } from '../data/projects';
import { eventsData } from '../data/events';
import { teamData } from '../data/team';
import { facultyData } from '../data/faculty';
import { galleryData } from '../data/gallery';
import { achievementsData } from '../data/achievements';
import { documentationData } from '../data/documentation';

export const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [events, setEvents] = useState<Event[]>(eventsData);
  const [team, setTeam] = useState<TeamMember[]>(teamData);
  const [faculty, setFaculty] = useState<FacultyCoordinator[]>(facultyData);
  const [gallery, setGallery] = useState<GalleryItem[]>(galleryData);
  const [achievements, setAchievements] = useState<Achievement[]>(achievementsData);
  const [docs, setDocs] = useState<DocArticle[]>(documentationData);

  useEffect(() => {
    // Single consolidated data load for home page
    const loadHomeData = async () => {
      try {
        const [
          projectsRes,
          eventsRes,
          teamRes,
          facultyRes,
          galleryRes,
          achievementsRes,
          docsRes
        ] = await Promise.all([
          apiService.getProjects(),
          apiService.getEvents(),
          apiService.getTeam(),
          apiService.getFaculty(),
          apiService.getGallery(),
          apiService.getAchievements(),
          apiService.getDocumentation(),
        ]);

        if (projectsRes?.length) setProjects(projectsRes);
        if (eventsRes?.length) setEvents(eventsRes);
        if (teamRes?.length) setTeam(teamRes);
        if (facultyRes?.length) setFaculty(facultyRes);
        if (galleryRes?.length) setGallery(galleryRes);
        if (achievementsRes?.length) setAchievements(achievementsRes);
        if (docsRes?.length) setDocs(docsRes);
      } catch {
        // Already initialized with resilient fallback datasets
      }
    };

    loadHomeData();
  }, []);

  return (
    <PageWrapper
      title="Home"
      description="RTIST is the robotics and technology club of NIT Jalandhar. We build RC cars, combat sumobots, autonomous rovers, and embedded systems. BUILD. TEST. RACE. REPEAT."
      className="pt-16 pb-0"
    >
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. What We Do */}
      <WhatWeDo />

      {/* 3. Featured Builds */}
      <FeaturedBuilds projects={projects} />

      {/* 4. RTIST in Competitions */}
      <CompetitionsBanner />

      {/* 5. RTIST Lab Preview */}
      <LabPreview docs={docs} />

      {/* 6. Latest Events */}
      <LatestEvents events={events} />

      {/* 7. Achievements */}
      <AchievementsPreview achievements={achievements} />

      {/* 8. Team Preview */}
      <TeamPreview team={team} />

      {/* 9. Faculty Coordinators */}
      <FacultyPreview faculty={faculty} />

      {/* 10. Gallery Preview */}
      <GalleryPreview gallery={gallery} />

      {/* 11. Join RTIST CTA */}
      <JoinCTA />
    </PageWrapper>
  );
};
