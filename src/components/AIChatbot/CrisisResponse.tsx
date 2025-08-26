import React from 'react';
import { AlertTriangle, Phone, MessageCircle, Shield } from 'lucide-react';
import { CrisisLevel } from '@/lib/crisis-detection';

interface CrisisResponseProps {
  level: CrisisLevel;
}

export function CrisisResponse({ level }: CrisisResponseProps) {
  if (level === 'SAFE') return null;

  const isCritical = level === 'CRITICAL';
  
  return (
    <div className={`border-l-4 p-4 mb-4 ${
      isCritical 
        ? 'bg-red-50 dark:bg-red-900/20 border-red-500' 
        : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
    }`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <AlertTriangle className={`w-5 h-5 ${
            isCritical ? 'text-red-500' : 'text-yellow-500'
          }`} />
        </div>
        <div className="flex-1">
          <h3 className={`text-sm font-medium ${
            isCritical ? 'text-red-800 dark:text-red-200' : 'text-yellow-800 dark:text-yellow-200'
          }`}>
            {isCritical ? '🚨 Safety Concern Detected' : '⚠️ I\'m concerned about your well-being'}
          </h3>
          
          <div className={`mt-2 text-sm ${
            isCritical ? 'text-red-700 dark:text-red-300' : 'text-yellow-700 dark:text-yellow-300'
          }`}>
            {isCritical ? (
              <div className="space-y-3">
                <p>
                  I've detected concerning content in your journal entry. Your safety is my top priority.
                </p>
                
                <div className="bg-white dark:bg-dark-600 p-3 rounded-lg border border-red-200 dark:border-red-700">
                  <h4 className="font-semibold mb-2 flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-red-500" />
                    <span>Immediate Help Available</span>
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-red-500" />
                      <span className="font-medium">116 123</span>
                      <span className="text-xs opacity-75">National Suicide Prevention Lifeline</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4 text-red-500" />
                      <span className="font-medium">Text HOME to 741741</span>
                      <span className="text-xs opacity-75">Crisis Text Line</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-red-500" />
                      <span className="font-medium">112</span>
                      <span className="text-xs opacity-75">Emergency Services</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs opacity-75">
                  You don't have to go through this alone. There are people who care and can help you right now.
                </p>
              </div>
            ) : (
              <div>
                <p>
                  I notice you're sharing some difficult thoughts and feelings. While I'm here to listen and support you, 
                  it's important to remember that professional help can provide the specialized support you deserve.
                </p>
                <p className="mt-2">
                  Consider reaching out to a mental health professional or counselor who can work with you directly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
