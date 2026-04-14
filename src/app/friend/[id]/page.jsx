"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
// React Icons (Fa use korle better consistency thake)
import { FaPhone, FaComment, FaVideo, FaTrash, FaArchive, FaClock } from "react-icons/fa";

export default function FriendDetails({ params }) {
  // Unwrapping params safely
  const { id } = use(params);
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Public folder theke fetch korle path "/friends.json" hobe
        const res = await fetch("/friends.json");
        const data = await res.json();

        const found = data.find((f) => f.id.toString() === id);
        setFriend(found || null);
      } catch (error) {
        console.error("Data load korte somossya hoyeche:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Friend not found!</h2>
        <p className="text-gray-500 mt-2">Check the ID or your data source.</p>
      </div>
    );
  }

  return (
   <div className="bg-gray-100">
     <div className="max-w-5xl mx-auto p-4 md:p-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* LEFT COLUMN: Profile & Actions */}
        <div className="md:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
            {/* Image Section */}
            <div className="w-28 h-28 mx-auto mb-4 relative border-4 border-emerald-50 rounded-full shadow-sm">
              <Image
                src={friend.picture || "https://via.placeholder.com/150"}
                alt={friend.name}
                fill
                className="rounded-full object-cover"
              />
            </div>

            <h2 className="font-bold text-2xl text-slate-800">
              {friend.name}
            </h2>

            {/* Status & Bio */}
            <div className="flex flex-col items-center gap-2 mt-2">
               <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                 friend.status?.toLowerCase() === 'overdue' ? 'bg-red-500 text-white' : 'bg-emerald-800 text-white'
               }`}>
                {friend.status}
              </span>
              <p className="text-gray-400 text-sm italic mt-3 line-clamp-2 px-2">
                {friend.bio || "Relationship built on shared interests and professional growth."}
              </p>
              <p className="text-[10px] text-gray-400 mt-2 uppercase">Preferred: {friend.preferred || "Email"}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-white py-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center gap-3 font-semibold text-slate-700 hover:bg-gray-50 transition">
              <FaClock className="text-gray-400" /> Snooze 2 Weeks
            </button>
            <button className="w-full bg-white py-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center gap-3 font-semibold text-slate-700 hover:bg-gray-50 transition">
              <FaArchive className="text-gray-400" /> Archive
            </button>
            <button className="w-full bg-white py-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center gap-3 font-semibold text-red-500 hover:bg-red-50 transition">
              <FaTrash /> Delete
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Stats & Tools */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Stats Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl text-center shadow-sm border border-gray-100">
              <h3 className="text-3xl font-bold text-emerald-900">{friend.days_since_contact}</h3>
              <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-tighter">Days Since Contact</p>
            </div>
            <div className="bg-white p-6 rounded-2xl text-center shadow-sm border border-gray-100">
              <h3 className="text-3xl font-bold text-emerald-900">{friend.goal}</h3>
              <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-tighter">Goal (Days)</p>
            </div>
            <div className="bg-white p-6 rounded-2xl text-center shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-emerald-700">
                {friend.next_due_date || "Feb 27, 2026"}
              </h3>
              <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-tighter">Next Due</p>
            </div>
          </div>

          {/* Goal Settings */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <button className="absolute right-6 top-8 text-[10px] bg-slate-50 border border-slate-200 px-3 py-1 rounded-md text-slate-500 font-bold hover:bg-slate-100 uppercase transition">
              Edit
            </button>
            <h4 className="text-emerald-900 font-bold mb-3 text-lg">Relationship Goal</h4>
            <p className="text-slate-600">
              Connect every <span className="font-bold text-slate-900">{friend.goal} days</span>
            </p>
          </div>

          {/* Interaction Methods */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold mb-6 text-emerald-900 text-lg">
              Quick Check-In
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <button className="group p-6 border border-slate-50 bg-slate-50 rounded-2xl flex flex-col items-center gap-3 hover:bg-emerald-50 hover:border-emerald-100 transition duration-300">
                <FaPhone size={20} className="text-emerald-800 group-hover:scale-110 transition" />
                <span className="text-sm font-semibold text-slate-700">Call</span>
              </button>
              <button className="group p-6 border border-slate-50 bg-slate-50 rounded-2xl flex flex-col items-center gap-3 hover:bg-emerald-50 hover:border-emerald-100 transition duration-300">
                <FaComment size={20} className="text-emerald-800 group-hover:scale-110 transition" />
                <span className="text-sm font-semibold text-slate-700">Text</span>
              </button>
              <button className="group p-6 border border-slate-50 bg-slate-50 rounded-2xl flex flex-col items-center gap-3 hover:bg-emerald-50 hover:border-emerald-100 transition duration-300">
                <FaVideo size={20} className="text-emerald-800 group-hover:scale-110 transition" />
                <span className="text-sm font-semibold text-slate-700">Video</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
   </div>
  );
}