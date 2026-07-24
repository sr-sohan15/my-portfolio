import React from 'react';
import { BookOpen, ExternalLink, Award } from 'lucide-react';

const ResearchLight = () => {
  return (
    <section id="research" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sky-600 text-sm font-mono font-bold">
          <BookOpen size={18} /> Academic & Publications
        </div>
        <h2 className="text-3xl font-black text-slate-900">Research & Writing</h2>
      </div>

      <div className="p-6 md:p-8 bg-white/80 border border-slate-200 rounded-2xl space-y-6 shadow-md hover:border-sky-500/60 transition duration-300">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1.5">
            <Award size={14} /> Under Review / Paper Proposal
          </span>
          <span className="text-xs font-mono font-bold text-slate-600">
            Graph Theory & Neural Networks
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
            Graph Neural Networks in Web Architecture Optimization
          </h3>
          <p className="text-slate-700 text-sm leading-relaxed font-medium">
            Exploring structured graph representation learning to improve dynamic routing efficiency, component dependencies, and real-time data flows in modern full-stack web applications.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-2">
          {["Graph Theory", "Deep Learning", "GNN", "Network Optimization"].map((tag, idx) => (
            <span key={idx} className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-md border border-slate-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchLight;