import { NewsArticle } from '../types/index.js';

export const newsData: NewsArticle[] = [
  {
    id: 'news-01',
    slug: 'recruitment-drive-2026',
    title: 'RTIST 2026 Core Recruitment Drive: Call for Engineers, Fabricators & Coders',
    excerpt: 'Applications are now open for 1st, 2nd, and 3rd year NIT Jalandhar students across Electronics, Mechanical, Embedded, and Autonomous software domains.',
    content: `The Robotics and Technology Club (RTIST) of NIT Jalandhar is opening its official recruitment drive for the 2026-2027 technical season. We are looking for students who want to build real hardware, get their hands dirty on the pit bench, solder custom PCBs, mill titanium combat wedges, write low-level C firmware, and compete on national podiums.

### Domains Open for Application:
1. **Mechanical & CAD:** SolidWorks modeling, FEA stress analysis, CNC milling, suspension dynamics, 3D printing & composite fabrication.
2. **Electronics & Hardware:** SMD circuit design (KiCad), power electronics, brushless ESC tuning, LiPo battery systems, sensor integration.
3. **Software & Autonomous Systems:** Embedded C/C++, FreeRTOS, ROS 2 Humble / Nav2, computer vision (OpenCV), PID control algorithms.
4. **Event Operations & Management:** Technical track marshalling, competition bracket scheduling, logistics, and sponsorships.
5. **Design & Media:** Technical documentation design, brand identity, telemetry UI, and video production.

### Selection Process:
- **Phase 1: Online Application Submission** via the [Join RTIST](/join) portal.
- **Phase 2: Technical Task Round** (Hands-on problem statement or circuit/CAD challenge).
- **Phase 3: Workshop Scrutiny & In-Person Interview** at the RTIST Workshop, Mech Block.

No prior advanced robotics experience is strictly required for 1st-year applicants — we value genuine passion to learn, work ethic, and dedication to testing and iteration.`,
    publishedAt: '2026-02-15',
    author: 'RTIST Executive Board',
    category: 'Recruitment',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    tags: ['Recruitment', 'NIT Jalandhar', 'Robotics', 'Hardware', 'Join']
  },
  {
    id: 'news-02',
    slug: 'rc-gran-prix-registration-live',
    title: 'NIT Jalandhar RC Gran Prix 2026: Official Rulebook Released & Registration Open',
    excerpt: 'Registration is now live for the upcoming 1/10 and 1/8 scale RC Sprint Championship scheduled at the Central Track Arena.',
    content: `The official technical regulations for the NIT Jalandhar RC Gran Prix 2026 have been published. Teams will compete in 15-minute endurance heats featuring precision timing transponders and live telemetry logging.

Prize pool has been finalized at ₹35,000 across electric sprint and open chassis classes. Registration slots are strictly limited to 24 teams to allow adequate practice track time for every squad.

Visit the [Events](/events/nitro-rc-clash-2026) page for full scrutineering specs and registration details.`,
    publishedAt: '2026-02-08',
    author: 'RTIST Event Operations',
    category: 'Competition Update',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1000&q=80',
    tags: ['RC Car', 'Racing', 'Tournament', 'NIT Jalandhar']
  },
  {
    id: 'news-03',
    slug: 'rtist-lab-docs-launch',
    title: 'Introducing RTIST Lab: Open Engineering Documentation for Collegiate Robotics',
    excerpt: 'A comprehensive technical repository covering FreeRTOS multi-tasking, H-Bridge drivers, PID tuning, and ROS 2 navigation created by RTIST engineers.',
    content: `We believe technical knowledge should be shared openly to raise the standard of collegiate engineering across the country. Today we are launching **RTIST Lab**, a curated technical documentation hub documenting the exact circuit schematics, pinouts, algorithms, and code we use in our competition robots.

Whether you are debugging a noisy encoder line or architecting a ROS 2 Nav2 stack, RTIST Lab provides real, tested engineering references with zero fluff. Check out the [RTIST Lab](/lab) hub today.`,
    publishedAt: '2026-01-28',
    author: 'RTIST Technical Documentation Team',
    category: 'Announcement',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    tags: ['RTIST Lab', 'Documentation', 'Engineering', 'Open Source']
  }
];
