import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { useStore } from '@/store/useStore';
import { Sparkles, GraduationCap, Brain, Globe, BookOpen, ChevronRight, Star, Shield, Zap, Languages, BarChart3, Users } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Learning Twin', description: 'A personal AI that knows your strengths, weaknesses, and learning style' },
  { icon: Languages, title: '5+ Indian Languages', description: 'Learn in Telugu, Hindi, English, Tamil, or Kannada' },
  { icon: Globe, title: 'Offline Mode', description: 'Low bandwidth optimized for rural areas with offline learning packs' },
  { icon: BookOpen, title: 'OCR Scanner', description: 'Snap a photo of handwritten questions and get instant solutions' },
  { icon: BarChart3, title: 'Smart Analytics', description: 'Track progress with detailed insights for students, parents & teachers' },
  { icon: Zap, title: 'Voice Tutor', description: 'Speak naturally and get AI-powered explanations in your language' },
];

const stats = [
  { icon: Users, value: 2847, label: 'Students Helped', suffix: '+' },
  { icon: Brain, value: 156890, label: 'Questions Solved', suffix: '+' },
  { icon: Globe, value: 5, label: 'Languages Supported', suffix: '' },
  { icon: Star, value: 34, label: 'Improvement Rate', suffix: '%' },
];

export function Landing() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse" />
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 text-4xl opacity-20 hidden md:block"
        >
          📚
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-40 right-20 text-4xl opacity-20 hidden md:block"
        >
          🔬
        </motion.div>
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-40 left-20 text-4xl opacity-20 hidden md:block"
        >
          ✏️
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-20 right-10 text-4xl opacity-20 hidden md:block"
        >
          🌟
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            World's First AI Learning Twin for Rural Education
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight mb-6"
          >
            Every Child Deserves a{' '}
            <span className="gradient-text">Personal AI Teacher</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Breaking language barriers and bringing personalized education to every rural student.
            SahAI Guru X adapts to your language, learning style, and pace.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/login">
              <Button size="xl" variant="primary">
                Start Learning <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="xl" variant="outline">
                Meet Your AI Twin <Brain className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* AI Avatar Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 relative"
          >
            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-secondary/40 backdrop-blur-xl border border-white/10">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-3xl shadow-lg shadow-accent/25"
              >
                🧠
              </motion.div>
              <div className="text-left">
                <p className="text-white font-semibold">SahAI Guru</p>
                <p className="text-white/50 text-sm">Your AI Learning Twin is ready! 👋</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 rounded-full bg-success"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/30 text-sm"
          >
            Scroll to explore
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">
              Why Sah<span className="text-accent">AI</span> Guru X?
            </h2>
            <p className="section-subtitle">
              Built specifically for rural students, with features that make learning accessible to everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="glass" className="h-full">
                  <feature.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/50">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16 neon-glow"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Meet Your{' '}
              <span className="gradient-text">AI Learning Twin</span>?
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Join thousands of rural students who are transforming their education with personalized AI tutoring.
            </p>
            <Link to="/login">
              <Button size="xl" variant="primary">
                Get Started Free <Sparkles className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
