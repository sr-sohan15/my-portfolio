import React from 'react';
import { Code2, Layout, Database, Wrench, Layers } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend Core",
      icon: <Layout size={18} className="text-cyan-400" />,
      skills: [
        { name: "React.js", tooltip: "Component Architecture, Hooks, Context" },
        { name: "Next.js", tooltip: "App Router, SSR, Performance Optimization" },
        { name: "JavaScript (ES6+)", tooltip: "Async/Await, Closures, DOM Manipulation" },
        { name: "Tailwind CSS", tooltip: "Responsive Layouts, Custom Design Tokens" },
        { name: "HTML5 / CSS3", tooltip: "Semantic Web, Modern Flexbox & Grid" }
      ]
    },
    {
      category: "Backend & Database",
      icon: <Database size={18} className="text-cyan-400" />,
      skills: [
        { name: "Node.js", tooltip: "REST API Server & Middleware Architecture" },
        { name: "Express.js", tooltip: "Routing, Authentication, API Controllers" },
        { name: "MongoDB", tooltip: "Aggregation, Mongoose Schemas, Indexing" },
        { name: "Firebase Auth", tooltip: "Social OAuth, JWT Token Validation" }
      ]
    },
    {
      category: "Tools & Methodologies",
      icon: <Wrench size={18} className="text-cyan-400" />,
      skills: [
        { name: "Git & GitHub", tooltip: "Branching Strategies, CI/CD Actions" },
        { name: "Postman", tooltip: "API Testing & Documentation" },
        { name: "Vite / Webpack", tooltip: "Fast Bundling & Build Configuration" },
        { name: "VS Code", tooltip: "Custom Workflows, AI-Assisted Tooling" }
      ]
    }
  ];

  return (
    <section id="skills" className="pt-6 md:pt-12 pb-6 md:pb-10 px-6 max-w-6xl mx-auto space-y-6 md:space-y-10">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono font-semibold">
          <Code2 size={18} /> Technical Expertise
        </div>
        <h2 className="text-3xl font-bold text-slate-100">
          Skills & Stack
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl space-y-4 hover:border-cyan-500/40 transition duration-300 shadow-lg backdrop-blur-sm"
          >
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
              {cat.icon}
              <h3 className="text-base font-bold text-slate-200">{cat.category}</h3>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="relative group cursor-pointer">
                  {/* Skill Badge */}
                  <span className="inline-block px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 group-hover:border-cyan-500/60 group-hover:text-cyan-300 text-xs font-mono transition">
                    {skill.name}
                  </span>

                  {/* Dynamic Floating Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none whitespace-nowrap">
                    <span className="px-2.5 py-1 bg-slate-950 border border-cyan-500/50 text-[11px] font-mono text-cyan-200 rounded-md shadow-xl backdrop-blur-md">
                      {skill.tooltip}
                    </span>
                    <div className="w-2 h-2 bg-slate-950 border-r border-b border-cyan-500/50 transform rotate-45 -mt-1"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;