import { Achievement } from '../types';

export const achievementsData: Achievement[] = [
  {
    id: 'ach-01',
    title: '[1st Place / Winners — National Autonomous Robotics League]',
    competition: '[National Inter-Technical Robotics Championship]',
    position: '[1st Place / Champions]',
    year: 2025,
    venue: '[Host National Technical Institute / Techfest Arena]',
    team: ['[Team Member 1]', '[Team Member 2]', '[Team Member 3]'],
    prizeMoney: '[₹50,000 Cash Prize + Trophy]',
    description: 'Developed an autonomous obstacle-avoiding rover with 360° LiDAR mapping and custom sub-second reactive path planning that cleared the 50-meter dynamic arena with 0 collision points.',
    category: 'Autonomous Robotics',
    imageUrl: '/images/events/ros2demo.jpg'
  },
  {
    id: 'ach-02',
    title: '[Podium Finish / 2nd Place — 3kg SumoBot Battle Royale]',
    competition: '[North India Collegiate Combat Robotics Cup]',
    position: '[2nd Place / Runners Up]',
    year: 2025,
    venue: '[Regional Engineering University Arena]',
    team: ['[Team Member 1]', '[Team Member 2]'],
    prizeMoney: '[₹25,000 Cash Prize]',
    description: 'Titanium-wedge combat sumo robot cleared 7 consecutive knockout rounds against 32 collegiate teams with an average ring-out duration of 4.2 seconds.',
    category: 'Combat Robotics',
    imageUrl: '/images/events/robbors.jpg'
  },
  {
    id: 'ach-03',
    title: '[Fastest Lap Record — 1/10 Scale RC Car Invitational]',
    competition: '[All-India RC Gran Prix Championship]',
    position: '[Fastest Lap & 1st in Speed Trials]',
    year: 2024,
    venue: '[National Racing Circuit / Technical Fest]',
    team: ['[Driver Name]', '[Pit Lead Name]', '[Telemetry Engineer]'],
    prizeMoney: '[₹30,000 + Gold Medal]',
    description: 'Apex chassis platform clocked an asphalt track record lap of 11.24 seconds with a radar-gun verified top speed of 78.4 km/h.',
    category: 'RC Car Racing',
    imageUrl: '/images/events/rccar.jpg'
  },
  {
    id: 'ach-04',
    title: '[1st Place — Microcontroller Speed Line Follower League]',
    competition: '[Annual State Technical Festival Arena]',
    position: '[1st Place]',
    year: 2024,
    venue: '[State Technical University Campus]',
    team: ['[Team Member 1]', '[Team Member 2]'],
    prizeMoney: '[₹20,000 + Trophy]',
    description: 'Custom integrated PCB line follower Photon clocked a 20-meter complex curve track in 8.42 seconds using 2kHz predictive PID control.',
    category: 'Line Follower',
    imageUrl: '/images/events/linefollower.jpg'
  },
  {
    id: 'ach-05',
    title: '[Best Engineering Design Award — Autonomous Maze Solver]',
    competition: '[Inter-NIT Tech Meet Robotics Challenge]',
    position: '[Best Technical Design & Innovation]',
    year: 2023,
    venue: '[National Institute of Technology Host Campus]',
    team: ['[Team Member 1]', '[Team Member 2]', '[Team Member 3]'],
    prizeMoney: '[Citation & Innovation Grant]',
    description: 'Recognized by faculty jury for novel flood-fill micromouse algorithm with sub-5 millisecond turn transitions and optical odometry stability.',
    category: 'Autonomous Systems',
    imageUrl: '/images/events/ros2workshop.jpg'
  }
];
