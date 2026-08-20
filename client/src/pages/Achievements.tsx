import React, { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { TechnicalHeader } from '../components/common/TechnicalHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { MapPin, Zap } from 'lucide-react';
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
      title="National Participation"
      description="RTIST's engagement with India's premier technical festivals and national-level robotics platforms, representing NIT Jalandhar across the collegiate engineering ecosystem."
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalHeader
          label="Beyond Campus"
          title="Rtist on the national robotics stage"
          subtitle="From campus competitions to national-level technical festivals, RTIST has taken its engineering, robotics, and problem-solving skills beyond NIT Jalandhar, competing and learning alongside teams from premier institutes across India."
        />

        {/* National Participation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {achievements.map((item) => (
            <div key={item.id}>
              <Card tag={`${item.year}`} className="h-full p-6 sm:p-8 space-y-4 flex flex-col">
                {/* Title and Venue Section */}
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                    {item.title}
                  </h3>
                  
                  <div className="text-xs font-mono text-rtist-accent font-semibold">
                    {item.competition}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-rtist-textMuted">
                    <MapPin className="w-3.5 h-3.5 text-rtist-cyan shrink-0" />
                    <span>{item.venue}</span>
                  </div>
                </div>

                {/* Position Badge */}
                <div className="flex gap-2">
                  <Badge variant="amber" dot={true}>
                    {item.position}
                  </Badge>
                  <Badge variant="muted">{item.category}</Badge>
                </div>

                {/* Description - Takes up remaining space */}
                <p className="text-xs sm:text-sm text-rtist-textMuted leading-relaxed flex-grow">
                  {item.description}
                </p>

                {/* Tags/Technology Row */}
                <div className="pt-4 border-t border-rtist-border">
                  <div className="flex flex-wrap gap-2">
                    {item.category === 'National Technical Platform' && (
                      <>
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono bg-rtist-surface border border-rtist-border text-rtist-cyan rounded">
                          <Zap className="w-2.5 h-2.5" />
                          Robotics
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono bg-rtist-surface border border-rtist-border text-rtist-cyan rounded">
                          <Zap className="w-2.5 h-2.5" />
                          Competition
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono bg-rtist-surface border border-rtist-border text-rtist-cyan rounded">
                          <Zap className="w-2.5 h-2.5" />
                          Embedded Systems
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* National Reach Section */}
        <div className="mt-16 pt-12 border-t border-rtist-border">
          <div className="bg-rtist-card p-8 border border-rtist-border">
            <h2 className="text-lg sm:text-xl font-bold text-white font-sans mb-4">
              RTIST on India's Robotics Circuit
            </h2>
            <p className="text-sm sm:text-base text-rtist-textMuted leading-relaxed">
              These five national-level platforms represent RTIST's commitment to engaging with India's premier technical and robotics ecosystem. From IIT Ropar's Advitiya to IIT Bombay's Techfest, and beyond, each participation has strengthened our technical expertise, expanded our network across the country, and demonstrated NIT Jalandhar's prominence in the collegiate robotics community. Our engagement across these platforms spans multiple robotics domains—autonomous systems, RC racing, combat robotics, line-following challenges, and embedded systems—showcasing the breadth and depth of RTIST's engineering capabilities.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
