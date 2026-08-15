import React from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const resumeUrl = `${import.meta.env.BASE_URL}Resume.pdf`;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="h-14 bg-slate-950 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs sm:text-sm truncate">
            <FileText size={18} className="text-sky-400 shrink-0" />
            <span className="truncate">Md. Saidur Rahman Sohan - Resume</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Download Button */}
            <a
              href={resumeUrl}
              download="Md_Saidur_Rahman_Sohan_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition active:scale-95"
            >
              <Download size={14} /> Download
            </a>
            {/* Open in New Tab Button (Fallback) */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
              title="Open in new tab"
            >
              <ExternalLink size={15} />
            </a>
            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* PDF Frame */}
        <div className="flex-1 bg-slate-950 p-2 overflow-hidden">
          <iframe
            src={resumeUrl}
            title="Resume Viewer"
            className="w-full h-full rounded-xl border border-slate-800 bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;