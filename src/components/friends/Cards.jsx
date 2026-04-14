"use client";

import Image from "next/image";
import Link from "next/link";

export default function Cards({ friend }) {
  if (!friend) return null;

  const { id, name, picture, days_since_contact, status, tags = [] } = friend;

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "overdue":
        return "bg-red-500 text-white";
      case "almost due":
        return "bg-orange-400 text-white";
      case "on-track":
        return "bg-[#1e4638] text-white"; // Brand Green
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <Link href={`/friend/${id}`} className="block group h-full">
      <div className="bg-white rounded-[32px] shadow-sm hover:shadow-lg p-8 flex flex-col items-center border border-gray-100 transition-all duration-300 h-full">
        {/* Profile Image */}
        <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300">
          <Image
            src={picture || "https://via.placeholder.com/150"}
            alt={name}
            width={100}
            height={100}
            className="rounded-full object-cover aspect-square border-4 border-slate-50 shadow-sm"
          />
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold text-slate-800 mb-1">{name}</h2>

        {/* Contact Info */}
        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-4">
          {days_since_contact === 0 ? "Today" : `${days_since_contact}D AGO`}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 min-h-[24px]">
          {tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-[#1e4638] px-3 py-1 rounded-full border border-emerald-100/50"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto w-full">
          <div
            className={`w-full text-center py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm transition-colors duration-300 ${getStatusStyle(status)}`}
          >
            {status}
          </div>
        </div>
      </div>
    </Link>
  );
}
