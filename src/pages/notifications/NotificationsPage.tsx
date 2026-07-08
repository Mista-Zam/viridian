import { useNotificationStore } from '../../store/notificationStore';
import { Package, Brain, Cloud, Sprout, Tag, CheckCheck } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const iconMap: Record<string, { icon: typeof Package; bg: string; color: string }> = {
  order: { icon: Package, bg: 'bg-blue-100', color: 'text-blue-600' },
  ai: { icon: Brain, bg: 'bg-purple-100', color: 'text-purple-600' },
  weather: { icon: Cloud, bg: 'bg-cyan-100', color: 'text-cyan-600' },
  crop: { icon: Sprout, bg: 'bg-green-100', color: 'text-green-600' },
  promotion: { icon: Tag, bg: 'bg-amber-100', color: 'text-amber-600' },
  community: { icon: Package, bg: 'bg-emerald-100', color: 'text-emerald-600' },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
}

function getDateKey(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function NotificationsPage() {
  const { notifications, markRead, markAllRead } = useNotificationStore();

  const grouped = notifications.reduce<Record<string, typeof notifications>>((acc, n) => {
    const key = getDateKey(n.createdAt);
    if (!acc[key]) acc[key] = [];
    acc[key].push(n);
    return acc;
  }, {});

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Notifications"
          description={`${unreadCount} unread`}
          actions={
            <Button variant="ghost" size="sm" icon={<CheckCheck size={16} />} onClick={markAllRead}>
              Mark All Read
            </Button>
          }
        />

        <div className="space-y-6">
          {Object.entries(grouped).map(([dateLabel, items]) => (
            <div key={dateLabel}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{dateLabel}</h3>
              <div className="space-y-2">
                {items.map((n) => {
                  const meta = iconMap[n.type] || iconMap.community;
                  const Icon = meta.icon;
                  return (
                    <Card
                      key={n.id}
                      className={`cursor-pointer transition ${n.read ? '' : 'border-primary-100 bg-primary-50/30'}`}
                      onClick={() => markRead(n.id)}
                    >
                      <div className="p-4 flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl ${meta.bg} flex items-center justify-center shrink-0`}>
                          <Icon size={18} className={meta.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`text-sm ${n.read ? 'font-medium text-gray-700' : 'font-semibold text-gray-900'}`}>
                              {n.title}
                            </h4>
                            <span className="text-[11px] text-gray-400 shrink-0">{timeAgo(n.createdAt)}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-0.5">{n.message}</p>
                        </div>
                        {!n.read && (
                          <div className="w-2 h-2 rounded-full bg-primary-500 shrink-0 mt-3" />
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg font-medium">No notifications yet</p>
              <p className="text-sm mt-1">We'll notify you when something arrives</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
