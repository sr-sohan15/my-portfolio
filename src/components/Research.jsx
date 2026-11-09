import React from "react";
import { BookOpen, ExternalLink, Award, Users, CheckCircle2 } from "lucide-react";

const Research = ({ isDarkMode = true }) => {
  const publications = [
    {
      title:
        "Student Dropout Risk Prediction Using Ensemble and Supervised Machine Learning Algorithms",
      conference:
        "2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN)",
      publisher: "IEEE Xplore",
      year: "2026",
      authors:
        "Ekramul Asfah Abeer, Md. Nurul Azim, Sunjidul Islam, Imran Hosen Srabon, Md. Saidur Rahman Sohan, Humayra Ahmed",
      description:
        "Proposed an advanced predictive framework to identify students at risk of dropping out early in their academic journey. Leveraged supervised machine learning classifiers and ensemble techniques to achieve superior accuracy, recall, and actionable educational insights.",
      highlights: [
        "Ensemble & Supervised ML algorithm comparison & performance tuning",
        "Feature engineering & high classification accuracy on academic datasets",
        "Early warning architecture designed for educational institutions",
      ],
      tags: [
        "Machine Learning",
        "Ensemble Learning",
        "Supervised Learning",
        "Predictive Modeling",
        "Python",
        "Data Analysis",
      ],
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      paperUrl: "https://ieeexplore.ieee.org/document/11546158",
    },
  ];

  return (
    <section
      id="research"
      className="pt-6 md:pt-12 pb-6 md:pb-10 px-4 sm:px-6 max-w-6xl mx-auto space-y-6 md:space-y-8"
    >
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/80 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400 text-xs font-mono font-medium shadow-2xs">
          <BookOpen size={16} /> Research & Publications
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Scientific Contributions
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl">
          Peer-reviewed research and academic publications focusing on machine learning, predictive analytics, and data-driven systems.
        </p>
      </div>

      {/* Publications List */}
      <div className="space-y-8">
        {publications.map((pub, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8 hover:border-sky-400 dark:hover:border-sky-500/40 transition duration-300 shadow-lg shadow-slate-200/50 dark:shadow-xl backdrop-blur-sm"
          >
            {/* Left Column Details */}
            <div className="col-span-1 lg:col-span-7 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Conference Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-300/80 dark:border-cyan-500/30 text-cyan-900 dark:text-cyan-300 text-xs font-mono leading-relaxed shadow-2xs">
                  <Award size={14} className="shrink-0 text-amber-500 dark:text-amber-400" />
                  <span>
                    <strong className="text-cyan-950 dark:text-cyan-200 font-bold">{pub.publisher}</strong> — {pub.conference}
                  </span>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {pub.title}
                </h3>

                {/* Authors */}
                <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <Users size={15} className="text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <strong className="text-slate-900 dark:text-slate-300 font-semibold">Authors:</strong> {pub.authors}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {pub.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-1">
                  {pub.highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech & Method Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {pub.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-xs font-mono bg-slate-100/80 dark:bg-slate-950 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200/80 dark:border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
                <a
                  href={pub.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs transition shadow-md shadow-sky-600/20 dark:shadow-cyan-500/20 active:scale-95 cursor-pointer"
                >
                  <BookOpen size={14} />
                  <span>IEEE Xplore Paper</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Right Column Image Preview */}
            <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
              <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl shadow-slate-200/50 dark:shadow-2xl group">
                <img
                  src={pub.image}
                  alt={pub.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Research;