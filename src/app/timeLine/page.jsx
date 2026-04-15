"use client";

import React, { useState } from "react";
import { useInteractions } from "@/components/context/InteractionContext";
import { FaPhone, FaComment, FaVideo, FaHandshake, FaSearch, FaChevronDown } from "react-icons/fa";

const TimeLine = () => {
  const { interactions } = useInteractions(); // Context theke data nichi
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const filterOptions = ["All", "Call", "Text", "Video"];

  // Filter and Search Logic
  const filteredData = interactions.filter((item) => {
    const matchesFilter = filter === "All" || item.type.toLowerCase() === filter.toLowerCase();
    const matchesSearch = item.person.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Timeline</h1>

       
        <div className="relative mb-8 max-w-sm">
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer shadow-sm hover:border-gray-300 transition"
          >
            <span className="text-gray-400 text-sm">
              {filter === "All" ? "Filter timeline" : filter}
            </span>
            <FaChevronDown className={`text-xs text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>

          
          {isOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 mb-2 relative">
                <FaSearch className="absolute left-6 top-2.5 text-gray-300 text-sm" />
                <input 
                  type="text"
                  placeholder="Search interactions..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-lg text-sm focus:outline-none border border-transparent focus:border-emerald-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="border-t border-gray-50 my-1"></div>
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setFilter(opt); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 hover:text-emerald-700 transition ${filter === opt ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INTERACTION LIST */}
        <div className="space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition">
                    {item.type === "Call" && <FaPhone size={18} />}
                    {item.type === "Text" && <FaComment size={18} />}
                    {item.type === "Video" && <FaVideo size={18} />}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-700">
                      <span className="text-emerald-800">{item.type}</span> with {item.person}
                    </p>
                    <p className="text-xs font-bold text-gray-400 mt-0.5">{item.date}</p>
                  </div>
                </div>
                
                <div className="pr-4">
                   <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 italic">No interactions found matching your filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;