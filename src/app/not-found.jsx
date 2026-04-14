import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from "@/components/image/assets/logo.png";

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <div className="mb-8">
        <Image 
          src={logoImg} 
          alt="Keen Keeper Logo" 
          width={100} 
          height={100} 
          className="mx-auto object-contain"
        />
      </div>

      {/* 404 Content */}
      <h1 className="text-9xl font-extrabold text-[#1e4638] tracking-widest">
        404
      </h1>
      
      <div className="bg-[#1e4638] px-2 text-sm text-white rounded rotate-12 absolute mb-24">
        Page Not Found
      </div>

      <div className="mt-5">
        <h3 className="text-2xl font-semibold text-slate-800 mb-2">
          Oops! Looks like you're lost.
        </h3>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1e4638] hover:bg-[#16352a] transition-all duration-200 shadow-lg"
        >
          Back to Homepage
        </Link>
      </div>

      {/* Decorative Element */}
      <div className="mt-12 text-slate-300">
        <svg
          className="w-24 h-24 mx-auto opacity-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default NotFoundPage;