import React from 'react';

const ResumeModal = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  // 🔴 view=Fit দিলে পুরো PDF এক স্ক্রিনে সুন্দরভাবে ফিট হয়ে যাবে
  const pdfPath = `${import.meta.env.BASE_URL}Resume.pdf`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 transition-all duration-300">
      
      {/* Container - overflow-hidden দেওয়া হয়েছে যেন অতিরিক্ত স্ক্রলবার না আসে */}
      <div 
        className={`relative w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${
          isDarkMode 
            ? 'bg-[#0f172a] border-cyan-500/30 text-white' 
            : 'bg-white border-sky-300 text-slate-800'
        }`}
      >
        
        {/* Header Bar */}
        <div className={`flex items-center justify-between px-6 py-3 border-b shrink-0 ${
          isDarkMode ? 'border-slate-800 bg-[#0b0f19]' : 'border-slate-200 bg-sky-50'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
            <h3 className="ml-3 font-semibold text-sm tracking-wide">Resume Preview</h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Download Option */}
            <a
              href={pdfPath}
              download="Sohan_Resume.pdf"
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                isDarkMode 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950' 
                  : 'bg-sky-600 hover:bg-sky-500 text-white'
              }`}
            >
              Download PDF
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                isDarkMode 
                  ? 'hover:bg-slate-800 text-slate-400 hover:text-white' 
                  : 'hover:bg-slate-200 text-slate-600 hover:text-black'
              }`}
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 w-full h-full bg-[#1e293b] overflow-hidden p-1">
          <iframe
            src={`${pdfPath}#toolbar=1&navpanes=0&view=Fit`}
            title="Resume Preview"
            className="w-full h-full rounded-b-xl border-none"
          />
        </div>

      </div>
    </div>
  );
};

export default ResumeModal;