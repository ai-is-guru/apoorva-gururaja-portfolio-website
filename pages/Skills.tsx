
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Skills: React.FC = () => {
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
            Skills & Expertise
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            A comprehensive overview of my capabilities across program leadership, technical depth, operational rigor, and stakeholder management.
          </p>
        </div>

        {/* Skills Sections */}
        <div className="space-y-8 sm:space-y-10">
          {/* Program Leadership & Execution Excellence */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-neutral-300 dark:border-neutral-700 shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Program Leadership & Execution Excellence
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 mb-4 sm:mb-6 leading-relaxed font-normal">
              Driving clarity, alignment, and momentum across complex, multi-team engineering programs.
            </p>
            <ul className="space-y-3 sm:space-y-4">
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Dependency sequencing across engineering, data, design, and operations
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Risk surfacing early with clear mitigation paths and accountable owners
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Tradeoff alignment between customer value, engineering velocity, and operational constraints
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Ownership clarity via RACI definitions, role mapping, and decision-rights frameworks
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Timeline negotiation with cross-functional partners to land feasible, predictable delivery plans
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Async collaboration design using structured documentation, updates, and communication channels
              </li>
            </ul>
          </div>

          {/* Technical Depth & Systems Thinking */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-neutral-300 dark:border-neutral-700 shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Technical Depth & Systems Thinking
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 mb-4 sm:mb-6 leading-relaxed">
              Translating ambiguous product needs into scalable, data-driven engineering execution.
            </p>
            <ul className="space-y-3 sm:space-y-4">
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • AI/LLM system integration (Gemini, GPT, chat agents, evaluation pipelines, prompt design)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Data & experimentation frameworks (metrics architecture, funnels, A/B testing, quality signals)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Automation & reliability engineering (Cypress E2E/API, JMeter performance, regression suites)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Cloud & platform fundamentals (GCP/AWS, system design, high-availability patterns)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Service intakes & production readiness (triage workflows, SLAs/SLOs, incident management)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Secure-by-default patterns (access governance, auditability, operational controls)
              </li>
            </ul>
          </div>

          {/* Operational Rigor & Delivery Systems */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-neutral-300 dark:border-neutral-700 shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Operational Rigor & Delivery Systems
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 mb-4 sm:mb-6 leading-relaxed">
              Building predictable, scalable, and transparent program operating models.
            </p>
            <ul className="space-y-3 sm:space-y-4">
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Structured sprint systems (intake → grooming → prioritization → execution → QA → launch)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Cross-org orchestration across globally distributed engineering & business teams
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Issue & escalation pathways for production triage and high-severity incidents
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Process maturity builds (dashboards, OKRs, KPIs, release checklists, intake workflows)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Alignment rituals (weekly XFN syncs, decision docs, program reviews, executive updates)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Quality gates & launch criteria ensuring consistency across features and releases
              </li>
            </ul>
          </div>

          {/* Stakeholder & Leadership Skills */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-neutral-300 dark:border-neutral-700 shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Stakeholder & Leadership Skills
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 mb-4 sm:mb-6 leading-relaxed">
              Elevating program outcomes through communication, influence, and strategic clarity.
            </p>
            <ul className="space-y-3 sm:space-y-4">
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Executive-ready communication distilling complex engineering work into simple narratives
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Expectation-setting and renegotiation when scope, resources, or risks shift
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Conflict de-escalation and integration across PM, Eng, Ops, and Business stakeholders
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Consensus-building in ambiguous spaces with incomplete data
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Strategic framing of goals, risks, and technical decisions for diverse audiences
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Team coaching and enablement to raise delivery quality and operational hygiene
              </li>
            </ul>
          </div>

          {/* Domain & Product Expertise */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-neutral-300 dark:border-neutral-700 shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Domain & Product Expertise
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 mb-4 sm:mb-6 leading-relaxed">
              Rooted in real-world delivery across FAANG, enterprise SaaS, and high-growth startup environments.
            </p>
            <ul className="space-y-3 sm:space-y-4">
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • AI-driven product ecosystems (chatbots, AI design tools, LLM-assisted workflows)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Consumer conversion systems (Prime upsell, nudges, 2.2M conversions, 15% uplift)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Support tooling & developer experience (Firebase support, CSAT uplift, internal tools)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Enterprise platform workflows (LinkedIn Admin Center, Azure UMP migration)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Inventory, logistics & operations (hospitality, furniture-tech, student housing platforms)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • ML evaluation & data pipelines (labeling, review workflows, quality checks)
              </li>
            </ul>
          </div>

          {/* Impact Areas */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-neutral-300 dark:border-neutral-700 shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Impact Areas
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 mb-4 sm:mb-6 leading-relaxed">
              Where my programs consistently shift performance and outcomes.
            </p>
            <ul className="space-y-3 sm:space-y-4">
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Engineering efficiency (25–40% manual QA reduction through automation)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Customer impact & business outcomes (Prime conversion uplift, CSAT improvement)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Operational maturity (triage systems, metrics dashboards, intake governance)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • Cross-org alignment & predictability (launch success even amid shifting priorities)
              </li>
              <li className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed font-normal tracking-normal">
                • AI/LLM-driven transformation (agentic workflows, AI-powered support & design tools)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;

