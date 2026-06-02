import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { Brain, Mic, MicOff, Volume2, Send, Languages, StopCircle, ChevronRight, MessageCircle } from 'lucide-react';
import type { Language, Message } from '@/types';

const languages: { code: Language; label: string; native: string }[] = [
  { code: 'english', label: 'English', native: 'English' },
  { code: 'hindi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'telugu', label: 'Telugu', native: 'తెలుగు' },
  { code: 'tamil', label: 'Tamil', native: 'தமிழ்' },
  { code: 'kannada', label: 'Kannada', native: 'ಕನ್ನಡ' },
];

const aiResponses: Record<string, string[]> = {
  math: [
    "Let's solve this step by step! Think of it like building with blocks — each step is one block.",
    "Great question! In math, we can use the formula: (a + b)² = a² + 2ab + b². Let me show you how...",
    "I see where you're confused. Let me explain with a real-life example from farming...",
  ],
  science: [
    "That's a fascinating science question! Let me explain with a simple experiment you can try at home.",
    "In nature, everything is connected. Let's trace how this works from the ground up.",
    "Think of it like this: your body is like a well-organized village, each part has a special job!",
  ],
  english: [
    "Great effort! Remember, practice makes progress. Let's look at some examples from stories you might know.",
    "Grammar is like the rules of a game — once you know them, you can play freely!",
    "Let me show you how this works with examples from everyday conversations.",
  ],
  default: [
    "That's a wonderful question! Let me help you understand this topic step by step.",
    "I'm here to help! Let's break this down into smaller, easier parts.",
    "You're doing great! Here's an easy way to remember this...",
  ],
};

function generateAIResponse(subject: string): string {
  const responses = aiResponses[subject] || aiResponses.default;
  return responses[Math.floor(Math.random() * responses.length)];
}

function getSubjectFromMessage(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('math') || lower.includes('algebra') || lower.includes('geometry') || lower.includes('number')) return 'math';
  if (lower.includes('science') || lower.includes('physics') || lower.includes('chemistry') || lower.includes('biology')) return 'science';
  if (lower.includes('english') || lower.includes('grammar') || lower.includes('vocabulary')) return 'english';
  return 'default';
}

export function AITutor() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { selectedLanguage, setLanguage, messages, addMessage, isListening, setListening, isSpeaking, setSpeaking } = useStore();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      language: selectedLanguage,
    };
    addMessage(userMsg);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

    const subject = getSubjectFromMessage(input);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      content: generateAIResponse(subject),
      timestamp: new Date(),
      language: selectedLanguage,
    };
    addMessage(aiMsg);
    setIsTyping(false);
  };

  const toggleListening = () => {
    setListening(!isListening);
    if (!isListening) {
      // Simulate voice input
      setTimeout(() => {
        setInput('Explain how photosynthesis works');
        setListening(false);
      }, 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sidebar - Settings */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-accent" />
                  SahAI Guru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-xl mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-lg"
                  >
                    🧠
                  </motion.div>
                  <div>
                    <div className="text-white font-medium">Online & Ready</div>
                    <div className="text-success text-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-success rounded-full inline-block" />
                      Active
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/60">Select Language</label>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`p-2 rounded-xl text-sm transition-all ${
                          selectedLanguage === lang.code
                            ? 'bg-accent text-white'
                            : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="font-medium">{lang.label}</div>
                        <div className="text-xs opacity-70">{lang.native}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Button
                    variant={isListening ? 'danger' : 'secondary'}
                    className="w-full"
                    icon={isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    onClick={toggleListening}
                  >
                    {isListening ? 'Stop Listening' : 'Voice Input'}
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full"
                    icon={<Volume2 className="w-4 h-4" />}
                    onClick={() => setSpeaking(!isSpeaking)}
                  >
                    {isSpeaking ? 'Mute Voice' : 'Enable Voice'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Topics */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Quick Topics</CardTitle>
              </CardHeader>
              <CardContent>
                {['Algebra Basics', 'Photosynthesis', 'English Grammar', 'Newton\'s Laws', 'Chemical Reactions'].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setInput(`Explain ${topic}`)}
                    className="w-full text-left p-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card h-[600px] flex flex-col"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-medium">AI Tutor</div>
                <div className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  {languages.find((l) => l.code === selectedLanguage)?.native} mode
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      🧠
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">Ask me anything!</h3>
                    <p className="text-white/50">I'm here to help you learn. What subject are you studying?</p>
                  </div>
                </div>
              )}
              
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 ${
                      msg.role === 'user' ? 'bg-accent/20 text-accent' : 'bg-secondary text-white'
                    }`}>
                      {msg.role === 'user' ? '👤' : '🧠'}
                    </div>
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-accent/10 border border-accent/20 ml-12'
                        : 'bg-white/5 border border-white/10 mr-12'
                    }`}>
                      <p className="text-white text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center shrink-0">🧠</div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="flex gap-1">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-2 h-2 bg-accent rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-accent rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-accent rounded-full" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your question here..."
                  className="flex-1 px-4 py-3 bg-primary/50 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                />
                <Button onClick={handleSend} disabled={!input.trim()}>
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
