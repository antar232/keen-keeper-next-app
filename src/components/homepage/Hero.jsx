"use client";

import React from "react";

const Hero = ({ friends = [] }) => {
  // 1. Total Friends calculation
  const totalFriends = friends.length;

  // 2. On Track calculation (Status 'on-track' check kora hocche)
  const onTrackCount = friends.filter(
    (f) => f.status?.toLowerCase() === "on-track"
  ).length;

  // 3. Need Attention calculation (Overdue ebong Almost Due milie)
  const needAttentionCount = friends.filter(
    (f) => 
      f.status?.toLowerCase() === "overdue" || 
      f.status?.toLowerCase() === "almost due"
  ).length;

  const interactionsThisMonth = friends.reduce((acc, curr) => acc + (curr.interactions_count || 0), 0) || totalFriends;

  const stats = [
    { label: "Total Friends", value: totalFriends },
    { label: "On Track", value: onTrackCount },
    { label: "Need Attention", value: needAttentionCount },
    { label: "Sync Status", value: `${Math.round((onTrackCount / totalFriends) * 100) || 0}%` },
  ];

  return (
    <div className="bg-gray-100">
      <div className="py-10 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-md hover:scale-[1.02]"
            >
             
              <h2 className="text-4xl font-black text-[#1e4638] mb-2 tracking-tighter">
                {stat.value}
              </h2>

             
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;