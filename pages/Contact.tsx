
import React, { useState } from 'react';
import Window from '../components/Window';
import { Mail, Send, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
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
    <Window title="New Message" icon={<Mail size={12} className="text-teal-500" />} maxWidth="max-w-3xl">
      <div className="bg-white dark:bg-slate-900 h-full flex flex-col transition-colors duration-300">
          {/* Email Headers Form */}
          <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10 space-y-3">
              <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm w-16 text-right font-medium">To:</span>
                  <div className="bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full text-sm font-medium">
                      gururaja.apoorva@gmail.com
                  </div>
              </div>
              <div className="flex items-center space-x-3">
                   <label htmlFor="email" className="text-gray-400 text-sm w-16 text-right font-medium">From:</label>
                   <input 
                      type="email" 
                      name="email" 
                      id="email"
                      placeholder="your@email.com" 
                      value={formData.email}
                      onChange={handleChange}
                      className="flex-1 text-sm font-medium text-slate-900 dark:text-white bg-transparent border-none focus:ring-0 px-2 py-1 placeholder-slate-300 dark:placeholder-slate-600"
                   />
              </div>
              <div className="flex items-center space-x-3">
                   <label htmlFor="subject" className="text-gray-400 text-sm w-16 text-right font-medium">Subject:</label>
                   <input 
                      type="text" 
                      name="subject" 
                      id="subject"
                      placeholder="Collaboration Opportunity" 
                      value={formData.subject}
                      onChange={handleChange}
                      className="flex-1 text-sm font-medium text-slate-900 dark:text-white bg-transparent border-b border-transparent focus:border-slate-200 dark:focus:border-slate-700 focus:ring-0 px-2 py-1 placeholder-slate-300 dark:placeholder-slate-600 transition-colors"
                   />
              </div>
          </div>

          {/* Message Body */}
          <div className="flex-1 p-6 flex flex-col">
              <textarea 
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                className="flex-1 w-full resize-none border-none focus:ring-0 text-slate-700 dark:text-slate-200 bg-transparent text-base leading-relaxed placeholder-slate-300 dark:placeholder-slate-600 font-sans"
              />
              
              {/* Error Message */}
              {error && (
                <div className="mt-4 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg border border-red-200 dark:border-red-800">
                  <span>{error}</span>
                </div>
              )}
              
              <div className="mt-6 flex justify-between items-center pt-6 border-t border-gray-100 dark:border-white/10">
                  <div className="flex space-x-4">
                      <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Connect</span>
                          <div className="flex space-x-4">
                              <a href="https://www.linkedin.com/in/apoorvagururaja/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                                  <Linkedin size={24} />
                              </a>
                              <a href="https://github.com/ai-is-guru" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                  <Github size={24} />
                              </a>
                          </div>
                      </div>
                  </div>
                  
                  <button 
                    onClick={handleSend}
                    className="inline-flex items-center justify-center px-6 py-2 rounded-full font-bold shadow-lg transition-all transform duration-200 bg-slate-800 dark:bg-white text-white dark:text-slate-900 hover:scale-105"
                  >
                    Open Email <Send size={16} className="ml-2" />
                  </button>
              </div>
          </div>
      </div>
    </Window>
  );
};

export default Contact;
