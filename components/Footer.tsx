import React from 'react';
import { Linkedin, Mail, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold mb-2">Apoorva Gururaja</h3>
            <p className="text-slate-400 max-w-xs">
              Turning complex ideas into reality through AI, process, and technology.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-6">
              <a 
                href="https://www.linkedin.com/in/apoorvagururaja/" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:gururaja.apoorva@gmail.com" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a 
                href="https://github.com/ai-is-guru" 
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
            </div>
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} The Aligned Intelligence. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;