import { Event } from '../types';

export const eventsData: Event[] = [
  {
  id: 'evt-01',
  slug: 'nitro-rc-clash-2026',
  title: 'R-Tist Club Orientation 2026',
  tagline: 'Discover, build, compete, and create with R-Tist.',
  category: 'Orientation',

  date: '2026-08-22',
  time: '02:00 PM - 06:00 PM IST',
  venue: 'Snackers, Ground Floor, NIT Jalandhar',

  isPast: true,
  registrationOpen: true,
  registrationDeadline: '2026-08-22',

  fee: 'Free',
  prizePool: 'Goodies and Oppertunity to induct',

  thumbnailUrl: '/images/events/orientation.jpg',
  bannerUrl: '/images/events/orientation.jpg',

  description:
    'The official orientation session for the incoming First Year 2026 batch at NIT Jalandhar. Get introduced to RTIST, learn about the club, explore its projects and activities, watch live demonstrations, interact with the team, and discover opportunities to become a part of RTIST.',

  rules: [
    'Open to all First Year 2026 batch students of NIT Jalandhar.',
    'Students from all departments and branches are welcome.',
    'No prior experience in robotics, electronics, programming, or technology is required.',
    'Students are requested to report at the venue before the session begins.'
  ],

  eligibility: [
    'Open to all First Year 2026 batch students.',
    'All departments and branches are eligible.',
    'No previous technical experience is required.'
  ],

  schedule: [
    {
      time: '02:00 PM',
      title: 'Welcome & Introduction',
      description:
        'Welcome to the RTIST Club and introduction to the orientation session.'
    },
    {
      time: '02:30 PM',
      title: 'About RTIST',
      description:
        'Introduction to RTIST, its vision, domains, teams, projects, activities, and opportunities.'
    },
    {
      time: '03:15 PM',
      title: 'Project & Technology Demonstrations',
      description:
        'Live demonstrations of RTIST projects, robotics, RC cars, electronics, and other technologies.'
    },
    {
      time: '04:15 PM',
      title: 'RTIST Journey & Achievements',
      description:
        'A look at the club’s projects, competitions, events, achievements, and experiences.'
    },
    {
      time: '04:45 PM',
      title: 'Interactive Session',
      description:
        'Interactive activities, questions, discussions, and experiences with the RTIST team.'
    },
    {
      time: '05:30 PM',
      title: 'Recruitment & Team Introduction',
      description:
        'Learn about the upcoming recruitment process, available domains, selection procedure, and how to join RTIST.'
    },
    {
      time: '05:50 PM',
      title: 'Closing & Interaction',
      description:
        'Final announcements, interaction with the team, and closing of the orientation session.'
    }
  ],

  coordinators: [
    {
      name: 'Shreyash tripathi',
      role: 'Club Coordinator',
      contact: '+91 95571 26111'
    },
    {
      name: 'Dhruv',
      role: 'Orientation Coordinator',
      contact: '+91 82838 45444'
    }
  ],

  registeredTeamsCount: 0
},
  {
  id: 'evt-02',

  slug: 'steel-clash-sumo-2026',

  title: 'RC  Car Hurdle Challenge 2026',

  tagline:
    'Build your own RC car, conquer the obstacles, and race against the best teams.',

  category: 'Robo Sumo',

  date: '2026-09-15',

  time: '10:00 AM - 06:00 PM IST',

  venue: 'RTIST Robotics Arena, NIT Jalandhar',

  isPast: false,

  registrationOpen: false,

  registrationDeadline: '2026-09-10',

  fee: 'To Be Announced',

  prizePool: 'Massive Prize Pool — To Be Announced',

  thumbnailUrl: '/images/events/roborace.jpg',

  bannerUrl: '/images/events/robbors.jpg',

  description:
    'An upcoming hands-on RC car challenge where teams will design, build, program, and race their own custom remote-controlled cars. Using microcontrollers, motors, sensors, and creative mechanical designs, teams will compete on a challenging obstacle-based track featuring hurdles, ramps, sharp turns, uneven sections, and other demanding obstacles. This is a team-based engineering challenge focused on innovation, control, design, and racing performance. The event is expected to attract teams from across colleges, with a massive prize pool to be announced soon.',

  rules: [
    'Each team must design and build its own RC car for the competition.',

    'The car must be controlled using a microcontroller-based control system.',

    'Teams are encouraged to use microcontrollers such as Arduino, ESP32, STM32, or equivalent platforms.',

    'The RC car must successfully navigate the designated obstacle-based track within the specified time limit.',

    'Cars must be built by the participating team and should demonstrate genuine engineering and design work.',

    'Commercially available complete RC cars may not be used as the primary competition vehicle.',

    'Teams must comply with the maximum size, weight, battery, and power specifications announced in the final rulebook.',

    'Any unsafe modification, intentional interference, or deliberate obstruction of another team may result in disqualification.',

    'The detailed technical specifications and final competition rules will be released before registration opens.'
  ],

  eligibility: [
    'Open to undergraduate and postgraduate students from colleges and universities across India.',

    'Cross-departmental and cross-college teams are permitted.',

    'Teams may consist of multiple members, with the final team-size limit to be announced.',

    'Participants do not need prior competition experience, but teams should have basic knowledge of electronics, microcontrollers, programming, and mechanical design.'
  ],

  schedule: [
    {
      time: '10:00 AM',
      title: 'Registration & Technical Inspection',
      description:
        'Team registration, vehicle inspection, size and safety verification, and briefing about the competition.'
    },

    {
      time: '11:00 AM',
      title: 'Practice & Track Familiarization',
      description:
        'Teams get practice time to understand the obstacle track and test their custom-built RC cars.'
    },

    {
      time: '01:00 PM',
      title: 'Qualifying Challenge',
      description:
        'Teams compete against the clock to complete the obstacle course and qualify for the main competition.'
    },

    {
      time: '02:30 PM',
      title: 'Main Hurdle Challenge',
      description:
        'Qualified teams battle through increasingly difficult obstacle sections while competing for the fastest completion time.'
    },

    {
      time: '04:30 PM',
      title: 'Final Showdown',
      description:
        'Top-performing teams compete head-to-head on the toughest version of the track.'
    },

    {
      time: '05:30 PM',
      title: 'Results & Prize Ceremony',
      description:
        'Announcement of winners, recognition of outstanding engineering designs, and prize distribution.'
    }
  ],

  coordinators: [
    {
      name: 'Pradeep Kumar Awasthi',
      role: 'Event Coordinator',
      contact: '+91 8127136711'
    },

    {
      name: 'Mohit Insan ',
      role: 'Technical Coordinator',
      contact: '+91 6280904046'
    }
  ],

  registeredTeamsCount: 0
},
  {
  id: 'evt-03',

  slug: 'photon-line-follower-league-2026',

  title: 'RC Car Building from scratch Workshop',

  tagline:
    'Start from zero, build your own RC car, and learn how the electronics behind it actually work.',

  category: 'Line Follower',

  date: '2026-08-30',

  time: '06:00 PM - 08:00 PM ',

  venue: 'SB-1, NIT Jalandhar',

  isPast: false,

  registrationOpen: true,

  registrationDeadline: '2026-08-29',

  fee: 'To Be Announced',

  prizePool: 'Hands-on Experience + Certificates',

  thumbnailUrl: '/images/events/workshop2.webp',

  bannerUrl: '/images/events/workshop2.webp',

  description:
    'A completely hands-on beginner-friendly workshop where participants will learn how to build and control an RC car from the basics. Starting with the fundamentals of microcontrollers, motor drivers, motors, power connections, and wireless communication, participants will gradually assemble their own RC car on a chassis. The workshop will use a Bluetooth-based control setup to demonstrate how a microcontroller can receive commands and control motors. No prior programming, electronics, or robotics experience is required. Day 1 focuses on understanding the components and assembling the car, while Day 2 focuses on testing, troubleshooting, live demonstrations, and getting the cars ready to run.',

  rules: [
    'The workshop is completely beginner-friendly and no prior programming or electronics experience is required.',

    'Participants will work with basic microcontrollers, motor drivers, DC motors, chassis components, and wireless communication modules.',

    'All major components and their connections will be explained from the basics before assembly.',

    'Participants will assemble and test an RC car during the hands-on sessions.',

    'Participants are expected to handle the provided components and equipment responsibly.',

    'The detailed component kit and technical requirements will be explained during the workshop.'
  ],

  eligibility: [
    'Open to all NIT Jalandhar students.',

    'Especially suitable for beginners interested in robotics, electronics, embedded systems, and RC cars.',

    'No prior programming or electronics knowledge is required.',

    'Participants from all branches and departments are welcome.'
  ],

  schedule: [
    {
      time: '06:00 PM',
      title: 'Day 1 — Basics & Component Introduction',
      description:
        'Introduction to microcontrollers, motor drivers, DC motors, chassis, power supply, Bluetooth communication, and the basic working of an RC car.'
    },

    {
      time: '06:45 PM',
      title: 'Hands-on Circuit & Motor Setup',
      description:
        'Learn how to connect the microcontroller with the motor driver, motors, power supply, and Bluetooth module through a guided hands-on session.'
    },

    {
      time: '07:30 PM',
      title: 'RC Car Assembly',
      description:
        'Participants assemble their own RC car on the chassis and understand how the mechanical and electronic components work together.'
    },

    {
      time: '08:00 PM',
      title: 'Day 1 Wrap-up',
      description:
        'Initial testing, troubleshooting, and preparation for the second-day demonstration session.'
    },

    {
      time: '06:00 PM',
      title: 'Day 2 — Testing & Demonstration',
      description:
        'Test the assembled RC cars, identify and fix common issues, and understand the complete working of the system.'
    },

    {
      time: '07:00 PM',
      title: 'Bluetooth Control Demonstration',
      description:
        'Live demonstration of wireless control and how commands are transmitted from the controller to the microcontroller.'
    },

    {
      time: '07:30 PM',
      title: 'RC Car Demo & Run',
      description:
        'Participants demonstrate their completed cars and put their builds through a practical driving test.'
    },

    {
      time: '08:00 PM',
      title: 'Closing & Next Steps',
      description:
        'Wrap-up of the workshop, discussion of further learning opportunities, and introduction to upcoming RTIST activities.'
    }
  ],

  coordinators: [
    {
      name: 'Pradeep Kumar Awasthi',
      role: 'Event Coordinator',
      contact: '+91 8127136711'
    },

    {
      name: 'Mohit Insan',
      role: 'Technical Coordinator',
      contact: '+91 6280904046'
    }
  ],

  registeredTeamsCount: 0
},
  {
  id: 'evt-04',

  slug: 'freertos-embedded-robotics-bootcamp-2025',

  title: 'ROS 2 & Autonomous Robotics Workshop 2025',

  tagline:
    'Hands-on robotics, ROS 2, LiDAR-based mapping, obstacle avoidance, and insights from India’s human spaceflight programme.',

  category: 'Workshop',

  date: '2025-02-15',

  time: '05:30 PM - 07:30 PM IST',

schedule: [
  {
    time: '05:30 PM',
    title: 'Introduction to ROS 2',
    description:
      'Introduction to ROS 2, its architecture, nodes, topics, communication mechanisms, and its role in modern robotic systems.'
  },

  {
    time: '06:00 PM',
    title: 'Hands-on ROS 2 Experience',
    description:
      'Students explored ROS 2 through practical demonstrations and learned how different components of a robotic system communicate and work together.'
  },

  {
    time: '06:30 PM',
    title: 'Gaganyaan Mission & Engineering Experience',
    description:
      'KS Nagla Sir shared his engineering experience and insights from his contribution to the Gaganyaan mission, connecting real-world aerospace applications with robotics and technology.'
  },

  {
    time: '06:50 PM',
    title: 'LiDAR Robot Demonstration',
    description:
      'A live demonstration of a LiDAR-based autonomous robot showcasing obstacle avoidance and environment mapping using ROS 2.'
  },

  {
    time: '07:10 PM',
    title: 'Mapping & Autonomous Navigation',
    description:
      'Demonstration of how LiDAR sensor data and ROS 2 tools can be used to build maps and enable autonomous navigation.'
  },

  {
    time: '07:25 PM',
    title: 'Interactive Session & Closing',
    description:
      'Student interaction, questions, discussion, and closing remarks.'
  }
],

  venue: 'NIT Jalandhar',

  isPast: true,

  registrationOpen: false,

  thumbnailUrl: '/images/events/ros2workshop.jpg',

  bannerUrl: '/images/events/ros2workshop.jpg',

  description:
    'A hands-on robotics workshop conducted by faculty coordinator KS Nagla Sir, introducing students to ROS 2 and its applications in autonomous robotics. The session combined practical demonstrations with insights from real-world engineering experience, including Sir’s contribution to the Gaganyaan mission. Participants explored the fundamentals of ROS 2, robot communication and control, sensor integration, LiDAR-based perception, mapping, and autonomous navigation. A live LiDAR-equipped robot demonstration showcased how ROS 2 can be used for real-time environment mapping and obstacle avoidance, giving students practical exposure to modern autonomous robotics systems.',

  rules: [
    'The workshop was open to students interested in robotics, ROS 2, autonomous systems, and embedded technology.',

    'Participants were encouraged to actively participate in the hands-on demonstrations and practical sessions.',

    'No advanced prior knowledge of ROS 2 was required for attending the introductory sessions.',

    'Participants were expected to follow laboratory and equipment safety instructions during the hands-on activities.'
  ],

  eligibility: [
    'Open to engineering students interested in robotics and autonomous systems.',

    'Students from all branches with an interest in robotics were welcome.',

    'The workshop was suitable for students looking to explore ROS 2 and practical robotic applications.'
  ],
  coordinators: [
    {
      name: 'KS Nagla Sir',
      role: 'Faculty Coordinator & Technical Mentor'
    }
  ],

  registeredTeamsCount: 65,

  winners: []
},
  {
  id: 'evt-05',

  slug: 'techniti-line-follower-challenge-2019',

  title: 'Techniti 2019: Line Follower Obstacle Challenge',

  tagline:
    'Precision, speed, and autonomous control — an intense line follower challenge through a demanding obstacle track.',

  category: 'Line Follower',

  date: '2019-10-20',

  time: '09:00 AM - 06:00 PM IST',

  venue: 'NIT Jalandhar, Techniti Techfest Arena',

  isPast: true,

  registrationOpen: false,

  thumbnailUrl: '/images/events/techniti.JPG',

  bannerUrl: '/images/events/techniti.JPG',

  description:
    'One of the exciting robotics challenges conducted by RTIST during Techniti 2019, featuring an obstacle-based autonomous line follower competition with participation from more than 20 teams. Teams designed and programmed their robots to navigate a challenging track while maintaining the line, negotiating sharp turns, crossing obstacles, and completing the course in the shortest possible time. The event brought together students with strong interests in robotics, embedded systems, sensors, and autonomous control, creating a highly competitive and engaging technical experience.',

  rules: [
    'Robots had to autonomously follow the designated track without manual intervention.',

    'Teams were required to build and program their own line follower robots.',

    'The track included challenging sections such as sharp turns, intersections, obstacles, and complex line-following paths.',

    'The robot completing the course in the shortest valid time was ranked higher.',

    'Manual assistance during an official run resulted in a restart or time penalty as decided by the event coordinators.',

    'Teams were responsible for ensuring that their robots met the technical and safety requirements before participating.'
  ],

  eligibility: [
    'Open to participating student teams during Techniti 2019.',

    'Teams from engineering and technical backgrounds participated in the competition.',

    'More than 20 teams participated in the challenge.'
  ],

  schedule: [
    {
      time: '09:00 AM',
      title: 'Registration & Technical Inspection',
      description:
        'Team registration, robot inspection, and briefing about the competition track and rules.'
    },

    {
      time: '10:00 AM',
      title: 'Track Familiarization',
      description:
        'Teams studied the track and prepared their robots for the obstacle-based challenge.'
    },

    {
      time: '11:00 AM',
      title: 'Qualification Runs',
      description:
        'Participating teams attempted the challenging line-following track and competed to record their fastest valid times.'
    },

    {
      time: '02:00 PM',
      title: 'Obstacle Challenge',
      description:
        'Qualified teams tackled difficult track sections involving sharp turns, intersections, obstacles, and precision navigation.'
    },

    {
      time: '04:30 PM',
      title: 'Final Runs',
      description:
        'Top-performing teams competed in the final timed runs to determine the winners.'
    },

    {
      time: '05:30 PM',
      title: 'Results & Closing',
      description:
        'Final rankings, winner announcements, and closing of the Techniti 2019 robotics challenge.'
    }
  ],

  coordinators: [
    {
      name: 'Dr Afzal Sinkder',
      role: 'Faculty Coordinator'
    },

    {
      name: 'Alumini',
      role: 'Event Coordinator'
    }
  ],

  registeredTeamsCount: 20,

  winners: [
    {
      position: '1st Place',
      teamName: 'Team Alpha',
      college: 'LPU University'
    },

    {
      position: '2nd Place',
      teamName: 'Team Beta',
      college: 'LPU University'
    },

    {
      position: '3rd Place',
      teamName: 'Team Gamma',
      college: 'LPU University'
    }
  ]
},
{
  id: 'evt-05',

  slug: 'utkansh-machine-war-2025',

  title: 'Utkansh 2025: Machine War',

  tagline:
    'Build. Battle. Dominate. An intense machine combat arena where engineering meets strategy.',

  category: 'Machine War',

  date: '2025-04-12',

  time: '09:00 AM - 06:00 PM IST',

  venue: 'NIT Jalandhar, Utkansh Techfest Arena',

  isPast: true,

  registrationOpen: false,

  thumbnailUrl: '/images/events/machinewarr.jpg',

  bannerUrl: '/images/events/machinewarr.jpg',

  description:
    'Machine War was one of the high-energy robotics competitions organized during Utkansh 2025 at NIT Jalandhar. More than 15 teams came together to put their custom-built combat machines to the ultimate test. The competition combined mechanical design, electronics, embedded systems, wireless control, strategy, and driving skills as machines battled head-to-head inside the arena. With a total prize pool of ₹18,000, the event delivered intense matches and showcased the creativity, engineering skills, and competitive spirit of participating teams.',

  rules: [
    'Each team competed using a custom-built combat machine designed and assembled by the participating team.',

    'Machines were required to comply with the technical specifications and safety requirements announced for the competition.',

    'Matches were conducted inside a designated combat arena under the supervision of event coordinators.',

    'Teams competed head-to-head, with the objective of overpowering or pushing the opposing machine according to the official match rules.',

    'Deliberate actions that could cause unsafe damage to participants, spectators, or event infrastructure were prohibited.',

    'Teams were responsible for ensuring that their machines were operated safely throughout the competition.',

    'The final decision regarding match results, penalties, and disqualifications rested with the event judges.'
  ],

  eligibility: [
    'Open to college and university student teams participating in Utkansh 2025.',

    'Teams from engineering and technical institutions were eligible to participate.',

    'More than 15 teams participated in the competition.',

    'Participants were encouraged to apply their skills in mechanical design, electronics, embedded systems, and robotics.'
  ],

  schedule: [
    {
      time: '09:00 AM',
      title: 'Registration & Technical Inspection',
      description:
        'Team registration, machine inspection, safety verification, and briefing about the Machine War arena and competition rules.'
    },

    {
      time: '10:30 AM',
      title: 'Practice & Arena Familiarization',
      description:
        'Teams tested their machines and familiarized themselves with the arena before the official matches.'
    },

    {
      time: '12:00 PM',
      title: 'Qualifying Battles',
      description:
        'Participating teams entered the first stage of head-to-head combat to qualify for the knockout rounds.'
    },

    {
      time: '02:30 PM',
      title: 'Knockout Battles',
      description:
        'Qualified teams faced increasingly difficult head-to-head battles in the knockout stage.'
    },

    {
      time: '04:30 PM',
      title: 'Grand Final — Machine War',
      description:
        'The top-performing machines entered the final battle to determine the Utkansh 2025 Machine War champion.'
    },

    {
      time: '05:30 PM',
      title: 'Results & Prize Distribution',
      description:
        'Winner announcement and distribution of prizes from the ₹18,000 total prize pool.'
    }
  ],

  coordinators: [
    {
      name: 'Dr Afzal Sinkder',
      role: 'Faculty Coordinator'
    },

    {
      name: 'RTIST Team',
      role: 'Event Organizers'
    }
  ],

  registeredTeamsCount: 15,

  winners: [
    {
      position: '1st Place',
      teamName: 'Team 1',
      college: 'LPU University'
    },

    {
      position: '2nd Place',
      teamName: 'Team 2',
      college: 'LPU University'
    },

    {
      position: '3rd Place',
      teamName: 'Team 3',
      college: 'Chitkara University'
    }
  ]
},

];
