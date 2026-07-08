import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Leaf, Sprout, ShoppingBag, Drone, Hexagon } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const featureHighlights = [
  { icon: Sprout, label: 'AI Crop Assistant' },
  { icon: Drone, label: 'Smart Farm Monitoring' },
  { icon: ShoppingBag, label: 'Agricultural Marketplace' },
];

const carouselSlides = [
  {
    title: 'Precision Agriculture',
    subtitle: 'Data-driven insights for every crop',
  },
  {
    title: 'Smart IoT Monitoring',
    subtitle: 'Real-time sensor data from your fields',
  },
  {
    title: 'AI Disease Detection',
    subtitle: 'Instant diagnosis and treatment plans',
  },
];

function HeroPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 600 Q200 400 300 500 Q400 600 500 450 Q600 300 700 400" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M50 400 Q150 250 250 350 Q350 450 450 300 Q550 150 650 250" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M150 700 Q250 550 350 650 Q450 750 550 600 Q650 450 750 550" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="200" cy="300" r="3" fill="currentColor" />
      <circle cx="400" cy="200" r="2" fill="currentColor" />
      <circle cx="600" cy="350" r="2.5" fill="currentColor" />
      <circle cx="300" cy="550" r="2" fill="currentColor" />
      <circle cx="500" cy="500" r="3" fill="currentColor" />
      <rect x="350" y="150" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1" fill="none" transform="rotate(15 360 160)" />
      <rect x="150" y="450" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1" fill="none" transform="rotate(-10 158 458)" />
      <polygon points="550,250 570,280 530,280" stroke="currentColor" strokeWidth="1" fill="none" />
      <polygon points="250,600 270,630 230,630" stroke="currentColor" strokeWidth="1" fill="none" transform="rotate(180 250 615)" />
    </svg>
  );
}

function GeometricField() {
  return (
    <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-[0.04]" viewBox="0 0 600 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <line key={i} x1={i * 75} y1="0" x2={i * 75 + 20} y2="300" stroke="currentColor" strokeWidth="1" />
      ))}
      <path d="M0 200 Q150 150 300 220 Q450 290 600 180" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M0 240 Q150 200 300 260 Q450 320 600 220" fill="none" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function FloatingIcon({ icon: Icon, style, delay = 0 }: { icon: React.ElementType; style: React.CSSProperties; delay?: number }) {
  return (
    <motion.div
      className="absolute text-white/20"
      style={style}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <Icon size={28} />
    </motion.div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const ok = login(email, password);
    setLoading(false);
    if (ok) navigate('/');
    else setError('Invalid email or password.');
  };

  return (
    <div className="min-h-screen bg-[#F6FBF8] flex font-sans">
      <div className="hidden lg:flex w-[45%] relative overflow-hidden bg-gradient-to-br from-[#1FA971] via-[#2FBF8F] to-[#79D9A6] p-12 flex-col">
        <HeroPattern />
        <GeometricField />

        <FloatingIcon icon={Sprout} style={{ top: '12%', left: '10%' }} delay={0} />
        <FloatingIcon icon={Hexagon} style={{ top: '25%', right: '15%' }} delay={1} />
        <FloatingIcon icon={Drone} style={{ bottom: '35%', left: '8%' }} delay={2} />
        <FloatingIcon icon={Leaf} style={{ top: '45%', right: '10%' }} delay={0.5} />
        <FloatingIcon icon={Sprout} style={{ bottom: '20%', right: '20%' }} delay={1.5} />

        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <img src="/logo.png" alt="Viridian" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">Viridian</span>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
                Smarter Agriculture<br />Starts Here
              </h1>
              <p className="text-xl text-white/80 mt-4 max-w-md leading-relaxed">
                AI-powered farming, intelligent monitoring, and agricultural commerce—all in one platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 space-y-4"
            >
              {featureHighlights.map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-white/90">
                  <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <item.icon size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-2"
          >
            {carouselSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeSlide ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
                }`}
                aria-label={`Slide ${i + 1}: ${carouselSlides[i].title}`}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-[580px]"
        >
          <div className="lg:hidden flex items-center gap-3 mb-6 sm:mb-10">
            <img src="/logo.png" alt="Viridian" className="w-9 sm:w-10 h-9 sm:h-10 object-contain" />
            <span className="text-xl sm:text-2xl font-extrabold text-[#1FA971]">Viridian</span>
          </div>

          <div className="bg-white rounded-[20px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] px-5 py-8 sm:px-10 sm:py-12">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-[28px] sm:text-[36px] font-bold text-[#1F2937] tracking-tight">Welcome Back</h1>
              <p className="text-[#6B7280] mt-2 text-sm sm:text-base">Sign in to continue to your Viridian workspace.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="block w-full rounded-lg border border-border bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-11 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-150 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {error}
                </motion.p>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#1FA971] focus:ring-[#1FA971] accent-[#1FA971]"
                  />
                  <span className="text-sm text-[#6B7280]">Remember me</span>
                </label>
                <a href="#" className="text-sm font-medium text-[#1FA971] hover:text-[#1FA971]/80 transition-colors">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full rounded-[10px] h-12 sm:h-14 text-sm sm:text-base font-medium"
                size="lg"
                loading={loading}
              >
                Sign In
              </Button>
            </form>

            <div className="relative my-6 sm:my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-[#6B7280]">or continue with</span>
              </div>
            </div>

            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 sm:gap-3 h-11 sm:h-12 rounded-[10px] border border-[#E5E7EB] bg-white text-sm font-medium text-[#6B7280] hover:bg-gray-50 hover:border-gray-300 transition-all duration-150"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 sm:gap-3 h-11 sm:h-12 rounded-[10px] border border-[#E5E7EB] bg-white text-sm font-medium text-[#6B7280] hover:bg-gray-50 hover:border-gray-300 transition-all duration-150"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                  <path d="M21.5 12.2c0-1.1-.07-2.1-.2-3H12v5.7h5.3a5.5 5.5 0 01-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-9.3z" fill="#4285F4" />
                  <path d="M12 22c3.2 0 5.9-1.06 7.9-2.9l-3.9-2.9c-1.1.7-2.5 1.2-4 1.2-3 0-5.6-2-6.6-4.7H1.5v2.8C3.5 19.5 7.4 22 12 22z" fill="#34A853" />
                  <path d="M5.4 13.6c-.2-.7-.4-1.4-.4-2.1s.1-1.4.4-2.1V6.6H1.5C.6 8.1 0 10.22 0 12s.6 3.9 1.5 5.4l3.9-2.8z" fill="#FBBC05" />
                  <path d="M12 5.4c1.7 0 3.3.6 4.5 1.7l3.3-3.3C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.5 1.5 6.6l3.9 2.8c1-2.7 3.6-4.7 6.6-4.7z" fill="#EA4335" />
                </svg>
                Microsoft
              </button>
            </div>
          </div>

          <p className="text-center text-sm sm:text-base text-[#6B7280] mt-6 sm:mt-8">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-[#1FA971] hover:text-[#1FA971]/80 transition-colors">
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
