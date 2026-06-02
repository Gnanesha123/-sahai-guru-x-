import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { Brain, Mic, MicOff, Volume2, Send, VolumeX, AlertCircle, Ear } from 'lucide-react';
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
  const [autoSpeak, setAutoSpeak] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<number>(0);
  const { selectedLanguage, setLanguage, messages, addMessage, isListening: storeListening, setListening: storeSetListening } = useStore();
  const speechRecognition = useSpeechRecognition(selectedLanguage);
  const speechSynthesis = useSpeechSynthesis();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sync store listening state with speech recognition
  useEffect(() => {
    storeSetListening(speechRecognition.isListening);
  }, [speechRecognition.isListening, storeSetListening]);

  // Auto-speak AI responses
  useEffect(() => {
    if (messages.length > 0 && autoSpeak) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === 'ai' && parseInt(lastMsg.id) !== lastMessageRef.current) {
        lastMessageRef.current = parseInt(lastMsg.id);
        speechSynthesis.speak(lastMsg.content, selectedLanguage);
      }
    }
  }, [messages, autoSpeak, selectedLanguage, speechSynthesis]);

  // Auto-submit transcript from voice input
  useEffect(() => {
    if (speechRecognition.transcript && !speechRecognition.isListening) {
      setInput(speechRecognition.transcript);
    }
  }, [speechRecognition.transcript, speechRecognition.isListening]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      language: selectedLanguage,
    };
    addMessage(userMsg);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

    const subject = getSubjectFromMessage(text);
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
    if (speechRecognition.isListening) {
      speechRecognition.stopListening();
    } else {
      setInput('');
      speechRecognition.startListening();
    }
  };

  // Speak a specific message
  const speakMessage = (content: string) => {
    speechSynthesis.speak(content, selectedLanguage);
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
                    <div className="text-white font-medium">
                      {speechRecognition.isSupported && speechSynthesis.isSupported
                        ? 'Voice Ready'
                        : 'Text Only'}
                    </div>
                    <div className={`text-sm flex items-center gap-1 ${
                      speechRecognition.isSupported ? 'text-success' : 'text-warning'
                    }`}>
                      <span className={`w-2 h-2 rounded-full inline-block ${
                        speechRecognition.isSupported ? 'bg-success' : 'bg-warning'
                      }`} />
                      {speechRecognition.isSupported ? 'Voice Active' : 'Voice Unsupported'}
                    </div>
                  </div>
                </div>

                {/* Speech Recognition Status */}
                {speechRecognition.isListening && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-4 p-3 bg-danger/10 border border-danger/20 rounded-xl"
                  >
                    <div className="flex items-center gap-2 text-danger text-sm">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-danger" />
                      </span>
                      Listening... Speak now
                    </div>
                    {speechRecognition.transcript && (
                      <div className="mt-2 text-white/70 text-sm italic">
                        "{speechRecognition.transcript}"
                      </div>
                    )}
                    {speechRecognition.error && (
                      <div className="mt-2 text-warning text-xs">{speechRecognition.error}</div>
                    )}
                  </motion.div>
                )}

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
                    variant={speechRecognition.isListening ? 'danger' : 'secondary'}
                    className="w-full"
                    onClick={toggleListening}
                    disabled={!speechRecognition.isSupported}
                    title={!speechRecognition.isSupported ? 'Speech recognition not supported in this browser' : ''}
                  >
                    {speechRecognition.isListening ? (
                      <><MicOff className="w-4 h-4" /> Stop Listening</>
                    ) : (
                      <><Mic className="w-4 h-4" /> Voice Input</>
                    )}
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant={speechSynthesis.isSpeaking ? 'danger' : 'secondary'}
                      className="flex-1"
                      onClick={() => speechSynthesis.isSpeaking ? speechSynthesis.stop() : null}
                      disabled={!speechSynthesis.isSupported}
                      title={!speechSynthesis.isSupported ? 'Speech synthesis not supported in this browser' : ''}
                    >
                      {speechSynthesis.isSpeaking ? (
                        <><VolumeX className="w-4 h-4" /> Stop</>
                      ) : (
                        <><Volume2 className="w-4 h-4" /> Speak</>
                      )}
                    </Button>
                    <button
                      onClick={() => setAutoSpeak(!autoSpeak)}
                      className={`p-3 rounded-xl transition-all ${
                        autoSpeak ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/40'
                      }`}
                      title={autoSpeak ? 'Auto-speak is on' : 'Auto-speak is off'}
                    >
                      <Ear className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Voice support warning */}
                {!speechRecognition.isSupported && (
                  <div className="mt-3 p-2 bg-warning/10 rounded-lg flex items-center gap-2 text-warning text-xs">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    Voice input requires Chrome, Edge, or Safari
                  </div>
                )}
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
                {['Algebra Basics', 'Photosynthesis', 'English Grammar', "Newton's Laws", 'Chemical Reactions'].map((topic) => (
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
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">AI Tutor</div>
                <div className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  {languages.find((l) => l.code === selectedLanguage)?.native} mode
                  {speechSynthesis.isSpeaking && ' • Speaking...'}
                </div>
              </div>
              {/* Voice wave animation */}
              {speechSynthesis.isSpeaking && (
                <div className="flex items-end gap-0.5 h-6">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 16, 6, 20, 4] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      className="w-1 bg-accent rounded-full"
                    />
                  ))}
                </div>
              )}
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
                    <p className="text-white/50">
                      {speechRecognition.isSupported
                        ? 'Click the mic button or type your question below.'
                        : 'Type your question below to start learning.'}
                    </p>
                    {speechRecognition.isSupported && (
                      <p className="text-white/30 text-sm mt-2">
                        Speak in English, हिन्दी, తెలుగు, தமிழ், or ಕನ್ನಡ
                      </p>
                    )}
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
                    <div className={`group max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-accent/10 border border-accent/20 ml-12'
                        : 'bg-white/5 border border-white/10 mr-12'
                    }`}>
                      <p className="text-white text-sm leading-relaxed">{msg.content}</p>
                      {msg.role === 'ai' && speechSynthesis.isSupported && (
                        <button
                          onClick={() => speakMessage(msg.content)}
                          className="mt-2 opacity-0 group-hover:opacity-100 text-accent/60 hover:text-accent text-xs flex items-center gap-1 transition-all"
                        >
                          <Volume2 className="w-3 h-3" />
                          Read aloud
                        </button>
                      )}
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
                  placeholder={
                    speechRecognition.isListening
                      ? 'Listening...'
                      : 'Type your question here...'
                  }
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
