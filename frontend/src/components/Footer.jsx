import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white/80 py-8 mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-0 md:flex md:justify-between md:items-center">
        <div className="flex flex-col md:items-start text-center md:text-left">
          <p className="font-serif font-bold text-xl text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
            <span>Chain<span className="text-accent-orange">Deed</span></span>
            <span className="font-sans font-normal text-sm px-2 py-0.5 rounded-full bg-white/10 ml-2">Registry</span>
          </p>
          <p className="text-sm mt-2 text-white/60">© 2026 Government of India (Demo)</p>
        </div>
        <div className="flex flex-col md:items-end text-center md:text-right text-sm">
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-verified"></span>
            Powered by <strong className="text-white">Ethereum</strong>
          </p>
          <p className="text-white/60 mt-2">Built on Blockchain</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
