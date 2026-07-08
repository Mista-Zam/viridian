import { MapPin, Clock, Users } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const demoEvents = [
  {
    id: 'ev1',
    title: 'Organic Farming Workshop',
    date: '2026-05-15',
    time: '9:00 AM - 4:00 PM',
    location: 'Quezon City Agri Hub',
    description: 'Hands-on workshop on organic farming techniques including composting, natural pest control, and soil management.',
    attendees: 48,
  },
  {
    id: 'ev2',
    title: 'Smart Agriculture Expo 2026',
    date: '2026-05-22',
    time: '8:00 AM - 5:00 PM',
    location: 'SMX Convention Center, Manila',
    description: 'The largest agricultural technology exhibition featuring IoT solutions, drone demonstrations, and networking with industry experts.',
    attendees: 320,
  },
  {
    id: 'ev3',
    title: 'Young Farmers Summit',
    date: '2026-06-05',
    time: '10:00 AM - 3:00 PM',
    location: 'University of the Philippines Los Baños',
    description: 'A summit for young agripreneurs to connect, learn about government grants, and explore career opportunities in modern agriculture.',
    attendees: 156,
  },
  {
    id: 'ev4',
    title: 'Irrigation Systems Webinar',
    date: '2026-06-12',
    time: '2:00 PM - 4:00 PM',
    location: 'Online (Zoom)',
    description: 'Learn about drip irrigation, sprinkler systems, and smart water management for small to medium farms from industry specialists.',
    attendees: 89,
  },
  {
    id: 'ev5',
    title: 'Community Seed Swap',
    date: '2026-06-19',
    time: '7:00 AM - 12:00 PM',
    location: 'Baguio City Public Market',
    description: 'Trade seeds with fellow farmers, discover heirloom varieties, and learn about seed saving and biodiversity.',
    attendees: 72,
  },
  {
    id: 'ev6',
    title: 'AI in Agriculture Conference',
    date: '2026-07-08',
    time: '9:00 AM - 5:00 PM',
    location: 'Davao City Convention Center',
    description: 'Explore how artificial intelligence is transforming Philippine agriculture with live demos of drone monitoring, disease detection, and predictive analytics.',
    attendees: 210,
  },
  {
    id: 'ev7',
    title: 'Organic Certification Workshop',
    date: '2026-07-15',
    time: '8:30 AM - 12:30 PM',
    location: 'Laguna Provincial Capitol',
    description: 'Step-by-step guidance on obtaining organic certification for your farm including documentation, inspection prep, and compliance.',
    attendees: 55,
  },
  {
    id: 'ev8',
    title: 'Farm-to-Market Road Seminar',
    date: '2026-07-25',
    time: '1:00 PM - 4:00 PM',
    location: 'Online (Google Meet)',
    description: 'Discussion on logistics, post-harvest transport, and connecting directly with buyers and wholesalers across Luzon.',
    attendees: 38,
  },
];

export default function EventsTab() {
  const [attending, setAttending] = useState<Set<string>>(new Set());

  const toggleAttend = (id: string) => {
    setAttending((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-6">Upcoming events in the agricultural community</p>
      <div className="space-y-4">
        {demoEvents.map((event) => {
          const isAttending = attending.has(event.id);
          return (
            <Card key={event.id} className="hover:border-primary-200 transition">
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-14 h-14 bg-primary-50 rounded-xl flex flex-col items-center justify-center shrink-0 border border-primary-100">
                    <span className="text-xs font-bold text-primary-700 uppercase">
                      {new Date(event.date).toLocaleDateString('en-PH', { month: 'short' })}
                    </span>
                    <span className="text-lg font-extrabold text-primary-800 leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {event.attendees} attending
                          </span>
                        </div>
                      </div>
                      <Button
                        variant={isAttending ? 'secondary' : 'primary'}
                        size="sm"
                        onClick={() => toggleAttend(event.id)}
                      >
                        {isAttending ? 'Attending' : 'Attend'}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
