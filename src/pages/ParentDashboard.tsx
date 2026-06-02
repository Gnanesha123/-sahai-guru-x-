import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { Users, Clock, BarChart3, TrendingUp, Target, Download, Bell, ChevronRight, BookOpen, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-secondary/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-white text-sm">{label}: {payload[0].value}h</p>
      </div>
    );
  }
  return null;
};

export function ParentDashboard() {
  const { parentData } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-lg shadow-accent/25">
            <Users className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Parent Dashboard</h1>
            <p className="text-white/50">Track your child's learning journey</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Clock, label: 'Study Hours', value: `${parentData.studyHours}h`, color: 'text-accent' },
          { icon: Target, label: 'Attendance', value: `${parentData.attendance}%`, color: 'text-success' },
          { icon: TrendingUp, label: 'Quiz Performance', value: `${parentData.quizPerformance}%`, color: 'text-blue-400' },
          { icon: BookOpen, label: 'Progress', value: `${parentData.learningProgress}%`, color: 'text-warning' },
        ].map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card variant="glass" className="text-center">
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Study Hours Chart */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Weekly Study Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={parentData.weeklyReport}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="hours" fill="#FF6B00" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {parentData.recommendations.map((rec, i) => (
                  <div key={i} className="p-3 bg-accent/10 rounded-xl border border-accent/20 flex items-start gap-3">
                    <Bell className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-white text-sm">{rec}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View Full Report <Download className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Progress Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-accent" />
              Learning Progress Overview
            </CardTitle>
            <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
              Download Report
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Study Hours', value: parentData.studyHours, max: 10, unit: 'hrs/day' },
                { label: 'Attendance', value: parentData.attendance, max: 100, unit: '%' },
                { label: 'Quiz Performance', value: parentData.quizPerformance, max: 100, unit: '%' },
                { label: 'Learning Progress', value: parentData.learningProgress, max: 100, unit: '%' },
              ].map((metric) => (
                <div key={metric.label} className="p-4 bg-white/5 rounded-xl">
                  <div className="text-sm text-white/60 mb-1">{metric.label}</div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {metric.value}{metric.unit === '%' ? '%' : ''}
                  </div>
                  <ProgressBar value={metric.value} max={metric.max} size="sm" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
