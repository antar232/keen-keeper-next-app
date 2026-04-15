"use client";

import React, { useState } from 'react';
import { useInteractions } from '@/components/context/InteractionContext';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Stats = () => {
    const { interactions } = useInteractions();
    const [hoveredData, setHoveredData] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    const calculateStats = () => {
        if (!interactions || interactions.length === 0) return [];
        const total = interactions.length;
        const counts = interactions.reduce((acc, curr) => {
            acc[curr.type] = (acc[curr.type] || 0) + 1;
            return acc;
        }, {});

        return [
            { name: 'Call', value: counts['Call'] || 0, percent: (((counts['Call'] || 0) / total) * 100).toFixed(1) },
            { name: 'Text', value: counts['Text'] || 0, percent: (((counts['Text'] || 0) / total) * 100).toFixed(1) },
            { name: 'Video', value: counts['Video'] || 0, percent: (((counts['Video'] || 0) / total) * 100).toFixed(1) },
        ];
    };

    const chartData = calculateStats();
    const COLORS = ['#1a4332', '#9333ea', '#22c55e'];

    const activeDisplay = hoveredData || selectedData;

    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-8">
                <h1 className="text-4xl font-black text-slate-800 tracking-tighter">Friendship Analytics</h1>

                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 relative">
                    <h2 className="text-sm font-black text-emerald-950/70 uppercase tracking-widest mb-4">By Interaction Type</h2>
                    
                    <div className="relative w-full h-80">
                      
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                            {activeDisplay ? (
                                <>
                                    <span className="text-5xl font-black text-slate-800 animate-in fade-in zoom-in duration-300">
                                        {activeDisplay.percent}%
                                    </span>
                                    <span className="text-[12px] font-bold uppercase text-slate-400 tracking-widest">
                                        {activeDisplay.name}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="text-4xl font-black text-slate-200">0%</span>
                                    <span className="text-[10px] font-bold uppercase text-slate-300 tracking-widest">Hover Chart</span>
                                </>
                            )}
                        </div>

                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={90}
                                    outerRadius={125}
                                    paddingAngle={8}
                                    dataKey="value"
                                    cornerRadius={15}
                                    
                                    onMouseEnter={(_, index) => setHoveredData(chartData[index])}
                                    onMouseLeave={() => setHoveredData(null)}
                                    
                                    // Click logic as before
                                    onClick={(_, index) => {
                                        const data = chartData[index];
                                        setSelectedData(selectedData?.name === data.name ? null : data);
                                    }}
                                    
                                    style={{ cursor: 'pointer', outline: 'none' }}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={COLORS[index % COLORS.length]} 
                                            stroke="none"
                                            // Slice gulo hover korle ektu highlight hobe
                                            opacity={activeDisplay === null || activeDisplay.name === entry.name ? 1 : 0.3}
                                            className="transition-all duration-300"
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    
                    <div className="flex justify-center gap-4 mt-6">
                        {chartData.map((entry, index) => (
                            <div 
                                key={index}
                                onMouseEnter={() => setHoveredData(entry)}
                                onMouseLeave={() => setHoveredData(null)}
                                className={`px-5 py-2 rounded-2xl border transition-all flex items-center gap-3 cursor-default ${selectedData?.name === entry.name ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-gray-100 text-slate-600'}`}
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                <span className="text-xs font-black uppercase tracking-widest">{entry.name}</span>
                                <span className="text-[10px] font-bold opacity-60">{entry.percent}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;