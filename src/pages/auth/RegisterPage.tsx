import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../types';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

const roles: { value: UserRole; label: string }[] = [
  { value: 'farmer', label: 'Farmer' },
  { value: 'buyer', label: 'Buyer' },
  { value: 'supplier', label: 'Supplier' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const [form, setForm] = useState({ email: '', username: '', name: '', password: '', confirmPassword: '', role: 'farmer' as UserRole });
  const [error, setError] = useState('');

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { email, username, name, password, confirmPassword, role } = form;
    if (!email || !username || !name || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const ok = register({ email, username, name, password, role });
    if (ok) navigate('/');
    else setError('Registration failed.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-600 to-accent-500 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/30 rounded-full blur-3xl" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Viridian" className="w-16 h-16 object-contain mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white">Join Viridian</h1>
          <p className="text-primary-100 mt-1">Create your account</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@example.com"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Username"
                type="text"
                value={form.username}
                onChange={(e) => update('username', e.target.value)}
                placeholder="username"
              />
              <Input
                label="Full Name"
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Password"
                type="password"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder="••••••••"
              />
              <Input
                label="Confirm"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => update('confirmPassword', e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Select
              label="I am a"
              value={form.role}
              onChange={(e) => update('role', e.target.value)}
              options={roles}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" size="lg">
              Create Account
            </Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-700 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
