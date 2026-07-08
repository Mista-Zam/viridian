import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { User, Shield, LogOut, Camera } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const roleBadgeVariant: Record<string, 'success' | 'primary' | 'accent' | 'danger' | 'default'> = {
  farmer: 'success',
  buyer: 'primary',
  supplier: 'accent',
  admin: 'danger',
};

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: user?.username || '',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    dob: user?.dob || '',
  });
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [saved, setSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setPasswordForm({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setPasswordSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-surface py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="text-center">
                <div className="relative inline-block mb-3">
                  <Avatar src={user.avatar} name={user.name} size="xl" className="mx-auto" />
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full border border-border flex items-center justify-center shadow-sm cursor-pointer">
                    <Camera size={12} className="text-gray-500" />
                  </button>
                </div>
                <h2 className="font-semibold text-gray-900">{user.username}</h2>
                <p className="text-sm text-gray-500">{user.name}</p>
                <div className="mt-2">
                  <Badge variant={roleBadgeVariant[user.role] || 'default'} size="sm" className="capitalize">
                    {user.role}
                  </Badge>
                </div>
                <hr className="my-4 border-border" />
                <p className="text-xs text-gray-400">Member since {new Date(user.createdAt).getFullYear()}</p>
                <div className="mt-4">
                  <Button variant="secondary" size="sm" className="w-full">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User size={16} className="text-primary-500" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Username"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />
                    <Input
                      label="Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <div className="flex items-center gap-6 h-10">
                        {['male', 'female', 'other'].map((g) => (
                          <label key={g} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={form.gender === g}
                              onChange={(e) => setForm({ ...form, gender: e.target.value })}
                              className="accent-primary-500"
                            />
                            {g.charAt(0).toUpperCase() + g.slice(1)}
                          </label>
                        ))}
                      </div>
                    </div>
                    <Input
                      label="Date of Birth"
                      type="date"
                      value={form.dob}
                      onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    />
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <Button type="submit" variant="primary">Save Changes</Button>
                    {saved && <span className="text-sm text-emerald-600 font-medium">Saved!</span>}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <form onSubmit={handlePasswordSubmit}>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield size={16} className="text-primary-500" />
                    Account Security
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Current Password"
                      type="password"
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                      placeholder="••••••••"
                    />
                    <Input
                      label="New Password"
                      type="password"
                      value={passwordForm.newPass}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                      placeholder="••••••••"
                    />
                    <Input
                      label="Confirm Password"
                      type="password"
                      value={passwordForm.confirm}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <Button type="submit" variant="primary">Update Password</Button>
                    {passwordSaved && <span className="text-sm text-emerald-600 font-medium">Password updated!</span>}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Button variant="danger" icon={<LogOut size={16} />} onClick={handleLogout}>Logout</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
