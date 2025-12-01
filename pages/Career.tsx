
import React, { useState } from 'react';
import Window from '../components/Window';
import { JOBS } from '../constants';
import { Briefcase, Folder, Calendar, MapPin, ChevronRight } from 'lucide-react';

const Career: React.FC = () => {
  const [selectedJobId, setSelectedJobId] = useState<string>(JOBS[0].id);
  const selectedJob = JOBS.find(j => j.id === selectedJobId) || JOBS[0];

  return (
    <Window title="Career Explorer" icon={<Briefcase size={12} className="text-blue-500" />} maxWidth="max-w-6xl">
      <div className="flex h-full bg-white">
        
        {/* Sidebar */}
        <div className="w-1/3 min-w-[250px] bg-slate-50 border-r border-slate-200 flex flex-col h-full">
          <div className="p-3 text-xs font-semibold text-slate-400 uppercase tracking-wider pl-4">Locations</div>
          <div className="flex-1 overflow-y-auto thin-scrollbar px-2 space-y-1">
            {JOBS.map((job) => (
              <button
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedJobId === job.id 
                    ? 'bg-slate-200/50 text-slate-900 font-medium' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Folder size={16} className={`mr-2 ${selectedJobId === job.id ? 'text-slate-600 fill-slate-600' : 'text-slate-400'}`} />
                <span className="truncate">{job.company}</span>
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-slate-200 text-xs text-slate-500 flex justify-between">
            <span>{JOBS.length} items</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full bg-white relative">
            {/* Toolbar */}
            <div className="h-12 border-b border-slate-100 flex items-center justify-between px-6 bg-white sticky top-0 z-10">
                <div className="flex items-center text-lg font-semibold text-slate-800 tracking-tight">
                    {selectedJob.company}
                </div>
            </div>

            {/* Content Details */}
            <div className="flex-1 overflow-y-auto p-8 animate-fade-in-up">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-semibold text-slate-900 mb-2 tracking-tight leading-tight">{selectedJob.role}</h2>
                        <div className="flex items-center text-slate-500 space-x-4 text-sm">
                            <span className="flex items-center"><Calendar size={14} className="mr-1" /> {selectedJob.period}</span>
                            <span className="flex items-center"><MapPin size={14} className="mr-1" /> {selectedJob.location}</span>
                        </div>
                    </div>
                    <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                        <Briefcase className="text-slate-400" size={32} />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Overview</h3>
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                            <ul className="space-y-3">
                                {selectedJob.description.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-slate-600 leading-relaxed text-sm font-normal tracking-normal">
                                        <ChevronRight size={14} className="mr-2 mt-1 text-slate-400 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                             {selectedJob.technologies.map(tech => (
                                 <span key={tech} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600 shadow-sm hover:scale-105 transition-transform cursor-default">
                                     {tech}
                                 </span>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </Window>
  );
};

export default Career;