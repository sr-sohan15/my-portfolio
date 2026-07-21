import React from 'react';
import { Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skills = {
    frontend: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap", "Responsive UI/UX"],
    learning: ["Next.js", "Node.js", "Express.js", "REST APIs"],
    academic: ["C", "C++", "Java", "Python", "MySQL"],
    tools: ["Linux / Terminal", "Git & GitHub", "VS Code", "Postman"]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-20 bg-[#070b16] px-6 border-y border-slate-800/50">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-400 text-sm font-mono">
            <Code2 size={18} /> Technical Expertise
          </div>
          <h2 className="text-3xl font-bold text-slate-100">Skills & Technologies</h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={itemVariants} className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 hover:border-sky-500/50 hover:-translate-y-2 transition duration-300 shadow-lg hover:shadow-sky-500/10">
            <h3 className="text-lg font-bold text-sky-400 border-b border-slate-800 pb-2">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-slate-800/80 border border-slate-700/50 text-xs rounded-md text-slate-300 font-mono hover:text-sky-400 hover:border-sky-500/50 transition duration-200 cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 hover:border-emerald-500/50 hover:-translate-y-2 transition duration-300 shadow-lg hover:shadow-emerald-500/10">
            <h3 className="text-lg font-bold text-emerald-400 border-b border-slate-800 pb-2">Currently Learning</h3>
            <div className="flex flex-wrap gap-2">
              {skills.learning.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-slate-800/80 border border-slate-700/50 text-xs rounded-md text-slate-300 font-mono hover:text-emerald-400 hover:border-emerald-500/50 transition duration-200 cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 hover:border-purple-500/50 hover:-translate-y-2 transition duration-300 shadow-lg hover:shadow-purple-500/10">
            <h3 className="text-lg font-bold text-purple-400 border-b border-slate-800 pb-2">Academic Core</h3>
            <div className="flex flex-wrap gap-2">
              {skills.academic.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-slate-800/80 border border-slate-700/50 text-xs rounded-md text-slate-300 font-mono hover:text-purple-400 hover:border-purple-500/50 transition duration-200 cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 hover:border-amber-500/50 hover:-translate-y-2 transition duration-300 shadow-lg hover:shadow-amber-500/10">
            <h3 className="text-lg font-bold text-amber-400 border-b border-slate-800 pb-2">Tools & OS</h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-slate-800/80 border border-slate-700/50 text-xs rounded-md text-slate-300 font-mono hover:text-amber-400 hover:border-amber-500/50 transition duration-200 cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;