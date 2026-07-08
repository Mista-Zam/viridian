import { useState } from 'react';
import { forumPosts as initialPosts } from '../../data/community';
import { formatDate, generateId } from '../../lib/utils';
import { useAuthStore } from '../../store/authStore';
import { MessageSquare, Heart, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Dialog from '../../components/ui/Dialog';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';

const tagVariants: Record<string, 'primary' | 'success' | 'warning' | 'accent' | 'default'> = {
  fertilizers: 'success',
  tomatoes: 'warning',
  organic: 'success',
  'pest-control': 'warning',
  rice: 'accent',
  'wet-season': 'primary',
  seeds: 'accent',
  suppliers: 'primary',
  mindanao: 'warning',
  irrigation: 'primary',
  'small-farm': 'success',
  drip: 'primary',
  government: 'primary',
  grants: 'accent',
  'young-farmers': 'accent',
};

export default function ForumsTab() {
  const user = useAuthStore((s) => s.user);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [posts, setPosts] = useState(initialPosts);
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    const newPost = {
      id: generateId(),
      userId: user?.id || 'guest',
      userName: user?.name || 'Anonymous',
      title: title.trim(),
      content: content.trim(),
      tags: tags.length > 0 ? tags : ['general'],
      replies: 0,
      likes: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPosts([newPost, ...posts]);
    setTitle('');
    setContent('');
    setTags([]);
    setTagInput('');
    setShowDialog(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">{posts.length} discussions</p>
        <Button size="sm" icon={<Plus size={16} />} onClick={() => setShowDialog(true)}>New Post</Button>
      </div>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)} title="Create a Post" description="Share your thoughts with the community">
        <div className="space-y-4">
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What's on your mind?" required />
          <Textarea label="Content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post..." rows={4} required />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="hover:text-primary-900">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder="Type a tag and press Enter" className="flex-1" />
              <Button variant="outline" size="sm" onClick={handleAddTag}>Add</Button>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!title.trim() || !content.trim()}>Post</Button>
          </div>
        </div>
      </Dialog>

      <div className="space-y-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="cursor-pointer hover:border-primary-200 transition"
            onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-gray-900 truncate">{post.title}</h3>
                    {expandedId === post.id ? (
                      <ChevronUp size={16} className="text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400 shrink-0" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant={tagVariants[tag] || 'default'} size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {expandedId === post.id && (
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{post.content}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="font-medium text-gray-700">{post.userName}</span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-1 text-gray-500">
                    <MessageSquare size={14} />
                    <span className="text-xs font-medium">{post.replies}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Heart size={14} />
                    <span className="text-xs font-medium">{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
