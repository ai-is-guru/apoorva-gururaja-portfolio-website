
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CASE_STUDIES } from '../constants';

const CaseStudies: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full overflow-y-auto thin-scrollbar pb-20 px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28">
      <div className="max-w-4xl mx-auto">
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
            Case Studies
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed max-w-3xl font-normal tracking-normal">
            Strategic product work balancing system consolidation, platform migration, and engineering velocity - from architecture to execution.
          </p>
        </div>

        {/* Scrollable List of Case Studies */}
        <div className="space-y-12 sm:space-y-16">
          {CASE_STUDIES.map((caseStudy) => (
            <div key={caseStudy.id} className="scroll-mt-20">
              {/* Theme Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wide uppercase">
                  {caseStudy.theme}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                {caseStudy.title}
              </h2>

              {/* Meta Information */}
              <div className="mb-6 sm:mb-8 text-base sm:text-lg text-slate-600 dark:text-neutral-400 font-normal tracking-normal">
                <p>
                  <span className="font-semibold">{caseStudy.role}</span> • {caseStudy.scope} • {caseStudy.period}
                </p>
              </div>

              {/* Blog-style Content - All in one continuous flow */}
              <div className="text-slate-600 dark:text-neutral-400 leading-[1.85] text-base sm:text-lg md:text-xl space-y-8 font-normal tracking-normal">
                {/* Summary */}
                <div>
                  <p className="text-xl sm:text-2xl text-slate-700 dark:text-neutral-300 leading-relaxed font-normal mb-6">
                    {caseStudy.summary}
                  </p>
                </div>

                {/* Problem Section */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-4 leading-tight tracking-tight">
                    Problem
                  </h3>
                  <p className="mb-4 text-lg sm:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed">
                    {caseStudy.problem.description}
                  </p>
                  <ul className="space-y-2 sm:space-y-3 list-none pl-0 mb-4">
                    {caseStudy.problem.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed">
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                  {caseStudy.problem.continuation && (
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed">
                      {caseStudy.problem.continuation}
                    </p>
                  )}
                </div>

                {/* Approach Section */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-4 leading-tight tracking-tight">
                    Approach
                  </h3>
                  {caseStudy.approach.description && (
                    <p className="mb-4 text-lg sm:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed">
                      {caseStudy.approach.description}
                    </p>
                  )}
                  <ul className="space-y-2 sm:space-y-3 list-none pl-0">
                    {caseStudy.approach.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed">
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome Section */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-4 leading-tight tracking-tight">
                    Outcome
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 list-none pl-0 mb-6">
                    {caseStudy.outcome.metrics.map((metric, idx) => (
                      <li key={idx} className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed">
                        • {metric}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 pt-6 border-t border-slate-200 dark:border-neutral-700">
                    {caseStudy.outcome.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-full text-xs sm:text-sm text-slate-700 dark:text-neutral-300 font-normal tracking-normal"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;

