import React from 'react';
import { BookOpen } from 'lucide-react';

const Research = () => {
  return (
    <section id="research" className="py-20 bg-[#070b16] px-6 border-y border-slate-800/50">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-400 text-sm font-mono">
            <BookOpen size={18} /> Academic Focus
          </div>
          <h2 className="text-3xl font-bold text-slate-100">Research Interest</h2>
        </div>

        <div className="p-6 md:p-8 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4 hover:border-sky-500/50 transition max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/50 text-indigo-400 text-xs font-mono">
            Proposal Phase
          </div>
          <h3 className="text-xl font-bold text-slate-100">
            Graph Theory & Neural Networks Integration
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Exploring the intersection of graph theoretical structures with deep neural network architectures for structured data analysis and optimizing algorithmic performance.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded border border-indigo-900/50">
              Graph Theory
            </span>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded border border-indigo-900/50">
              Neural Networks
            </span>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded border border-indigo-900/50">
              GNNs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;