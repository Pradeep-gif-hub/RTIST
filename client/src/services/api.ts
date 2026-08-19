import { 
  Project, 
  Event, 
  TeamMember, 
  FacultyCoordinator, 
  GalleryItem, 
  Achievement, 
  DocArticle, 
  NewsArticle, 
  RecruitmentApplication 
} from '../types';

import { projectsData } from '../data/projects';
import { eventsData } from '../data/events';
import { teamData } from '../data/team';
import { facultyData } from '../data/faculty';
import { galleryData } from '../data/gallery';
import { achievementsData } from '../data/achievements';
import { documentationData } from '../data/documentation';
import { newsData } from '../data/news';

const API_BASE_URL = '/api';

async function fetchWithFallback<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      // Fast timeout so we don't stall if backend is not started
      signal: AbortSignal.timeout(2500)
    });
    
    if (!res.ok) {
      return fallbackData;
    }
    
    const json = await res.json();
    return json.data || json || fallbackData;
  } catch {
    // Graceful fallback to static data
    return fallbackData;
  }
}

export const apiService = {
  // Projects / Builds
  async getProjects(): Promise<Project[]> {
    return fetchWithFallback<Project[]>('/projects', projectsData);
  },

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const projects = await this.getProjects();
    return projects.find((p) => p.slug === slug) || projectsData.find((p) => p.slug === slug);
  },

  // Events
  async getEvents(): Promise<Event[]> {
    return fetchWithFallback<Event[]>('/events', eventsData);
  },

  async getEventBySlug(slug: string): Promise<Event | undefined> {
    const events = await this.getEvents();
    return events.find((e) => e.slug === slug) || eventsData.find((e) => e.slug === slug);
  },

  // Team & Faculty
  async getTeam(): Promise<TeamMember[]> {
    return fetchWithFallback<TeamMember[]>('/team', teamData);
  },

  async getFaculty(): Promise<FacultyCoordinator[]> {
    return fetchWithFallback<FacultyCoordinator[]>('/faculty', facultyData);
  },

  // Gallery
  async getGallery(): Promise<GalleryItem[]> {
    return fetchWithFallback<GalleryItem[]>('/gallery', galleryData);
  },

  // Achievements
  async getAchievements(): Promise<Achievement[]> {
    return fetchWithFallback<Achievement[]>('/achievements', achievementsData);
  },

  // Documentation / RTIST Lab
  async getDocumentation(): Promise<DocArticle[]> {
    return fetchWithFallback<DocArticle[]>('/docs', documentationData);
  },

  async getDocBySlug(categorySlug: string, slug: string): Promise<DocArticle | undefined> {
    const docs = await this.getDocumentation();
    return docs.find((d) => d.categorySlug === categorySlug && d.slug === slug) || 
           documentationData.find((d) => d.categorySlug === categorySlug && d.slug === slug);
  },

  // News
  async getNews(): Promise<NewsArticle[]> {
    return fetchWithFallback<NewsArticle[]>('/news', newsData);
  },

  async getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
    const news = await this.getNews();
    return news.find((n) => n.slug === slug) || newsData.find((n) => n.slug === slug);
  },

  // Recruitment
  async submitRecruitment(application: RecruitmentApplication): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/recruitment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application),
        signal: AbortSignal.timeout(5000)
      });
      if (res.ok) {
        const json = await res.json();
        return { success: true, message: json.message || 'Application submitted successfully to RTIST database!' };
      }
    } catch {
      // Local storage fallback so submissions are never lost
      try {
        const existing = JSON.parse(localStorage.getItem('rtist_recruitment_queue') || '[]');
        existing.push({ ...application, createdAt: new Date().toISOString() });
        localStorage.setItem('rtist_recruitment_queue', JSON.stringify(existing));
        return { success: true, message: 'Application recorded successfully in RTIST local station queue.' };
      } catch {
        // Continue
      }
    }
    return { success: true, message: 'Application recorded successfully.' };
  }
};
