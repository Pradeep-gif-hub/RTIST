import { ProjectModel } from '../models/Project.js';
import { EventModel } from '../models/Event.js';
import { TeamMemberModel } from '../models/TeamMember.js';
import { FacultyModel } from '../models/Faculty.js';
import { GalleryItemModel } from '../models/GalleryItem.js';
import { AchievementModel } from '../models/Achievement.js';
import { DocArticleModel } from '../models/DocArticle.js';
import { NewsModel } from '../models/News.js';

// Seed data
import { projectsData } from '../data/projects.js';
import { eventsData } from '../data/events.js';
import { teamData } from '../data/team.js';
import { facultyData } from '../data/faculty.js';
import { galleryData } from '../data/gallery.js';
import { achievementsData } from '../data/achievements.js';
import { documentationData } from '../data/documentation.js';
import { newsData } from '../data/news.js';

export async function seedInitialData() {
  try {
    const projectCount = await ProjectModel.countDocuments();
    if (projectCount === 0) {
      console.log('[RTIST Seed] Populating Projects into MongoDB...');
      await ProjectModel.insertMany(projectsData);
    }

    const eventCount = await EventModel.countDocuments();
    if (eventCount === 0) {
      console.log('[RTIST Seed] Populating Events into MongoDB...');
      await EventModel.insertMany(eventsData);
    }

    const teamCount = await TeamMemberModel.countDocuments();
    if (teamCount === 0) {
      console.log('[RTIST Seed] Populating Team Members into MongoDB...');
      await TeamMemberModel.insertMany(teamData);
    }

    const facultyCount = await FacultyModel.countDocuments();
    if (facultyCount === 0) {
      console.log('[RTIST Seed] Populating Faculty Coordinators into MongoDB...');
      await FacultyModel.insertMany(facultyData);
    }

    const galleryCount = await GalleryItemModel.countDocuments();
    if (galleryCount === 0) {
      console.log('[RTIST Seed] Populating Gallery Items into MongoDB...');
      await GalleryItemModel.insertMany(galleryData);
    }

    const achievementCount = await AchievementModel.countDocuments();
    if (achievementCount === 0) {
      console.log('[RTIST Seed] Populating Achievements into MongoDB...');
      await AchievementModel.insertMany(achievementsData);
    }

    const docCount = await DocArticleModel.countDocuments();
    if (docCount === 0) {
      console.log('[RTIST Seed] Populating RTIST Lab Documentation into MongoDB...');
      await DocArticleModel.insertMany(documentationData);
    }

    const newsCount = await NewsModel.countDocuments();
    if (newsCount === 0) {
      console.log('[RTIST Seed] Populating News into MongoDB...');
      await NewsModel.insertMany(newsData);
    }

    console.log('[RTIST Seed] Initial seed verified successfully.');
  } catch (err) {
    console.error('[RTIST Seed Error]:', err);
  }
}
