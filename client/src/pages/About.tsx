import { PageWrapper } from '../components/layout/PageWrapper';
import { TechnicalHeader } from '../components/common/TechnicalHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  Wrench,
  Shield,
  HelpCircle,
  ArrowRight,
  Terminal
} from 'lucide-react';

export const About: React.FC = () => {
  const machinery = [
    { name: 'CNC Milling & Lathe Machine', desc: 'Precision machining of 6061-T6 aluminum bulkheads, Titanium wedges, and custom motor mounts.' },
    { name: 'High-Temp FDM 3D Printers', desc: 'Fabricating lightweight PETG, Carbon-Fiber Nylon, and flexible TPU bumpers with 0.12mm layer resolution.' },
    { name: 'SMD Reflow & Soldering Bench', desc: 'Hakko FX-888D stations, hot air rework guns, digital microscopes, and solder paste stencils for 0402 SMD and QFN packages.' },
    { name: '100MHz Digital Oscilloscopes & Logic Analyzers', desc: 'Debugging SPI, I2C, UART, and PWM jitter on brushless motor ESCs and telemetry nodes.' },
    { name: '154cm Steel Dohyo Combat Ring', desc: 'Official Japanese robot sumo regulation steel dohyo for magnetic ground-effect testing and autonomous battle scrimmages.' },
    { name: '180m Asphalt RC Test Track & Gate Transponders', desc: 'NIT Jalandhar Central Track arena equipped with optical lap timing gates accurate to 10 milliseconds.' },
  ];

  const pillars = [
    {
      title: 'HANDS-ON HARDWARE OVER SIMULATION',
      desc: 'Simulations in MATLAB and Gazebo are useful starting points, but physical robots live or die in real physics. We prioritize turning screwdrivers, soldering real pads, and testing on physical tracks.'
    },
    {
      title: 'FAIL FAST, REPAIR FASTER',
      desc: 'Breaking parts during extreme track testing is not a failure — it is telemetry. We diagnose the fracture point, beef up the carbon top deck, adjust the ESC timing curve, and race again.'
    },
    {
      title: 'OPEN ENGINEERING & PEER MENTORSHIP',
      desc: 'Every senior member trains junior recruits on circuit design, CAD modeling, and C firmware. We document our learnings in RTIST Lab so future batches can build faster and better.'
    }
  ];

  const faqs = [
    {
      q: 'Do I need prior robotics experience or hardware skills to join RTIST?',
      a: 'No. For first-year students, curiosity, consistency, and a strong work ethic matter far more than existing knowledge. We conduct structured training bootcamps covering KiCad, SolidWorks, and Embedded C.'
    },
    {
      q: 'Which academic branches are eligible to apply?',
      a: 'All undergraduate and postgraduate branches at NIT Jalandhar are welcome. Robotics requires mechanical designers, electronics engineers, firmware programmers, tournament organizers, and media creators.'
    },
    {
      q: 'How much time commitment is expected from club members?',
      a: 'During regular weeks, members spend 6 to 10 hours in the workshop. Ahead of major national tournaments or hosting the RC Gran Prix, pit sessions often extend into late evenings.'
    },
    {
      q: 'Where is the RTIST workshop located on campus?',
      a: 'Our workshop and testing lab are situated on the Ground Floor of the Department of Mechanical Engineering / Central Workshop Complex at NIT Jalandhar.'
    }
  ];

  return (
    <PageWrapper
      title="About RTIST"
      description="Learn about RTIST, the robotics and technology club of NIT Jalandhar. Discover our workshop ethos, machine shop facilities, and engineering philosophy."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalHeader
          label="ORIGINS &amp; ETHOS // NIT JALANDHAR"
          title="ABOUT THE RTIST ROBOTICS WORKSHOP"
          subtitle="We design, build, test, break, repair, and compete with high-speed RC vehicles, combat robots, and autonomous systems."
        />

        {/* 1. Ethos Hero Box */}
        <div className="bg-rtist-card border border-rtist-border p-6 sm:p-10 tech-bracket mb-16 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-rtist-accent uppercase tracking-widest font-semibold">
            <Terminal className="w-4 h-4" />
            <span>OUR MISSION STATEMENT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans uppercase leading-snug">
            BUILD. TEST. RACE. REPEAT.
          </h2>

          <p className="text-sm sm:text-base text-rtist-textMuted leading-relaxed max-w-4xl">
            RTIST is a student-driven collegiate engineering club founded at Dr. B.R. Ambedkar National Institute of Technology Jalandhar. We do not build static science fair models — we build competitive machines that race at 75+ km/h on asphalt circuits, trade blows on steel combat arenas, and autonomously navigate complex real-world terrain using LiDAR and depth vision.
          </p>

          <div className="pt-4 border-t border-rtist-border grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-rtist-surface p-3 border border-rtist-border text-center">
              <span className="text-rtist-textMuted uppercase text-[10px]">CAMPUS LOCATION</span>
              <div className="text-white font-bold mt-1">NIT Jalandhar, Punjab</div>
            </div>
            <div className="bg-rtist-surface p-3 border border-rtist-border text-center">
              <span className="text-rtist-textMuted uppercase text-[10px]">CORE EMPHASIS</span>
              <div className="text-rtist-accent font-bold mt-1">Hardware Engineering</div>
            </div>
            <div className="bg-rtist-surface p-3 border border-rtist-border text-center">
              <span className="text-rtist-textMuted uppercase text-[10px]">MEMBERSHIP</span>
              <div className="text-rtist-green font-bold mt-1">Student Operated</div>
            </div>
          </div>
        </div>

        {/* 2. Core Pillars */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-rtist-accent uppercase tracking-widest font-semibold pb-2 border-b border-rtist-border">
            <Shield className="w-4 h-4" />
            <span>CORE ENGINEERING PILLARS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, idx) => (
              <Card key={idx} tag={`PILLAR // 0${idx + 1}`} className="p-6 space-y-3">
                <h3 className="text-base font-bold text-white font-sans uppercase">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-rtist-textMuted leading-relaxed">
                  {p.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* 3. Workshop Facilities & Machinery */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-rtist-cyan uppercase tracking-widest font-semibold pb-2 border-b border-rtist-border">
            <Wrench className="w-4 h-4" />
            <span>LAB INFRASTRUCTURE &amp; FABRICATION TOOLS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {machinery.map((m, idx) => (
              <div key={idx} className="bg-rtist-card p-5 border border-rtist-border space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs text-rtist-accent font-semibold">
                  <span className="w-1.5 h-1.5 bg-rtist-accent" />
                  <span>{m.name}</span>
                </div>
                <p className="text-xs text-rtist-textMuted leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Frequently Asked Questions */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-rtist-green uppercase tracking-widest font-semibold pb-2 border-b border-rtist-border">
            <HelpCircle className="w-4 h-4" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-rtist-card p-6 border border-rtist-border space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-white font-sans flex items-start gap-2">
                  <span className="text-rtist-accent font-mono">Q{idx + 1}:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-rtist-textMuted leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-rtist-surface p-8 border border-rtist-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white font-sans uppercase">
              READY TO BUILD WITH US?
            </h3>
            <p className="text-xs text-rtist-textMuted mt-1">
              Apply in our open recruitment drive for 1st, 2nd, and 3rd year students.
            </p>
          </div>
          <Button to="/join" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            SUBMIT APPLICATION
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};
