
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GALLERY_IMAGES } from '../constants';
import { Image as ImageIcon, ArrowLeft } from 'lucide-react';

const Passion: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full overflow-y-auto thin-scrollbar pb-20 px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
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
            Photo Gallery
          </h1>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((item, index) => (
            <div key={`gallery-${index}`} className="relative rounded-xl overflow-hidden shadow-md aspect-square group bg-white/80 dark:bg-black/60 backdrop-blur-md border border-white/30 dark:border-white/10">
              <img 
                src={item.src} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={item.caption || `Gallery Image ${index + 1}`} 
              />
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium leading-tight text-center">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Passion;
