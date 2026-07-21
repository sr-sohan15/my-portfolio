import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const projects = [
    {
      title: "AxyMart - E-Commerce Web App",
      category: "React",
      description: "A full-featured e-commerce frontend application built with component-driven architecture, smooth client-side routing, and responsive UI layout.",
      tech: ["React.js", "Tailwind CSS", "JavaScript (ES6+)", "Context API"],
      github: "https://github.com/sohan-15",
    },
    // ভবিষ্যতে আরও প্রজেক্ট যোগ করতে পারেন
  ];

  const categories = ["All", "React", "JavaScript"];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-400 text-sm font-mono">
            <Briefcase size={18} /> Portfolio
          </div>
          <h2 className="text-3xl font-bold text-slate-100">Featured Projects</h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 bg-slate-900/80 p-1.5 border border-slate-800 rounded-xl w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all duration-200 ${
                filter === cat
                  ? 'bg-sky-500 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence>
          {filteredProjects.map((proj, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={idx}
              className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4 hover:border-sky-500/50 transition group"
            >
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-sky-400 transition">
                {proj.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {proj.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono text-sky-400 bg-sky-950/40 px-2.5 py-1 rounded border border-sky-900/50">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 pt-4 border-t border-slate-800">
                <a href={proj.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-sky-400 transition flex items-center gap-2 text-sm font-medium">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Source Code
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;