import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { Settings2, User, Bell, Globe, Shield, Volume2, Sun, Moon, Eye, Languages, LogOut, ChevronRight, Sparkles, Palette, Wifi } from 'lucide-react';
import type { Language } from '@/types';

const settingsSections = [
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    settings: [
      { id: 'name', label: 'Student Name', value: 'Priya Sharma', type: 'text' },
      { id: 'grade', label: 'Grade', value: '8th Standard', type: 'text' },
      { id: 'school', label: 'School', value: 'Rural Excellence Academy', type: 'text' },
    ],
  },
  {
    id: 'language',
    label: 'Language & Region',
    icon: Languages,
    settings: [
      { id: 'app-lang', label: 'App Language', value: 'English', type: 'select' },
      { id: 'voice-lang', label: 'Voice Language', value: 'Automatic', type: 'select' },
    ],
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    icon: Eye,
    settings: [
      { id: 'high-contrast', label: 'High Contrast Mode', value: 'Off', type: 'toggle' },
      { id: 'dyslexic', label: 'Dyslexia Friendly Font', value: 'Off', type: 'toggle' },
      { id: 'screen-reader', label: 'Screen Reader Support', value: 'On', type: 'toggle' },
    ],
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    settings: [
      { id: 'push', label: 'Push Notifications', value: 'On', type: 'toggle' },
      { id: 'email', label: 'Email Reports', value: 'Weekly', type: 'select' },
    ],
  },
  {
    id: 'rural',
    label: 'Rural Impact Mode',
    icon: Wifi,
    settings: [
      { id: 'low-bandwidth', label: 'Low Bandwidth Mode', value: 'Off', type: 'toggle' },
      { id: 'offline', label: 'Offline Learning Packs', value: 'Downloaded', type: 'text' },
      { id: 'text-only', label: 'Text-Only Mode', value: 'Off', type: 'toggle' },
    ],
  },
];

export function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const { logout, selectedLanguage, setLanguage } = useStore();
  const activeSectionData = settingsSections.find((s) => s.id === activeSection);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-lg shadow-accent/25">
            <Settings2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-white/50">Customize your SahAI Guru experience</p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card variant="glass">
            <CardContent className="p-3">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-accent text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  {section.label}
                </button>
              ))}
              <hr className="my-3 border-white/5" />
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-danger hover:bg-danger/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {activeSectionData && <activeSectionData.icon className="w-5 h-5 text-accent" />}
                  {activeSectionData?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {activeSectionData?.settings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors">
                      <div>
                        <div className="text-white font-medium">{setting.label}</div>
                        <div className="text-white/40 text-sm">{setting.value}</div>
                      </div>
                      {setting.type === 'toggle' ? (
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                          setting.value === 'On' ? 'bg-accent' : 'bg-white/10'
                        }`}>
                          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            setting.value === 'On' ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </div>
                      ) : (
                        <ChevronRight className="w-5 h-5 text-white/30" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Language Quick Select */}
                {activeSection === 'language' && (
                  <div className="mt-6 p-4 bg-white/5 rounded-xl">
                    <h4 className="text-white font-medium mb-3">Quick Language Switch</h4>
                    <div className="flex flex-wrap gap-2">
                      {(['english', 'hindi', 'telugu', 'tamil', 'kannada'] as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            selectedLanguage === lang
                              ? 'bg-accent text-white'
                              : 'bg-white/5 text-white/60 hover:text-white'
                          }`}
                        >
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Premium Badge */}
                {activeSection === 'profile' && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-accent/20 to-accent/5 rounded-xl border border-accent/20">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-accent" />
                      <div>
                        <div className="text-white font-medium">SahAI Guru X Premium</div>
                        <div className="text-white/50 text-sm">Unlock advanced features</div>
                      </div>
                      <Button variant="primary" size="sm" className="ml-auto">
                        Upgrade
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
