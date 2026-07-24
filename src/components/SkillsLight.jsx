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
      className={`relative p-6 bg-white/80 border border-slate-200 rounded-xl space-y-4 transition-all duration-300 shadow-md ${hoverBorder} ${hoverShadow} group cursor-pointer`}
    >
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <h3 className={`text-lg font-bold ${color} flex items-center gap-2`}>{title}</h3>
        <Icon size={18} className={`${color}`} />
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {items.map((s, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-slate-100 border border-slate-300 text-xs rounded-md text-slate-800 font-mono font-bold hover:border-sky-500 transition duration-200 cursor-default"
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsLight = () => {
  const skillCategories = [
    { title: "Frontend", items: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap", "Responsive UI/UX"], color: "text-sky-600", hoverBorder: "hover:border-sky-500", hoverShadow: "hover:shadow-sky-500/10", icon: Layers },
    { title: "Currently Learning", items: ["Next.js", "Node.js", "Express.js", "REST APIs"], color: "text-emerald-600", hoverBorder: "hover:border-emerald-500", hoverShadow: "hover:shadow-emerald-500/10", icon: Sparkles },
    { title: "Academic Core", items: ["C", "C++", "Java", "Python", "MySQL"], color: "text-purple-600", hoverBorder: "hover:border-purple-500", hoverShadow: "hover:shadow-purple-500/10", icon: Cpu },
    { title: "Tools & OS", items: ["Linux / Terminal", "Git & GitHub", "VS Code", "Postman"], color: "text-amber-600", hoverBorder: "hover:border-amber-500", hoverShadow: "hover:shadow-amber-500/10", icon: Terminal }
  ];

  return (
    <section id="skills" className="py-20 px-6 border-y border-slate-200/80 transition-colors duration-500 bg-transparent">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-600 text-sm font-mono font-bold">
            <Code2 size={18} /> Technical Expertise
          </div>
          <h2 className="text-3xl font-black text-slate-900">
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

export default SkillsLight;