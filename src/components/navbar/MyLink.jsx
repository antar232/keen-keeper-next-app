"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from "react";

const MyLink = ({ href, children, icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${isActive 
          ? "bg-[#1e463a] text-white shadow-sm" // Deep green for active
          : "text-slate-500 hover:text-slate-800" // Grey for inactive
        }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default MyLink;