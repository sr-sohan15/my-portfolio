import React from "react";
import { FolderGit2, ExternalLink, CheckCircle2 } from "lucide-react";

const ProjectsLight = () => {
  const projectList = [
    {
      title: "AxyMart - E-commerce Platform",
      category: "Full-Stack Web Application",
      description:
        "A comprehensive MERN stack platform featuring tiered pricing for pre-orders, secure checkout workflows, and an administrative dashboard for analytics.",
      features: [
        "Tiered pricing calculation engine for bulk pre-orders",
        "Secure guest & registered customer checkout flow",
        "Interactive analytics and inventory admin dashboard",
        "Engineered clean REST APIs and modular full-stack architecture",
      ],
      tags: [
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Firebase Auth",
        "REST API",
        "Team Collaboration",
      ],
      image: `${import.meta.env.BASE_URL}axymart.png`,
      liveUrl: "https://axymart.com/",
      githubUrl: "https://github.com/sr-sohan15/axymart-client",
    },
  ];

  return (
    <section
      id="projects"
      className="pt-6 md:pt-12 pb-6 md:pb-10 px-6 max-w-6xl mx-auto space-y-6 md:space-y-10"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sky-600 text-sm font-mono font-semibold">
          <FolderGit2 size={18} /> Featured Works
        </div>
        <h2 className="text-3xl font-bold text-slate-900">
          Projects & Deployments
        </h2>
      </div>

      <div className="space-y-8">
        {projectList.map((project, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white/90 border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8 hover:border-sky-400/60 transition duration-300 shadow-xl backdrop-blur-sm"
          >
            <div className="col-span-1 lg:col-span-6 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-sky-600 uppercase tracking-wider font-semibold">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {project.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-2 pt-1">
                  {project.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-emerald-600 shrink-0 mt-0.5"
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-xs font-mono bg-slate-100 text-slate-700 rounded-md border border-slate-200 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition shadow-md shadow-sky-500/20 active:scale-95"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-300 transition active:scale-95"
                >
                  <svg
                    className="w-3.5 h-3.5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Source Code
                </a>
              </div>
            </div>

            {/* Desktop Image Container (Always Full Color) */}
            <div className="hidden lg:flex lg:col-span-6 items-center justify-center">
              <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsLight;