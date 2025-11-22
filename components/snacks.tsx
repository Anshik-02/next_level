import React from "react";
import { CupSoda, Cookie } from "lucide-react";

const Snacks = () => {
  const items = [
    {
      name: "Cold Drinks",
      desc: "Stay refreshed with chilled beverages between your gaming marathons.",
      icon: <CupSoda size={25} />,
      color: "from-[#3FFDFE] to-[#C58BFF]",
    },
    {
      name: "Chips",
      desc: "Crispy and delicious snacks to keep your energy high through every match.",
      icon: <Cookie size={25} />,
      color: "from-[#FD5DA8] to-[#C58BFF]",
    },
  ];

  return (
    <div className="h-full bg-[#050507]  flex flex-col items-center text-center px-6 pb-20 relative overflow-hidden">
   
      <div className="absolute h-screen inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#10101f] to-black opacity-70"></div>
      <div className="absolute w-72 h-72 bg-[#3FFDFE]/20 blur-[120px] top-10 left-20"></div>
      <div className="absolute w-72 h-72 bg-[#FD5DA8]/20 blur-[120px] bottom-10 right-20"></div>

      <h2 className="font-bold text-3xl md:text-6xl mt-20 bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(197,139,255,0.3)] relative z-10">
        Fuel Your Game
      </h2>
      <p className="text-zinc-300 md:text-lg mt-4 leading-relaxed max-w-3xl relative z-10">
        Cool drinks and crunchy chips — the perfect combo to keep your focus and energy at peak level.
      </p>

      <div className="flex flex-wrap justify-center gap-10 mt-16 relative z-10">
        {items.map((item, index) => (
          <div
            key={index}
            className="w-72 p-6 rounded-2xl border border-zinc-800 bg-[#0D0F10]/90 hover:border-[#C58BFF] hover:shadow-[0_0_25px_rgba(197,139,255,0.4)] transition-all duration-500 text-left group"
          >
            <div
              className={`md:w-14 md:h-14 w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-5 shadow-[0_0_25px_rgba(197,139,255,0.4)]`}
            >
              {item.icon}
            </div>
            <h3 className="md:text-xl font-bold text-white mb-2">{item.name}</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

   
      <p className="text-[#C58BFF] text-lg mt-16 font-semibold relative z-10">
        Grab. Sip. Play. Repeat. 
      </p>
    </div>
  );
};

export default Snacks;
