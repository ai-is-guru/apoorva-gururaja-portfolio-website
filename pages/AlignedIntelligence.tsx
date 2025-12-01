
import React from 'react';
import Window from '../components/Window';
import { Mic, Construction } from 'lucide-react';

const AlignedIntelligence: React.FC = () => {

  return (
    <Window title="Aligned Intelligence Podcast" icon={<Mic size={12} className="text-purple-500" />} maxWidth="max-w-5xl">
      <div className="bg-white dark:bg-slate-900 min-h-full p-8 flex flex-col items-center justify-center">
        <div className="max-w-md text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
                <Construction size={40} className="text-purple-500" />
            </div>
            <h1 className="text-4xl font-semibold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">Coming Soon</h1>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                The Aligned Intelligence podcast is currently in production. I'll be interviewing leaders in AI and Tech. Stay tuned!
            </p>
        </div>
      </div>
    </Window>
  );
};

export default AlignedIntelligence;
