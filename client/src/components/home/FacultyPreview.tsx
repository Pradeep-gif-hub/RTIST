import React from 'react';
import { TechnicalHeader } from '../common/TechnicalHeader';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Mail, GraduationCap } from 'lucide-react';
import { FacultyCoordinator } from '../../types';

interface FacultyPreviewProps {
  faculty: FacultyCoordinator[];
}

export const FacultyPreview: React.FC<FacultyPreviewProps> = ({ faculty }) => {
  return (
    <section className="py-16 sm:py-24 border-b border-rtist-border relative bg-rtist-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalHeader
          label="SECTION // 07: FACULTY ADVISORY"
          title="FACULTY COORDINATORS &amp; MENTORS"
          subtitle="Academic guidance, lab infrastructure support, and research mentorship at Dr. B.R. Ambedkar National Institute of Technology Jalandhar."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {faculty.map((member) => (
            <Card
              key={member.id}
              tag="MENTOR // NIT JALANDHAR"
              className="p-6 flex flex-col sm:flex-row gap-5 items-center sm:items-start"
            >
              {/* Photo */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 overflow-hidden border border-rtist-border bg-black/40">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Details */}
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
    </section>
  );
};
