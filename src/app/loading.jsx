import React from 'react';
import Image from 'next/image';
import logoImg from "@/components/image/assets/logo.png";

const LoadingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white">
            {/* Logo with a soft pulse effect */}
            <div className="relative mb-8 animate-pulse">
                <Image 
                    src={logoImg} 
                    alt="Keen Keeper" 
                    width={80} 
                    height={80} 
                    className="object-contain"
                />
            </div>

            {/* Custom Spinner */}
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-[#1e4638] rounded-full animate-spin"></div>
                
                <h2 className="mt-4 text-xl font-semibold text-slate-700 tracking-wide">
                    Loading<span className="animate-bounce inline-block">.</span>
                    <span className="animate-bounce inline-block delay-75">.</span>
                    <span className="animate-bounce inline-block delay-150">.</span>
                </h2>
                
                <p className="text-slate-400 text-sm mt-1">
                    Gathering your insights...
                </p>
            </div>

            {/* Subtle background element */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
    );
};

export default LoadingPage;