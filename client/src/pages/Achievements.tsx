import React, { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { TechnicalHeader } from '../components/common/TechnicalHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Trophy, Calendar, MapPin, Users, Award } from 'lucide-react';
import { apiService } from '../services/api';
import { Achievement } from '../types';
import { achievementsData } from '../data/achievements';

export const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(achievementsData);

  useEffect(() => {
    apiService.getAchievements().then((data) => {
      if (data?.length) setAchievements(data);
    });
  }, []);

  return (
    <PageWrapper
      title="Achievements Timeline"
      description="Chronological record of RTIST's tournament victories, fastest lap records, and technical jury innovation awards."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalHeader
          label="TIMELINE // PODIUMS &amp; TROPHIES"
          title="COMPETITIVE TRACK RECORD &amp; AWARDS"
          subtitle="A verified chronological record of our robotics performance in inter-collegiate, state, and national tournaments."
        />

        {/* Milestones Overview Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="bg-rtist-card p-4 border border-rtist-border text-center">
            <Trophy className="w-6 h-6 text-rtist-amber mx-auto mb-1" />
            <div className="text-2xl font-bold font-mono text-white">18+</div>
            <div className="text-[10px] font-mono text-rtist-textMuted uppercase">Podium Finishes</div>
          </div>

          <div className="bg-rtist-card p-4 border border-rtist-border text-center">
            <Award className="w-6 h-6 text-rtist-accent mx-auto mb-1" />
            <div className="text-2xl font-bold font-mono text-rtist-accent">5+</div>
            <div className="text-[10px] font-mono text-rtist-textMuted uppercase">Championship Titles</div>
          </div>
        </div>

        {/* Chronological Timeline */}
        <div className="relative border-l-2 border-rtist-border pl-6 sm:pl-8 ml-3 sm:ml-6 space-y-12">
          {achievements.map((item) => (
            <div key={item.id} className="relative">
              {/* Timeline Marker Bullet */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 bg-rtist-accent border-4 border-rtist-bg rounded-none shadow-[0_0_8px_#FF5500]" />

              <Card tag={`YEAR // ${item.year}`} className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="amber" dot={true}>
                      {item.position}
                    </Badge>
                    <Badge variant="muted">{item.category}</Badge>
                  </div>

                  <span className="text-xs font-mono text-rtist-textMuted flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rtist-cyan" />
                    {item.year}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-sans">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono text-rtist-accent font-semibold mt-1">
                    {item.competition}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-rtist-textMuted leading-relaxed bg-rtist-surface p-4 border border-rtist-border">
                  {item.description}
                </p>

                {/* Metadata Row */}
                <div className="pt-3 border-t border-rtist-border flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-rtist-textMuted">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rtist-cyan shrink-0" />
                    <span>{item.venue}</span>
                  </div>

                  {item.prizeMoney && (
                    <div className="flex items-center gap-1.5 text-rtist-green font-semibold">
                      <Trophy className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.prizeMoney}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-rtist-text">
                    <Users className="w-3.5 h-3.5 text-rtist-accent shrink-0" />
                    <span>Team: {item.team.join(', ')}</span>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};
