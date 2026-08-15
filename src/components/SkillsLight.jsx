import React from 'react';
import { 
  Code2, 
  Layout, 
  Database, 
  Terminal, 
  BrainCircuit, 
  Wrench, 
  Cloud 
} from 'lucide-react';

const SkillsLight = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Layout,
      borderColor: "hover:border-cyan-500",
      glowColor: "hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]",
      iconBg: "bg-cyan-50 text-cyan-600 border-cyan-200",
      dotColor: "bg-cyan-500",
      skills: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "HTML5/CSS3", "Framer Motion"]
    },
    {
      title: "Backend & Database",
      icon: Database,
      borderColor: "hover:border-emerald-500",
      glowColor: "hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      dotColor: "bg-emerald-500",
      skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Firebase Admin", "RESTful APIs"]
    },
    {
      title: "Core & Languages",
      icon: Terminal,
      borderColor: "hover:border-amber-500",
      glowColor: "hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
      dotColor: "bg-amber-500",
      skills: ["C++", "Java", "Python", "Data Structures", "Algorithms", "OOP"]
    },
    {
      title: "Research & Analysis",
      icon: BrainCircuit,
      borderColor: "hover:border-purple-500",
      glowColor: "hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)]",
      iconBg: "bg-purple-50 text-purple-600 border-purple-200",
      dotColor: "bg-purple-500",
      skills: ["Research Design & Analysis", "Machine Learning", "Supervised Learning", "Ensemble Models"]
    },
    {
      title: "Cloud & Deployment",
      icon: Cloud,
      borderColor: "hover:border-blue-500",
      glowColor: "hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]",
      iconBg: "bg-blue-50 text-blue-600 border-blue-200",
      dotColor: "bg-blue-500",
      skills: ["Firebase Hosting", "Vercel", "Netlify", "GitHub Pages", "Linux / CLI", "Render"]
    },
    {
      title: "Tools & Methods",
      icon: Wrench,
      borderColor: "hover:border-rose-500",
      glowColor: "hover:shadow-[0_10px_30px_rgba(244,63,94,0.15)]",
      iconBg: "bg-rose-50 text-rose-600 border-rose-200",
      dotColor: "bg-rose-500",
      skills: ["Git & GitHub", "VS Code", "Vite", "Postman", "System Design & Planning", "Team Collaboration"]
    }
  ];

  return (
    <section id="skills" className="pt-6 md:pt-10 pb-6 md:pb-10 px-6 max-w-6xl mx-auto space-y-6 md:space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sky-600 text-sm font-mono font-medium">
          <Code2 size={18} /> Technical Expertise
        </div>
        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          Skills & Stack
        </h2>
      </div>

      {/* Symmetrical 3x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className={`group relative rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 transition-all duration-300 ${cat.borderColor} ${cat.glowColor} hover:-translate-y-1 backdrop-blur-sm flex flex-col justify-between`}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800 text-base tracking-wide flex items-center gap-2">
                    {cat.title}
                  </h3>
                  <div className={`p-2 rounded-xl border ${cat.iconBg} group-hover:scale-110 transition duration-300`}>
                    <Icon size={18} />
                  </div>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-700 bg-slate-50 border border-slate-200 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cat.dotColor}`}></span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsLight;