import React from 'react';
import { TechnicalHeader } from '../common/TechnicalHeader';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Trophy, Calendar, MapPin } from 'lucide-react';
import { Achievement } from '../../types';
import { Link } from 'react-router-dom';

interface AchievementsPreviewProps {
  achievements: Achievement[];
}

export const AchievementsPreview: React.FC<AchievementsPreviewProps> = ({ achievements }) => {
  const latestAchievements = achievements.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 border-b border-rtist-border relative bg-rtist-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <TechnicalHeader
            label="SECTION // 05: TRACK RECORDS"
            title="COMPETITIVE PODIUMS &amp; WINS"
            subtitle="A chronological record of our tournament performance and technical jury awards."
            className="mb-0"
          />

          <Link
            to="/achievements"
            className="mt-4 md:mt-0 font-mono text-xs text-rtist-accent hover:text-white flex items-center gap-1.5 font-semibold"
          >
            VIEW COMPLETE TIMELINE &gt;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestAchievements.map((item) => (
            <Card key={item.id} tag={`YEAR // ${item.year}`} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="amber" dot={true}>
                    {item.position}
                  </Badge>
                  <span className="text-xs font-mono text-rtist-textMuted flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.year}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 font-sans line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs font-mono text-rtist-accent mb-2">
                  {item.competition}
                </p>

                <p className="text-xs text-rtist-textMuted leading-relaxed line-clamp-3 mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-rtist-border space-y-1.5 text-[11px] font-mono text-rtist-textMuted">
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-3 h-3 text-rtist-cyan shrink-0" />
                  <span className="truncate">{item.venue}</span>
                </div>
                {item.prizeMoney && (
                  <div className="flex items-center gap-2 text-rtist-green">
                    <Trophy className="w-3 h-3 shrink-0" />
                    <span>{item.prizeMoney}</span>
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
