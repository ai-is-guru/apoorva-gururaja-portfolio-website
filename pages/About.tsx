
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full overflow-y-auto thin-scrollbar pb-20 px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 sm:mb-8 flex items-center gap-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors group relative z-20"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        {/* Content Container with Background */}
        <div className="bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/30 dark:border-white/10 shadow-xl">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <img 
                  src="https://res.cloudinary.com/dxa01fjve/image/upload/v1764395976/IMG_1106_reb90r.jpg" 
                  alt="Apoorva" 
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover object-center object-[center_20%] border-4 border-white/50 dark:border-white/20 shadow-lg"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
              {/* Title and Subtitle */}
              <div className="flex-1 min-w-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                  About Apoorva
                </h1>
                <p className="text-xl sm:text-2xl text-slate-700 dark:text-neutral-300 leading-relaxed font-normal tracking-normal">
                  Technical Program Leader at the Intersection of AI, Product Strategy, and Scaled Execution
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
            <p>
              I am a Technical Program Manager and AI Product leader with eight years of experience delivering complex, cross-functional programs across Google, Amazon, LinkedIn, Cisco, and high-growth startups. My expertise spans AI/ML product integration, enterprise-scale systems, and operational rigor—driving programs that improve efficiency, reliability, and customer impact.
            </p>
            <p>
              With a background in Computer Science, I focus on bridging product vision with technical execution. I've led AI-driven product portfolios at an early-stage startup, including launching Inspire, an AI design tool that reduced design cycle times by 40%, and driving automation, E2E quality, and scalable workflows across globally distributed teams.
            </p>
            <p>
              My career has been shaped by intentional, high-velocity growth decisions. After being accepted into Cornell University, I chose to remain in industry to stay directly involved in the rapidly evolving AI landscape—prioritizing hands-on impact, real-world innovation, and building systems that scale.
            </p>
            <p>
              I am also committed to empowering representation in technology. Through public-speaking platforms and past leadership in STEM advocacy initiatives, I work to broaden access and visibility for women and first-generation professionals pursuing careers in tech.
            </p>
            <p>
              I'm based in Mountain View, CA, where I continue to learn, build, and invest in personal and professional growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;