import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'proj-01',
    slug: 'rc-apex-nitro-mk4',
    title: 'RC Car High-Speed Competition Platform',
    tagline: 'The massive envolvment of the studnets in the field of robotics and automation has led to the development of a high-speed RC car platform for competitive racing.',
    category: 'RC Cars',
    year: 2026,
    featured: true,
    status: 'Operational',
    thumbnailUrl: '/images/events/rccar.jpg',
    overview: 'The Apex-10 is RTIST’s flagship 1/10 scale on-road sprint RC platform. Built on an in-house CNC-machined 3K carbon fiber double-deck chassis with oil-filled aluminum coilover dampers, dual belt-drive transmission, and high-frequency 120A sensorless brushless ESC powertrain.',
    problemStatement: 'Off-the-shelf RTR (Ready-To-Run) RC cars suffer from chassis flex under high-G cornering, poor telemetry feedback, and thermal throttling in prolonged 15-minute endurance heats in peak North Indian summer ambient temperatures (38°C+).',
    mechanicalDesign: {
      chassisType: 'Double-deck 2.5mm 3K Twill Carbon Fiber plate with 6061-T6 Aluminum Bulkheads',
      weight: '1420g (with 3S 5200mAh LiPo)',
      dimensions: '375mm x 190mm x 115mm (Wheelbase: 257mm)',
      materials: ['3K Twill Carbon Fiber', '6061-T6 Aircraft Grade Aluminum', 'Delrin Spurs', 'TPU Bumper'],
      cadNotes: 'Finite Element Analysis (FEA) performed in SolidWorks to minimize torsional flex along the main drive axis while optimizing lateral weight distribution (50:50 balance with battery/motor counterweights).'
    },
    hardware: [
      { name: 'Brushless Motor', spec: 'Surpass Hobby 3650 4300KV 4-Pole Sensorless', qty: 1, purpose: 'Primary Propulsion' },
      { name: 'Electronic Speed Controller', spec: 'Hobbywing Quicrun WP 10BL120 120A ESC', qty: 1, purpose: 'Motor Commutation & Thermal Management' },
      { name: 'Steering Servo', spec: 'SPT5425LV 25KG High Torque Digital Metal Gear Servo (0.08s/60°)', qty: 1, purpose: 'Precision Ackerman Steering' },
      { name: 'Telemetry Microcontroller', spec: 'Raspberry Pi Pico (RP2040 Dual-Core)', qty: 1, purpose: 'Real-time RPM, Current, and ESC Thermistor Sampling' },
      { name: 'Wireless Transceiver', spec: 'FlySky FS-GT5 6CH 2.4GHz AFHDS 2A with Gyroscope Receiver', qty: 1, purpose: 'Low-latency Remote Control' },
      { name: 'Battery', spec: 'Gens Ace 3S 11.1V 5200mAh 50C Hardcase LiPo', qty: 1, purpose: 'High Discharge Power Reservoir' }
    ],
    software: [
      { layer: 'Telemetry Firmware', tech: 'C / C++ (Pico SDK + FreeRTOS)', details: 'Samples hall-effect wheel tachometer and DS18B20 motor temperature probes at 100Hz, streaming to an OLED pit hud.' },
      { layer: 'ESC Throttle Mapping', tech: 'Custom Exponential Throttle Curve', details: 'Dual-rate throttle map preventing wheel spin on launch and progressive regenerative braking.' }
    ],
    circuitDiagramUrl: '/images/events/ros2workshop.jpg',
    buildProcess: [
      'CAD Modeling: Drafted complete drivetrain, gear mesh, and Ackerman steering geometry in SolidWorks.',
      'Waterjet & CNC Milling: Machined the lower chassis plate, top deck, and shock towers from 2.5mm carbon fiber sheets.',
      'Differential Assembly: Tuned front spool / locked diff and rear oil-filled planetary gear diff with 50,000 cSt silicone fluid.',
      'Electronics Wiring: Custom 12AWG silicone wiring harnesses with gold-plated 4mm bullet connectors and XT90 battery port.',
      'Track Tuning: Fine-tuned camber angles (-1.5° front, -2.0° rear), caster (4°), and toe-out (1°) on the NIT Jalandhar pit bench.'
    ],
    testingNotes: 'Tested over 45 laps on dry asphalt. Achieved top speed of 78.4 km/h on straightaway with zero cogging. Max ESC temperature stabilized at 56°C under active 30mm cooling fan.',
    challengesEncountered: [
      'High-speed torque twist caused belt slip on sudden acceleration; solved by machining a ball-bearing belt tensioner bracket.',
      'Radio brownouts due to servo current spikes; solved by installing a dedicated 6V 5A external UBEC.'
    ],
    competitionResults: 'Podium contender at [Inter-College RC Sprint Invitational 2026]. Top speed benchmark of 78.4 km/h.',
    galleryImages: [
      '/images/events/rccar.jpg',
      '/images/events/ros2workshop.jpg',
      '/images/events/linefollower.jpg'
    ],
    teamMembers: [
      { name: 'Pradeep Kumar Awasthi', role: 'Mechanical & Suspension Lead' },
      { name: 'Aman Gautam', role: 'Powertrain & ESC Integration' },
      { name: 'Rishabh Singh', role: 'Telemetry Firmware & Telemetry' }
    ], 
    specsSummary: {
      maxThrust: '4.2 kg static',
      batteryLife: '18 min race pace',
      microcontroller: 'Arduino Uno and HC -12 Telemetry Module',
      weight: '1.15kg'
    },
    githubRepo: 'https://github.com/pradeep-gif-hub/rtist'
  },
  {
    id: 'proj-02',
    slug: 'titan-3kg-sumobot',
    title: 'TITAN-X: 3kg Heavyweight Autonomous Combat SumoBot',
    tagline: 'High-torque dual planetary brushed DC motors with neodymium ground magnets and ultra-fast optical ring sensors.',
    category: 'Robo Sumo',
    year: 2025,
    featured: true,
    status: 'Operational',
    thumbnailUrl: '/images/events/robbors.jpg',
    overview: 'RC combat sumo robots are designed to push opponents out of a 6 meter circular dohyo in under 3 seconds. TITAN-X is RTIST’s 3kg autonomous sumobot built on a CNC-machined titanium wedge chassis with high-traction polyurethane tires, dual planetary brushed DC motors, and optical edge detection sensors.',
    problemStatement: 'Sumo battles are won or lost in under 3 seconds. The robot must transition from initial edge avoidance to full-thrust enemy ramming with sub-10ms sensor reaction time and zero wheel slippage.',
    mechanicalDesign: {
      chassisType: 'Solid 4mm Grade 5 Titanium front blade with hardened steel bottom plate and 4-wheel polyurethane high-traction cast tires',
      weight: '2985g (Target: <3000g)',
      dimensions: '200mm x 200mm x 85mm',
      materials: ['Grade 5 Titanium (Ti-6Al-4V)', 'Hardox 450 Steel', 'Polyurethane 40A Tires', 'Brass ballast blocks'],
      cadNotes: 'Low center-of-mass design with ground-effect neodymium N52 magnets exerting 12kg of magnetic downforce on steel dohyo surfaces.'
    },
    hardware: [
      { name: 'Traction Motors', spec: 'Maxon RE-35 90W 24V Brushed DC with GP-32 14:1 Planetary Gearhead', qty: 2, purpose: 'Primary High-Torque Drive' },
      { name: 'Motor Controller', spec: 'Cytron MD30C 30A Continuous / 80A Peak Dual Channel Driver', qty: 1, purpose: 'H-Bridge PWM Motor Driving' },
      { name: 'Main Brain', spec: 'STM32F401 BlackPill (ARM Cortex-M4 @ 84MHz)', qty: 1, purpose: 'Real-Time State Machine & Edge Detection Loop' },
      { name: 'Opponent Sensors', spec: 'Keyence PZ-G51 Optical Distance Probes (80cm range)', qty: 5, purpose: 'Opponent Triangulation' },
      { name: 'Edge Line Sensors', spec: 'QRE1113 Miniature Infrared Reflective Sensors', qty: 4, purpose: 'White Border Line Detection' },
      { name: 'Battery', spec: '6S 22.2V 1300mAh 100C Graphene LiPo', qty: 1, purpose: 'Burst Power Supply' }
    ],
    software: [
      { layer: 'Combat Logic & State Machine', tech: 'Bare-Metal C (STM32 HAL + Hardware Timers)', details: '1000Hz decision loop checking white ring boundaries, opponent lock angles, and autonomous attack tactics.' },
      { layer: 'Traction Control', tech: 'Adaptive PWM Ramping', details: 'Prevents motor stall current tripping and maintains maximum static friction on tire contact patches.' }
    ],
    circuitDiagramUrl: '/images/events/linefollower.jpg',
    buildProcess: [
      'Chassis CNC Machining: Wire-EDM cut the 1.2mm bevel angle on the Titanium wedge for ground scooping.',
      'Wheel Casting: Molded custom 40A durometer Shore polyurethane tires onto knurled aluminum hubs.',
      'PCB Design: Fabricated custom 2-layer power distribution and sensor breakout board in KiCAD.',
      'State-Machine Tuning: Programmed 6 attack tactics (Straight Charge, J-Hook Flank, Whirlwind Search, Feint).'
    ],
    testingNotes: 'Tested over 100 live match simulations against club scrimmage bots. Pushed stationary 10kg test block across dohyo in 0.9 seconds.',
    challengesEncountered: [
      'Voltage spikes from fast motor reversals resetting the microcontroller; fixed by adding bidirectional TVS clamping diodes and beefy 2200uF low-ESR electrolytic filter banks.'
    ],
    competitionResults: 'Winner / Finalist at [National Robotics Summit Sumo League 2025].',
    galleryImages: [
      '/images/events/robbors.jpg',
      '/images/events/ros2workshop.jpg'
    ],
    teamMembers: [
      { name: 'Pradeep Kumar Awasthi', role: 'Mechanical & Wedge Geometry' },
      { name: 'Aman Gautam', role: 'Embedded Systems & STM32 Firmware' },
      { name: 'Rishabh Singh', role: 'Power Electronics & Sensors' }
    ],
    specsSummary: {
      topSpeed: '3.4 m/s',
      maxThrust: '18 Nm torque',
      batteryLife: '8 min combat duration',
      microcontroller: 'STM32F401 ARM Cortex-M4',
      weight: '2.98 kg'
    },
    githubRepo: 'https://github.com/rtist-nitj/titan-x-sumo-firmware'
  },
  {
    id: 'proj-03',
    slug: 'autonomous-ros2-lidar-rover',
    title: 'Aegis-Nav: Autonomous ROS 2 SLAM & Waypoint Rover',
    tagline: 'Differential drive exploration rover featuring 360° RPLiDAR A2, Intel RealSense depth camera, and Nav2 path planning.',
    category: 'Autonomous Robots',
    year: 2026,
    featured: true,
    status: 'In Development',
    thumbnailUrl: '/images/events/ros2demo.jpg',
    overview: 'Aegis-Nav is an intelligent autonomous mapping and navigation platform developed for indoor GPS-denied environments. Powered by an NVIDIA Jetson Orin Nano companion computer coupled to an RTOS motor controller via micro-ROS over UART.',
    problemStatement: 'Traditional campus service robots struggle with dynamic obstacles (people walking, shifted chairs) and slip odometry error when transitioning between tile and carpet flooring.',
    mechanicalDesign: {
      chassisType: '6mm Cast Acrylic & Extruded 2020 Aluminum Profile Modular Frame with Rocker-Bogie Suspension',
      weight: '4.8 kg',
      dimensions: '420mm x 340mm x 280mm',
      materials: ['2020 T-Slot Aluminum', 'Anodized Plates', 'All-Terrain Rubber Tread Wheels'],
      cadNotes: 'Modular sensor mounting tower with vibration dampening silicone isolators for LiDAR and RGB-D depth vision sensors.'
    },
    hardware: [
      { name: 'Compute Node', spec: 'NVIDIA Jetson Orin Nano 8GB (40 TOPS AI)', qty: 1, purpose: 'ROS 2 Humble Core, SLAM, Costmap Generation' },
      { name: 'Motor Controller', spec: 'Teensy 4.1 (ARM Cortex-M7 @ 600MHz)', qty: 1, purpose: 'Closed-Loop PID Odometry & Micro-ROS Agent' },
      { name: 'LiDAR Sensor', spec: 'Slamtec RPLiDAR A2M8 360° Laser Range Finder (12m range, 10Hz scan)', qty: 1, purpose: '2D Laser Odometry & Obstacle Cloud' },
      { name: 'Depth Camera', spec: 'Intel RealSense D435i Stereo Vision + IMU', qty: 1, purpose: '3D Point Cloud & Visual Odometry' },
      { name: 'Drive Motors', spec: 'JGB37-520 12V 330RPM DC Geared Motors with 334 PPR Hall Encoders', qty: 2, purpose: 'Differential Wheel Propulsion' }
    ],
    software: [
      { layer: 'Robotics Framework', tech: 'ROS 2 Humble on Ubuntu 22.04 LTS', details: 'Executes Cartographer SLAM, Nav2 Costmap2D, and DWB local trajectory planner.' },
      { layer: 'Sensor Fusion', tech: 'robot_localization (Extended Kalman Filter)', details: 'Fuses wheel odometry, BNO085 9-DOF IMU, and visual odometry into a robust odom->base_link transform.' }
    ],
    circuitDiagramUrl: '/images/events/ros2workshop.jpg',
    buildProcess: [
      'Suspension Assembly: Built rigid 2020 aluminum frame with sprung caster wheels.',
      'URDF Kinematics: Created precise URDF 3D model with inertia tensors for Gazebo simulation.',
      'Micro-ROS Bridge: Implemented serial transport between Jetson and Teensy 4.1 for cmd_vel and joint_states.'
    ],
    testingNotes: 'Mapped 450 sqm corridor in NIT Jalandhar Computer Center with <2cm loop closure drift.',
    challengesEncountered: [
      'Reflective glass doors producing false LiDAR returns; solved by fusing RealSense depth spatial filters with 2D laser costmaps.'
    ],
    competitionResults: 'Under development for [National Autonomous Navigation Challenge 2026].',
    galleryImages: [
      '/images/events/ros2demo.jpg',
      '/images/events/ros2workshop.jpg'
    ],
    teamMembers: [
      { name: '[Team Member 1]', role: 'ROS 2 Architecture & SLAM' },
      { name: '[Team Member 2]', role: 'Mechanical & Structural CAD' },
      { name: '[Team Member 3]', role: 'Embedded micro-ROS & Hardware' }
    ],
    specsSummary: {
      topSpeed: '1.2 m/s',
      maxThrust: '12 kg payload capacity',
      batteryLife: '1.5 hours continuous navigation',
      microcontroller: 'Jetson Orin Nano + Teensy 4.1',
      weight: '4.8 kg'
    },
    githubRepo: 'https://github.com/rtist-nitj/aegis-nav-ros2'
  },
  {
    id: 'proj-04',
    slug: 'high-speed-pid-line-tracer',
    title: 'Photon-V: High-Speed Optical PID Line Follower',
    tagline: 'Sub-second lap line follower with 16-channel analog sensor array and predictive heading PID algorithms.',
    category: 'Line Followers',
    year: 2025,
    featured: false,
    status: 'Operational',
    thumbnailUrl: '/images/events/linefollower.jpg',
    overview: 'Photon-V is a custom PCB chassis line tracer engineered for extreme cornering speeds on sharp acute angle tracks. Weighing only 210 grams with an ultra-low center of gravity.',
    problemStatement: 'Standard line followers overshoot on 90-degree chicane turns and lose the line due to sensor delay and chassis inertia.',
    mechanicalDesign: {
      chassisType: 'Integrated PCB Chassis (FR4 1.6mm 2oz Copper) with CNC Aluminum Motor Brackets',
      weight: '210g (including 2S LiPo)',
      dimensions: '180mm x 140mm x 35mm',
      materials: ['FR4 Dual Layer PCB', 'Carbon Fiber Front Sensor Boom', 'Silicone O-ring Tires'],
      cadNotes: 'Chassis itself is the circuit board, reducing wire harness weight to near zero.'
    },
    hardware: [
      { name: 'Microcontroller', spec: 'STM32G431KB (170MHz ARM Cortex-M4 with Math Accelerator)', qty: 1, purpose: 'High-frequency PID calculation at 2kHz' },
      { name: 'Optical Array', spec: 'Custom 16x Vishay TCRT5000 IR Sensor Bar with MCP3008 ADC', qty: 1, purpose: 'Line Position Error Calculation' },
      { name: 'Motors', spec: 'Pololu 20D 6V 10:1 High-Power Micro Metal Gearmotors', qty: 2, purpose: 'Drive Propulsion' },
      { name: 'Motor Driver', spec: 'TI DRV8833 Dual H-Bridge Driver', qty: 1, purpose: 'PWM Speed Control' }
    ],
    software: [
      { layer: 'Control Algorithm', tech: 'Predictive Cascade PID with Anti-Windup', details: 'Calculates weighted centroid line position and applies differential motor voltage.' }
    ],
    circuitDiagramUrl: '/images/events/ros2workshop.jpg',
    buildProcess: [
      'Designed all-in-one PCB layout in KiCAD with surface-mount components.',
      'Reflow soldered components using solder paste stencil in RTIST electronics bench.',
      'Calibrated sensor thresholds using automated EEPROM black/white auto-tuner routine.'
    ],
    testingNotes: 'Clocked a 20-meter complex curve track in 8.42 seconds at average speed of 2.37 m/s.',
    challengesEncountered: [
      'Ambient lighting fluctuations causing sensor false positives; solved by adding a software auto-normalization routine that adjusts baseline ambient light on startup.'
    ],
    competitionResults: '1st Place at [State Technical Fest Line Tracer Arena 2025].',
    galleryImages: [
      '/images/events/linefollower.jpg'
    ],
    teamMembers: [
      { name: '[Team Member 1]', role: 'PCB Design & SMD Assembly' },
      { name: '[Team Member 2]', role: 'Control Theory & PID Tuning' }
    ],
    specsSummary: {
      topSpeed: '2.8 m/s',
      batteryLife: '25 min runtime',
      microcontroller: 'STM32G431KB',
      weight: '210 grams'
    },
    githubRepo: 'https://github.com/rtist-nitj/photon-pid-tracer'
  },
  {
    id: 'proj-05',
    slug: 'hexasoccer-striker-bot',
    title: 'Striker-6: Omnidirectional 3-Wheel Robo Soccer Bot',
    tagline: 'Holonomic omni-wheel soccer bot with pneumatic solenoid kicker and 2.4GHz wireless tactical controller.',
    category: 'Robo Soccer',
    year: 2025,
    featured: false,
    status: 'Operational',
    thumbnailUrl: '/images/events/ros2workshop.jpg',
    overview: 'Striker-6 is an agile robo soccer athlete capable of instantaneous 360-degree vector motion without rotation, utilizing three 120-degree spaced double-roller omni wheels and a high-voltage capacitor-discharged solenoid ball kicker.',
    problemStatement: 'Standard 2-wheel drive bots take precious milliseconds to pivot before shooting, missing passing windows and loose ball rebounds.',
    mechanicalDesign: {
      chassisType: 'Circular 5mm Polycarbonate Sandwich Chassis with 3x 58mm Aluminum Omni-Wheels',
      weight: '1650g',
      dimensions: '195mm diameter x 140mm height',
      materials: ['Polycarbonate', 'Aluminum Standoffs', 'Custom 3D-Printed Ball Dribbler'],
      cadNotes: 'Low-profile roller dribbler with high-friction silicone sleeve to hold the golf ball against the chassis while moving.'
    },
    hardware: [
      { name: 'Holonomic Motors', spec: 'Planetary 12V 500RPM DC Geared Motors with Encoders', qty: 3, purpose: '3-Axis Omnidirectional Kinematics' },
      { name: 'Kicker Solenoid', spec: '12V High-Force Tubular Pull-Type Solenoid with 400V 1000uF Strobe Capacitor', qty: 1, purpose: 'Instant Ball Discharge' },
      { name: 'Brain', spec: 'ESP32 Dual-Core with ESP-NOW Wireless Mesh Protocol', qty: 1, purpose: 'Sub-2ms Controller Reception & Kinematics Matrix' }
    ],
    software: [
      { layer: 'Omni Kinematics', tech: '3-Wheel Holonomic Matrix Decomposition', details: 'Converts target translation (Vx, Vy) and angular velocity (Wz) into individual motor PWM signals.' }
    ],
    circuitDiagramUrl: '/images/events/ros2workshop.jpg',
    buildProcess: [
      'Laser-cut circular decks from impact-resistant polycarbonate sheets.',
      'Wired 300V kicker booster circuit with safety isolation optocouplers.',
      'Calibrated holonomic vector mixing algorithms with game controller joystick.'
    ],
    testingNotes: 'Tested ball kicking velocity up to 4.5 m/s with 92% goal accuracy within 3-meter penalty box.',
    challengesEncountered: [
      'Omni-wheels slipping on dusty arena mats; solved by swapping plastic rollers for soft rubber O-rings.'
    ],
    competitionResults: 'Finalists at [Inter-NIT Robo Soccer Cup 2025].',
    galleryImages: [
      '/images/events/ros2workshop.jpg'
    ],
    teamMembers: [
      { name: '[Team Member 1]', role: 'Kinematics & Control Firmware' },
      { name: '[Team Member 2]', role: 'Mechanical & Dribbler Mechanism' }
    ],
    specsSummary: {
      topSpeed: '2.1 m/s omnidirectional',
      batteryLife: '12 min match time',
      microcontroller: 'ESP32 Dual-Core',
      weight: '1.65 kg'
    },
    githubRepo: 'https://github.com/rtist-nitj/striker6-soccer-firmware'
  },
  {
    id: 'proj-06',
    slug: 'lora-telemetry-pit-node',
    title: 'PitLink: Sub-GHz Long-Range Pit Telemetry Transceiver',
    tagline: 'Multi-node 868MHz LoRa mesh network for real-time telemetry logging, track temperature monitors, and wireless kill-switch.',
    category: 'Embedded Systems',
    year: 2026,
    featured: false,
    status: 'Operational',
    thumbnailUrl: '/images/events/ros2workshop.jpg',
    overview: 'PitLink is an industrial-grade pit communication station for competitive RC racing and robot arenas. Features real-time track telemetry, battery voltage alerts, and an emergency failsafe RF kill switch.',
    problemStatement: '2.4GHz WiFi signals suffer extreme packet loss in crowded sports arenas with hundreds of active smartphones.',
    mechanicalDesign: {
      chassisType: 'Ruggedized IP65 3D-Printed PETG Enclosure with BNC Antenna Mount and OLED Display Bezel',
      weight: '280g',
      dimensions: '130mm x 80mm x 40mm',
      materials: ['Carbon-fiber reinforced PETG', 'Aluminum Heat Spreader'],
      cadNotes: 'Custom weather-sealed enclosure with quick tripod mount socket.'
    },
    hardware: [
      { name: 'RF Module', spec: 'Semtech SX1262 868/915MHz LoRa Transceiver (+22dBm output)', qty: 1, purpose: 'Long-range RF communication' },
      { name: 'Core MCU', spec: 'ESP32-S3 with 8MB Flash & 2.4-inch Color TFT Display', qty: 1, purpose: 'Packet Decoding & WebSockets Server' }
    ],
    software: [
      { layer: 'RF Protocol', tech: 'Custom Low-Overhead Packet Protocol (RadioHead)', details: '15ms packet latency with CRC16 validation and dynamic frequency hopping.' }
    ],
    circuitDiagramUrl: '/images/events/ros2workshop.jpg',
    buildProcess: [
      'Prototyped SPI bus interface between ESP32-S3 and SX1262.',
      'Developed real-time serial telemetry dashboard in HTML5/WebSockets.',
      'Field tested over 1.2km non-line-of-sight on NIT Jalandhar campus.'
    ],
    testingNotes: 'Zero packet loss over 850m distance across concrete academic blocks.',
    challengesEncountered: [
      'Harmonic interference from high-power RC motor ESCs; solved by adding a 3rd order Butterworth low-pass LC filter on the 5V rail.'
    ],
    competitionResults: 'Deployed as official track telemetry node for [Club Invitational 2026].',
    galleryImages: [
      '/images/events/ros2workshop.jpg'
    ],
    teamMembers: [
      { name: '[Team Member 1]', role: 'RF Engineering & PCB Design' },
      { name: '[Team Member 2]', role: 'Firmware & WebSockets Hub' }
    ],
    specsSummary: {
      topSpeed: '1.2 km RF Range',
      batteryLife: '14 hours continuous telemetry',
      microcontroller: 'ESP32-S3',
      weight: '280g'
    },
    githubRepo: 'https://github.com/rtist-nitj/pitlink-lora-station'
  }
];
