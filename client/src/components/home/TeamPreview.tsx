import React from 'react';
import { TechnicalHeader } from '../common/TechnicalHeader';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ArrowRight, Users, Linkedin, Github } from 'lucide-react';
import { TeamMember } from '../../types';

interface TeamPreviewProps {
  team: TeamMember[];
}

export const TeamPreview: React.FC<TeamPreviewProps> = ({ team }) => {
  const coreLeads = team.slice(0, 4);

  return (
    <section className="py-16 sm:py-24 border-b border-rtist-border relative bg-rtist-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <TechnicalHeader
            label="SECTION // 06: CLUB ENGINEERS"
            title="STUDENT LEADERSHIP &amp; DOMAIN LEADS"
            subtitle="The student engineers responsible for chassis machining, circuit layout, and race day pit coordination."
            className="mb-0"
          />

          <Button
            to="/team"
            variant="outline"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            className="mt-4 md:mt-0 self-start md:self-auto shrink-0"
          >
            MEET FULL TEAM ({team.length})
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreLeads.map((member) => (
            <Card key={member.id} tag={`DOMAIN // ${member.domain.toUpperCase()}`} className="p-5 flex flex-col justify-between">
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
                  {member.expertise.slice(0, 2).map((exp, idx) => (
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
    </section>
  );
};
