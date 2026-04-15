import React from 'react';
import { Plus } from 'lucide-react';

const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 bg-gray-100 text-center">
      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
        Friends to keep close in your life
      </h1>

      {/* Subtext */}
      <p className="max-w-2xl text-slate-500 text-lg mb-8 leading-relaxed">
        Your personal shelf of meaningful connections. Browse, tend, and nurture the 
        relationships that matter most.
      </p>

      {/* Add Friend Button */}
      <button className="flex items-center gap-2 bg-[#1e4638] hover:bg-[#16352a] text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md active:scale-95">
        <Plus size={20} />
        <span>Add a Friend</span>
      </button>
      
      
      <div className="w-full max-w-5xl mt-16 border-b border-gray-100"></div>
    </div>
  );
};

export default Banner;