import React, { useState, useRef } from 'react';
import { Mail, Send, CheckCircle2, PhoneCall } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // EmailJS দিয়ে ইমেইল পাঠানো
    emailjs
      .sendForm(
        'YOUR_SERVICE_ID',   // 👈 EmailJS থেকে পাওয়া Service ID
        'YOUR_TEMPLATE_ID',  // 👈 EmailJS থেকে পাওয়া Template ID
        formRef.current,
        'YOUR_PUBLIC_KEY'    // 👈 EmailJS থেকে পাওয়া Public Key
      )
      .then(
        () => {
          setLoading(false);
          setSubmitted(true);
          formRef.current.reset(); // ফর্মের ইনপুটগুলো খালি করে দেবে
          setTimeout(() => setSubmitted(false), 5000); // ৫ সেকেন্ড পর নোটিফিকেশন চলে যাবে
        },
        (err) => {
          console.error("FAILED...", err);
          setLoading(false);
          setError(true);
        }
      );
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sky-400 text-sm font-mono">
          <Mail size={18} /> Get In Touch
        </div>
        <h2 className="text-3xl font-bold text-slate-100">Let's Connect</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-6">
          <p className="text-slate-400 leading-relaxed text-sm">
            I am currently looking for <span className="text-sky-400 font-medium">Internship</span> or <span className="text-sky-400 font-medium">Junior Frontend Developer</span> opportunities. Feel free to reach out if you have a project or a position available!
          </p>

          {/* Direct Email Card */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs text-slate-500 font-mono block">Direct Email</span>
            <a href="mailto:sr.sohan5187@gmail.com" className="text-slate-200 hover:text-sky-400 font-mono text-sm transition block">
              sr.sohan5187@gmail.com
            </a>
          </div>

          {/* WhatsApp / Emergency Contact Card */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs text-slate-500 font-mono block">WhatsApp (Emergency)</span>
            <a 
              href="https://wa.me/8801724247815" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-200 hover:text-emerald-400 font-mono text-sm transition flex items-center gap-2"
            >
              <PhoneCall size={16} className="text-emerald-400" />
              +880 1724-247815
            </a>
          </div>
        </div>

        <form 
          ref={formRef} 
          onSubmit={handleSubmit} 
          className="lg:col-span-7 space-y-4 p-6 bg-slate-900/40 border border-slate-800 rounded-xl relative"
        >
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Name</label>
            <input 
              required
              name="from_name" // 👈 EmailJS চিনতে এটি আবশ্যক
              type="text" 
              placeholder="Your Name" 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Email</label>
            <input 
              required
              name="from_email" // 👈 EmailJS চিনতে এটি আবশ্যক
              type="email" 
              placeholder="your@email.com" 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Message</label>
            <textarea 
              required
              name="message" // 👈 EmailJS চিনতে এটি আবশ্যক
              rows="4" 
              placeholder="Write your message here..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 transition resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 text-white font-medium text-sm rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 cursor-pointer"
          >
            {loading ? "Sending..." : "Send Message"} <Send size={16} />
          </button>

          {/* Success Notification */}
          {submitted && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-800/80 rounded-lg text-emerald-400 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 size={16} /> Thank you! Your message has been sent successfully.
            </div>
          )}

          {/* Error Notification */}
          {error && (
            <div className="p-3 bg-rose-950/80 border border-rose-800/80 rounded-lg text-rose-400 text-xs font-mono">
              Something went wrong. Please try again later!
            </div>
          )}
        </form>
      </div>

      <footer className="pt-16 border-t border-slate-800/80 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} Md. Saidur Rahman Sohan. All rights reserved.
      </footer>
    </section>
  );
};

export default Contact;