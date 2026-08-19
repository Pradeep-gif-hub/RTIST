import React from 'react';
import { TechnicalHeader } from '../common/TechnicalHeader';
import { Card } from '../common/Card';
import { Zap, Shield, Navigation, Cpu, Disc, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WhatWeDo: React.FC = () => {
  const domains = [
    {
      icon: <Zap className="w-6 h-6 text-rtist-accent" />,
      tag: 'POWERTRAIN // 120A',
      title: 'RC Car Racing & Sprint Chassis',
      description: 'Designing custom carbon-fiber and CNC aluminum double-deck chassis, tuned oil coilover suspension, and high-frequency 3S brushless powertrains hitting 75+ km/h.',
      link: '/builds?category=RC+Cars',
      metrics: '1/10 & 1/8 Scale • 4WD Belt Drive'
    },
    {
      icon: <Shield className="w-6 h-6 text-rtist-amber" />,
      tag: 'COMBAT // 3KG DOHYO',
      title: 'Combat Robotics & SumoBots',
      description: 'Forging Grade 5 Titanium wedge scoops, neodymium magnetic downforce arrays, and sub-10ms optical edge detection state machines for full-contact combat.',
      link: '/builds?category=Robo+Sumo',
      metrics: '18 Nm Peak Stall • Ti-6Al-4V Blade'
    },
    {
      icon: <Navigation className="w-6 h-6 text-rtist-cyan" />,
      tag: 'AUTONOMOUS // ROS 2',
      title: 'Autonomous SLAM & LiDAR Rovers',
      description: 'Deploying Cartographer SLAM, Nav2 costmaps, Intel RealSense depth vision, and micro-ROS hardware controllers on differential rovers in GPS-denied environments.',
      link: '/builds?category=Autonomous+Robots',
      metrics: '360° RPLiDAR • Jetson Orin AI'
    },
    {
      icon: <Eye className="w-6 h-6 text-rtist-green" />,
      tag: 'OPTICAL // 2KHZ PID',
      title: 'High-Speed Line Followers',
      description: '16-channel analog infrared reflectance arrays with integrated FR4 PCB chassis and microsecond predictive heading PID algorithms.',
      link: '/builds?category=Line+Followers',
      metrics: '2.8 m/s Top Velocity • 210g Total'
    },
    {
      icon: <Cpu className="w-6 h-6 text-rtist-accent" />,
      tag: 'EMBEDDED // FREERTOS',
      title: 'Embedded Systems & Custom PCBs',
      description: 'Designing multi-layer SMD circuit boards in KiCad, writing register-level C/C++ firmware, and architecting real-time FreeRTOS multi-core telemetry pipelines.',
      link: '/builds?category=Embedded+Systems',
      metrics: 'STM32 ARM • ESP32 Dual Core'
    },
    {
      icon: <Disc className="w-6 h-6 text-rtist-cyan" />,
      tag: 'HOLONOMIC // 3-AXIS',
      title: 'Omni Robo Soccer Systems',
      description: 'Holonomic 3-wheel omni-directional drive bases with 300V high-voltage capacitor-discharged solenoid ball kickers and low-latency wireless controllers.',
      link: '/builds?category=Robo+Soccer',
      metrics: '360° Vector Drive • 4.5 m/s Kick'
    }
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-rtist-border relative bg-rtist-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalHeader
          label="SECTION // 01: ENGINEERING DISCIPLINES"
          title="WHAT WE DESIGN &amp; BUILD"
          subtitle="RTIST is focused on raw mechanical fabrication, electrical hardware design, and low-level firmware engineering. Here are our core operational domains."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((item, idx) => (
            <Card key={idx} tag={item.tag} className="p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-rtist-surface border border-rtist-border flex items-center justify-center mb-4 group-hover:border-rtist-accent/60 transition-colors">
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-sans group-hover:text-rtist-accent transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-rtist-textMuted leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-rtist-border flex items-center justify-between font-mono text-xs">
                <span className="text-rtist-textMuted">{item.metrics}</span>
                <Link
                  to={item.link}
                  className="text-rtist-accent hover:text-white transition-colors flex items-center gap-1"
                >
                  VIEW &gt;
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
