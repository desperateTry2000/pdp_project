'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CrisisResponse } from '@/components/AIChatbot/CrisisResponse';
import { ChatbotContext, buildInitialPrompt, buildAnalysisPrompt } from '@/lib/chatbot-context';
import { useChatbot } from '../../hooks/useChatbot';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  journalEntry?: {
    content: string;
    analysis?: {
      isAlarming: boolean;
    };
    date: string;
  };
  previousEntries?: Array<{
    content: string;
    date: string;
    isAlarming: boolean;
  }>;
}

export default function AIChatbot({ isOpen, onClose, journalEntry, previousEntries }: ChatbotProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const context: ChatbotContext = useMemo(() => ({
    currentEntry: journalEntry?.content,
    previousEntries: previousEntries || [],
    safetyFlags: journalEntry?.analysis?.isAlarming,
    userHistory: []
  }), [journalEntry?.content, previousEntries, journalEntry?.analysis?.isAlarming]);

  const { messages, sendMessage, isLoading, addSystemMessage } = useChatbot();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      if (context.currentEntry && context.currentEntry.length > 0) {
        const analysisMessage = buildAnalysisPrompt(context);
        addSystemMessage(analysisMessage);
      } else {
        const initialMessage = buildInitialPrompt(context);
        addSystemMessage(initialMessage);
      }
    }
  }, [isOpen, messages.length, context, addSystemMessage]);

  const handleChatNow = () => {
    addSystemMessage("Great! I'm here for a general conversation about your mental health and well-being. What's on your mind today?");
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = inputValue.trim();
    setInputValue('');
    
    await sendMessage(userMessage, context);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-dark-700 rounded-xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl"
        >
          <div className="p-4 border-b border-gray-200 dark:border-dark-600 flex justify-between items-center bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-t-xl">
            <div className="flex items-center space-x-3">
              <Bot className="w-6 h-6" />
              <div>
                <h2 className="text-lg font-semibold">AI Mental Health Companion</h2>
                <p className="text-sm text-primary-100">Safe, supportive, and confidential</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleChatNow}
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-colors border border-white/30"
              >
                💬 Chat Now
              </button>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {context.safetyFlags && (
            <CrisisResponse level="CRITICAL" />
          )}

          {context.currentEntry && context.currentEntry.length > 0 && (
            <div className="px-4 py-2 bg-gray-50 dark:bg-dark-800 border-b border-gray-200 dark:border-dark-600">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-dark-400">
                  📝 Journal entry ready for analysis
                </span>
                <button
                  onClick={() => {
                    const analysisMessage = buildAnalysisPrompt(context);
                    addSystemMessage(analysisMessage);
                  }}
                  className="px-3 py-1.5 bg-primary-100 hover:bg-primary-200 dark:bg-primary-900/30 dark:hover:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm rounded-lg transition-colors"
                >
                  🔍 Re-analyze
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-800">
            {messages.map((message: ChatMessage, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.role === 'user' 
                    ? 'bg-primary-600 text-white shadow-lg' 
                    : 'bg-white dark:bg-dark-600 text-gray-800 dark:text-dark-200 shadow-md border border-gray-200 dark:border-dark-500'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' && (
                      <Bot className="w-4 h-4 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className="text-xs opacity-60 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <User className="w-4 h-4 text-white/80 mt-0.5 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white dark:bg-dark-600 px-4 py-3 rounded-2xl shadow-md border border-gray-200 dark:border-dark-500">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 rounded-b-xl">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts and feelings..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-white dark:bg-dark-600 text-gray-800 dark:text-dark-200 placeholder-gray-500 dark:placeholder-dark-400"
                  rows={1}
                  disabled={isLoading}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
                <div className="text-xs text-gray-500 dark:text-dark-400 mt-1 ml-1">
                  Press Enter to send, Shift+Enter for new line
                </div>
              </div>
              <Button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
