import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import { GraduationCap, Menu, X, User, BookOpen, BarChart3, Brain, ScanLine, Trophy, Compass, Settings, Home, Users, School } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: User },
  { path: '/tutor', label: 'AI Tutor', icon: Brain },
  { path: '/ocr', label: 'Scanner', icon: ScanLine },
  { path: '/quiz', label: 'Quiz', icon: Trophy },
];

const authNavItems = [
  { path: '/parent', label: 'Parent', icon: Users },
  { path: '/teacher', label: 'Teacher', icon: School },
  { path: '/careers', label: 'Careers', icon: Compass },
  { path: '/impact', label: 'Impact', icon: BarChart3 },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, userRole } = useStore();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center"
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-white">
              Sah<span className="text-accent">AI</span> Guru
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive(item.path)
                    ? 'bg-accent/10 text-accent'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            {isAuthenticated && authNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive(item.path)
                    ? 'bg-accent/10 text-accent'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="px-5 py-2 bg-accent hover:bg-accent-light text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/25"
                >
                  Sign Up Free
                </Link>
              </>
            ) : (
              <Link
                to="/settings"
                className={cn(
                  'p-2 rounded-xl transition-all duration-200',
                  isActive('/settings') ? 'bg-accent/10 text-accent' : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                <Settings className="w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/5 bg-secondary/95 backdrop-blur-xl"
        >
          <div className="px-4 py-4 space-y-1">
            {[...navItems, ...(isAuthenticated ? authNavItems : [])].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive(item.path)
                    ? 'bg-accent/10 text-accent'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="pt-4 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-4 py-3 rounded-xl text-sm font-medium text-white bg-accent hover:bg-accent-light transition-colors"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
