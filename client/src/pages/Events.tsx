import React, { useState, useEffect, useMemo } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { TechnicalHeader } from '../components/common/TechnicalHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Calendar, MapPin, Trophy, ArrowRight, Filter } from 'lucide-react';
import { apiService } from '../services/api';
import { Event, EventCategory } from '../types';
import { eventsData } from '../data/events';
import { formatDate } from '../utils/cn';

const CATEGORIES: ('All' | EventCategory)[] = [
  'All',
  'RC Car',
  'Robo Sumo',
  'Robo Soccer',
  'Line Follower',
  'Workshop',
  'Other'
];

export const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(eventsData);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedCategory, setSelectedCategory] = useState<'All' | EventCategory>('All');

  useEffect(() => {
    apiService.getEvents().then((data) => {
      if (data?.length) setEvents(data);
    });
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesTab = activeTab === 'upcoming' ? !evt.isPast : evt.isPast;
      const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
      return matchesTab && matchesCategory;
    });
  }, [events, activeTab, selectedCategory]);

  return (
    <PageWrapper
      title="Events &amp; Tournaments"
      description="Compete in high-speed RC Car sprint heats, 3kg combat sumobot battles, optical line follower leagues, and hands-on robotics workshops at NIT Jalandhar."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalHeader
          label="Build .. Test .. Race .."
          title="EVENTS, TIME TRIALS &amp; WORKSHOPS"
          subtitle="Explore upcoming sprint championships, hands-on embedded workshops, and past tournament podium finishes."
        />

        {/* Tab & Filter Bar */}
        <div className="bg-rtist-card border border-rtist-border p-4 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Tab Switches */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`flex-1 sm:flex-initial px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider border transition-colors ${
                  activeTab === 'upcoming'
                    ? 'bg-rtist-accent text-white border-rtist-accent shadow-[0_0_10px_rgba(255,85,0,0.3)]'
                    : 'bg-rtist-surface text-rtist-textMuted border-rtist-border hover:text-white'
                }`}
              >
                UPCOMING EVENTS ({events.filter((e) => !e.isPast).length})
              </button>

              <button
                onClick={() => setActiveTab('past')}
                className={`flex-1 sm:flex-initial px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider border transition-colors ${
                  activeTab === 'past'
                    ? 'bg-rtist-accent text-white border-rtist-accent shadow-[0_0_10px_rgba(255,85,0,0.3)]'
                    : 'bg-rtist-surface text-rtist-textMuted border-rtist-border hover:text-white'
                }`}
              >
                PAST EVENTS ({events.filter((e) => e.isPast).length})
              </button>
            </div>

            <div className="text-xs font-mono text-rtist-textMuted self-end sm:self-auto">
              SHOWING: <span className="text-rtist-accent font-semibold">{filteredEvents.length}</span> EVENTS
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-rtist-border">
            <div className="flex items-center gap-1.5 text-xs font-mono text-rtist-textMuted mr-2 py-1">
              <Filter className="w-3.5 h-3.5 text-rtist-accent" />
              <span>CATEGORY:</span>
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-mono border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-rtist-accent text-white border-rtist-accent'
                    : 'bg-rtist-surface text-rtist-textMuted border-rtist-border hover:border-rtist-accent/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="bg-rtist-card border border-rtist-border p-12 text-center space-y-3">
            <div className="font-mono text-sm text-rtist-accent uppercase">
              NO {activeTab.toUpperCase()} EVENTS FOUND IN THIS CATEGORY
            </div>
            <p className="text-xs text-rtist-textMuted">
              Select "All" categories or check back soon for newly scheduled heats.
            </p>
            <Button
              onClick={() => setSelectedCategory('All')}
              variant="outline"
              size="sm"
            >
              SHOW ALL CATEGORIES
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <Card
                key={evt.id}
                tag={evt.isPast ? 'STATUS // CONCLUDED' : evt.registrationOpen ? 'REGISTRATION // OPEN' : 'REGISTRATION // CLOSED'}
                className="flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-black/40 overflow-hidden">
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

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-rtist-accent transition-colors font-sans line-clamp-1">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-rtist-textMuted line-clamp-2 leading-relaxed">
                      {evt.tagline}
                    </p>

                    {/* Metadata */}
                    <div className="space-y-2 pt-2 border-t border-rtist-border font-mono text-xs text-rtist-textMuted">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-rtist-accent shrink-0" />
                        <span>{formatDate(evt.date)} • {evt.time.split('-')[0]}</span>
                      </div>

                      <div className="flex items-center gap-2 truncate">
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
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-rtist-border flex items-center justify-between">
                    <span className="text-[11px] font-mono text-rtist-green">
                      {evt.isPast ? 'Results Finalized' : `● ${evt.registeredTeamsCount || 10}+ Teams Ready`}
                    </span>
                    <Button
                      to={`/events/${evt.slug}`}
                      variant={evt.isPast ? 'secondary' : 'primary'}
                      size="sm"
                      className="text-xs py-1.5 px-3"
                      icon={<ArrowRight className="w-3 h-3" />}
                    >
                      {evt.isPast ? 'VIEW RECAP' : 'REGISTER &amp; RULES'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};
