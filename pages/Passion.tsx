

import React from 'react';
import Window from '../components/Window';
import { GALLERY_IMAGES } from '../constants';
import { Image as ImageIcon } from 'lucide-react';

const Passion: React.FC = () => {
  return (
    <Window title="Gallery" icon={<ImageIcon size={12} className="text-rose-500" />}>
      <div className="p-8 bg-white min-h-full">
         <div className="flex justify-between items-center mb-8">
             <h1 className="text-3xl font-semibold text-slate-900 tracking-tight leading-tight">Photo Gallery</h1>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Render Photo Gallery from Constants */}
             {GALLERY_IMAGES.map((item, index) => (
                <div key={`gallery-${index}`} className="relative rounded-xl overflow-hidden shadow-md aspect-square group">
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
    </Window>
  );
};

export default Passion;