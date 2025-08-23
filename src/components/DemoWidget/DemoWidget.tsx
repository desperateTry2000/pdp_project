import React, { useState } from 'react';

export function DemoWidget() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ score: string; value: number } | null>(null);

  const handleAnalyze = () => {
    // TODO: call /api/analyze and set real result
    setResult({ score: 'Neutral', value: 50 });
  };

  return (
    <div className="max-w-md mx-auto">
      <textarea
        className="w-full border rounded p-2 mb-4"
        rows={3}
        placeholder="I'm feeling..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleAnalyze}
        className="px-6 py-2 bg-indigo-600 text-white rounded"
      >
        Analyze
      </button>
      {result && (
        <div className="mt-4 text-center">
          <p>Sentiment: <strong>{result.score}</strong></p>
          <p>Value: <strong>{result.value}</strong></p>
        </div>
      )}
    </div>
  );
}
