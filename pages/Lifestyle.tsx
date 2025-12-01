
import React from 'react';
import Window from '../components/Window';
import { ShoppingBag, Construction } from 'lucide-react';

const Lifestyle: React.FC = () => {

  return (
    <Window title="My Picks" icon={<ShoppingBag size={12} className="text-pink-500" />}>
      <div className="bg-slate-50 min-h-full p-6 md:p-8 flex flex-col items-center justify-center">
         <div className="max-w-md text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full mb-6">
                <Construction size={40} className="text-pink-500" />
            </div>
            <h1 className="text-4xl font-semibold text-slate-900 mb-4 tracking-tight leading-tight">Coming Soon</h1>
            <p className="text-slate-500 leading-relaxed text-lg">
                I'm curating a list of my favorite tech, desk setup, and wellness essentials. This shop will be live soon!
            </p>
        </div>
      </div>
    </Window>
  );
};

export default Lifestyle;
