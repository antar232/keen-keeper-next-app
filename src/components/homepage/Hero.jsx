import React from "react";

const Hero = () => {
  const stats = [
    { label: "Total Friends", value: 12 },
    { label: "On Track", value: 3 },
    { label: "Need Attention", value: 6 },
    { label: "Interactions This Month", value: 12 },
  ];

  return (
    <div className="bg-gray-100">
      <div className="py-10 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.02]"
            >
              {/* Value (Number) */}
              <h2 className="text-4xl font-bold text-[#1e4638] mb-2">
                {stat.value}
              </h2>

              {/* Label */}
              <p className="text-slate-500 font-medium text-sm md:text-base">
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
