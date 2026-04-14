"use client";

import Image from "next/image";
import Link from "next/link";

export default function Cards({ friend }) {
  if (!friend) return null;

  const {
    id,
    name,
    picture,
    days_since_contact,
    status,
    tags = [],
  } = friend;

  // Status style matching the visual reference
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "overdue":
        return "bg-red-500 text-white";
      case "almost due":
        return "bg-orange-400 text-white";
      case "on-track":
        return "bg-[#1e4638] text-white"; // KeenKeeper brand green
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Link href={`/friend/${id}`} className="w-full">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl p-8 flex flex-col items-center border border-gray-100 transition-all duration-300 cursor-pointer h-full">

        {/* Profile Image - Circular Avatar */}
        <div className="relative mb-6">
          <Image
            src={picture}
            alt={name}
            width={100}
            height={100}
            className="rounded-full object-cover aspect-square border-2 border-gray-50 shadow-sm"
          />
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {name}
        </h2>

        {/* Contact Info */}
        <p className="text-gray-400 text-xs font-medium mb-4">
          {days_since_contact}d ago
        </p>

        {/* Tags Section */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 h-6">
          {tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-[#1e4638] px-3 py-1 rounded-full border border-emerald-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status Badge */}
        <div className="mt-auto w-full flex justify-center">
          <div
            className={`px-6 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide shadow-sm ${getStatusStyle(status)}`}
          >
            {status}
          </div>
        </div>

      </div>
    </Link>
  );
}