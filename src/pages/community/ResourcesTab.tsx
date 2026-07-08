import { educationalResources } from '../../data/community';
import { BookOpen, Play } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export default function ResourcesTab() {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-6">{educationalResources.length} resources available</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {educationalResources.map((resource) => (
          <Card key={resource.id} className="overflow-hidden hover:border-primary-200 transition hover:shadow-card-hover">
            <div className="relative h-36 bg-gray-100">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {resource.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
                    <Play size={18} className="text-white ml-0.5" />
                  </div>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge variant={resource.type === 'article' ? 'primary' : 'accent'} size="sm">
                  {resource.type === 'article' ? <BookOpen size={10} /> : <Play size={10} />}
                  {resource.type === 'article' ? 'Article' : 'Video'}
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{resource.title}</h3>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{resource.author}</span>
                <span>{resource.duration}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
