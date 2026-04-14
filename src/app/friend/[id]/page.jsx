"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInteractions } from "@/components/context/InteractionContext"; 

import { FaPhone, FaComment, FaVideo, FaClock, FaTrash, FaArchive } from "react-icons/fa";

export default function FriendDetails({ params }) {
  const { id } = use(params);
  const { interactions, addInteraction } = useInteractions(); 

  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/friends.json");
        const data = await res.json();
        const found = data.find((f) => f.id.toString() === id);
        setFriend(found || null);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleAction = (type) => {
    if (!friend) return;
    const today = new Date().toLocaleDateString();
    const isAlreadyDone = interactions.some(
      (item) => item.person === friend.name && item.type === type && item.date === today
    );

    if (isAlreadyDone) {
      toast.error(`${type} already recorded today!`, { theme: "colored" });
      return;
    }

    addInteraction({
      type,
      person: friend.name,
      date: today,
    });

    toast.success(`${type} recorded! Go to Timeline to see.`, { theme: "colored" });
  };

  if (loading) return <p className="p-10 text-center font-bold text-emerald-800">Loading...</p>;
  if (!friend) return <p className="p-10 text-center">Friend not found!</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-6">
        
    
        <div className="md:col-span-4 space-y-4">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <Image src={friend.picture} alt={friend.name} fill className="rounded-full object-cover border-4 border-slate-50 shadow-sm" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{friend.name}</h2>
            
            <div className="flex flex-col items-center gap-2 mt-3">
               <span className="bg-red-500 text-white text-[10px] px-3 py-0.5 rounded-full font-bold uppercase tracking-wider">Overdue</span>
               <span className="bg-emerald-100 text-emerald-700 text-[10px] px-3 py-0.5 rounded-full font-bold uppercase tracking-wider">Family</span>
            </div>

            <p className="text-slate-500 text-sm mt-4 italic">"{friend.bio || "Former colleague, great mentor"}"</p>
            <p className="text-slate-400 text-[10px] mt-2 font-semibold uppercase">Preferred: email</p>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-white py-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center gap-3 font-semibold text-slate-700 hover:bg-slate-50 transition">
              <FaClock className="text-slate-400" /> Snooze 2 Weeks
            </button>
            <button className="w-full bg-white py-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center gap-3 font-semibold text-slate-700 hover:bg-slate-50 transition">
              <FaArchive className="text-slate-400" /> Archive
            </button>
            <button className="w-full bg-white py-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center gap-3 font-semibold text-red-500 hover:bg-red-50 transition">
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      
        <div className="md:col-span-8 space-y-6">
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-emerald-900">{friend.days_since_contact || "62"}</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">Days Since Contact</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-emerald-900">{friend.goal || "30"}</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">Goal (Days)</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <p className="text-2xl font-bold text-emerald-900">{friend.next_due_date || "Feb 27, 2026"}</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 mt-1 text-nowrap">Next Due</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
             <button className="absolute right-6 top-8 bg-slate-50 border border-slate-200 px-3 py-1 rounded text-[10px] font-bold text-slate-500 uppercase hover:bg-slate-100">Edit</button>
             <h4 className="text-emerald-900 font-bold text-lg mb-2">Relationship Goal</h4>
             <p className="text-slate-600 font-medium">Connect every <span className="font-bold text-slate-900">{friend.goal || "30"} days</span></p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold mb-6 text-emerald-900 text-lg">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-4">
              {["Call", "Text", "Video"].map((action) => (
                <button
                  key={action}
                  onClick={() => handleAction(action)}
                  className="p-6 bg-slate-50 rounded-2xl flex flex-col items-center gap-3 hover:bg-emerald-50 transition border border-transparent hover:border-emerald-100 group"
                >
                  {action === "Call" && <FaPhone size={24} className="text-slate-700 group-hover:text-emerald-800" />}
                  {action === "Text" && <FaComment size={24} className="text-slate-700 group-hover:text-emerald-800" />}
                  {action === "Video" && <FaVideo size={24} className="text-slate-700 group-hover:text-emerald-800" />}
                  <span className="text-sm font-semibold text-slate-600 group-hover:text-emerald-900">{action}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}