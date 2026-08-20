import React, { useState, useEffect, useMemo } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { TechnicalHeader } from '../components/common/TechnicalHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Filter, Users, GraduationCap, Mail, Linkedin, Github } from 'lucide-react';
import { apiService } from '../services/api';
import { TeamMember, FacultyCoordinator, TeamDomain } from '../types';
import { teamData } from '../data/team';
import { facultyData } from '../data/faculty';

const DOMAINS: ('All' | TeamDomain)[] = [
  'All',
  'Executive',
  'Electronics',
  'Mechanical',
  'Software',
  'Event Management',
  'Design & Media'
];

export const Team: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(teamData);
  const [faculty, setFaculty] = useState<FacultyCoordinator[]>(facultyData);
  const [selectedDomain, setSelectedDomain] = useState<'All' | TeamDomain>('All');

  useEffect(() => {
    Promise.all([apiService.getTeam(), apiService.getFaculty()]).then(
      ([teamRes, facultyRes]) => {
        if (teamRes?.length) setTeam(teamRes);
        if (facultyRes?.length) setFaculty(facultyRes);
      }
    );
  }, []);

  const filteredTeam = useMemo(() => {
    if (selectedDomain === 'All') return team;
    return team.filter((m) => m.domain === selectedDomain);
  }, [team, selectedDomain]);

  return (
    <PageWrapper
      title="Team &amp; Faculty Coordinators"
      description="Meet the student engineers, domain leads, and faculty advisors behind RTIST at Dr. B.R. Ambedkar National Institute of Technology Jalandhar."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalHeader
          label="Faculty Members & Students"
          title="TEAM & FACULTY COORDINATORS"
          subtitle="A multidisciplinary engineering crew spanning mechanical, electronics, embedded firmware, and competition pit management."
        />

        {/* 1. Faculty Coordinators Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-rtist-cyan uppercase tracking-widest font-semibold pb-2 border-b border-rtist-border">
            <GraduationCap className="w-4 h-4" />
            <span>FACULTY ADVISORY BOARD // NIT JALANDHAR</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faculty.map((member) => (
              <Card
                key={member.id}
                tag="MENTOR // NIT JALANDHAR"
                className="p-6 flex flex-col sm:flex-row gap-5 items-center sm:items-start"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 overflow-hidden border border-rtist-border bg-black/40">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <Badge variant="cyan" size="sm">
                      {member.designation}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-white font-sans">
                    {member.name}
                  </h3>

                  <p className="text-xs font-mono text-rtist-accent flex items-center justify-center sm:justify-start gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                    <span>{member.department}</span>
                  </p>

                  {member.message && (
                    <p className="text-xs text-rtist-textMuted leading-relaxed pt-1 italic">
                      "{member.message}"
                    </p>
                  )}

                  {member.email && (
                    <div className="pt-2 flex items-center justify-center sm:justify-start gap-1.5 font-mono text-xs text-rtist-textMuted">
                      <Mail className="w-3.5 h-3.5 text-rtist-cyan shrink-0" />
                      <span>{member.email}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 2. Student Team Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-rtist-border">
            <div className="flex items-center gap-2 font-mono text-xs text-rtist-accent uppercase tracking-widest font-semibold">
              <Users className="w-4 h-4" />
              <span>STUDENT ENGINEERS &amp; DOMAIN LEADS</span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <div className="flex items-center gap-1 text-xs font-mono text-rtist-textMuted mr-1">
                <Filter className="w-3 h-3 text-rtist-accent" />
                <span>DOMAIN:</span>
              </div>
              {DOMAINS.map((domain) => (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-2.5 py-0.5 text-xs font-mono border transition-colors ${
                    selectedDomain === domain
                      ? 'bg-rtist-accent text-white border-rtist-accent'
                      : 'bg-rtist-surface text-rtist-textMuted border-rtist-border hover:text-white'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTeam.map((member) => (
              <Card
                key={member.id}
                tag={`DOMAIN // ${member.domain.toUpperCase()}`}
                className="p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative mb-4 overflow-hidden border border-rtist-border h-48 bg-black/40">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="accent" className="text-[10px]">
                        {member.batch}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white font-sans line-clamp-1">
                    {member.name}
                  </h3>

                  <p className="text-xs font-mono text-rtist-accent mt-0.5 mb-1 font-medium">
                    {member.role}
                  </p>

                  <p className="text-xs text-rtist-textMuted mb-3">
                    {member.branch}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.expertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono bg-rtist-surface text-rtist-textMuted px-1.5 py-0.5 border border-rtist-border"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-rtist-border flex items-center justify-between text-xs font-mono text-rtist-textMuted">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-rtist-accent" />
                    CORE
                  </span>
                  <div className="flex items-center gap-2">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-rtist-accent transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.githubUrl && (
                      <a
                        href={member.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-rtist-cyan transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
