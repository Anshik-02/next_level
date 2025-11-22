import React from "react";
import GameZone from "./gamezone";
import Image from "next/image";

const Games = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center text-center px-6 pb-20 ">
      <h2 className="font-bold text-4xl md:text-6xl mt-20 bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(197,139,255,0.3)]">
        Games & Setups
      </h2>

      <p className="text-zinc-300 md:text-lg mt-4 leading-relaxed max-w-3xl">
        Choose your battlefield. From console classics to VR adventures, we've
        got every gaming experience covered.
      </p>
      <GameZone />

      <div className="border border-[#0B303B] md:w-6xl flex items-center justify-center rounded-xl p-8 text-start mt-15">
        <div>
          <h2 className="text-white text-2xl font-black ">Pool Tables</h2>
          <p className="text-zinc-400">
            Take a break from digital gaming with classic pool tables
          </p>
          <div>
          <Image src={"/assets/pics/pool.jpeg"} alt="pool" className="rounded-2xl mt-5" width={900} height={200}/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
