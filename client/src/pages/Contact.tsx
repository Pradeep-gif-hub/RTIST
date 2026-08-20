import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { TechnicalHeader } from '../components/common/TechnicalHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { MapPin, Mail, Clock, Send, CheckCircle, Terminal, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageWrapper
      title="Contact &amp; Workshop Location"
      description="Get in touch with the RTIST Robotics Club at NIT Jalandhar. Find workshop hours, campus coordinates, and pit inquiry forms."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalHeader
          label="DISPATCH // BASE STATION"
          title="CONTACT &amp; WORKSHOP LOCATION"
          subtitle="Direct communications channel for tournament invites, campus collaborations, sponsorship inquiries, and workshop visits."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Campus Info & Map */}
          <div className="lg:col-span-5 space-y-6">
            <Card tag="BASE STATION // NIT JALANDHAR" className="p-6 sm:p-8 space-y-6">
              <div className="space-y-4 font-mono text-xs text-rtist-textMuted">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-rtist-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-bold uppercase mb-1">
                      PHYSICAL WORKSHOP LOCATION
                    </div>
                    <p className="leading-relaxed">
                      RTIST Workshop &amp; Fabrication Lab<br />
                      Ground Floor, Department of Mechanical Engineering / Central Workshop Complex<br />
                      Dr. B.R. Ambedkar National Institute of Technology<br />
                      G.T. Road, Amritsar Bypass, Jalandhar, Punjab — 144008
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-rtist-border">
                  <Mail className="w-5 h-5 text-rtist-cyan shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-bold uppercase mb-1">
                      OFFICIAL INBOX
                    </div>
                    <p className="text-white">robotics@nitj.ac.in</p>
                    <p className="text-[11px] text-rtist-textMuted mt-0.5">
                      Response time: Within 24-48 hours during academic terms
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-rtist-border">
                  <Clock className="w-5 h-5 text-rtist-green shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-bold uppercase mb-1">
                      WORKSHOP OPERATING HOURS
                    </div>
                    <p>Monday – Saturday: 05:00 PM – 10:00 PM IST</p>
                    <p>Tournament Sprint Weeks: 24/7 Extended Pit Access</p>
                  </div>
                </div>
              </div>

              {/* Campus Map Graphic Placeholder */}
              <div className="relative h-48 bg-rtist-surface border border-rtist-border flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-blueprint-grid opacity-30" />
                <div className="relative z-10 space-y-2">
                  <Terminal className="w-8 h-8 text-rtist-accent mx-auto" />
                  <div className="text-xs font-mono text-white font-bold uppercase">
                    NIT JALANDHAR CAMPUS GRID
                  </div>
                  <a
                    href="https://maps.google.com/?q=NIT+Jalandhar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-rtist-accent hover:underline pt-1"
                  >
                    OPEN IN GOOGLE MAPS <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <Card tag="TRANSMIT MESSAGE" className="p-6 sm:p-8">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-rtist-green mx-auto" />
                  <h3 className="text-xl font-bold text-white font-sans uppercase">
                    MESSAGE TRANSMITTED
                  </h3>
                  <p className="text-xs sm:text-sm text-rtist-textMuted max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formState.name}</span>. Your inquiry has been routed to the RTIST executive desk.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', subject: '', message: '' });
                    }}
                    variant="outline"
                    size="sm"
                  >
                    SEND ANOTHER INQUIRY
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-rtist-textMuted block mb-1 uppercase text-[11px]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Singh"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                      />
                    </div>

                    <div>
                      <label className="text-rtist-textMuted block mb-1 uppercase text-[11px]">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-rtist-textMuted block mb-1 uppercase text-[11px]">
                      Subject / Topic *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tournament Invitation / Technical Collaboration"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-rtist-surface border border-rtist-border px-3 py-2 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                    />
                  </div>

                  <div>
                    <label className="text-rtist-textMuted block mb-1 uppercase text-[11px]">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your transmission details here..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-rtist-surface border border-rtist-border p-3 text-white placeholder-rtist-textMuted focus:outline-none focus:border-rtist-accent"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={<Send className="w-4 h-4" />}
                    >
                      SEND TRANSMISSION
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
