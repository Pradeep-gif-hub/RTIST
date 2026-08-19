import { GalleryItem } from '../types/index.js';

export const galleryData: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Apex-10 RC Sprint Chassis on Workshop Pit Bench',
    category: 'RC Cars',
    date: '2026-02-14',
    location: 'RTIST Mechanical Bench, NIT Jalandhar',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=80',
    fullImageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1600&q=80',
    caption: 'Tuning suspension camber and belt tension prior to track time trials.',
    tags: ['RC Car', 'Carbon Fiber', 'Powertrain', 'Chassis Tuning'],
    technicalMetadata: {
      shutter: '1/500s @ f/2.8',
      gear: '3K Carbon Chassis / 120A ESC',
      projectRef: 'rc-apex-nitro-mk4'
    }
  },
  {
    id: 'gal-02',
    title: 'Titanium Combat Sumo Wedge Machining',
    category: 'Robots',
    date: '2025-11-20',
    location: 'NIT Jalandhar Central Workshop CNC Cell',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    fullImageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80',
    caption: 'Milling 1.2-degree ground scraper edge on Grade 5 titanium plate.',
    tags: ['SumoBot', 'Titanium', 'CNC Machining', 'Combat Robotics'],
    technicalMetadata: {
      shutter: '1/250s @ f/4.0',
      gear: 'Maxon RE-35 / Ti-6Al-4V',
      projectRef: 'titan-3kg-sumobot'
    }
  },
  {
    id: 'gal-03',
    title: 'Autonomous SLAM Rover LiDAR Point Cloud Verification',
    category: 'Competitions',
    date: '2025-10-18',
    location: 'Student Activity Center Arena, NIT Jalandhar',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    fullImageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1600&q=80',
    caption: 'Real-time 2D occupancy grid generation during autonomous navigation qualifying run.',
    tags: ['SLAM', 'ROS 2', 'LiDAR', 'Autonomous'],
    technicalMetadata: {
      shutter: '1/160s @ f/2.0',
      gear: 'RPLiDAR A2 / Jetson Orin Nano',
      projectRef: 'autonomous-ros2-lidar-rover'
    }
  },
  {
    id: 'gal-04',
    title: 'Surface Mount Soldering & PCB Assembly Station',
    category: 'Behind the Scenes',
    date: '2026-01-08',
    location: 'RTIST Electronics Bench, NIT Jalandhar',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    fullImageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    caption: 'Reflow soldering 0603 SMD resistors and STM32 QFP48 microcontroller package.',
    tags: ['Electronics', 'PCB Design', 'Soldering', 'Firmware'],
    technicalMetadata: {
      shutter: '1/320s @ f/2.8',
      gear: 'Hot Air Rework / Hakko FX-888D',
      projectRef: 'high-speed-pid-line-tracer'
    }
  },
  {
    id: 'gal-05',
    title: 'FreeRTOS Embedded Systems Hands-On Lab Workshop',
    category: 'Workshops',
    date: '2025-11-16',
    location: 'Computer Lab 3, NIT Jalandhar',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    fullImageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=80',
    caption: 'Junior club recruits learning RTOS task synchronization and hardware interrupt handling.',
    tags: ['Workshop', 'Recruitment', 'FreeRTOS', 'Students'],
    technicalMetadata: {
      shutter: '1/125s @ f/3.5',
      gear: 'STM32 BluePill / Logic Analyzer',
      projectRef: 'general'
    }
  },
  {
    id: 'gal-06',
    title: 'Robo Soccer Omnidirectional Striker Track Scrimmage',
    category: 'Robots',
    date: '2025-09-24',
    location: 'RTIST Arena, NIT Jalandhar',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    fullImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    caption: 'Testing 300V kicker capacitor discharge mechanism on 45mm golf ball target.',
    tags: ['Robo Soccer', 'Omni Wheel', 'High Voltage Solenoid'],
    technicalMetadata: {
      shutter: '1/1000s @ f/2.0',
      gear: 'ESP32 / 3-Wheel Kinematics',
      projectRef: 'hexasoccer-striker-bot'
    }
  },
  {
    id: 'gal-07',
    title: 'Dr. B.R. Ambedkar NIT Jalandhar Campus & Workshop Base',
    category: 'Campus',
    date: '2026-01-15',
    location: 'Main Academic Building & Mechanical Lab Complex',
    thumbnailUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    fullImageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80',
    caption: 'The heart of engineering excellence at NIT Jalandhar where RTIST robots are designed and forged.',
    tags: ['NIT Jalandhar', 'Campus', 'Engineering'],
    technicalMetadata: {
      shutter: '1/640s @ f/5.6',
      gear: 'Campus Aerial View',
      projectRef: 'campus'
    }
  },
  {
    id: 'gal-08',
    title: 'Inter-College Trophy & Championship Podium Moment',
    category: 'Awards',
    date: '2025-10-14',
    location: '[Championship Arena Stage]',
    thumbnailUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
    fullImageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1600&q=80',
    caption: 'RTIST team accepting the [Inter-College Tech Cup 2025] overall robotics championship.',
    tags: ['Championship', 'Podium', 'Teamwork', 'Trophy'],
    technicalMetadata: {
      shutter: '1/200s @ f/2.8',
      gear: 'Podium Stage',
      projectRef: 'achievements'
    }
  }
];
