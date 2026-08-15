import React from "react";
import { BookOpen, ExternalLink, Award, Users, CheckCircle2 } from "lucide-react";

const Research = () => {
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
      paperUrl: "https://ieeexplore.ieee.org",
    },
  ];

  return (
    <section
      id="research"
      className="pt-6 md:pt-12 pb-6 md:pb-10 px-6 max-w-6xl mx-auto space-y-6 md:space-y-10"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sky-400 text-sm font-mono">
          <BookOpen size={18} /> Research & Publications
        </div>
        <h2 className="text-3xl font-bold text-slate-100">
          Scientific Contributions
        </h2>
      </div>

      <div className="space-y-8">
        {publications.map((pub, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8 hover:border-sky-500/40 transition duration-300 shadow-2xl backdrop-blur-sm"
          >
            <div className="col-span-1 lg:col-span-7 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                  <Award size={14} />
                  <span>
                    {pub.publisher} • {pub.conference}
                  </span>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-slate-100 leading-snug">
                  {pub.title}
                </h3>

                <div className="flex items-start gap-2 text-xs text-slate-400">
                  <Users size={15} className="text-sky-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <strong className="text-slate-300">Authors:</strong> {pub.authors}
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {pub.description}
                </p>

                <div className="space-y-2 pt-1">
                  {pub.highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-emerald-400 shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {pub.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-xs font-mono bg-slate-950 text-slate-300 rounded-md border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <a
                  href={pub.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-md shadow-sky-500/20 active:scale-95"
                >
                  <BookOpen size={14} />
                  <span>IEEE Xplore Paper</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
              <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950 shadow-2xl group">
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