import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useStore } from '@/store/useStore';
import { BarChart3, TrendingUp, Clock, Target, Award, ArrowUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const weeklyData = [
  { day: 'Mon', hours: 3.5, score: 72 },
  { day: 'Tue', hours: 4.2, score: 78 },
  { day: 'Wed', hours: 5.0, score: 85 },
  { day: 'Thu', hours: 3.8, score: 76 },
  { day: 'Fri', hours: 4.5, score: 82 },
  { day: 'Sat', hours: 6.0, score: 90 },
  { day: 'Sun', hours: 2.0, score: 65 },
];

const monthlyProgress = [
  { month: 'Jan', math: 65, science: 60, english: 55 },
  { month: 'Feb', math: 70, science: 65, english: 58 },
  { month: 'Mar', math: 75, science: 68, english: 60 },
  { month: 'Apr', math: 82, science: 72, english: 62 },
  { month: 'May', math: 88, science: 76, english: 64 },
  { month: 'Jun', math: 91, science: 79, english: 65 },
];

const topicMastery = [
  { topic: 'Algebra', mastery: 88 },
  { topic: 'Geometry', mastery: 75 },
  { topic: 'Physics', mastery: 82 },
  { topic: 'Chemistry', mastery: 70 },
  { topic: 'Biology', mastery: 85 },
  { topic: 'Grammar', mastery: 65 },
  { topic: 'Vocabulary', mastery: 72 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-secondary/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-white text-sm font-medium mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}{entry.name === 'hours' ? 'h' : '%'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ProgressAnalytics() {
  const { student } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-lg shadow-accent/25">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Progress Analytics</h1>
            <p className="text-white/50">Comprehensive insights into your learning journey</p>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: TrendingUp, label: 'Overall Growth', value: '+34%', color: 'text-success' },
          { icon: Clock, label: 'Study Hours', value: '142h', color: 'text-accent' },
          { icon: Target, label: 'Quizzes Taken', value: '48', color: 'text-blue-400' },
          { icon: Award, label: 'Days Active', value: '67', color: 'text-warning' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="glass" className="text-center">
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Performance */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                Weekly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="score" name="Score" fill="#FF6B00" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Study Hours */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Study Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="hours" name="hours" stroke="#22C55E" fill="#22C55E" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Monthly Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="math" name="Math" stroke="#FF6B00" strokeWidth={2} dot={{ fill: '#FF6B00' }} />
                    <Line type="monotone" dataKey="science" name="Science" stroke="#22C55E" strokeWidth={2} dot={{ fill: '#22C55E' }} />
                    <Line type="monotone" dataKey="english" name="English" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Topic Mastery */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Topic Mastery Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topicMastery.map((topic) => (
                  <div key={topic.topic}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white/70">{topic.topic}</span>
                      <span className="text-sm text-white font-medium">{topic.mastery}%</span>
                    </div>
                    <ProgressBar value={topic.mastery} size="sm" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
