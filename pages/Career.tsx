
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JOBS } from '../constants';
import { Briefcase, Folder, Calendar, MapPin, ChevronRight, ArrowLeft } from 'lucide-react';

const Career: React.FC = () => {
  const navigate = useNavigate();
  const [selectedJobId, setSelectedJobId] = useState<string>(JOBS[0].id);
  const selectedJob = JOBS.find(j => j.id === selectedJobId) || JOBS[0];

  return (
    <div className="h-full w-full overflow-y-auto thin-scrollbar pb-20 px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28">
      <div className="max-w-6xl mx-auto">
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
            Career Explorer
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed max-w-3xl font-normal tracking-normal">
            My professional journey across leading tech companies and high-growth startups.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 min-w-[250px] bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/30 dark:border-white/10 shadow-xl">
            <div className="p-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Locations</div>
            <div className="space-y-1">
              {JOBS.map((job) => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedJobId === job.id 
                      ? 'bg-slate-200/50 dark:bg-white/10 text-slate-900 dark:text-white font-medium' 
                      : 'text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <Folder size={16} className={`mr-2 ${selectedJobId === job.id ? 'text-slate-600 dark:text-white fill-slate-600 dark:fill-white' : 'text-slate-400'}`} />
                  <span className="truncate">{job.company}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-neutral-500 flex justify-between">
              <span>{JOBS.length} items</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 border border-white/30 dark:border-white/10 shadow-xl">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-2 tracking-tight leading-tight">{selectedJob.role}</h2>
                <div className="flex flex-wrap items-center gap-4 text-slate-500 dark:text-neutral-400 text-sm sm:text-base">
                  <span className="flex items-center"><Calendar size={14} className="mr-1" /> {selectedJob.period}</span>
                  <span className="flex items-center"><MapPin size={14} className="mr-1" /> {selectedJob.location}</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-center border border-slate-100 dark:border-white/10 flex-shrink-0">
                <Briefcase className="text-slate-400 dark:text-neutral-500" size={32} />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-400 dark:text-neutral-500 uppercase tracking-wider mb-3">Overview</h3>
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 border border-slate-100 dark:border-white/10">
                  <ul className="space-y-3">
                    {selectedJob.description.map((item, idx) => (
                      <li key={idx} className="flex items-start text-slate-600 dark:text-neutral-400 leading-relaxed text-sm sm:text-base font-normal tracking-normal">
                        <ChevronRight size={14} className="mr-2 mt-1 text-slate-400 dark:text-neutral-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-400 dark:text-neutral-500 uppercase tracking-wider mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-xs sm:text-sm text-slate-600 dark:text-neutral-400 shadow-sm hover:scale-105 transition-transform cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
