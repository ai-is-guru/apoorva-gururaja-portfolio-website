
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Construction, ArrowLeft } from 'lucide-react';

const Lifestyle: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full overflow-y-auto thin-scrollbar pb-20 px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 sm:mb-8 flex items-center gap-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
            My Picks
          </h1>
        </div>

        {/* Content */}
        <div className="bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-2xl p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center border border-white/30 dark:border-white/10 shadow-xl min-h-[400px]">
          <div className="max-w-md text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-6">
              <Construction size={40} className="text-pink-500" />
            </div>
            <h2 className="text-4xl font-semibold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">Coming Soon</h2>
            <p className="text-slate-500 dark:text-neutral-400 leading-relaxed text-lg font-normal tracking-normal">
              I'm curating a list of my favorite tech, desk setup, and wellness essentials. This shop will be live soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lifestyle;
