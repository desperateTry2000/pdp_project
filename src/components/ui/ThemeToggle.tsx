'use client';

import { useTheme } from '@/hooks/useTheme';
import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'A bit less light', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const currentTheme = themes.find(t => t.value === theme);
  const CurrentIcon = currentTheme?.icon || Monitor;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/90 dark:bg-dark-700/90 backdrop-blur-sm border border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600 transition-all duration-300 shadow-soft hover:shadow-medium"
        aria-label="Toggle theme"
      >
        <CurrentIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
        <span className="hidden sm:inline text-gray-700 dark:text-dark-200">{currentTheme?.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-dark-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white/95 dark:bg-dark-700/95 backdrop-blur-sm rounded-lg shadow-strong border border-gray-200 dark:border-dark-600 py-1 z-50">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            return (
              <button
                key={themeOption.value}
                onClick={() => {
                  setTheme(themeOption.value as 'light' | 'dark' | 'system');
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200 ${
                  theme === themeOption.value 
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
                    : 'text-gray-700 dark:text-dark-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {themeOption.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
