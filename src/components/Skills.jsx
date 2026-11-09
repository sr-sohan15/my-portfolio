import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  Layout, 
  Database, 
  Terminal, 
  BrainCircuit, 
  Wrench, 
  Cloud,
  Search,
  X,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const Skills = ({ isDarkMode = true }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const skillCategories = [
    {
      id: 'frontend',
      title: "Frontend Development",
      icon: Layout,
      borderColor: "hover:border-cyan-500/60 dark:hover:border-cyan-500/60",
      glowColor: "hover:shadow-md hover:shadow-cyan-500/10 dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      iconBg: "bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30",
      dotColor: "bg-cyan-500 dark:bg-cyan-400",
      skills: [
        { name: "React.js", detail: "Hooks, Context, Performance Optimization", featured: true },
        { name: "Next.js", detail: "App Router, SSR, SSG, SEO", featured: true },
        { name: "JavaScript (ES6+)", detail: "Async/Await, OOP, Modern ES", featured: true },
        { name: "TypeScript", detail: "Types, Interfaces, Generics" },
        { name: "Tailwind CSS", detail: "Custom Layouts, Design Tokens", featured: true },
        { name: "HTML5 / CSS3", detail: "Semantic Web, Flex & Grid" },
        { name: "Framer Motion", detail: "Micro-interactions & UI Animations" }
      ]
    },
    {
      id: 'backend',
      title: "Backend & Database",
      icon: Database,
      borderColor: "hover:border-emerald-500/60 dark:hover:border-emerald-500/60",
      glowColor: "hover:shadow-md hover:shadow-emerald-500/10 dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30",
      dotColor: "bg-emerald-500 dark:bg-emerald-400",
      skills: [
        { name: "Node.js", detail: "REST APIs & Async Middleware", featured: true },
        { name: "Express.js", detail: "Routing, Controllers, Auth", featured: true },
        { name: "MongoDB", detail: "Mongoose Schema, Aggregations", featured: true },
        { name: "PostgreSQL", detail: "Relational Queries & Schemas" },
        { name: "Firebase Admin", detail: "Authentication, SDK, Firestore Rules" },
        { name: "RESTful APIs", detail: "Clean Endpoints & API Architecture", featured: true }
      ]
    },
    {
      id: 'core',
      title: "Core & Languages",
      icon: Terminal,
      borderColor: "hover:border-amber-500/60 dark:hover:border-amber-500/60",
      glowColor: "hover:shadow-md hover:shadow-amber-500/10 dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
      iconBg: "bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
      dotColor: "bg-amber-500 dark:bg-amber-400",
      skills: [
        { name: "C++", detail: "STL, Problem Solving" },
        { name: "Java", detail: "Object Oriented Foundations" },
        { name: "Python", detail: "Scripting & Analytics" },
        { name: "Data Structures", detail: "Trees, Graphs, Queues, Hash Tables", featured: true },
        { name: "Algorithms", detail: "Dynamic Programming, Greedy, Sorting", featured: true },
        { name: "OOP Principles", detail: "Modular Architecture & Clean Code" }
      ]
    },
    {
      id: 'research',
      title: "Research & AI",
      icon: BrainCircuit,
      borderColor: "hover:border-purple-500/60 dark:hover:border-purple-500/60",
      glowColor: "hover:shadow-md hover:shadow-purple-500/10 dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      iconBg: "bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/30",
      dotColor: "bg-purple-500 dark:bg-purple-400",
      skills: [
        { name: "Research Design", detail: "Academic Writing & Research Methodology", featured: true },
        { name: "Machine Learning", detail: "Model Evaluation, Training & Tuning" },
        { name: "Supervised Learning", detail: "Classification & Regression Tasks" },
        { name: "Ensemble Models", detail: "Random Forest, XGBoost Implementation" },
        { name: "AI Prompt Eng.", detail: "LLM Workflows & Prompt Optimization", featured: true }
      ]
    },
    {
      id: 'cloud',
      title: "Cloud & Deployment",
      icon: Cloud,
      borderColor: "hover:border-sky-500/60 dark:hover:border-sky-500/60",
      glowColor: "hover:shadow-md hover:shadow-sky-500/10 dark:hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]",
      iconBg: "bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-500/30",
      dotColor: "bg-sky-500 dark:bg-sky-400",
      skills: [
        { name: "GitHub Pages", detail: "Automated Deployment & Gh-pages Scripts", featured: true },
        { name: "Vercel", detail: "Next.js Production Deployment" },
        { name: "Netlify", detail: "CI/CD Auto Builds & Environment Config" },
        { name: "Firebase Hosting", detail: "SSL, Custom Domain Configuration" },
        { name: "Linux / CLI", detail: "Bash Scripting & Terminal Workflows" },
        { name: "Render", detail: "Web Services & Node Backend Deploy" }
      ]
    },
    {
      id: 'tools',
      title: "Tools & Workflow",
      icon: Wrench,
      borderColor: "hover:border-rose-500/60 dark:hover:border-rose-500/60",
      glowColor: "hover:shadow-md hover:shadow-rose-500/10 dark:hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
      iconBg: "bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30",
      dotColor: "bg-rose-500 dark:bg-rose-400",
      skills: [
        { name: "Git & GitHub", detail: "Version Control, Feature Branching", featured: true },
        { name: "VS Code", detail: "PowerShell Setup, Extensions & AI Workflows", featured: true },
        { name: "Vite", detail: "Fast Bundling & Modern HMR", featured: true },
        { name: "Postman", detail: "API Endpoint Testing & Collections", featured: true },
        { name: "System Design", detail: "Scalable Architecture Planning" },
        { name: "Agile & Review", detail: "Team Collaboration & Peer Code Reviews" }
      ]
    }
  ];

  const filterTabs = [
    { label: 'All Stack', value: 'All' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Core', value: 'core' },
    { label: 'Research & AI', value: 'research' },
    { label: 'Cloud', value: 'cloud' },
    { label: 'Tools', value: 'tools' }
  ];

  // Dynamic Filtering & Search logic
  const filteredCategories = useMemo(() => {
    return skillCategories
      .filter((cat) => {
        if (activeFilter === 'All') return true;
        return cat.id === activeFilter;
      })
      .map((cat) => {
        if (!searchQuery.trim()) return cat;
        const matchingSkills = cat.skills.filter((skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
          skill.detail.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );
        return { ...cat, skills: matchingSkills };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [activeFilter, searchQuery]);

  // Total skill count indicator
  const totalSkillsCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, [filteredCategories]);

  return (
    <section id="skills" className="pt-8 md:pt-14 pb-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
      
      {/* Header & Live Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/80 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400 text-xs font-mono font-medium shadow-2xs">
            <Code2 size={15} /> 
            <span>Technical Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
            Skills & Technical Stack
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl">
            A specialized overview of tools, frameworks, and core technologies I use to build robust, scalable applications.
          </p>
        </div>

        {/* Dynamic Search Box with Clear Button */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skill (e.g. React, API)..."
            className="w-full pl-9 pr-9 py-2.5 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 dark:focus:border-cyan-500/80 focus:ring-1 focus:ring-sky-500/50 dark:focus:ring-cyan-500/50 transition shadow-2xs dark:shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Filter Tabs & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 active:scale-95 cursor-pointer border ${
                activeFilter === tab.value
                  ? isDarkMode 
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'bg-sky-600 border-sky-600 text-white font-semibold shadow-2xs'
                  : isDarkMode
                    ? 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-2xs'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/40 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-800/60 shadow-2xs">
          Showing: <span className="text-sky-600 dark:text-cyan-400 font-bold">{totalSkillsCount}</span> skills
        </div>
      </div>

      {/* Responsive Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className={`group relative rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/90 dark:border-slate-800/80 p-6 transition-all duration-300 ${cat.borderColor} ${cat.glowColor} hover:-translate-y-1 backdrop-blur-md flex flex-col justify-between overflow-visible shadow-sm shadow-slate-200/50 dark:shadow-none`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/80 dark:border-slate-800/80">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base tracking-wide flex items-center gap-2">
                        {cat.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {cat.skills.length} competencies
                      </span>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${cat.iconBg} group-hover:scale-110 transition duration-300 shadow-2xs`}>
                      <Icon size={18} />
                    </div>
                  </div>

                  {/* Skill Pills with Floating Tooltip */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="relative group/pill">
                        <span 
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-default ${
                            skill.featured 
                              ? 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 shadow-2xs hover:border-sky-500 dark:hover:border-cyan-500/50' 
                              : 'bg-slate-50 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-100'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${cat.dotColor}`}></span>
                          {skill.name}
                          {skill.featured && (
                            <Sparkles size={11} className="text-amber-500 dark:text-amber-400/90 ml-0.5" />
                          )}
                        </span>

                        {/* Enhanced Floating Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pill:flex flex-col items-center z-50 pointer-events-none whitespace-nowrap">
                          <div className="px-3 py-1.5 bg-slate-900 dark:bg-slate-950 border border-slate-700 text-[11px] font-mono text-white dark:text-cyan-300 rounded-lg shadow-xl backdrop-blur-xl flex items-center gap-1.5">
                            <CheckCircle2 size={12} className="text-sky-400 dark:text-cyan-400" />
                            {skill.detail}
                          </div>
                          <div className="w-2 h-2 bg-slate-900 dark:bg-slate-950 border-r border-b border-slate-700 rotate-45 -mt-1"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/20 text-slate-600 dark:text-slate-400 font-mono text-sm space-y-3 shadow-2xs">
          <p>No matching technical skills found for "<span className="text-sky-600 dark:text-cyan-400 font-bold">{searchQuery}</span>".</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
            className="px-4 py-2 bg-sky-50 dark:bg-cyan-500/10 border border-sky-300 dark:border-cyan-500/30 text-sky-700 dark:text-cyan-300 text-xs font-semibold rounded-lg hover:bg-sky-100 dark:hover:bg-cyan-500/20 transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default Skills;