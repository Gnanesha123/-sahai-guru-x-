import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useStore } from '@/store/useStore';
import { Brain, BookOpen, TrendingUp, Target, Sparkles, Zap, Clock, Award, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickActions = [
  { label: 'AI Tutor', icon: Brain, path: '/tutor', color: 'text-accent', desc: 'Start a lesson' },
  { label: 'Take Quiz', icon: Zap, path: '/quiz', color: 'text-warning', desc: 'Test your knowledge' },
  { label: 'Scan Notes', icon: BookOpen, path: '/ocr', color: 'text-success', desc: 'Upload handwritten work' },
  { label: 'View Progress', icon: BarChart3, path: '/analytics', color: 'text-blue-400', desc: 'See your growth' },
];

export function Dashboard() {
  const { student } = useStore();

  const subjects = [
    { name: 'Math Mastery', value: student.mathMastery, icon: '📐' },
    { name: 'Science Mastery', value: student.scienceMastery, icon: '🔬' },
    { name: 'English Mastery', value: student.englishMastery, icon: '📖' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-2xl shadow-lg shadow-accent/25">
            🧠
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {student.name}!
            </h1>
            <p className="text-white/50">Your AI Learning Twin has prepared new insights</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Twin Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="accent" glow className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-accent" />
                    AI Learning Twin Status
                  </CardTitle>
                  <span className="text-sm text-accent font-medium">Updated just now</span>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-4xl font-bold text-white mb-1">{student.learningConfidence}%</div>
                      <div className="text-white/60 text-sm">Learning Confidence</div>
                      <ProgressBar value={student.learningConfidence} className="mt-3" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white mb-1">{student.examReadiness}%</div>
                      <div className="text-white/60 text-sm">Exam Readiness</div>
                      <ProgressBar value={student.examReadiness} className="mt-3" />
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-2 text-accent mb-1">
                      <Target className="w-4 h-4" />
                      <span className="font-medium">Recommended Focus</span>
                    </div>
                    <p className="text-white text-lg font-semibold">{student.recommendedFocus}</p>
                    <div className="flex items-center gap-1 text-success mt-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">Predicted Improvement: +{student.predictedImprovement}%</span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>

          {/* Subject Mastery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  Subject Mastery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {subjects.map((subject) => (
                    <div key={subject.name} className="p-4 bg-white/5 rounded-xl">
                      <div className="text-2xl mb-2">{subject.icon}</div>
                      <div className="text-sm text-white/60 mb-1">{subject.name}</div>
                      <div className="text-2xl font-bold text-white">{subject.value}%</div>
                      <ProgressBar value={subject.value} size="sm" className="mt-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, i) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Link to={action.path}>
                  <Card variant="glass" className="text-center cursor-pointer">
                    <action.icon className={`w-8 h-8 ${action.color} mx-auto mb-2`} />
                    <div className="text-white font-medium text-sm">{action.label}</div>
                    <div className="text-white/40 text-xs mt-1">{action.desc}</div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Gamification & Streaks */}
        <div className="space-y-6">
          {/* XP & Level Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-warning" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">{student.level}</div>
                <div className="text-white/60">Current Level</div>
                <div className="mt-4 p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-white">{student.xp.toLocaleString()} XP</div>
                  <ProgressBar value={student.xp % 1000} max={1000} className="mt-2" />
                  <div className="text-white/40 text-sm mt-1">{student.xp % 1000} / 1000 to next level</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  Daily Streak
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-2"
                >
                  🔥
                </motion.div>
                <div className="text-4xl font-bold text-white mb-1">{student.streak} days</div>
                <div className="text-white/50 text-sm">Keep going! You're on fire!</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Badges Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-warning" />
                  Badges
                </CardTitle>
                <Link to="/dashboard" className="text-accent text-sm hover:underline">View all</Link>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {student.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-3 rounded-xl text-center transition-all ${
                        badge.earned ? 'bg-accent/10 border border-accent/20' : 'bg-white/5 opacity-40'
                      }`}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="text-xs text-white/70">{badge.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
