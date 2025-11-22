"use client";
import { Zap } from "lucide-react";
import React from "react";

const cards = [
  { name: "Consoles/Pc", number: 5 },
  { name: "VR Headsets", number: 2 },
  { name: "Games", number: 100 },
  { name: "Pool Tables", number: 2 },
];

const Hero = () => {
  return (
    <div className="relative text-white text-center mt-14 flex items-center flex-col overflow-hidden">

      {/* --- Background Blurred Neon Balls --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-[#3FFDFE] rounded-full blur-[180px] opacity-40"></div>
        <div className="absolute bottom-20 right-1/3 w-[400px] h-[400px] bg-[#FD5DA8] rounded-full blur-[180px] opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-[#C58BFF] rounded-full blur-[200px] opacity-35"></div>
      </div>

      {/* --- Badge --- */}
      <div className="text-[#40FBF0] bg-[#292339] md:mb-4 rounded-3xl border border-[#40FBF0] flex items-center gap-1 p-1 px-2 md:p-2 md:px-5">
        <Zap className="text-yellow-300 w-5 h-5" />
        Ultimate Gaming Experience
      </div>

      {/* --- Main Heading --- */}
      <h1 className="md:text-8xl text-5xl mt-10 font-bold bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] text-transparent bg-clip-text drop-shadow-[0_0_25px_#3FFDFE]">
        NEXT LEVEL
      </h1>
      <h1 className="md:text-8xl text-5xl font-bold bg-gradient-to-r from-[#FD5DA8] via-[#C58BFF] to-[#3FFDFE] text-transparent bg-clip-text drop-shadow-[0_0_25px_#3FFDFE]">
        FUN ARENA
      </h1>

      {/* --- Subtext --- */}
      <p className="text-zinc-200 mt-5 text-md md:text-3xl text-wrap max-w-xs md:max-w-3xl leading-relaxed">
        Experience next-gen gaming with PS5, VR, pool tables & more. <br />
        Your ultimate gaming sanctuary awaits.
      </p>

      {/* --- Buttons --- */}
      <div className="flex gap-4 md:gap-6 mt-10">
        <button
          onClick={() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }}
          className="rounded-full cursor-pointer font-bold text-white 
          bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] 
          px-3 py-3 md:px-6 md:py-4 text-sm md:text-lg transition-all duration-500 ease-in-out 
          hover:from-[#FD5DA8] hover:via-[#C58BFF] hover:to-[#3FFDFE]
          hover:scale-105 shadow-[0_0_20px_rgba(197,139,255,0.6)] 
          hover:shadow-[0_0_40px_rgba(253,93,168,0.8)]"
        >
          Book Your Slot
        </button>

        <button   onClick={() => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }} className="relative inline-flex items-center justify-center px-3 py-3 md:px-6 md:py-4 text-xs md:text-lg cursor-pointer text-white font-semibold rounded-full overflow-hidden bg-transparent transition-all duration-500 ease-in-out hover:scale-105">
          <span className="absolute inset-0 rounded-full border-[1px] border-transparent bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] p-[2px]">
            <span className="block h-full w-full rounded-full bg-[#0B0B1A] hover:bg-zinc-800 transition-all duration-500 ease-in-out"></span>
          </span>
          <span  className="relative z-10">Explore More</span>
        </button>
      </div>

      {/* --- Cards Section --- */}
      <div className="flex justify-center items-center gap-6 md:gap-10 mt-20 flex-wrap mb-28">
        {cards.map((card, key) => (
          <div
            key={key}
            className="border border-zinc-800 rounded-2xl 
            w-36 sm:w-44 md:w-48 h-28 flex items-center justify-center flex-col 
            bg-[#1A1222] transition-all duration-500 ease-in-out 
            hover:border-[#C58BFF] hover:shadow-[0_0_25px_rgba(197,139,255,0.4)] hover:scale-105"
          >
            <p className="bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] text-transparent bg-clip-text text-2xl md:text-3xl font-bold drop-shadow-[0_0_25px_#3FFDFE]">
              {card.number}+
            </p>
            <p className=" text-lg md:text-xl text-zinc-300">{card.name}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Hero;
