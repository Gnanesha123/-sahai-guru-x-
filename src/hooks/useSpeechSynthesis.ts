import { useState, useCallback, useRef } from 'react';
import type { Language } from '@/types';

const LANGUAGE_MAP: Record<Language, string> = {
  english: 'en-US',
  hindi: 'hi-IN',
  telugu: 'te-IN',
  tamil: 'ta-IN',
  kannada: 'kn-IN',
};

interface UseSpeechSynthesisReturn {
  isSpeaking: boolean;
  isSupported: boolean;
  speak: (text: string, language: Language) => void;
  stop: () => void;
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const speak = useCallback((text: string, language: Language) => {
    if (!isSupported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE_MAP[language] || 'en-US';
    utterance.rate = 0.9; // Slightly slower for learning
    utterance.pitch = 1.1; // Slightly higher, more friendly
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    // Try to find a matching voice for the language
    const voices = window.speechSynthesis.getVoices();
    // If voices aren't loaded yet, wait for them
    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        const matchingVoice = availableVoices.find(
          (v) => v.lang.startsWith(LANGUAGE_MAP[language].split('-')[0])
        );
        if (matchingVoice) utterance.voice = matchingVoice;
        window.speechSynthesis.speak(utterance);
      };
    } else {
      const matchingVoice = voices.find(
        (v) => v.lang.startsWith(LANGUAGE_MAP[language].split('-')[0])
      );
      if (matchingVoice) utterance.voice = matchingVoice;
    }

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [isSupported]);

  return { isSpeaking, isSupported, speak, stop };
}
