"use client";
import { Coffee, Gamepad, Glasses, Music } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const cards = [
  {
    name: "Ps5/Ps4/Pc",
    description: "Latest games on cutting-edge PS5/Ps4 console and PC",
    icon: <Gamepad size={24} />,
  },
  {
    name: "VR Experience",
    description: "Immersive virtual reality with premium headsets",
    icon: <Glasses size={24} />,
  },
  {
    name: "Chill Vibes",
    description: "Perfect ambiance with neon lights and great music",
    icon: <Music size={24} />,
  },
  {
    name: "Snacks",
    description: "Snacks and drinks to fuel your gaming sessions",
    icon: <Coffee size={24} />,
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center text-center px-4 md:px-6 pb-20">

      {/* ---- Heading ---- */}
      <h2 className="font-bold text-4xl md:text-6xl mt-20 bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] 
      text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(197,139,255,0.3)]">
        About The Zone
      </h2>

      <p className="text-zinc-300 text-base md:text-lg mt-4 max-w-3xl leading-relaxed">
        Step into a world where gaming meets luxury. We've created the ultimate
        gaming sanctuary with state-of-the-art equipment and an unforgettable
        atmosphere.
      </p>

      {/* ---- Image/Grid Section ---- */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-8 md:gap-10 pt-16 w-full max-w-7xl">

        <div className="border h-60 sm:h-80 w-full sm:w-[45%] rounded-2xl 
        border-[#2ACEEB] bg-[radial-gradient(circle_at_top_left,_#0a0f1f,_#111827,_#1f103f)]
        shadow-[0_0_25px_rgba(42,206,235,0.3)]">
        </div>

        <div className="border h-60 sm:h-80 w-full sm:w-[45%] rounded-2xl
        border-[#E44E9D] bg-[radial-gradient(circle_at_top_left,_#1a0a1f,_#111827,_#3f1030)]
        shadow-[0_0_25px_rgba(228,78,157,0.3)]">
        </div>

      </div>

      {/* ---- Feature Cards ---- */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-16 w-full">
        {cards.map((card, key) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: key * 0.1 }}

            className="border border-zinc-800 rounded-2xl 
            w-full sm:w-64 md:w-72 px-7 py-7 flex flex-col text-start
            bg-[#0D0F10]/80 backdrop-blur-md transition-all duration-300 ease-out
            hover:-translate-y-1 hover:border-[#C58BFF] hover:shadow-[0_0_25px_rgba(197,139,255,0.4)]"
          >

            {/* Icon box */}
            <div className="w-14 h-14 rounded-2xl 
            bg-[radial-gradient(circle_at_top_left,_#0a0f1f,_#111827,_#1f103f)]
            text-[#00eaff] flex justify-center items-center">
              {card.icon}
            </div>

            <p className="text-[#E1E1E1] mt-5 text-xl font-bold drop-shadow-[0_0_25px_#3FFDFE]">
              {card.name}
            </p>

            <p className="text-sm mt-1 text-zinc-300">
              {card.description}
            </p>

          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default AboutUs;
