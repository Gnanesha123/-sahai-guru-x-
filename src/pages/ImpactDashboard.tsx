import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { useStore } from '@/store/useStore';
import { BarChart3, TrendingUp, Users, BookOpen, Globe, School, Sparkles, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const growthData = [
  { month: 'Jan', students: 200, hours: 3000 },
  { month: 'Feb', students: 450, hours: 6000 },
  { month: 'Mar', students: 800, hours: 12000 },
  { month: 'Apr', students: 1200, hours: 18000 },
  { month: 'May', students: 1800, hours: 28000 },
  { month: 'Jun', students: 2847, hours: 42350 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-secondary/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-white text-sm font-medium mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ImpactDashboard() {
  const { impact } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🌍
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Impact</h1>
        <p className="text-lg text-white/50 max-w-3xl mx-auto">
          Transforming rural education through AI-powered personalized learning. 
          Every student deserves equal access to quality education.
        </p>
      </motion.div>

      {/* Main Impact Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: Users, value: impact.studentsHelped, label: 'Students Helped', desc: 'Active learners across rural India', color: 'from-accent to-accent-light' },
          { icon: BookOpen, value: impact.questionsSolved, label: 'Questions Solved', desc: 'AI-powered solutions delivered', color: 'from-success to-emerald-500' },
          { icon: Globe, value: impact.languagesSupported, label: 'Languages Supported', suffix: '', desc: 'Indian languages including Telugu, Tamil & more', color: 'from-blue-500 to-cyan-500' },
          { icon: School, value: impact.schoolsConnected, label: 'Schools Connected', suffix: '', desc: 'Rural schools on the platform', color: 'from-purple-500 to-pink-500' },
          { icon: TrendingUp, value: impact.improvementRate, label: 'Improvement Rate', suffix: '%', desc: 'Average academic improvement', color: 'from-warning to-orange-500' },
          { icon: Heart, value: impact.learningHours, label: 'Learning Hours', desc: 'Total hours of AI-powered learning', color: 'from-red-500 to-rose-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card variant="glass" className="text-center relative overflow-hidden h-full">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
              <div className="relative z-10">
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix || '+'} duration={2} />
                </div>
                <div className="text-xl font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-white/40 text-sm">{stat.desc}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Growth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Growth Trajectory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
                  <YAxis stroke="rgba(255,255,255,0.3)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="students" name="Students" stroke="#FF6B00" fill="#FF6B00" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="hours" name="Learning Hours" stroke="#22C55E" fill="#22C55E" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Card variant="accent" glow className="max-w-3xl mx-auto">
          <CardContent>
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white/70 text-lg leading-relaxed">
              "Every child deserves a personal AI teacher." We're breaking language barriers 
              and bringing world-class personalized education to every rural student. 
              With SahAI Guru X, we're not just building an app — we're building a future 
              where geography doesn't determine destiny.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
