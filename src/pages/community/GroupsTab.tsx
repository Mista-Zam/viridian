import { farmerGroups } from '../../data/community';
import { Users, Check } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const categoryVariants: Record<string, 'success' | 'accent' | 'warning' | 'default'> = {
  Organic: 'success',
  Rice: 'accent',
  Youth: 'warning',
};

export default function GroupsTab() {
  const [joined, setJoined] = useState<Set<string>>(new Set());

  const toggleJoin = (id: string) => {
    setJoined((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-6">{farmerGroups.length} groups available</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {farmerGroups.map((group) => {
          const isJoined = joined.has(group.id);
          return (
            <Card key={group.id} className="hover:border-primary-200 transition">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-700 font-bold text-sm">
                    {group.name.charAt(0)}
                  </div>
                  <Badge variant={categoryVariants[group.category] || 'default'} size="sm">
                    {group.category}
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{group.name}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                  <Users size={12} />
                  <span>{group.members.toLocaleString()} members</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{group.description}</p>
                <Button
                  variant={isJoined ? 'secondary' : 'primary'}
                  size="sm"
                  className="w-full"
                  onClick={() => toggleJoin(group.id)}
                >
                  {isJoined && <Check size={14} />}
                  {isJoined ? 'Joined' : 'Join Group'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
