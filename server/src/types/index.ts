export type ProjectCategory = 
  | 'RC Cars' 
  | 'Robo Sumo' 
  | 'Robo Soccer' 
  | 'Line Followers' 
  | 'Autonomous Robots' 
  | 'Embedded Systems' 
  | 'Other';

export interface HardwareComponent {
  name: string;
  spec: string;
  qty?: number;
  purpose?: string;
}

export interface SoftwareComponent {
  layer: string;
  tech: string;
  details: string;
}

export interface ProjectTeamMember {
  name: string;
  role: string;
}

export interface Project {
  _id?: string;
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  year: number;
  featured?: boolean;
  status: 'Operational' | 'Testing' | 'In Development' | 'Decommissioned / Archived';
  thumbnailUrl: string;
  overview: string;
  problemStatement: string;
  mechanicalDesign: {
    chassisType: string;
    weight: string;
    dimensions: string;
    materials: string[];
    cadNotes: string;
  };
  hardware: HardwareComponent[];
  software: SoftwareComponent[];
  circuitDiagramUrl?: string;
  cadModelUrl?: string;
  buildProcess: string[];
  testingNotes: string;
  challengesEncountered: string[];
  competitionResults: string;
  galleryImages: string[];
  teamMembers: ProjectTeamMember[];
  specsSummary: {
    topSpeed?: string;
    maxThrust?: string;
    batteryLife?: string;
    microcontroller?: string;
    weight?: string;
  };
  githubRepo?: string;
}

export type EventCategory = 
  | 'RC Car' 
  | 'Robo Sumo' 
  | 'Robo Soccer' 
  | 'Line Follower' 
  | 'Maze Solver' 
  | 'Workshop' 
  | 'Other';

export interface EventScheduleItem {
  time: string;
  title: string;
  description: string;
}

export interface EventWinner {
  position: '1st Place' | '2nd Place' | '3rd Place' | 'Best Design' | 'Innovation Award';
  teamName: string;
  college: string;
}

export interface Event {
  _id?: string;
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  isPast: boolean;
  registrationOpen: boolean;
  registrationDeadline?: string;
  fee?: string;
  prizePool?: string;
  thumbnailUrl: string;
  bannerUrl: string;
  description: string;
  rules: string[];
  eligibility: string[];
  schedule: EventScheduleItem[];
  coordinators: {
    name: string;
    role: string;
    contact?: string;
  }[];
  registeredTeamsCount?: number;
  winners?: EventWinner[];
  photos?: string[];
  videoUrl?: string;
}

export type DocCategory = 
  | 'Electronics' 
  | 'Microcontrollers' 
  | 'Sensors' 
  | 'Motors' 
  | 'Motor Drivers' 
  | 'Robotics' 
  | 'Programming' 
  | 'Advanced';

export interface DocPinout {
  pin: string;
  name: string;
  type: 'Power' | 'GND' | 'Digital I/O' | 'Analog In' | 'PWM' | 'I2C' | 'SPI' | 'UART' | 'Other';
  description: string;
}

export interface DocArticle {
  _id?: string;
  id: string;
  slug: string;
  category: DocCategory;
  categorySlug: string;
  title: string;
  summary: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  lastUpdated: string;
  author: string;
  tags: string[];
  introduction: string;
  howItWorks: string;
  specifications: { label: string; value: string }[];
  pinout?: DocPinout[];
  wiringNotes: string;
  codeSnippet?: {
    language: string;
    code: string;
    description: string;
  };
  applications: string[];
  troubleshooting: { issue: string; solution: string }[];
  relatedArticles?: { title: string; category: string; slug: string }[];
}

export type TeamDomain = 
  | 'Executive' 
  | 'Electronics' 
  | 'Mechanical' 
  | 'Software' 
  | 'Event Management' 
  | 'Design & Media';

export interface TeamMember {
  _id?: string;
  id: string;
  name: string;
  role: string;
  domain: TeamDomain;
  batch: string; // e.g. "2023-2027"
  branch: string;
  expertise: string[];
  photoUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface FacultyCoordinator {
  _id?: string;
  id: string;
  name: string;
  designation: string;
  department: string;
  message?: string;
  photoUrl: string;
  email?: string;
}

export type GalleryCategory = 
  | 'Competitions' 
  | 'Robots' 
  | 'RC Cars' 
  | 'Workshops' 
  | 'Team' 
  | 'Behind the Scenes' 
  | 'Events' 
  | 'Faculty' 
  | 'Awards' 
  | 'Campus';

export interface GalleryItem {
  _id?: string;
  id: string;
  title: string;
  category: GalleryCategory;
  date: string;
  location: string;
  thumbnailUrl: string;
  fullImageUrl: string;
  caption: string;
  tags: string[];
  technicalMetadata?: {
    shutter?: string;
    gear?: string;
    projectRef?: string;
  };
}

export interface Achievement {
  _id?: string;
  id: string;
  title: string;
  competition: string;
  position: string;
  year: number;
  venue: string;
  team: string[];
  prizeMoney?: string;
  description: string;
  category: string;
  imageUrl?: string;
}

export interface NewsArticle {
  _id?: string;
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  category: 'Announcement' | 'Competition Update' | 'Workshop' | 'Recruitment' | 'Tech Log';
  thumbnailUrl: string;
  tags: string[];
}

export interface RecruitmentApplication {
  _id?: string;
  name: string;
  email: string;
  rollNumber: string;
  branch: string;
  year: '1st Year' | '2nd Year' | '3rd Year';
  areasOfInterest: string[];
  technicalSkills: string;
  priorExperience?: string;
  whyJoin: string;
  githubOrPortfolio?: string;
  status?: 'Pending' | 'Reviewed' | 'Shortlisted' | 'Accepted';
  createdAt?: string;
}
