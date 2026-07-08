import { useState } from 'react';
import { MessageSquare, Users, BookOpen, CalendarDays } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Tabs from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import ForumsTab from './ForumsTab';
import GroupsTab from './GroupsTab';
import ResourcesTab from './ResourcesTab';
import EventsTab from './EventsTab';

const tabs = [
  { id: 'forums', label: 'Forums', icon: <MessageSquare size={16} /> },
  { id: 'groups', label: 'Groups', icon: <Users size={16} /> },
  { id: 'resources', label: 'Resources', icon: <BookOpen size={16} /> },
  { id: 'events', label: 'Events', icon: <CalendarDays size={16} /> },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('forums');

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Community"
          description="Connect with fellow farmers and agricultural experts"
        />
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />
        <Card>
          <div className="p-6">
            {activeTab === 'forums' && <ForumsTab />}
            {activeTab === 'groups' && <GroupsTab />}
            {activeTab === 'resources' && <ResourcesTab />}
            {activeTab === 'events' && <EventsTab />}
          </div>
        </Card>
      </div>
    </div>
  );
}
