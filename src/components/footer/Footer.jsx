import React from 'react';
import Link from 'next/link';
// React Icons import
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-[#1e4638] text-white py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Brand Name */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          KeenKeeper
        </h2>

        {/* Tagline */}
        <p className="text-gray-300 max-w-2xl mb-8 text-sm md:text-base leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        {/* Social Links Section */}
        <div className="mb-10">
          <p className="text-lg font-medium mb-4">Social Links</p>
          <div className="flex gap-4 justify-center">
            {/* Instagram */}
            <Link href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1e4638] hover:bg-gray-200 transition-colors shadow-sm">
              <FaInstagram size={20} />
            </Link>
            {/* Facebook */}
            <Link href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1e4638] hover:bg-gray-200 transition-colors shadow-sm">
              <FaFacebookF size={20} />
            </Link>
            {/* Twitter/X */}
            <Link href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1e4638] hover:bg-gray-200 transition-colors shadow-sm">
              <FaTwitter size={20} />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full pt-8 border-t border-emerald-900/50 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-400 gap-4">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;