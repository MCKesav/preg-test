import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Bot, User } from 'lucide-react';
import { PregnancyPhase } from '../types';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatBotProps {
  phase: PregnancyPhase;
}

// Initialize Gemini AI - uses process.env which is defined by Vite
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Phase-based color themes
const phaseColors: Record<PregnancyPhase, { from: string; to: string; bg: string }> = {
  [PregnancyPhase.PRE]: { from: '#FEBAAD', to: '#FE6163', bg: 'from-[#FEBAAD] to-[#FE6163]' },
  [PregnancyPhase.IN]: { from: '#fb7185', to: '#e11d48', bg: 'from-rose-400 to-rose-600' },
  [PregnancyPhase.POSTPARTUM]: { from: '#a78bfa', to: '#7c3aed', bg: 'from-violet-400 to-violet-600' },
  [PregnancyPhase.POST]: { from: '#fbbf24', to: '#f59e0b', bg: 'from-amber-400 to-amber-500' },
};

// Phase-based greetings
const phaseGreetings: Record<PregnancyPhase, string> = {
  [PregnancyPhase.PRE]: "Hello! 🌸 Planning for a baby? I'm here to help with preconception tips, fertility guidance, and preparing your body for pregnancy. How can I assist you today?",
  [PregnancyPhase.IN]: "Hi there, mama-to-be! 💕 How are you feeling today? I'm here to support you through every step of your pregnancy journey with advice, information, and a listening ear.",
  [PregnancyPhase.POSTPARTUM]: "Welcome, new parent! 🌟 Congratulations on your little one! How can I support you today? Whether it's recovery tips, baby care, or just someone to talk to - I'm here for you.",
  [PregnancyPhase.POST]: "Hello! 👶 How can I help you on your parenting journey today? From baby milestones to your own wellbeing, I'm here to support you and your growing family.",
};

const getSystemPrompt = (phase: PregnancyPhase): string => {
  const phaseLabels: Record<PregnancyPhase, string> = {
    [PregnancyPhase.PRE]: 'PRE pregnancy (trying to conceive)',
    [PregnancyPhase.IN]: 'IN pregnancy (currently pregnant)',
    [PregnancyPhase.POSTPARTUM]: 'POSTPARTUM (just had a baby, recovery phase)',
    [PregnancyPhase.POST]: 'POST pregnancy (baby care phase)',
  };

  return `You are a helpful, compassionate pregnancy care assistant for the Nurture app. 
You provide supportive, accurate information about pregnancy, maternal health, 
baby care, nutrition, and emotional wellbeing.

Current phase: ${phaseLabels[phase]}

⚠️ CRITICAL LANGUAGE RULE - THIS IS YOUR TOP PRIORITY:
You MUST detect the language the user is writing in and respond ONLY in that SAME language.
- If user writes in Telugu, respond ENTIRELY in Telugu.
- If user writes in Hindi, respond ENTIRELY in Hindi.
- If user writes in Spanish, respond ENTIRELY in Spanish.
- If user writes in Tamil, respond ENTIRELY in Tamil.
- If user writes in any other language, respond ENTIRELY in that language.
- NEVER mix languages. Match the user's language 100%.

Guidelines:
- Be warm, empathetic, and encouraging
- Provide evidence-based information
- Always recommend consulting healthcare providers for medical concerns
- Keep responses concise but helpful (2-3 paragraphs max)
- Support partners and family members too
- Use appropriate emojis to be friendly but not excessive`;
};

const ChatBot: React.FC<ChatBotProps> = ({ phase }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const shouldKeepListeningRef = useRef(false);

  const colors = phaseColors[phase];

  // Initialize with greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'greeting',
          content: phaseGreetings[phase],
          role: 'assistant',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, phase, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          console.log('Transcript:', transcript);
          setInputValue(prev => prev + transcript + ' ');
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          if (event.error !== 'no-speech') {
            shouldKeepListeningRef.current = false;
            setIsListening(false);
          }
        };

        recognition.onend = () => {
          console.log('Speech recognition ended');
          // Restart if user wants to keep listening
          if (shouldKeepListeningRef.current && recognitionRef.current) {
            try {
              setTimeout(() => {
                if (shouldKeepListeningRef.current) {
                  recognitionRef.current?.start();
                }
              }, 100);
            } catch (error) {
              console.error('Failed to restart recognition:', error);
              shouldKeepListeningRef.current = false;
              setIsListening(false);
            }
          } else {
            setIsListening(false);
          }
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      shouldKeepListeningRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      shouldKeepListeningRef.current = false;
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsListening(false);
    } else {
      // Request microphone permission explicitly
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          // Stop the stream immediately, we just needed permission
          stream.getTracks().forEach(track => track.stop());
          
          try {
            shouldKeepListeningRef.current = true;
            recognitionRef.current?.start();
            setIsListening(true);
          } catch (error) {
            console.error('Failed to start speech recognition:', error);
            shouldKeepListeningRef.current = false;
            alert('Failed to start voice input. Please try again.');
          }
        })
        .catch((err) => {
          console.error('Microphone permission denied:', err);
          alert('Microphone access denied. Please allow microphone permission in your browser settings.');
        });
    }
  };

  const sendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: trimmedInput,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const conversationHistory = messages
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');

      const fullPrompt = `${getSystemPrompt(phase)}

Previous conversation:
${conversationHistory}

User: ${trimmedInput}

IMPORTANT: Detect the language of the user's message above and respond ENTIRELY in that same language. If user wrote in Telugu, respond in Telugu. If Hindi, respond in Hindi. If English, respond in English. Match the user's language exactly.

Please respond helpfully in the SAME LANGUAGE as the user's message:`;

      const response = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: fullPrompt,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.text || "I'm sorry, I couldn't generate a response. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Gemini API error:', error);
      // Log more details for debugging
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now. Please try again in a moment. 💕",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br ${colors.bg} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center z-50 ${isOpen ? 'hidden' : ''}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${colors.bg} text-white p-4 flex items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Nurture Assistant</h3>
              <p className="text-xs opacity-80">Always here for you 💕</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors flex items-center gap-1"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
            <span className="text-sm font-medium">Close</span>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? `bg-gradient-to-br ${colors.bg} text-white`
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.role === 'assistant' && (
                    <Bot className="w-4 h-4 mt-1 text-gray-400 flex-shrink-0" />
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.role === 'user' && (
                    <User className="w-4 h-4 mt-1 opacity-70 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-gray-400" />
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2">
            {/* Microphone Button */}
            <button
              onClick={toggleListening}
              disabled={isLoading}
              className={`p-3 rounded-full transition-all duration-300 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                placeholder={isListening ? 'Listening...' : 'Type your message...'}
                className={`w-full px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${
                  isListening ? 'ring-2 ring-red-400' : ''
                }`}
                style={{ 
                  ['--tw-ring-color' as any]: colors.to 
                }}
              />
            </div>

            {/* Send Button */}
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={`p-3 rounded-full bg-gradient-to-br ${colors.bg} text-white transition-all duration-300 ${
                !inputValue.trim() || isLoading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-lg hover:scale-105'
              }`}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Voice Status */}
          {isListening && (
            <p className="text-xs text-red-500 text-center mt-2 animate-pulse">
              🎤 Listening... Speak now
            </p>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ChatBot;