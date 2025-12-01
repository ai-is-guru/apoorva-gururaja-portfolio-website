
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Send, Linkedin, Github, ArrowLeft } from 'lucide-react';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error when user types
  };

  const handleSend = () => {
    if (!formData.email || !formData.message) {
      setError('Please fill in your email and message');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Create mailto link with pre-filled content
    const toEmail = 'gururaja.apoorva@gmail.com';
    const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
    const body = encodeURIComponent(
      `From: ${formData.email}\n\n${formData.message}`
    );
    
    const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${body}`;
    
    // Open default email client
    window.location.href = mailtoLink;
  };

  return (
    <div className="h-full w-full overflow-y-auto thin-scrollbar pb-20 px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 sm:mb-8 flex items-center gap-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed max-w-3xl font-normal tracking-normal">
            Let's Drive Strategy, Alignment, and High-Impact Delivery
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 border border-white/30 dark:border-white/10 shadow-xl">
          {/* Email Headers Form */}
          <div className="space-y-4 mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <label className="text-slate-400 dark:text-neutral-500 text-sm w-16 text-left sm:text-right font-medium">To:</label>
              <div className="bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-full text-sm font-medium">
                gururaja.apoorva@gmail.com
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <label htmlFor="email" className="text-slate-400 dark:text-neutral-500 text-sm w-16 text-left sm:text-right font-medium">From:</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                placeholder="your@email.com" 
                value={formData.email}
                onChange={handleChange}
                className="flex-1 text-sm font-medium text-slate-900 dark:text-white bg-transparent border-b border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:ring-0 px-2 py-1 placeholder-slate-300 dark:placeholder-slate-600 transition-colors"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <label htmlFor="subject" className="text-slate-400 dark:text-neutral-500 text-sm w-16 text-left sm:text-right font-medium">Subject:</label>
              <input 
                type="text" 
                name="subject" 
                id="subject"
                placeholder="Collaboration Opportunity" 
                value={formData.subject}
                onChange={handleChange}
                className="flex-1 text-sm font-medium text-slate-900 dark:text-white bg-transparent border-b border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:ring-0 px-2 py-1 placeholder-slate-300 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          {/* Message Body */}
          <div className="flex flex-col min-h-[300px]">
            <textarea 
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              className="flex-1 w-full resize-none border-none focus:ring-0 text-slate-700 dark:text-slate-200 bg-transparent text-base leading-relaxed placeholder-slate-300 dark:placeholder-slate-600 font-sans min-h-[200px]"
            />
            
            {/* Error Message */}
            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg border border-red-200 dark:border-red-800">
                <span>{error}</span>
              </div>
            )}
            
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-6 border-t border-slate-200 dark:border-white/10">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-400 dark:text-neutral-500 uppercase tracking-wider mb-2">Connect</span>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/apoorvagururaja/" target="_blank" rel="noreferrer" className="text-slate-400 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://github.com/ai-is-guru" target="_blank" rel="noreferrer" className="text-slate-400 dark:text-neutral-500 hover:text-white transition-colors">
                    <Github size={24} />
                  </a>
                </div>
              </div>
              
              <button 
                onClick={handleSend}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-semibold shadow-lg transition-all transform duration-200 bg-slate-800 dark:bg-white text-white dark:text-slate-900 hover:scale-105 tracking-tight"
              >
                Open Email <Send size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
