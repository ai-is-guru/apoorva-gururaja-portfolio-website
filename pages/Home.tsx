
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Play, Mic, Image as ImageIcon, Briefcase, Linkedin, Github, Moon, Sun, ShoppingBag, Coffee, Calendar as CalendarIcon, Code2, FolderKanban, ChevronLeft, ChevronRight, Wrench, FileText, GitBranch, Palette, Sparkles, Terminal, TestTube, Cloud, Mail, Rocket } from 'lucide-react';
import { PODCAST_EPISODES, JOBS, GALLERY_IMAGES, BLOG_POSTS, CASE_STUDIES } from '../constants';
import SpotifyPlayer from '../components/SpotifyPlayer';
import FilterBar, { FilterCategory } from '../components/FilterBar';

// Tilt Component for 3D Effect
interface TiltCardProps {
  children?: React.ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
  image?: string; // Optional background image
  variant?: 'solid' | 'glass' | 'custom';
}

const TiltCard = ({ children, className = "", to, onClick, image, variant = 'glass' }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastEventRef = useRef<React.MouseEvent | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Skip tilt effect on touch devices for better performance
    if (isTouchDevice) return;
    lastEventRef.current = e;
    
    // Update widget position and hover for bird avoidance
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const widgetId = ref.current.getAttribute('data-widget-id');
      
      if (widgetId) {
        const positionEvent = new CustomEvent('widgetPosition', {
          detail: {
            id: widgetId,
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
          }
        });
        window.dispatchEvent(positionEvent);
      }
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const hoverEvent = new CustomEvent('widgetHover', {
        detail: { 
          x: centerX, 
          y: centerY, 
          active: true,
          width: rect.width,
          height: rect.height
        }
      });
      window.dispatchEvent(hoverEvent);
    }
    
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current || !lastEventRef.current) {
          rafRef.current = null;
          return;
        }
        
        const rect = ref.current.getBoundingClientRect();
        const x = lastEventRef.current.clientX - rect.left;
        const y = lastEventRef.current.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Subtle tilt
        const rotateX = ((y - centerY) / centerY) * -1.5; 
        const rotateY = ((x - centerX) / centerX) * 1.5;

        ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        
        rafRef.current = null;
        lastEventRef.current = null;
      });
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Generate unique ID for this widget
    const widgetId = ref.current.getAttribute('data-widget-id') || `widget-${Math.random().toString(36).substr(2, 9)}`;
    if (!ref.current.getAttribute('data-widget-id')) {
      ref.current.setAttribute('data-widget-id', widgetId);
    }
    
    // Emit widget position update
    const positionEvent = new CustomEvent('widgetPosition', {
      detail: {
        id: widgetId,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      }
    });
    window.dispatchEvent(positionEvent);
    
    // Emit custom event for widget hover
    const hoverEvent = new CustomEvent('widgetHover', {
      detail: { x: centerX, y: centerY, active: true }
    });
    window.dispatchEvent(hoverEvent);
  };

  const handleMouseLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastEventRef.current = null;
    
    if (!ref.current) return;
    ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    
    // Emit custom event for widget leave
    const event = new CustomEvent('widgetHover', {
      detail: { x: 0, y: 0, active: false }
    });
    window.dispatchEvent(event);
  };

  // Base styles:
  // If image is present -> Text White, Overlay Dark
  const isImageWidget = !!image;
  
  let themeClasses = '';
  
  if (isImageWidget) {
      // Image widgets always dark overlay with white text
      themeClasses = 'bg-neutral-900 border-neutral-800 text-white shadow-2xl';
  } else {
      // Solid/Glass widgets
      // Light Mode: White Background, Dark Text
      // Dark Mode: Dark Background, White Text
      themeClasses = 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-slate-900 dark:text-white shadow-lg dark:shadow-2xl';
  }

  const Content = (
    <div 
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative h-full w-full overflow-hidden rounded-2xl 
        border transition-all duration-300 group touch-manipulation
        ${themeClasses} ${className}`}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out', zIndex: 'auto', position: 'relative', WebkitTapHighlightColor: 'transparent', pointerEvents: 'auto', overflow: 'hidden' }}
    >
      {/* Background Image Layer */}
      {image && (
        <>
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={image} alt="" loading="lazy" className={`w-full h-full object-cover object-center opacity-60 group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0 ${to === '/aligned-intelligence' ? 'blur-[2px]' : ''}`} />
            </div>
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 z-0"></div>
        </>
      )}
      
      {/* Content Layer */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );

  if (to) {
    return <Link to={to} className="block h-full w-full">{Content}</Link>;
  }
  return Content;
};

interface HomeProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onSpotifyPlay?: () => void;
  onSpotifyPause?: () => void;
  isSpotifyPlaying?: boolean;
}

const ComingSoonBadge = () => (
  <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm z-50 uppercase tracking-wider pointer-events-none">
    Coming Soon
  </div>
);

// Widget IDs for drag and drop
type WidgetId = 'skills' | 'case-studies' | 'status' | 'profile' | 'theme' | 'calendar' | 'spotify' | 'gallery' | 'podcast' | 'social' | 'blog' | 'shop' | 'tools';

interface WidgetConfig {
  id: WidgetId;
  category: FilterCategory | 'always-visible';
  colSpan: string;
  rowSpan: string;
  minColSpan?: number;
  minRowSpan?: number;
  maxColSpan?: number;
  maxRowSpan?: number;
}

const DEFAULT_WIDGET_ORDER: WidgetId[] = [
  'profile', 'skills', 'case-studies', 'status', 'theme', 'calendar', 
  'spotify', 'gallery', 'podcast', 'social', 'blog', 'shop', 'tools'
];

const WIDGET_CONFIGS: Record<WidgetId, WidgetConfig> = {
  'skills': { id: 'skills', category: 'Skills', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-2', minColSpan: 1, maxColSpan: 2, minRowSpan: 1, maxRowSpan: 3 },
  'case-studies': { id: 'case-studies', category: 'Case Studies', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1', minColSpan: 1, maxColSpan: 2, minRowSpan: 1, maxRowSpan: 2 },
  'status': { id: 'status', category: 'Skills', colSpan: 'col-span-1', rowSpan: 'row-span-2', minColSpan: 1, maxColSpan: 2, minRowSpan: 1, maxRowSpan: 3 },
  'profile': { id: 'profile', category: 'About', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-2', minColSpan: 1, maxColSpan: 2, minRowSpan: 1, maxRowSpan: 3 },
  'theme': { id: 'theme', category: 'always-visible', colSpan: 'col-span-1', rowSpan: 'row-span-1', minColSpan: 1, maxColSpan: 1, minRowSpan: 1, maxRowSpan: 1 },
  'calendar': { id: 'calendar', category: 'always-visible', colSpan: 'col-span-1', rowSpan: 'row-span-1', minColSpan: 1, maxColSpan: 1, minRowSpan: 1, maxRowSpan: 2 },
  'spotify': { id: 'spotify', category: 'always-visible', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1', minColSpan: 1, maxColSpan: 2, minRowSpan: 1, maxRowSpan: 2 },
  'gallery': { id: 'gallery', category: 'Case Studies', colSpan: 'col-span-1', rowSpan: 'row-span-1', minColSpan: 1, maxColSpan: 2, minRowSpan: 1, maxRowSpan: 2 },
  'podcast': { id: 'podcast', category: 'Case Studies', colSpan: 'col-span-1', rowSpan: 'row-span-2', minColSpan: 1, maxColSpan: 2, minRowSpan: 1, maxRowSpan: 3 },
  'social': { id: 'social', category: 'Contact', colSpan: 'col-span-1', rowSpan: 'row-span-1', minColSpan: 1, maxColSpan: 1, minRowSpan: 1, maxRowSpan: 1 },
  'blog': { id: 'blog', category: 'Case Studies', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1', minColSpan: 1, maxColSpan: 2, minRowSpan: 1, maxRowSpan: 2 },
  'shop': { id: 'shop', category: 'always-visible', colSpan: 'col-span-1', rowSpan: 'row-span-1', minColSpan: 1, maxColSpan: 1, minRowSpan: 1, maxRowSpan: 1 },
  'tools': { id: 'tools', category: 'Skills', colSpan: 'col-span-1', rowSpan: 'row-span-1', minColSpan: 1, maxColSpan: 1, minRowSpan: 1, maxRowSpan: 2 },
};

// Skills Widget Component with vertical scrolling
const SkillsWidget: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Program Leadership & Execution Excellence',
      items: [
        'Driving clarity, alignment, and momentum across complex, multi-team engineering programs',
        'Dependency sequencing across engineering, data, design, and operations',
        'Risk surfacing early with clear mitigation paths and accountable owners',
        'Tradeoff alignment between customer value, engineering velocity, and operational constraints',
        'Ownership clarity via RACI definitions, role mapping, and decision-rights frameworks',
        'Timeline negotiation with cross-functional partners to land feasible, predictable delivery plans',
        'Async collaboration design using structured documentation, updates, and communication channels'
      ]
    },
    {
      title: 'Technical Depth & Systems Thinking',
      items: [
        'Translating ambiguous product needs into scalable, data-driven engineering execution',
        'AI/LLM system integration (Gemini, GPT, chat agents, evaluation pipelines, prompt design)',
        'Data & experimentation frameworks (metrics architecture, funnels, A/B testing, quality signals)',
        'Automation & reliability engineering (Cypress E2E/API, JMeter performance, regression suites)',
        'Cloud & platform fundamentals (GCP/AWS, system design, high-availability patterns)',
        'Service intakes & production readiness (triage workflows, SLAs/SLOs, incident management)',
        'Secure-by-default patterns (access governance, auditability, operational controls)'
      ]
    },
    {
      title: 'Operational Rigor & Delivery Systems',
      items: [
        'Building predictable, scalable, and transparent program operating models',
        'Structured sprint systems (intake → grooming → prioritization → execution → QA → launch)',
        'Cross-org orchestration across globally distributed engineering & business teams',
        'Issue & escalation pathways for production triage and high-severity incidents',
        'Process maturity builds (dashboards, OKRs, KPIs, release checklists, intake workflows)',
        'Alignment rituals (weekly XFN syncs, decision docs, program reviews, executive updates)',
        'Quality gates & launch criteria ensuring consistency across features and releases'
      ]
    },
    {
      title: 'Stakeholder & Leadership Skills',
      items: [
        'Elevating program outcomes through communication, influence, and strategic clarity',
        'Executive-ready communication distilling complex engineering work into simple narratives',
        'Expectation-setting and renegotiation when scope, resources, or risks shift',
        'Conflict de-escalation and integration across PM, Eng, Ops, and Business stakeholders',
        'Consensus-building in ambiguous spaces with incomplete data',
        'Strategic framing of goals, risks, and technical decisions for diverse audiences',
        'Team coaching and enablement to raise delivery quality and operational hygiene'
      ]
    },
    {
      title: 'Domain & Product Expertise',
      items: [
        'Rooted in real-world delivery across FAANG, enterprise SaaS, and high-growth startup environments',
        'AI-driven product ecosystems (chatbots, AI design tools, LLM-assisted workflows)',
        'Consumer conversion systems (Prime upsell, nudges, 2.2M conversions, 15% uplift)',
        'Support tooling & developer experience (Firebase support, CSAT uplift, internal tools)',
        'Enterprise platform workflows (LinkedIn Admin Center, Azure UMP migration)',
        'Inventory, logistics & operations (hospitality, furniture-tech, student housing platforms)',
        'ML evaluation & data pipelines (labeling, review workflows, quality checks)'
      ]
    },
    {
      title: 'Impact Areas',
      items: [
        'Engineering efficiency (25–40% manual QA reduction through automation)',
        'Customer impact & business outcomes (Prime conversion uplift, CSAT improvement)',
        'Operational maturity (triage systems, metrics dashboards, intake governance)',
        'Cross-org alignment & predictability (launch success even amid shifting priorities)',
        'AI/LLM-driven transformation (agentic workflows, AI-powered support & design tools)'
      ]
    }
  ];

  return (
    <div className="h-full w-full flex flex-col p-3 sm:p-4 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg dark:shadow-2xl overflow-hidden">
      <div className="flex justify-between items-start mb-2 sm:mb-3 flex-shrink-0">
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-slate-500 dark:text-neutral-500 uppercase tracking-widest text-xs sm:text-sm font-bold">
          <Code2 size={12} className="sm:w-4 sm:h-4" />
          <span>Skills</span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate('/skills');
          }}
          className="p-1.5 sm:p-2 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors flex items-center justify-center flex-shrink-0"
        >
          <ArrowUpRight className="text-slate-900 dark:text-white w-3.5 h-3.5 sm:w-4 sm:h-4" size={14} />
        </button>
      </div>

      {/* Content Area - One section at a time, wrapped around text */}
      <div className="overflow-y-auto thin-scrollbar pr-1 snap-y snap-mandatory max-h-[400px] sm:max-h-[500px] md:max-h-[600px] pb-2">
        {sections.map((section, idx) => (
          <div 
            key={idx} 
            className="flex flex-col snap-start snap-always bg-slate-50 dark:bg-neutral-800 rounded-lg p-3 sm:p-4 border border-slate-200 dark:border-neutral-700 mb-2 sm:mb-2.5"
            style={{ scrollSnapAlign: 'start' }}
          >
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-snug tracking-tight">
              {section.title}
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed break-words font-normal tracking-normal">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const Home: React.FC<HomeProps> = ({ darkMode, toggleDarkMode, onSpotifyPlay, onSpotifyPause, isSpotifyPlaying = false }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterCategory | null>(null);
  const [widgetOrder, setWidgetOrder] = useState<WidgetId[]>(() => {
    // Load from localStorage or use default
    const saved = localStorage.getItem('widget-order');
    let order: WidgetId[];
    
    if (saved) {
      try {
        const savedOrder = JSON.parse(saved);
        // Merge saved order with default to include any new widgets
        const savedSet = new Set(savedOrder);
        const newWidgets = DEFAULT_WIDGET_ORDER.filter(id => !savedSet.has(id));
        order = [...savedOrder, ...newWidgets];
      } catch {
        order = DEFAULT_WIDGET_ORDER;
      }
    } else {
      // For new users (no saved order), use default which has 'profile' first
      order = DEFAULT_WIDGET_ORDER;
    }
    
    // Always ensure 'profile' is first, regardless of saved order
    const profileIndex = order.indexOf('profile');
    if (profileIndex > 0) {
      // Remove profile from its current position and place it at the front
      order = ['profile', ...order.filter(id => id !== 'profile')];
    } else if (profileIndex === -1) {
      // Profile not found, add it at the front
      order = ['profile', ...order];
    }
    
    return order;
  });
  // Store the original order (without filter applied) - persist across filter changes
  const originalWidgetOrderRef = useRef<WidgetId[]>([]);
  const [widgetSizes, setWidgetSizes] = useState<Record<WidgetId, { colSpan: string; rowSpan: string }>>(() => {
    const saved = localStorage.getItem('widget-sizes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validate that all widgets have sizes
        const allWidgetsHaveSizes = DEFAULT_WIDGET_ORDER.every(id => parsed[id]);
        if (allWidgetsHaveSizes) {
          return parsed;
        }
      } catch {
        // If parsing fails, use defaults
      }
    }
    // Initialize with default sizes
    const sizes: Record<WidgetId, { colSpan: string; rowSpan: string }> = {} as any;
    Object.keys(WIDGET_CONFIGS).forEach((id) => {
      const config = WIDGET_CONFIGS[id as WidgetId];
      sizes[id as WidgetId] = { colSpan: config.colSpan, rowSpan: config.rowSpan };
    });
    return sizes;
  });
  const [draggedWidget, setDraggedWidget] = useState<WidgetId | null>(null);
  const [dragOverWidget, setDragOverWidget] = useState<WidgetId | null>(null);
  
  const latestEpisode = useMemo(() => PODCAST_EPISODES[0], []);
  const currentJob = useMemo(() => JOBS[0], []);
  const isBrewing = useMemo(() => currentJob.id === 'next-play', [currentJob.id]);

  // Initialize original order on mount
  useEffect(() => {
    if (originalWidgetOrderRef.current.length === 0 && widgetOrder.length > 0) {
      originalWidgetOrderRef.current = [...widgetOrder];
    }
  }, [widgetOrder]);

  // Update original order when widgetOrder changes (from drag and drop) but not from filtering
  useEffect(() => {
    // Only update original order if no filter is active (to preserve user's custom order)
    if (!activeFilter || activeFilter === 'All') {
      // Always ensure 'profile' is first before saving
      let orderToSave = [...widgetOrder];
      const profileIndex = orderToSave.indexOf('profile');
      if (profileIndex > 0) {
        orderToSave = ['profile', ...orderToSave.filter(id => id !== 'profile')];
      } else if (profileIndex === -1) {
        orderToSave = ['profile', ...orderToSave];
      }
      
      originalWidgetOrderRef.current = orderToSave;
      localStorage.setItem('widget-order', JSON.stringify(orderToSave));
    }
  }, [widgetOrder, activeFilter]);

  useEffect(() => {
    localStorage.setItem('widget-sizes', JSON.stringify(widgetSizes));
  }, [widgetSizes]);

  // Extract unique skills/technologies from all jobs
  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    JOBS.forEach(job => {
      job.technologies.forEach(tech => skillsSet.add(tech));
    });
    return Array.from(skillsSet).slice(0, 12); // Limit to 12 for display
  }, []);

  // Use case studies from constants
  const caseStudies = useMemo(() => {
    return CASE_STUDIES.slice(0, 3).map(study => ({
      title: study.title,
      company: study.scope,
      period: study.period,
      highlight: study.summary
    }));
  }, []);

  // Define which widgets belong to each filter
  const FILTER_WIDGET_MAP: Record<FilterCategory, WidgetId[]> = {
    'Case Studies': ['case-studies', 'blog', 'podcast'],
    'Skills': ['skills', 'status', 'tools'],
    'About': ['profile', 'status', 'blog', 'case-studies', 'skills', 'tools'],
    'Contact': ['social'],
    'All': [] // All widgets visible when "All" is selected
  };

  const handleFilterToggle = useCallback((category: FilterCategory) => {
    setActiveFilter((prev) => {
      const newFilter = category === 'All' ? null : (prev === category ? null : category);
      
      // Ensure originalWidgetOrderRef is up to date with current order before applying filter
      if (originalWidgetOrderRef.current.length === 0 || (!prev || prev === 'All')) {
        originalWidgetOrderRef.current = [...widgetOrder];
      }
      
      // If clearing filter or selecting "All", restore original order
      if (!newFilter || newFilter === 'All') {
        let restoredOrder = [...originalWidgetOrderRef.current];
        // Ensure 'profile' is first
        const profileIndex = restoredOrder.indexOf('profile');
        if (profileIndex > 0) {
          restoredOrder = ['profile', ...restoredOrder.filter(id => id !== 'profile')];
        } else if (profileIndex === -1) {
          restoredOrder = ['profile', ...restoredOrder];
        }
        setWidgetOrder(restoredOrder);
      } else {
        // When a filter is applied, reorder widgets to bring filtered ones to the top
        const filteredWidgets = FILTER_WIDGET_MAP[newFilter] || [];
        const currentOrder = [...originalWidgetOrderRef.current];
        
        // Separate filtered widgets from others, maintaining relative order within each group
        const filtered: WidgetId[] = [];
        const others: WidgetId[] = [];
        const alwaysVisible: WidgetId[] = [];
        
        currentOrder.forEach((widgetId) => {
          const config = WIDGET_CONFIGS[widgetId];
          if (config.category === 'always-visible') {
            alwaysVisible.push(widgetId);
          } else if (filteredWidgets.includes(widgetId)) {
            filtered.push(widgetId);
          } else {
            others.push(widgetId);
          }
        });
        
        // New order: profile first (if in filtered), then other filtered widgets, then others, then always-visible widgets last
        let newOrder: WidgetId[] = [];
        const profileInFiltered = filtered.includes('profile');
        if (profileInFiltered) {
          newOrder = ['profile', ...filtered.filter(id => id !== 'profile'), ...others, ...alwaysVisible];
        } else {
          // Even if profile is not in filtered widgets, keep it first
          newOrder = ['profile', ...filtered, ...others.filter(id => id !== 'profile'), ...alwaysVisible];
        }
        setWidgetOrder(newOrder);
      }
      
      return newFilter;
    });
  }, [widgetOrder]);

  const getWidgetVisibility = useCallback((widgetId: WidgetId) => {
    // If no filter is active, show all widgets normally
    if (!activeFilter || activeFilter === 'All') {
      return { visible: true, greyedOut: false };
    }

    // Get widgets that should be visible for the active filter
    const visibleWidgets = FILTER_WIDGET_MAP[activeFilter] || [];
    
    // Check if this widget should be visible
    const isVisible = visibleWidgets.includes(widgetId);
    
    // Always-visible widgets (theme, calendar, spotify, shop) are always shown but greyed out when filter is active
    const config = WIDGET_CONFIGS[widgetId];
    if (config.category === 'always-visible') {
      return { visible: true, greyedOut: true };
    }

    return { visible: true, greyedOut: !isVisible };
  }, [activeFilter]);

  // Find available space at drop location and calculate optimal widget size
  const findOptimalSize = useCallback((widgetId: WidgetId, dropCol: number, dropRow: number, currentWidgets: WidgetId[]) => {
    const config = WIDGET_CONFIGS[widgetId];
    const minCol = config.minColSpan || 1;
    const maxCol = config.maxColSpan || 2;
    const minRow = config.minRowSpan || 1;
    const maxRow = config.maxRowSpan || 3;
    
    // Adaptive sizing based on drop position and available space
    // Prefer sizes that fit naturally in the grid
    let optimalColSpan = minCol;
    let optimalRowSpan = minRow;
    
    // Try to find the best fit - prefer larger sizes if they fit
    // Check available space in the grid area
    const availableCols = 4 - dropCol; // Columns available from drop position
    const canFitWide = availableCols >= 2 && maxCol >= 2;
    
    // Determine column span based on available space
    if (canFitWide && dropCol <= 2) {
      optimalColSpan = 2; // Can fit wide widget
    } else {
      optimalColSpan = 1; // Must be narrow
    }
    
    // Determine row span - try to use more vertical space if available
    // Prefer 2 rows for better content display, but allow 1-3
    if (maxRow >= 2) {
      optimalRowSpan = 2; // Default to 2 rows for better visibility
    } else {
      optimalRowSpan = minRow;
    }
    
    // Ensure within bounds
    optimalColSpan = Math.max(minCol, Math.min(maxCol, optimalColSpan));
    optimalRowSpan = Math.max(minRow, Math.min(maxRow, optimalRowSpan));
    
    return {
      colSpan: optimalColSpan === 1 ? 'col-span-1' : 'col-span-1 md:col-span-2',
      rowSpan: `row-span-${optimalRowSpan}`
    };
  }, []);

  // Pack widgets into grid with adaptive sizing
  const packWidgetsIntoGrid = useCallback((widgets: WidgetId[], targetWidget: WidgetId, targetPosition: { col: number, row: number }) => {
    // Remove target widget from list
    const remaining = widgets.filter(w => w !== targetWidget);
    
    // Calculate approximate target index based on grid position
    // CSS Grid's dense packing will handle the actual placement
    const targetIndex = Math.min(targetPosition.row * 2 + Math.floor(targetPosition.col / 2), remaining.length);
    
    // Insert target widget at calculated position
    const result = [...remaining];
    result.splice(targetIndex, 0, targetWidget);
    
    return result;
  }, []);

  // Drag and drop handlers
  const handleDragStart = useCallback((e: React.DragEvent, widgetId: WidgetId) => {
    setDraggedWidget(widgetId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', widgetId);
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  }, []);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
    setDraggedWidget(null);
    setDragOverWidget(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, widgetId: WidgetId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedWidget && draggedWidget !== widgetId) {
      setDragOverWidget(widgetId);
    }
  }, [draggedWidget]);

  const handleDragLeave = useCallback(() => {
    setDragOverWidget(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetWidgetId: WidgetId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedWidget) {
      setDragOverWidget(null);
      return;
    }

    // Get grid element to calculate drop position
    const gridElement = (e.currentTarget as HTMLElement).closest('.grid') as HTMLElement;
    let dropPosition = { col: 0, row: 0 };
    
    if (gridElement) {
      const rect = gridElement.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      
      const gap = 12;
      const cellWidth = (rect.width - (3 * gap)) / 4;
      const cellHeight = 200;
      
      dropPosition = {
        col: Math.max(0, Math.min(3, Math.floor(relativeX / (cellWidth + gap)))),
        row: Math.max(0, Math.floor(relativeY / (cellHeight + gap)))
      };
    }

    // Find optimal size for the widget at drop location
    const optimalSize = findOptimalSize(draggedWidget, dropPosition.col, dropPosition.row, widgetOrder);
    
    // Update widget size
    setWidgetSizes(prev => ({
      ...prev,
      [draggedWidget]: optimalSize
    }));

    // If dropping on the same widget, just resize
    if (draggedWidget === targetWidgetId) {
      setDragOverWidget(null);
      return;
    }

    // Reorder widgets - grid will auto-place them
    const newOrder = packWidgetsIntoGrid(widgetOrder, draggedWidget, dropPosition);
    setWidgetOrder(newOrder);
    setDragOverWidget(null);
  }, [draggedWidget, widgetOrder, findOptimalSize, packWidgetsIntoGrid]);

  const handleSpotifyToggle = useCallback(() => {
    onSpotifyPlay?.();
  }, [onSpotifyPlay]);

  // Render widget content based on widgetId
  const renderWidget = useCallback((widgetId: WidgetId) => {
    switch (widgetId) {
      case 'skills':
        return <SkillsWidget />;
      case 'case-studies':
        return (
          <TiltCard to="/case-studies" className="h-full p-4 sm:p-5 md:p-6 flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors group" data-category="Case Studies">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-slate-500 dark:text-neutral-500 uppercase tracking-widest text-xs sm:text-sm font-semibold">
                <FolderKanban size={12} className="sm:w-4 sm:h-4" />
                <span>Case Studies</span>
              </div>
              <div className="p-2 sm:p-2.5 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                <ArrowUpRight className="text-slate-900 dark:text-white sm:w-5 sm:h-5" size={16} />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-2 sm:space-y-3">
              {caseStudies.map((study, idx) => (
                <div key={idx} className="border-l-2 border-slate-300 dark:border-neutral-600 pl-3 sm:pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white tracking-tight">{study.title}</h4>
                    <span className="text-[10px] sm:text-xs text-slate-500 dark:text-neutral-500">@ {study.company}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {study.highlight}
                  </p>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 dark:text-neutral-600 mt-1">{study.period}</span>
                </div>
              ))}
            </div>
          </TiltCard>
        );
      case 'status':
        return (
          <TiltCard to="/career" className={`h-full p-3 sm:p-4 md:p-5 flex flex-col ${isBrewing ? 'justify-center' : 'justify-between'} hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors relative overflow-hidden ${isBrewing ? 'bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-amber-50/30 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-amber-950/10' : ''}`} data-category="Skills">
            {isBrewing ? (
              <div className="flex flex-col flex-1 relative z-10 min-h-0">
                <div className="flex items-center justify-between mb-2 sm:mb-3 flex-shrink-0">
                  <div className="flex items-center space-x-1.5 sm:space-x-2 text-slate-500 dark:text-neutral-500 uppercase tracking-widest text-xs sm:text-sm font-semibold">
                    <Briefcase size={12} className="sm:w-4 sm:h-4" />
                    <span>Work Status</span>
                  </div>
                  <div className="p-2 sm:p-2.5 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                    <ArrowUpRight className="text-slate-900 dark:text-white sm:w-5 sm:h-5" size={16} />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start flex-1 min-h-0 mt-24 sm:mt-28 md:mt-32">
                  <div className="relative flex items-center justify-center mb-2 sm:mb-3">
                    <div className="absolute inset-0 bg-amber-200/20 dark:bg-amber-400/10 rounded-full blur-xl -z-10"></div>
                    <Coffee size={48} className="sm:w-14 sm:h-14 md:w-16 md:h-16 text-amber-600 dark:text-amber-400 drop-shadow-xl relative z-10 transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
                    <div className="absolute -top-10 sm:-top-12 md:-top-14 left-1/2 -translate-x-1/2 w-20 sm:w-22 md:w-24 h-12 sm:h-14 md:h-16 opacity-90 pointer-events-none z-0">
                      <div className="absolute w-2 sm:w-2.5 h-5 sm:h-6 md:h-7 bg-gradient-to-t from-orange-300/70 to-transparent dark:from-orange-400/50 dark:to-transparent rounded-full blur-[4px] animate-[float_2s_infinite] left-3 sm:left-4 md:left-5 top-0"></div>
                      <div className="absolute w-2 sm:w-2.5 h-6 sm:h-7 md:h-8 bg-gradient-to-t from-orange-300/60 to-transparent dark:from-orange-400/40 dark:to-transparent rounded-full blur-[4px] animate-[float_2.5s_infinite_0.3s] left-1/2 -translate-x-1/2 top-0"></div>
                      <div className="absolute w-2 sm:w-2.5 h-4 sm:h-5 md:h-6 bg-gradient-to-t from-orange-300/50 to-transparent dark:from-orange-400/30 dark:to-transparent rounded-full blur-[4px] animate-[float_1.8s_infinite_0.6s] right-3 sm:right-4 md:right-5 top-1"></div>
                    </div>
                  </div>
                  <div className="text-center space-y-1 sm:space-y-1.5 flex-shrink-0">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-snug tracking-tight">{currentJob.role}</h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-600 dark:text-neutral-400 font-medium tracking-wide">
                      Ready for what's next
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-1.5 sm:space-x-2 text-slate-500 dark:text-neutral-500 uppercase tracking-widest text-[9px] sm:text-[10px] font-bold mb-1 relative z-10">
                  <Briefcase size={10} className="sm:w-3 sm:h-3" />
                  <span>Current Role</span>
                </div>
                <div className="flex flex-col justify-center flex-1 relative z-10">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-1 leading-snug tracking-tight">{currentJob.role}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
                    at {currentJob.company}
                  </p>
                </div>
              </>
            )}
          </TiltCard>
        );
      case 'profile':
        return (
          <TiltCard to="/about" className="h-full flex flex-col p-3 sm:p-5 md:p-8 justify-between" data-category="About">
            <div className="flex justify-between items-start mb-3 sm:mb-0">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-full overflow-hidden bg-white/5 border-2 sm:border-4 border-slate-100 dark:border-white/10 shadow-lg group-hover:scale-105 transition-all duration-500">
                <img 
                  src="https://res.cloudinary.com/dxa01fjve/image/upload/c_thumb,g_face,w_400,h_400,q_auto,f_auto/v1764395976/IMG_1106_reb90r.jpg" 
                  alt="Apoorva" 
                  loading="eager"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-1.5 sm:p-2.5 md:p-3 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                <ArrowUpRight className="text-slate-900 dark:text-white sm:w-5 sm:h-5 md:w-6 md:h-6" size={16} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-slate-900 dark:text-white mb-1.5 sm:mb-3 tracking-tight leading-tight">
                I'm Apoorva,
              </h1>
              <p className="text-xs sm:text-sm md:text-lg text-slate-600 dark:text-neutral-400 font-normal leading-relaxed tracking-normal">
                a Technical Program Manager based in Mountain View, CA, working across AI, product execution, and cross-functional delivery. I'm driven by AI innovation, operational rigor, and advancing the craft of program management.
              </p>
            </div>
          </TiltCard>
        );
      case 'theme':
        return (
          <TiltCard onClick={toggleDarkMode} className="h-full p-0 flex items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors touch-manipulation">
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 h-full w-full">
              <div className="p-3 sm:p-4 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
                {darkMode ? <Sun className="sm:w-7 sm:h-7 md:w-8 md:h-8" size={24} /> : <Moon className="sm:w-7 sm:h-7 md:w-8 md:h-8" size={24} />}
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-500">
                {darkMode ? 'Light' : 'Dark'}
              </span>
            </div>
          </TiltCard>
        );
      case 'calendar':
        return (
          <TiltCard className="h-full p-3 sm:p-4 md:p-5 flex flex-col group relative">
            <div className="flex justify-start items-start mb-2 sm:mb-3 flex-shrink-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-slate-500 dark:text-neutral-500 uppercase tracking-widest text-xs sm:text-sm font-semibold">
                <CalendarIcon size={12} className="sm:w-4 sm:h-4" />
                <span>Calendar</span>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start flex-1 w-full min-h-0">
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-1 leading-none">
                {new Date().getDate()}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 font-medium">
                {new Date().toLocaleDateString('en-US', { month: 'short' })} {new Date().getFullYear()}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-neutral-500 font-medium mt-0.5">
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </div>
            </div>
          </TiltCard>
        );
      case 'spotify':
        return (
          <TiltCard 
            onClick={!isSpotifyPlaying ? () => {
              window.open('https://open.spotify.com/playlist/37i9dQZF1DX4OzrY981I1W?si=3DiPCmyyRLKvff2UXB7yiA', '_blank', 'noopener,noreferrer');
            } : undefined}
            image={!isSpotifyPlaying ? "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop" : undefined}
            className={`h-full border-neutral-800 ${isSpotifyPlaying ? '!p-0 bg-[#282828]' : 'flex flex-col justify-between p-5 cursor-pointer group'} ${isSpotifyPlaying ? 'ring-2 ring-green-500/50' : ''}`}
          >
            {isSpotifyPlaying ? (
              <div className="w-full h-full flex items-center justify-center p-2 sm:p-3 md:p-4">
                <SpotifyPlayer isPlaying={isSpotifyPlaying} onPause={onSpotifyPause} inline={true} />
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start relative z-10">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" className="w-5 h-5 sm:w-6 sm:h-6 invert opacity-80" alt="Spotify" />
                  <div className="flex space-x-0.5 sm:space-x-1 items-end h-3 sm:h-4">
                    <div className="w-0.5 sm:w-1 bg-green-500/50 h-full"></div>
                    <div className="w-0.5 sm:w-1 bg-green-500/50 h-2/3"></div>
                    <div className="w-0.5 sm:w-1 bg-green-500/50 h-3/4"></div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Play fill="currentColor" className="text-white ml-0.5 sm:ml-1 sm:w-6 sm:h-6" size={20} />
                  </div>
                </div>
                <div className="relative z-10 group-hover:opacity-20 transition-opacity duration-300">
                  <div className="text-[10px] sm:text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">
                    my life is a movie
                  </div>
                  <div className="font-serif text-lg sm:text-xl text-white leading-none">Every Main Character</div>
                  <div className="text-[10px] sm:text-xs text-neutral-400 mt-1">Needs Their Soundtrack</div>
                </div>
              </>
            )}
          </TiltCard>
        );
      case 'gallery':
        return (
          <TiltCard 
            to="/passion" 
            className="h-full group p-0 border-neutral-800 transition-all duration-1000 bg-neutral-900 relative"
            data-category="Case Studies"
          >
            <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-neutral-950">
              <img 
                src={GALLERY_IMAGES[galleryIndex].src} 
                alt="Gallery Slideshow"
                loading="lazy"
                className="w-full h-full object-contain transition-opacity duration-1000 opacity-60 group-hover:scale-105"
                style={{ objectPosition: 'center center' }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10"></div>
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30">
              <div className="p-2 sm:p-2.5 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full border border-white/20 group-hover:bg-white/20 dark:group-hover:bg-white/10 transition-colors">
                <ArrowUpRight className="text-white sm:w-5 sm:h-5" size={16} />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
              <div className="flex items-center gap-2 text-white font-serif italic text-lg border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
                <ImageIcon size={18} />
                <span>Gallery</span>
              </div>
            </div>
          </TiltCard>
        );
      case 'podcast':
        return (
          <TiltCard 
            to="/aligned-intelligence" 
            image="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop" 
            className="h-full border-neutral-800"
            data-category="Case Studies"
          >
            <ComingSoonBadge />
            <div className="h-full w-full p-6 flex flex-col justify-end relative z-10 filter blur-[2px] opacity-70">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-4 shadow-lg">
                <Mic size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-tight drop-shadow-md">The Aligned Intelligence</h3>
              <p className="text-neutral-300 text-sm line-clamp-3 font-medium mb-6 leading-relaxed opacity-90">{latestEpisode.description}</p>
              <div className="flex items-center justify-between border-t border-white/20 pt-4">
                <span className="text-xs font-mono text-neutral-400">{latestEpisode.duration}</span>
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  Listen <Play size={10} fill="currentColor" />
                </div>
              </div>
            </div>
          </TiltCard>
        );
      case 'social':
        return (
          <TiltCard to="/contact" className="h-full p-4 sm:p-5 md:p-6 flex flex-col justify-center items-center gap-4 sm:gap-5 hover:bg-slate-50 dark:hover:bg-neutral-800" data-category="Contact">
            <div className="flex -space-x-3 mb-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-200 dark:bg-neutral-800 flex items-center justify-center text-slate-700 dark:text-white border-2 border-white dark:border-neutral-900 z-30 group-hover:-translate-y-1 transition-transform"><Linkedin size={20} className="sm:w-6 sm:h-6" /></div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-200 dark:bg-neutral-800 flex items-center justify-center text-slate-700 dark:text-white border-2 border-white dark:border-neutral-900 z-20 group-hover:-translate-y-1 transition-transform delay-75"><Github size={20} className="sm:w-6 sm:h-6" /></div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white tracking-tight leading-tight">Get in Touch</div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 font-normal tracking-normal leading-relaxed max-w-[200px] sm:max-w-none">
                Let's Drive Strategy, Alignment, and High-Impact Delivery
              </div>
            </div>
          </TiltCard>
        );
      case 'tools':
        const tools = [
          { name: 'Jira', icon: FileText, color: 'text-blue-500', url: 'https://www.atlassian.com/software/jira' },
          { name: 'Confluence', icon: FileText, color: 'text-blue-600', url: 'https://www.atlassian.com/software/confluence' },
          { name: 'GitHub', icon: GitBranch, color: 'text-slate-800 dark:text-slate-200', url: 'https://github.com' },
          { name: 'Figma', icon: Palette, color: 'text-purple-500', url: 'https://www.figma.com' },
          { name: 'Google AI Studio (Gemini)', icon: Sparkles, color: 'text-yellow-500', url: 'https://aistudio.google.com' },
          { name: 'Cursor', icon: Terminal, color: 'text-green-500', url: 'https://cursor.sh' },
          { name: 'Cypress', icon: TestTube, color: 'text-cyan-500', url: 'https://www.cypress.io' },
          { name: 'Cloudinary', icon: Cloud, color: 'text-blue-400', url: 'https://cloudinary.com' },
          { name: 'Google Workspace', icon: Mail, color: 'text-red-500', url: 'https://workspace.google.com' },
          { name: 'Vercel', icon: Rocket, color: 'text-black dark:text-white', url: 'https://vercel.com' }
        ];
        return (
          <TiltCard className="h-full p-3 sm:p-4 md:p-5 flex flex-col group relative" data-category="Skills">
            <div className="flex justify-end items-start mb-2 sm:mb-3 flex-shrink-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-slate-500 dark:text-neutral-500 uppercase tracking-widest text-xs sm:text-sm font-semibold">
                <Wrench size={12} className="sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">Favorite Tools of the Season</span>
              </div>
            </div>
            <div className="flex flex-col justify-start flex-1 h-full min-h-0">
              <div className="w-full space-y-2.5 sm:space-y-3 overflow-y-auto thin-scrollbar max-h-full px-1">
                {tools.map((tool, idx) => {
                  const IconComponent = tool.icon;
                  return (
                    <a
                      key={idx}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 sm:gap-3 group/item hover:translate-x-0.5 transition-transform cursor-pointer hover:text-slate-900 dark:hover:text-white"
                    >
                      <div className={`flex-shrink-0 ${tool.color}`}>
                        <IconComponent size={18} className="sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-base sm:text-lg font-normal text-slate-600 dark:text-neutral-400 tracking-normal leading-relaxed group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors">
                        {tool.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </TiltCard>
        );
      case 'blog':
        return (
          <TiltCard to="/blog" className="h-full p-4 sm:p-5 md:p-6 flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors group" data-category="Case Studies">
            {BLOG_POSTS.length > 0 && (
              <>
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className="flex items-center space-x-1.5 sm:space-x-2 text-slate-500 dark:text-neutral-500 uppercase tracking-widest text-xs sm:text-sm font-semibold">
                    <span>Blogs</span>
                  </div>
                  <div className="p-2 sm:p-2.5 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                    <ArrowUpRight className="text-slate-900 dark:text-white sm:w-5 sm:h-5" size={16} />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {BLOG_POSTS[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
                    {BLOG_POSTS[0].excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-neutral-500">
                    <span className="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium">
                      {BLOG_POSTS[0].category}
                    </span>
                    <span>•</span>
                    <span>{BLOG_POSTS[0].date}</span>
                  </div>
                </div>
              </>
            )}
          </TiltCard>
        );
      case 'shop':
        return (
          <TiltCard to="/lifestyle" className="h-full flex flex-col justify-end items-start p-6">
            <ComingSoonBadge />
            <div className="flex flex-col items-start w-full filter blur-[2px] opacity-70">
              <div className="mb-2 p-3 bg-slate-200 dark:bg-white/5 rounded-full text-slate-500 dark:text-slate-400 group-hover:bg-slate-300 dark:group-hover:bg-white/10 transition-colors">
                <ShoppingBag size={20} />
              </div>
              <div className="text-sm font-bold text-slate-500 dark:text-slate-400">Shop My Gear</div>
              <div className="text-xs text-slate-400 dark:text-slate-600 mt-1">Tech & Essentials</div>
            </div>
          </TiltCard>
        );
      default:
        return null;
    }
  }, [allSkills, caseStudies, isBrewing, currentJob, darkMode, toggleDarkMode, isSpotifyPlaying, handleSpotifyToggle, onSpotifyPause, galleryIndex, latestEpisode]);

  // Slideshow logic for Gallery
  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Track all widget positions for bird avoidance
  useEffect(() => {
    const updateWidgetPositions = () => {
      const widgets = document.querySelectorAll('[data-widget-id]');
      widgets.forEach((widget) => {
        const rect = widget.getBoundingClientRect();
        const widgetId = widget.getAttribute('data-widget-id');
        if (widgetId) {
          const positionEvent = new CustomEvent('widgetPosition', {
            detail: {
              id: widgetId,
              x: rect.left,
              y: rect.top,
              width: rect.width,
              height: rect.height
            }
          });
          window.dispatchEvent(positionEvent);
        }
      });
    };

    // Update positions on mount and resize
    updateWidgetPositions();
    window.addEventListener('resize', updateWidgetPositions);
    const interval = setInterval(updateWidgetPositions, 1000); // Update every second

    return () => {
      window.removeEventListener('resize', updateWidgetPositions);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-full w-full overflow-y-auto thin-scrollbar pb-32 sm:pb-48 md:pb-56 lg:pb-60 px-2 sm:px-4 md:px-6 safe-area-inset" style={{ paddingBottom: 'max(200px, env(safe-area-inset-bottom, 0px) + 200px)' }}>
      <FilterBar 
        activeFilters={activeFilter ? [activeFilter] : []} 
        onFilterToggle={handleFilterToggle}
        darkMode={darkMode}
      />
      <div className="pt-40 sm:pt-44 md:pt-48">
      {/* 
         Grid Layout Strategy (4 Columns):
         Row 1: Profile (2x2) - Profile first for new users
         Row 2: Skills (2x1), Case Studies (2x1) - Career focused
         Row 3: Status (1x2), Theme (1x1), Calendar (1x1)
         Row 4: Spotify (2x1), Gallery (1x1), Podcast (1x2), Social (1x1), Blog (2x1)
      */}
      <div 
        className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3 auto-rows-[160px] sm:auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[240px] relative" 
        style={{ isolation: 'isolate', gridAutoFlow: 'row dense' }}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!draggedWidget) return;
          
          const gridElement = e.currentTarget as HTMLElement;
          const rect = gridElement.getBoundingClientRect();
          const relativeX = e.clientX - rect.left;
          const relativeY = e.clientY - rect.top;
          
          const gap = 12;
          const cellWidth = (rect.width - (3 * gap)) / 4;
          const cellHeight = 200;
          
          const dropPosition = {
            col: Math.max(0, Math.min(3, Math.floor(relativeX / (cellWidth + gap)))),
            row: Math.max(0, Math.floor(relativeY / (cellHeight + gap)))
          };
          
          // Find optimal size for the widget at drop location
          const optimalSize = findOptimalSize(draggedWidget, dropPosition.col, dropPosition.row, widgetOrder);
          
          // Update widget size
          setWidgetSizes(prev => ({
            ...prev,
            [draggedWidget]: optimalSize
          }));
          
          // Reorder widgets
          const newOrder = packWidgetsIntoGrid(widgetOrder, draggedWidget, dropPosition);
          setWidgetOrder(newOrder);
          setDraggedWidget(null);
          setDragOverWidget(null);
        }}
      >
        {widgetOrder.map((widgetId) => {
          const config = WIDGET_CONFIGS[widgetId];
          const { visible, greyedOut } = getWidgetVisibility(widgetId);
          const isDragging = draggedWidget === widgetId;
          const isDragOver = dragOverWidget === widgetId;
          
          // Use custom size if available, otherwise use default
          const size = (widgetSizes && widgetSizes[widgetId]) ? widgetSizes[widgetId] : { colSpan: config.colSpan, rowSpan: config.rowSpan };

          // Always render widgets, but grey them out if needed
          return (
            <div
              key={widgetId}
              draggable={!greyedOut}
              onDragStart={(e) => !greyedOut && handleDragStart(e, widgetId)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => !greyedOut && handleDragOver(e, widgetId)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => !greyedOut && handleDrop(e, widgetId)}
              className={`
                ${size.colSpan} ${size.rowSpan} 
                transition-all duration-300 relative group
                ${greyedOut ? 'opacity-40 pointer-events-none' : 'cursor-move'}
                ${isDragging ? 'opacity-50 scale-95' : ''}
                ${isDragOver ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
              `}
              style={{ 
                zIndex: isDragging ? 50 : 'auto', 
                position: 'relative', 
                overflow: 'hidden',
                minHeight: 0,
                minWidth: 0
              }}
            >
              {/* Render widget based on ID */}
              <div 
                className={`h-full w-full ${greyedOut ? 'filter grayscale' : ''} min-h-0`}
                onMouseDown={(e) => {
                  // Allow dragging from whitespace, but prevent when clicking on interactive elements
                  if (greyedOut) return;
                  const target = e.target as HTMLElement;
                  const isInteractive = target.closest('button, a, input, [role="button"], svg, img');
                  const widgetContainer = e.currentTarget.parentElement;
                  
                  if (!isInteractive && widgetContainer) {
                    // Enable dragging from whitespace - the parent container is already draggable
                    // This ensures dragging works from whitespace areas
                  } else if (isInteractive && widgetContainer) {
                    // Prevent dragging when clicking on interactive elements by temporarily disabling
                    e.stopPropagation();
                  }
                }}
              >
                {renderWidget(widgetId)}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
};

export default Home;
