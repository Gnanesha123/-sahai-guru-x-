import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { School, Users, BarChart3, AlertTriangle, TrendingUp, Award, BookOpen, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-secondary/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-white text-sm">{label}: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export function TeacherDashboard() {
  const { teacherData } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-lg shadow-accent/25">
            <School className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Teacher Dashboard</h1>
            <p className="text-white/50 text-lg">{teacherData.className}</p>
          </div>
        </div>
      </motion.div>

      {/* Class Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Users, label: 'Total Students', value: '28', color: 'text-accent' },
          { icon: TrendingUp, label: 'Class Average', value: `${teacherData.classAverage}%`, color: 'text-success' },
          { icon: Award, label: 'Top Performers', value: teacherData.topPerformers.length.toString(), color: 'text-warning' },
          { icon: AlertTriangle, label: 'Need Attention', value: teacherData.riskStudents.length.toString(), color: 'text-danger' },
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
        {/* Subject Heatmap */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                Subject Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teacherData.subjectHeatmap} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" stroke="rgba(255,255,255,0.3)" domain={[0, 100]} />
                    <YAxis dataKey="subject" type="category" stroke="rgba(255,255,255,0.3)" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="score" fill="#FF6B00" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Student List */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Student Performance
              </CardTitle>
              <button className="text-accent text-sm hover:underline flex items-center gap-1">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {teacherData.students.map((student, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        student.performance >= 80 ? 'bg-success/20 text-success' :
                        student.performance >= 60 ? 'bg-accent/20 text-accent' :
                        'bg-danger/20 text-danger'
                      }`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{student.name}</div>
                        <div className="text-white/40 text-xs">{student.weakTopics.join(', ')}</div>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${
                      student.performance >= 80 ? 'text-success' :
                      student.performance >= 60 ? 'text-accent' :
                      'text-danger'
                    }`}>
                      {student.performance}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top & Risk Students */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <Award className="w-5 h-5" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teacherData.topPerformers.map((name, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-success/10 rounded-xl">
                    <span className="text-xl">{['🥇', '🥈', '🥉'][i] || '⭐'}</span>
                    <span className="text-white font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="w-5 h-5" />
                Students at Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teacherData.riskStudents.map((name, i) => (
                  <div key={i} className="p-3 bg-warning/10 rounded-xl border border-warning/20">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">⚠️</span>
                      <div>
                        <div className="text-white font-medium">{name}</div>
                        <div className="text-warning text-sm">Needs extra attention</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      View Details
                    </Button>
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
