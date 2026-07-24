import React, { useState } from 'react';
import { Code2, Terminal, Cpu, Layers, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const SkillCard = ({ title, items, color, hoverBorder, hoverShadow, icon: Icon }) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({ 
      rx: ((y - rect.height / 2) / (rect.height / 2)) * -8, 
      ry: ((x - rect.width / 2) / (rect.width / 2)) * 8
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: tilt.rx === 0 ? 'transform 0.5s ease-out' : 'none'
      }}
      /* 🎯 নাইট মোডে অরিজিনাল ডার্ক (slate-900/50) আর ডে মোডে ক্লিন হোয়াইট */
      className={`relative p-6 bg-slate-900/60 dark:bg-slate-900/60 light-mode:bg-white/80 backdrop-blur-md border border-slate-800 dark:border-slate-800 rounded-xl space-y-4 transition-all duration-300 shadow-lg dark:shadow-none ${hoverBorder} ${hoverShadow} group cursor-pointer`}
    >
      <div className="flex items-center justify-between border-b border-slate-800 dark:border-slate-800 pb-2">
        <h3 className={`text-lg font-bold ${color} flex items-center gap-2`}>{title}</h3>
        <Icon size={18} className={`${color}`} />
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {items.map((s, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-slate-800/80 dark:bg-slate-800/80 border border-slate-700/50 text-xs rounded-md text-slate-300 font-mono hover:border-sky-500/50 transition duration-200 cursor-default"
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const skillCategories = [
    { title: "Frontend", items: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap", "Responsive UI/UX"], color: "text-sky-400", hoverBorder: "hover:border-sky-500/50", hoverShadow: "hover:shadow-sky-500/10", icon: Layers },
    { title: "Currently Learning", items: ["Next.js", "Node.js", "Express.js", "REST APIs"], color: "text-emerald-400", hoverBorder: "hover:border-emerald-500/50", hoverShadow: "hover:shadow-emerald-500/10", icon: Sparkles },
    { title: "Academic Core", items: ["C", "C++", "Java", "Python", "MySQL"], color: "text-purple-400", hoverBorder: "hover:border-purple-500/50", hoverShadow: "hover:shadow-purple-500/10", icon: Cpu },
    { title: "Tools & OS", items: ["Linux / Terminal", "Git & GitHub", "VS Code", "Postman"], color: "text-amber-400", hoverBorder: "hover:border-amber-500/50", hoverShadow: "hover:shadow-amber-500/10", icon: Terminal }
  ];

  return (
    <section id="skills" className="py-20 px-6 border-y border-slate-800/50 transition-colors duration-500 bg-transparent">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-400 text-sm font-mono">
            <Code2 size={18} /> Technical Expertise
          </div>
          <h2 className="text-3xl font-bold text-slate-100">
            Skills & Technologies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat) => (
            <SkillCard key={cat.title} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;