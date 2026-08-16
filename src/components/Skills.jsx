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
  Sparkles
} from 'lucide-react';

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const skillCategories = [
    {
      id: 'frontend',
      title: "Frontend Development",
      icon: Layout,
      borderColor: "hover:border-cyan-500/80",
      glowColor: "hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]",
      iconBg: "bg-cyan-950/60 text-cyan-400 border-cyan-500/30",
      dotColor: "bg-cyan-400",
      skills: [
        { name: "React.js", detail: "Hooks, Context, Performance" },
        { name: "Next.js", detail: "App Router, SSR, SEO" },
        { name: "JavaScript (ES6+)", detail: "Async/Await, OOP, Modern ES" },
        { name: "TypeScript", detail: "Types, Interfaces, Generics" },
        { name: "Tailwind CSS", detail: "Custom Layouts, Tokens" },
        { name: "HTML5/CSS3", detail: "Semantic Web, Flex & Grid" },
        { name: "Framer Motion", detail: "Micro-interactions & Animations" }
      ]
    },
    {
      id: 'backend',
      title: "Backend & Database",
      icon: Database,
      borderColor: "hover:border-emerald-500/80",
      glowColor: "hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]",
      iconBg: "bg-emerald-950/60 text-emerald-400 border-emerald-500/30",
      dotColor: "bg-emerald-400",
      skills: [
        { name: "Node.js", detail: "REST APIs & Middleware" },
        { name: "Express.js", detail: "Routing, Controllers, Auth" },
        { name: "MongoDB", detail: "Mongoose, Aggregations" },
        { name: "PostgreSQL", detail: "Relational Queries & Schemas" },
        { name: "Firebase Admin", detail: "SDK, Firestore Rules" },
        { name: "RESTful APIs", detail: "Clean Endpoints & Standards" }
      ]
    },
    {
      id: 'core',
      title: "Core & Languages",
      icon: Terminal,
      borderColor: "hover:border-amber-500/80",
      glowColor: "hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]",
      iconBg: "bg-amber-950/60 text-amber-400 border-amber-500/30",
      dotColor: "bg-amber-400",
      skills: [
        { name: "C++", detail: "STL, Problem Solving" },
        { name: "Java", detail: "OOP, Foundations" },
        { name: "Python", detail: "Scripting & Analytics" },
        { name: "Data Structures", detail: "Trees, Graphs, Queues" },
        { name: "Algorithms", detail: "DP, Greedy, Sorting" },
        { name: "OOP", detail: "Clean Architecture & Design" }
      ]
    },
    {
      id: 'research',
      title: "Research & Analysis",
      icon: BrainCircuit,
      borderColor: "hover:border-purple-500/80",
      glowColor: "hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]",
      iconBg: "bg-purple-950/60 text-purple-400 border-purple-500/30",
      dotColor: "bg-purple-400",
      skills: [
        { name: "Research Design & Analysis", detail: "Methodology & Paper Writing" },
        { name: "Machine Learning", detail: "Model Evaluation & Tuning" },
        { name: "Supervised Learning", detail: "Classification & Regression" },
        { name: "Ensemble Models", detail: "Random Forest, XGBoost" }
      ]
    },
    {
      id: 'cloud',
      title: "Cloud & Deployment",
      icon: Cloud,
      borderColor: "hover:border-sky-500/80",
      glowColor: "hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]",
      iconBg: "bg-sky-950/60 text-sky-400 border-sky-500/30",
      dotColor: "bg-sky-400",
      skills: [
        { name: "Firebase Hosting", detail: "SSL, Custom Domains" },
        { name: "Vercel", detail: "Next.js Production Deployment" },
        { name: "Netlify", detail: "CI/CD Auto Builds" },
        { name: "GitHub Pages", detail: "Static Hosting & Actions" },
        { name: "Linux / CLI", detail: "Bash Scripts & Server Ops" },
        { name: "Render", detail: "Web Services & Node Deploy" }
      ]
    },
    {
      id: 'tools',
      title: "Tools & Methods",
      icon: Wrench,
      borderColor: "hover:border-rose-500/80",
      glowColor: "hover:shadow-[0_0_25px_rgba(244,63,94,0.2)]",
      iconBg: "bg-rose-950/60 text-rose-400 border-rose-500/30",
      dotColor: "bg-rose-400",
      skills: [
        { name: "Git & GitHub", detail: "Branching, Collaboration" },
        { name: "VS Code", detail: "Extensions & AI Workflows" },
        { name: "Vite", detail: "Fast Bundling & HMR" },
        { name: "Postman", detail: "API Testing & Collections" },
        { name: "System Design & Planning", detail: "Scalable Architecture" },
        { name: "Team Collaboration", detail: "Agile & Code Reviews" }
      ]
    }
  ];

  const filterTabs = [
    { label: 'All', value: 'All' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Core', value: 'core' },
    { label: 'Cloud', value: 'cloud' },
    { label: 'Tools', value: 'tools' }
  ];

  // ডায়নামিক ফিল্টারিং ও সার্চ হ্যান্ডলিং
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

  return (
    <section id="skills" className="pt-6 md:pt-10 pb-6 md:pb-10 px-6 max-w-6xl mx-auto space-y-6 md:space-y-8">
      
      {/* Header & Live Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono font-medium">
            <Code2 size={18} /> Technical Expertise
          </div>
          <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
            Skills & Stack
          </h2>
        </div>

        {/* Dynamic Search Box */}
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skill (e.g. React)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition"
          />
        </div>
      </div>

      {/* Dynamic Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 active:scale-95 cursor-pointer ${
              activeFilter === tab.value
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Symmetrical 3x2 Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className={`group relative rounded-2xl bg-slate-900/50 border border-slate-800 shadow-lg p-6 transition-all duration-300 ${cat.borderColor} ${cat.glowColor} hover:-translate-y-1 backdrop-blur-md flex flex-col justify-between`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                    <h3 className="font-semibold text-slate-100 text-base tracking-wide flex items-center gap-2">
                      {cat.title}
                    </h3>
                    <div className={`p-2 rounded-xl border ${cat.iconBg} group-hover:scale-110 transition duration-300 shadow-inner`}>
                      <Icon size={18} />
                    </div>
                  </div>

                  {/* Skill Pills with Floating Micro-Tooltip */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="relative group/pill">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:text-slate-100 hover:bg-slate-900 transition-all duration-200 cursor-pointer">
                          <span className={`w-1.5 h-1.5 rounded-full ${cat.dotColor}`}></span>
                          {skill.name}
                        </span>

                        {/* Floating Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pill:flex flex-col items-center z-30 pointer-events-none whitespace-nowrap">
                          <span className="px-2.5 py-1 bg-slate-950 border border-slate-700 text-[11px] font-mono text-cyan-300 rounded-md shadow-xl backdrop-blur-md">
                            {skill.detail}
                          </span>
                          <div className="w-2 h-2 bg-slate-950 border-r border-b border-slate-700 rotate-45 -mt-1"></div>
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
        <div className="text-center py-12 border border-slate-800/80 rounded-2xl bg-slate-900/30 text-slate-400 font-mono text-xs">
          No matching skills found for "<span className="text-cyan-400">{searchQuery}</span>".
        </div>
      )}
    </section>
  );
};

export default Skills;