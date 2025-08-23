'use client'
import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import { motion } from 'framer-motion';
import demoAnimation from '../lotties/test-animation.json';
import Image from 'next/image';
import { DemoWidget } from '../components/DemoWidget/DemoWidget';
import { Button } from '@/components/ui/Button';
import { cn, animationVariants, spacing, textVariants, colorVariants } from '@/lib/utils';

async function fetchPlaceholderStats() {
  return {
    totalUsers: 'XXX',
    upliftRate: 'YY%'      
  };
}

export default function HomePage() {
  const [stats, setStats] = useState({ totalUsers: '...', upliftRate: '...' });

  useEffect(() => {
    fetchPlaceholderStats().then(setStats);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto text-center py-20 px-4">
          <motion.h1 
            className={cn(
              textVariants['4xl'],
              'font-bold text-gray-900 mb-6 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Feel Better, Day by Day
          </motion.h1>
          
          <motion.p 
            className={cn(
              textVariants.xl,
              'text-gray-600 mb-8 max-w-2xl mx-auto'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Smart mood analysis & an AI companion to uplift you
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 shadow-soft hover:shadow-medium transition-all duration-300"
              onClick={() => window.location.href = '/auth/signin'}
            >
              Get Started
            </Button>
          </motion.div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Dynamic Mood Analysis', 
              desc: 'Real-time insights into your emotional state.',
              icon: '📊'
            },
            { 
              title: 'Uplifting AI Chat', 
              desc: 'A companion that listens and lifts your spirits.',
              icon: '🤖'
            },
            { 
              title: 'Progress Tracking', 
              desc: 'Visualize your mood improvements over time.',
              icon: '📈'
            }
          ].map((feat, i) => (
            <motion.div
              key={feat.title}
              className="card p-6 text-center hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="text-4xl mb-4">{feat.icon}</div>
              <h3 className={cn(textVariants.xl, 'font-semibold mb-3 text-gray-900')}>
                {feat.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <div className={cn(textVariants['4xl'], 'font-bold text-primary-600 mb-2')}>
                  {stats.totalUsers}+
                </div>
                <div className="text-gray-600 font-medium">users uplifted</div>
              </div>
              <div>
                <div className={cn(textVariants['4xl'], 'font-bold text-success-600 mb-2')}>
                  {stats.upliftRate}
                </div>
                <div className="text-gray-600 font-medium">report better moods</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="container mx-auto py-16 px-4 text-center">
        <motion.h2 
          className={cn(textVariants['2xl'], 'font-semibold mb-8 text-gray-900')}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Try it now
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <DemoWidget />
        </motion.div>
      </section>
    </main>
  );
}