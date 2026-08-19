import React from 'react';
import { TechnicalHeader } from '../common/TechnicalHeader';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Calendar, MapPin, Trophy, ArrowRight } from 'lucide-react';
import { Event } from '../../types';
import { formatDate } from '../../utils/cn';

interface LatestEventsProps {
  events: Event[];
}

export const LatestEvents: React.FC<LatestEventsProps> = ({ events }) => {
  const upcoming = events.filter((e) => !e.isPast).slice(0, 3);

  return (
    <section className="py-16 sm:py-24 border-b border-rtist-border relative bg-rtist-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <TechnicalHeader
            label="SECTION // 04: TRACK &amp; TOURNAMENTS"
            title="UPCOMING EVENTS &amp; SPRINT HEATS"
            subtitle="Register your college team, inspect technical rulebooks, and compete at NIT Jalandhar."
            className="mb-0"
          />

          <Button
            to="/events"
            variant="outline"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            className="mt-4 md:mt-0 self-start md:self-auto shrink-0"
          >
            VIEW ALL EVENTS
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map((evt) => (
            <Card
              key={evt.id}
              tag={evt.registrationOpen ? 'REGISTRATION // OPEN' : 'REGISTRATION // CLOSED'}
              className="flex flex-col overflow-hidden"
            >
              {/* Event Image */}
              <div className="relative h-44 bg-black/40 overflow-hidden">
                <img
                  src={evt.thumbnailUrl}
                  alt={evt.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rtist-card via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge variant="accent">{evt.category}</Badge>
                </div>
                {evt.prizePool && (
                  <div className="absolute bottom-2 right-3">
                    <Badge variant="amber" className="text-[10px]">
                      {evt.prizePool.split('+')[0]}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Event Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-rtist-accent transition-colors font-sans line-clamp-1">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-rtist-textMuted mt-1.5 line-clamp-2 leading-relaxed">
                    {evt.tagline}
                  </p>
                </div>

                {/* Event Metadata */}
                <div className="space-y-2 pt-2 border-t border-rtist-border font-mono text-xs text-rtist-textMuted">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-rtist-accent shrink-0" />
                    <span>{formatDate(evt.date)} • {evt.time.split('-')[0]}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rtist-cyan shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>

                  {evt.prizePool && (
                    <div className="flex items-center gap-2 text-rtist-amber">
                      <Trophy className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-semibold">{evt.prizePool}</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="pt-2 border-t border-rtist-border flex items-center justify-between">
                  <span className="text-[11px] font-mono text-rtist-green">
                    ● {evt.registeredTeamsCount || 10}+ Teams Ready
                  </span>
                  <Button
                    to={`/events/${evt.slug}`}
                    variant="secondary"
                    size="sm"
                    className="text-xs py-1.5 px-3"
                    icon={<ArrowRight className="w-3 h-3" />}
                  >
                    DETAILS
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
