import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  ShieldCheck,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Mail,
  UserCheck
} from 'lucide-react';
import { apiService } from '../services/api';
import { Event } from '../types';
import { eventsData } from '../data/events';
import { formatDate } from '../utils/cn';

export const EventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [regFormData, setRegFormData] = useState({
    teamName: '',
    leadName: '',
    leadEmail: '',
    leadPhone: '',
    college: '',
    memberCount: '3',
  });

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    apiService.getEventBySlug(slug).then((data) => {
      if (data) {
        setEvent(data);
      } else {
        const fallback = eventsData.find((e) => e.slug === slug);
        if (fallback) setEvent(fallback);
      }
      setLoading(false);
    });
  }, [slug]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationSubmitted(true);
  };

  if (loading) {
    return (
      <PageWrapper title="Loading Event...">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono text-xs text-rtist-accent">
          RETRIEVING TOURNAMENT SCRUTINEERING &amp; TIMELINE DATA...
        </div>
      </PageWrapper>
    );
  }

  if (!event) {
    return (
      <PageWrapper title="Event Not Found">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
          <div className="text-xl font-mono text-rtist-accent uppercase">
            [ ERROR 404: EVENT_ENTRY_NOT_FOUND ]
          </div>
          <p className="text-sm text-rtist-textMuted">
            The requested robotics tournament or workshop does not exist in the schedule.
          </p>
          <Button to="/events" variant="primary" icon={<ChevronLeft className="w-4 h-4" />} iconPosition="left">
            BACK TO EVENTS LISTING
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title={event.title}
      description={event.description}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 font-mono text-xs text-rtist-textMuted">
          <Link to="/events" className="hover:text-rtist-accent transition-colors flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            EVENTS SCHEDULE
          </Link>
          <span>/</span>
          <span className="text-rtist-accent uppercase">{event.category}</span>
          <span>/</span>
          <span className="text-white truncate max-w-xs">{event.title}</span>
        </div>

        {/* Hero Header */}
        <div className="bg-rtist-card border border-rtist-border p-6 sm:p-8 tech-bracket mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{event.category}</Badge>
              <Badge
                variant={event.isPast ? 'muted' : event.registrationOpen ? 'green' : 'amber'}
                dot={true}
              >
                {event.isPast ? 'CONCLUDED' : event.registrationOpen ? 'REGISTRATION OPEN' : 'REGISTRATION CLOSED'}
              </Badge>
            </div>

            {event.fee && (
              <div className="font-mono text-xs text-rtist-textMuted bg-rtist-surface px-3 py-1 border border-rtist-border">
                ENTRY FEE: <span className="text-white font-semibold">{event.fee}</span>
              </div>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white uppercase font-sans leading-tight">
            {event.title}
          </h1>

          <p className="text-sm sm:text-base text-rtist-textMuted mt-3 max-w-3xl leading-relaxed">
            {event.tagline}
          </p>

          {/* Quick Event Metadata Ribbon */}
          <div className="mt-6 pt-6 border-t border-rtist-border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="bg-rtist-surface p-3 border border-rtist-border space-y-1">
              <div className="text-[10px] text-rtist-textMuted flex items-center gap-1">
                <Calendar className="w-3 h-3 text-rtist-accent" /> EVENT DATE
              </div>
              <div className="text-sm font-bold text-white">{formatDate(event.date)}</div>
            </div>

            <div className="bg-rtist-surface p-3 border border-rtist-border space-y-1">
              <div className="text-[10px] text-rtist-textMuted flex items-center gap-1">
                <Clock className="w-3 h-3 text-rtist-cyan" /> TIMING
              </div>
              <div className="text-sm font-bold text-white">{event.time}</div>
            </div>

            <div className="bg-rtist-surface p-3 border border-rtist-border space-y-1">
              <div className="text-[10px] text-rtist-textMuted flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rtist-green" /> VENUE
              </div>
              <div className="text-sm font-bold text-white truncate">{event.venue}</div>
            </div>

            {event.prizePool && (
              <div className="bg-rtist-surface p-3 border border-rtist-border space-y-1">
                <div className="text-[10px] text-rtist-textMuted flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-rtist-amber" /> TOTAL PRIZE POOL
                </div>
                <div className="text-sm font-bold text-rtist-amber truncate">{event.prizePool}</div>
              </div>
            )}
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Description */}
            <Card tag="TOURNAMENT BRIEF" className="p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                <FileText className="w-5 h-5 text-rtist-accent" />
                EVENT OVERVIEW
              </h3>
              <p className="text-sm text-rtist-textMuted leading-relaxed">
                {event.description}
              </p>
            </Card>

            {/* 2. Official Rules & Scrutineering Specifications */}
            <Card tag="SCRUTINEERING RULES" className="p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-rtist-accent" />
                TECHNICAL RULES &amp; SAFETY SPECIFICATIONS
              </h3>

              <div className="space-y-2.5">
                {event.rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-rtist-surface border border-rtist-border flex items-start gap-3 text-xs sm:text-sm text-rtist-text leading-relaxed"
                  >
                    <span className="font-mono text-rtist-accent font-bold mt-0.5">
                      [{String(idx + 1).padStart(2, '0')}]
                    </span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* 3. Schedule Timeline */}
            <Card tag="TIMELINE // HEATS" className="p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                <Clock className="w-5 h-5 text-rtist-cyan" />
                EVENT SCHEDULE &amp; RACE HEATS
              </h3>

              <div className="relative border-l border-rtist-border pl-6 ml-3 space-y-6">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-3 h-3 bg-rtist-accent rounded-none border border-black" />
                    <div className="font-mono text-xs text-rtist-accent font-semibold mb-1">
                      {item.time}
                    </div>
                    <div className="text-sm font-bold text-white font-sans">{item.title}</div>
                    <div className="text-xs text-rtist-textMuted mt-1 leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 4. Past Winners (If Concluded) */}
            {event.winners && event.winners.length > 0 && (
              <Card tag="PODIUM RESULTS" className="p-6 sm:p-8 space-y-4 border-rtist-amber/40">
                <h3 className="text-lg font-bold text-white font-sans uppercase flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-rtist-amber" />
                  TOURNAMENT PODIUM &amp; WINNERS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {event.winners.map((win, idx) => (
                    <div key={idx} className="bg-rtist-surface p-4 border border-rtist-border text-center space-y-1">
                      <Badge variant="amber" size="sm">
                        {win.position}
                      </Badge>
                      <div className="text-sm font-bold text-white pt-1">{win.teamName}</div>
                      <div className="text-xs font-mono text-rtist-textMuted">{win.college}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Sidebar: Registration Form & Coordinators */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Registration Card */}
            {!event.isPast && event.registrationOpen ? (
              <Card tag="TEAM REGISTRATION" className="p-6 space-y-4 border-rtist-accent/40">
                <h3 className="text-base font-bold text-white font-sans uppercase flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-rtist-accent" />
                  SLOT REGISTRATION
                </h3>

                {registrationSubmitted ? (
                  <div className="bg-rtist-surface p-4 border border-rtist-green text-center space-y-2">
                    <CheckCircle className="w-8 h-8 text-rtist-green mx-auto" />
                    <div className="text-xs font-mono text-white font-bold uppercase">
                      REGISTRATION CONFIRMED
                    </div>
                    <p className="text-[11px] text-rtist-textMuted font-mono">
                      Your team ({regFormData.teamName || 'Slot'}) has been registered. You will receive technical scrutineering confirmation on {regFormData.leadEmail || 'email'}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-3 font-mono text-xs">
                    <div>
                      <label className="text-rtist-textMuted block mb-1 text-[11px] uppercase">
                        Team / Robot Name:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Nitro Racing"
                        value={regFormData.teamName}
                        onChange={(e) => setRegFormData({ ...regFormData, teamName: e.target.value })}
                        className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                      />
                    </div>

                    <div>
                      <label className="text-rtist-textMuted block mb-1 text-[11px] uppercase">
                        Team Captain Name:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={regFormData.leadName}
                        onChange={(e) => setRegFormData({ ...regFormData, leadName: e.target.value })}
                        className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                      />
                    </div>

                    <div>
                      <label className="text-rtist-textMuted block mb-1 text-[11px] uppercase">
                        Captain Email:
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="captain@college.edu"
                        value={regFormData.leadEmail}
                        onChange={(e) => setRegFormData({ ...regFormData, leadEmail: e.target.value })}
                        className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                      />
                    </div>

                    <div>
                      <label className="text-rtist-textMuted block mb-1 text-[11px] uppercase">
                        College / Institution:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. NIT Jalandhar"
                        value={regFormData.college}
                        onChange={(e) => setRegFormData({ ...regFormData, college: e.target.value })}
                        className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full text-xs"
                      >
                        SUBMIT TEAM ENTRY
                      </Button>
                    </div>

                    <div className="text-[10px] text-rtist-textMuted text-center pt-1">
                      No upfront payment required for slot reservation.
                    </div>
                  </form>
                )}
              </Card>
            ) : (
              <Card tag="STATUS" className="p-6 space-y-3 text-center">
                <AlertCircle className="w-8 h-8 text-rtist-amber mx-auto" />
                <div className="text-sm font-bold text-white font-sans uppercase">
                  REGISTRATION CLOSED
                </div>
                <p className="text-xs text-rtist-textMuted leading-relaxed">
                  {event.isPast
                    ? 'This competition has concluded. Check out our upcoming events calendar.'
                    : 'The registration deadline for this event has passed or team capacity has been reached.'}
                </p>
                <Button to="/events" variant="outline" size="sm" className="w-full">
                  VIEW OTHER EVENTS
                </Button>
              </Card>
            )}

            {/* Event Coordinators */}
            <Card tag="CONTACT // MARSHALLS" className="p-5 space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                <Users className="w-4 h-4 text-rtist-accent" />
                EVENT COORDINATORS
              </h4>

              <div className="space-y-2.5">
                {event.coordinators.map((coord, idx) => (
                  <div key={idx} className="p-3 bg-rtist-surface border border-rtist-border text-xs font-mono space-y-1">
                    <div className="font-semibold text-white">{coord.name}</div>
                    <div className="text-rtist-accent text-[11px]">{coord.role}</div>
                    {coord.contact && (
                      <div className="text-rtist-textMuted text-[10px] flex items-center gap-1 pt-1">
                        <Mail className="w-3 h-3 text-rtist-cyan shrink-0" />
                        <span>{coord.contact}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Eligibility Checklist */}
            <Card tag="ELIGIBILITY" className="p-5 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rtist-green" />
                WHO CAN COMPETE?
              </h4>

              <ul className="space-y-2 font-mono text-xs text-rtist-textMuted">
                {event.eligibility.map((el, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-rtist-green shrink-0 mt-0.5" />
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-rtist-border flex items-center justify-between">
          <Button
            to="/events"
            variant="outline"
            size="md"
            icon={<ChevronLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            BACK TO ALL EVENTS
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};
