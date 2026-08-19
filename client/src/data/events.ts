import { Event } from '../types';

export const eventsData: Event[] = [
  {
    id: 'evt-01',
    slug: 'nitro-rc-clash-2026',
    title: 'NIT Jalandhar RC Gran Prix & Sprint Clash 2026',
    tagline: 'High-speed 1/10 & 1/8 scale electric & nitro RC car time trials and wheel-to-wheel sprint racing.',
    category: 'RC Car',
    date: '2026-09-18',
    time: '09:00 AM - 06:00 PM IST',
    venue: 'NIT Jalandhar Central Grounds Track Arena',
    isPast: false,
    registrationOpen: true,
    registrationDeadline: '2026-09-10',
    fee: '₹500 per team (up to 4 drivers/pit crew)',
    prizePool: '₹35,000 + Merit Certificates',
    thumbnailUrl: '/images/events/rccar.jpg',
    bannerUrl: '/images/events/rccar.jpg',
    description: 'The premier collegiate RC racing event in the region. Features a 180-meter custom paved circuit with high-speed chicanes, banked hairpins, and telemetry timing gates accurate to 1/100th of a second.',
    rules: [
      'Chassis scale must be 1/10 or 1/8 standard electric (brushless or brushed) or 0.12-0.21ci Nitro.',
      'Battery voltage must not exceed 3S (12.6V max charged) for electric classes. Hardcase LiPo packs mandatory.',
      'Remote control systems must operate strictly on 2.4GHz AFHDS / FHSS spectrum.',
      'Failsafe configuration mandatory: Loss of radio signal must trigger 100% full brake or neutral throttle within 0.5s.',
      'Pit stops: Mandatory 1 tire change or battery swap window in 15-minute endurance heat.',
      'Aggressive deliberate ramming outside normal racing lines will result in a 10-second penalty.'
    ],
    eligibility: [
      'Open to all undergraduate & postgraduate students with valid college ID.',
      'Cross-departmental and cross-college teams are permitted.',
      'Maximum team size: 4 members (Driver, Pit Mechanic, Telemetry Engineer, Spotter).'
    ],
    schedule: [
      { time: '09:00 AM', title: 'Pit Setup & Technical Scrutineering', description: 'Weight check, battery inspection, fail-safe verification and transponder allocation.' },
      { time: '10:30 AM', title: 'Open Practice & Track Familiarization', description: '5-minute practice sessions per heat.' },
      { time: '11:45 AM', title: 'Qualifying Time Trials (Hot Lap)', description: '3 flying laps to determine starting grid positions.' },
      { time: '02:00 PM', title: 'Quarter-Finals & Semi-Final Sprint Heats', description: '10-lap elimination races.' },
      { time: '04:30 PM', title: 'Grand Final (25-Lap Endurance Sprint)', description: 'Top 8 cars battle on track with pit stop strategies.' },
      { time: '05:30 PM', title: 'Podium Ceremony & Award Distribution', description: 'Trophies, certificates, and cash prizes.' }
    ],
    coordinators: [
      { name: '[Event Coordinator Name 1]', role: 'Track Director', contact: '[Contact Email/Number]' },
      { name: '[Event Coordinator Name 2]', role: 'Technical Scrutineer', contact: '[Contact Email/Number]' }
    ],
    registeredTeamsCount: 18
  },
  {
    id: 'evt-02',
    slug: 'steel-clash-sumo-2026',
    title: 'Steel Clash: 3kg Heavyweight Autonomous SumoBot Arena',
    tagline: 'Pure torque, titanium wedges, and split-second autonomous combat on the steel Dohyo.',
    category: 'Robo Sumo',
    date: '2026-10-04',
    time: '10:00 AM - 05:00 PM IST',
    venue: 'RTIST Robotics Workshop Arena, Mech Block, NIT Jalandhar',
    isPast: false,
    registrationOpen: true,
    registrationDeadline: '2026-09-28',
    fee: '₹400 per bot entry',
    prizePool: '₹25,000 + Tech Vouchers',
    thumbnailUrl: '/images/events/robbors.jpg',
    bannerUrl: '/images/events/robbors.jpg',
    description: 'Two autonomous robots enter the 154cm black Dohyo ring with a 5cm white border line. The objective: push the opponent robot out of the ring without touching the floor outside.',
    rules: [
      'Total bot weight must not exceed 3000.0 grams at calibration weigh-in.',
      'Dimensions at start: 20cm x 20cm maximum footprint (height unlimited after start).',
      'Autonomous activation: Must observe a mandatory 5.0-second delay countdown after starting button is pressed before any movement.',
      'No flying projectiles, liquid dispersal, jamming RF emitters, or damaging electro-magnets.',
      'Neodymium permanent ground-effect magnets permitted (max 15kg pull on steel Dohyo plate).'
    ],
    eligibility: [
      'Engineering and polytechnic college teams across India.',
      'Max 3 members per robot entry.'
    ],
    schedule: [
      { time: '10:00 AM', title: 'Weigh-in & Box Dimension Verification', description: 'Strict 3kg scale check & 5-second countdown timer validation.' },
      { time: '11:00 AM', title: 'Round Robin Group Stages', description: 'Best of 3 matches, 3-minute rounds.' },
      { time: '02:30 PM', title: 'Knockout Bracket & Losers Resurgence', description: 'Double elimination championship rounds.' },
      { time: '04:30 PM', title: 'Grand Final Showdown', description: 'Best of 5 rounds for the championship trophy.' }
    ],
    coordinators: [
      { name: '[Event Coordinator Name 1]', role: 'Arena Marshall', contact: '[Contact Email/Number]' }
    ],
    registeredTeamsCount: 14
  },
  {
    id: 'evt-03',
    slug: 'photon-line-follower-league-2026',
    title: 'Photon Sprint: High-Speed Autonomous Line Follower Challenge',
    tagline: 'Extreme speed, microsecond PID loops, and precision sharp turn navigation.',
    category: 'Line Follower',
    date: '2026-10-22',
    time: '11:00 AM - 04:00 PM IST',
    venue: 'Student Activity Center (SAC) Hall, NIT Jalandhar',
    isPast: false,
    registrationOpen: true,
    registrationDeadline: '2026-10-15',
    fee: '₹300 per team',
    prizePool: '₹20,000 + Certificates',
    thumbnailUrl: '/images/events/linefollower.jpg',
    bannerUrl: '/images/events/linefollower.jpg',
    description: 'An adrenaline-fueled test of optical sensing and closed-loop control algorithms. Robots must follow a 30mm black line on a white vinyl surface featuring crossover bridges, 90-degree acute hairpins, and broken line gaps.',
    rules: [
      'Robots must be 100% autonomous with on-board compute and power.',
      'Dimensions must fit within 250mm x 250mm footprint at any point during run.',
      'Time penalty of +3.0 seconds for every manual touch/reset if bot departs the track.',
      'Max 3 official timed attempts per team; lowest single lap time counts toward leaderboard.'
    ],
    eligibility: ['Open to all college students. Max 3 members per team.'],
    schedule: [
      { time: '11:00 AM', title: 'Track Walk & Calibration Slot', description: '10-minute ambient lighting calibration window.' },
      { time: '12:00 PM', title: 'Round 1 Speed Trials', description: 'First two official timed runs.' },
      { time: '02:30 PM', title: 'Final Power Runs', description: 'Final run for top 10 fastest bots.' }
    ],
    coordinators: [
      { name: '[Event Coordinator Name 1]', role: 'Lead Scorer', contact: '[Contact Email/Number]' }
    ],
    registeredTeamsCount: 22
  },
  {
    id: 'evt-04',
    slug: 'freertos-embedded-robotics-bootcamp-2025',
    title: 'FreeRTOS & STM32 Embedded Robotics Bootcamp 2025',
    tagline: '3-day hands-on intensive workshop building RTOS multi-tasked motor controllers and sensor interfaces.',
    category: 'Workshop',
    date: '2025-11-15',
    time: '10:00 AM - 05:00 PM IST',
    venue: 'RTIST Electronics Lab, NIT Jalandhar',
    isPast: true,
    registrationOpen: false,
    thumbnailUrl: '/images/events/ros2workshop.jpg',
    bannerUrl: '/images/events/ros2workshop.jpg',
    description: 'Over 65 students assembled hands-on STM32 BluePill and ESP32 hardware, writing FreeRTOS tasks for PID closed-loop motor control, hardware timers, and DMA-based sensor sampling.',
    rules: ['Bring your own laptop with STM32CubeIDE and VSCode installed.'],
    eligibility: ['All 1st, 2nd, and 3rd year engineering students.'],
    schedule: [
      { time: 'Day 1', title: 'Microcontroller Fundamentals & Register Level I/O', description: 'GPIO, Timers, PWM generation.' },
      { time: 'Day 2', title: 'FreeRTOS Tasks, Semaphores & Queues', description: 'Real-time scheduling and priority inversion avoidance.' },
      { time: 'Day 3', title: 'Live Robot Interfacing & Capstone Sprint', description: 'Building a 2-wheel inverted pendulum balancing bot.' }
    ],
    coordinators: [
      { name: '[Lead Instructor Name]', role: 'Technical Mentor' }
    ],
    registeredTeamsCount: 65,
    winners: [
      { position: 'Best Design', teamName: '[Winning Student Team 1]', college: 'NIT Jalandhar' },
      { position: 'Innovation Award', teamName: '[Winning Student Team 2]', college: 'NIT Jalandhar' }
    ]
  },
  {
    id: 'evt-05',
    slug: 'autumn-robotics-clash-2025',
    title: 'Autumn Robotics Invitational 2025',
    tagline: 'Annual inter-college robotics competition showcasing Robo Soccer, Sumo, and RC Time Trials.',
    category: 'Other',
    date: '2025-10-12',
    time: '09:00 AM - 07:00 PM IST',
    venue: 'NIT Jalandhar Gymnasium Arena',
    isPast: true,
    registrationOpen: false,
    thumbnailUrl: '/images/events/ros2demo.jpg',
    bannerUrl: '/images/events/ros2demo.jpg',
    description: 'Our flagship 2025 annual showdown with over 30 participating teams from technical universities across North India.',
    rules: ['Official RTIST 2025 Rulebook.'],
    eligibility: ['Registered college engineering teams.'],
    schedule: [
      { time: '09:00 AM', title: 'Inauguration & Track Scrutiny', description: 'Opening address by Faculty Coordinator and judges.' },
      { time: '06:00 PM', title: 'Finals & Closing Ceremony', description: 'Announcement of overall club champions.' }
    ],
    coordinators: [
      { name: '[Faculty Coordinator Name]', role: 'Chief Mentor' }
    ],
    registeredTeamsCount: 38,
    winners: [
      { position: '1st Place', teamName: '[Podium Team 1]', college: '[Host/Guest Institute]' },
      { position: '2nd Place', teamName: '[Podium Team 2]', college: '[Host/Guest Institute]' },
      { position: '3rd Place', teamName: '[Podium Team 3]', college: '[Host/Guest Institute]' }
    ]
  }
];
