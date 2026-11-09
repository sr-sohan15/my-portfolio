import React, { useState } from "react";
import { 
  FolderGit2, 
  ExternalLink, 
  CheckCircle2, 
  KeyRound, 
  Copy, 
  Check, 
  Sparkles 
} from "lucide-react";

const Projects = ({ isDarkMode = true }) => {
  const [copiedKey, setCopiedKey] = useState("");

  const handleCopy = (text, keyId) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(""), 2000);
  };

  const project = {
    title: "AxyMart — E-commerce Platform",
    category: "Full-Stack Web Application",
    description:
      "A comprehensive MERN stack platform featuring tiered pricing for pre-orders, secure checkout workflows, and an administrative dashboard for analytics.",
    features: [
      "Tiered pricing calculation engine for bulk pre-orders",
      "Secure guest & registered customer checkout flow",
      "Interactive analytics and inventory admin dashboard",
      "Engineered clean REST APIs with MongoDB aggregation pipelines & database indexing",
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
    demoCredentials: {
      role: "Admin Demo",
      email: "admin@axymart.com",
      pass: "admin123456"
    },
    image: `${import.meta.env.BASE_URL}axymart.png`,
    liveUrl: "https://axymart.com/",
    githubUrl: "https://github.com/sr-sohan15/axymart-client",
  };

  return (
    <section
      id="projects"
      className="pt-6 md:pt-12 pb-6 md:pb-10 px-4 sm:px-6 max-w-6xl mx-auto space-y-6 md:space-y-8"
    >
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-500/30 text-sky-800 dark:text-sky-400 text-xs font-mono font-medium shadow-2xs">
          <FolderGit2 size={16} /> Featured Work
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Featured Project & Deployment
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl">
          A deep dive into my primary full-stack production application showcasing system architecture, database design, and UI craftsmanship.
        </p>
      </div>

      {/* Single Featured Project Card */}
      <div className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8 hover:border-sky-400 dark:hover:border-sky-500/40 transition duration-300 shadow-lg shadow-slate-200/50 dark:shadow-xl backdrop-blur-sm">
        
        {/* Left Column Details */}
        <div className="col-span-1 lg:col-span-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-sky-600 dark:text-sky-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Sparkles size={13} /> {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                {project.title}
              </h3>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {project.description}
            </p>

            {/* Technical Highlights */}
            <div className="space-y-2 pt-1">
              {project.features.map((feature, fIdx) => (
                <div
                  key={fIdx}
                  className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2
                    size={15}
                    className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Interactive Demo Credentials Box */}
            {project.demoCredentials && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/90 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-700 dark:text-slate-300 shadow-2xs">
                <div className="flex items-center gap-1.5 text-sky-700 dark:text-sky-400 font-semibold">
                  <KeyRound size={13} />
                  <span>{project.demoCredentials.role}:</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span>{project.demoCredentials.email}</span>
                  <span>•</span>
                  <span>{project.demoCredentials.pass}</span>
                </div>
                <button
                  onClick={() => handleCopy(`${project.demoCredentials.email} | ${project.demoCredentials.pass}`, `axymart-cred`)}
                  className="p-1 text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 rounded transition cursor-pointer"
                  title="Copy Credentials"
                >
                  {copiedKey === `axymart-cred` ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <Check size={13} /> Copied!
                    </span>
                  ) : (
                    <Copy size={13} />
                  )}
                </button>
              </div>
            )}

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 text-xs font-mono bg-slate-100/80 dark:bg-slate-950 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200/80 dark:border-slate-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800/80">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs transition shadow-md shadow-sky-600/20 dark:shadow-cyan-500/20 active:scale-95"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition active:scale-95 border border-slate-200 dark:border-slate-700 shadow-2xs"
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

        {/* Right Column Image */}
        <div className="hidden lg:flex lg:col-span-6 items-center justify-center">
          <div className="w-full h-full min-h-[320px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl shadow-slate-200/50 dark:shadow-2xl group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;