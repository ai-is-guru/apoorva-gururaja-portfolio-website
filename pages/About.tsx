
import React from 'react';
import Window from '../components/Window';
import { User } from 'lucide-react';

const About: React.FC = () => {
  return (
    <Window title="My Story" icon={<User size={12} className="text-yellow-500" />}>
      <div className="flex flex-col md:flex-row min-h-full">
        {/* Note Content - Full Width now */}
        <div className="flex-1 p-8 md:p-12 bg-white bg-[linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[length:100%_2rem]">
            <div className="max-w-4xl mx-auto font-serif">
                <div className="flex justify-between items-start mb-8">
                     <h1 className="text-4xl font-bold text-slate-900">About Apoorva</h1>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                   <div className="prose prose-slate text-slate-700 leading-loose flex-1 font-sans text-lg">
                       <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">The Intersection of AI, Advocacy, and Ambition</h3>
                       <p>
                           My story is rooted in both coasts - born in Buffalo, New York, but raised in the innovative heart of the Bay Area, graduating from Homestead High School in Cupertino. My early education took me to Bangalore, India, where I earned my Bachelor of Engineering in Computer Science - a journey that blended my American upbringing with my Indian heritage.
                       </p>
                       
                       <h3 className="text-xl font-bold text-slate-900 mt-8 mb-2 font-serif">The Strategic Pioneer</h3>
                       <p>
                           My eight-year career spans leadership roles in Product and Program Management at Google, Amazon, LinkedIn, and Cisco. I specialize in Technical Program Management and AI Product Management, focusing on building scalable systems and integrating AI and automation.
                       </p>
                       <p className="mt-4">
                           This drive to stay at the industry's cutting edge is why I made a crucial strategic decision: I was accepted into Cornell University, but chose to drop out. In the middle of the rapidly accelerating AI race, I determined that direct professional contribution - like leading AI-driven product portfolios and successfully launching tools like Inspire that cut design cycle time by 40% - was the most valuable education.
                       </p>
                   </div>
                   <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 bg-white p-2 shadow-lg rotate-2 transform hover:rotate-0 transition-transform duration-500 border border-gray-100">
                        <img 
                            src="https://res.cloudinary.com/dxa01fjve/image/upload/v1764395976/IMG_1106_reb90r.jpg" 
                            alt="Apoorva" 
                            className="w-full h-full object-cover filter sepia-[.05] object-[center_20%]" 
                        />
                        <div className="mt-2 text-center font-handwriting text-xs text-gray-400">Mountain View, CA</div>
                   </div>
                </div>
                
                <div className="prose prose-slate text-slate-700 leading-loose font-sans text-lg pb-12">
                    <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2 font-serif">The Spotlight and STEM Advocacy</h3>
                    <p>
                        Beyond technology, I have a deep passion for the creative arts, pursuing acting and modeling on the side. This pursuit gave me a platform through my pageantry experience, including winning Miss Bangalore and competing in Miss USA. I leverage this visibility to evangelize and advocate for women in STEM, inspiring young women to break barriers and see themselves as leaders in technology.
                    </p>
                    
                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-2 font-serif">My First-Gen Roots and Purpose</h3>
                    <p>
                        I am a First-Generation Indian American, deeply shaped by the ambition and value of education instilled by my family. I am proud to belong to a family that was among the first to immigrate to the United States. My father holds a Ph.D. in Biochemistry from IISC, and my mother works in HR Finance. This dual perspective-balancing Indian tradition with American drive-is the engine of my career and my advocacy.
                    </p>
                    <p className="mt-4">
                        Today, I live in Mountain View with my husband and our dog, Simba. My personal life is centered on continuous self-improvement: I love to travel, find peace in cooking, enjoy reading, and commit to always investing in myself.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </Window>
  );
};

export default About;
