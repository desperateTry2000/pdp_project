'use client'
import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import { motion } from 'framer-motion';
import styles from '@/styles/landing.module.css';
import demoAnimation from '../lotties/test-animation.json';
import Image from 'next/image';
import { DemoWidget } from '../components/DemoWidget/DemoWidget';


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
    <main>
      <section className={styles.heroSection}>
        <div className="container mx-auto text-center py-20">
          <h1 className={styles.heroTitle}>Feel Better, Day by Day</h1>
          <p className={styles.heroSubtitle}>
            Smart mood analysis & an AI companion to uplift you
          </p>
          {/* <Lottie
            loop
            animationData={demoAnimation}
            play
            style={{ width: 300, margin: '0 auto' }}
          /> */}
          {/* <Image
            src="public/icons/journal.svg"
            alt="journal icon"
            width={48}
            height={48}
          /> */}
          <a href="/auth/signin" className={styles.ctaButton}>
            Get Started
          </a>
        </div>
      </section>

      <section className="container mx-auto py-16 grid md:grid-cols-3 gap-8 px-4">
        {[
          { title: 'Dynamic Mood Analysis', desc: 'Real-time insights into your emotional state.' },
          { title: 'Uplifting AI Chat', desc: 'A companion that listens and lifts your spirits.' },
          { title: 'Progress Tracking', desc: 'Visualize your mood improvements over time.' }
        ].map((feat, i) => (
          <motion.div
            key={feat.title}
            className={styles.featureCard}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
            <p className="text-gray-600">{feat.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className={styles.statsSection}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.statsCount}>{stats.totalUsers}+</div>
            <div className={styles.statsText}>users uplifted</div>
            <div className={styles.statsCount}>{stats.upliftRate}</div>
            <div className={styles.statsText}>report better moods</div>
          </motion.div>
        </div>
      </section>

      {/* MINI DEMO SECTION */}
      <section className="container mx-auto py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Try it now</h2>
        <DemoWidget />
      </section>
    </main>
  );
}