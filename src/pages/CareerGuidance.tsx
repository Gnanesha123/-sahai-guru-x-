import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { Compass, BookOpen, ChevronRight, MapPin, Award, GraduationCap, Target, Sparkles } from 'lucide-react';

export function CareerGuidance() {
  const { careers } = useStore();
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  const career = careers.find((c) => c.id === selectedCareer);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-lg shadow-accent/25">
            <Compass className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Career Guidance Hub</h1>
            <p className="text-white/50">Discover your dream career and get a personalized roadmap</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Career Cards */}
        <div className="space-y-4">
          {careers.map((career, i) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                variant={selectedCareer === career.id ? 'accent' : 'glass'}
                className={`cursor-pointer ${selectedCareer === career.id ? 'neon-glow' : ''}`}
                hover={true}
                onClick={() => setSelectedCareer(career.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{career.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{career.title}</h3>
                    <p className="text-white/50 text-sm">{career.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {career.subjects.map((subject) => (
                        <span key={subject} className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-lg">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-all ${
                    selectedCareer === career.id ? 'text-accent rotate-90' : 'text-white/30'
                  }`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Career Detail */}
        <AnimatePresence mode="wait">
          {career ? (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <Card variant="accent" glow>
                <CardContent>
                  <div className="text-6xl mb-4">{career.icon}</div>
                  <h2 className="text-2xl font-bold text-white mb-2">{career.title}</h2>
                  <p className="text-white/60 mb-4">{career.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {career.subjects.map((subject) => (
                      <span key={subject} className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm font-medium">
                        {subject}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Roadmap */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    Career Roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {career.roadmap.map((step, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-sm font-bold">
                            {i + 1}
                          </div>
                          {i < career.roadmap.length - 1 && (
                            <div className="w-0.5 h-full bg-accent/20 mt-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-white font-medium">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Scholarships & Exams */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card variant="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-success">
                      <Award className="w-4 h-4" />
                      Scholarships
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {career.scholarships.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 text-white/70 text-sm">
                        <Sparkles className="w-4 h-4 text-success shrink-0" />
                        {s}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-warning">
                      <GraduationCap className="w-4 h-4" />
                      Exams
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {career.exams.map((exam, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 text-white/70 text-sm">
                        <Target className="w-4 h-4 text-warning shrink-0" />
                        {exam}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center"
            >
              <div className="text-center">
                <Compass className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl text-white/50">Select a career path</h3>
                <p className="text-white/30">Click on any career to see the detailed roadmap</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
