import React from "react";

const pricingData = [
  {
    platform: "PS5 Console",
    prices: [
      { players: "1", half: "₹80", full: "₹140" },
      { players: "2", half: "₹100", full: "₹180" },
      { players: "3", half: "₹120", full: "₹220" },
    ],
  },
  {
    platform: "VR",
    prices: [
      { players: "1", half: "₹80", full: "₹140" },
      { players: "1 (With Bat)", half: "₹90", full: "₹160" },
    ],
  },
  {
    platform: "Racing Wheel/PC",
    prices: [{ players: "1", half: "₹80", full: "₹140" }],
  },
  {
    platform: "PS4",
    prices: [
      { players: "1", half: "₹60", full: "₹100" },
      { players: "2", half: "₹80", full: "₹140" },
      { players: "3", half: "₹100", full: "₹180" },
      { players: "4", half: "₹120", full: "₹220" },
    ],
  },
  {
    platform: "Pool",
    prices: [{ players: "2 / 4", half: "₹80", full: "₹140" }],
  },
];

export default function PriceList() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center pt-20 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {pricingData.map((item, i) => (
          <div
            key={i}
            className="bg-[#0c0c0c] border border-[#1e1e1e] rounded-2xl p-6 hover:border-[#3FFDFE] transition-all duration-300 shadow-[0_0_20px_rgba(63,253,254,0.1)] hover:shadow-[0_0_30px_rgba(63,253,254,0.3)]"
          >
            <h2 className="text-2xl font-bold text-start text-white mb-3">
              {item.platform}
            </h2>
            <div className="space-y-3">
              {item.prices.map((price, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-[#121214] p-3 rounded-xl border border-[#1f1f1f]">
                  <p className="text-zinc-300 font-medium">
                    Players: <span className="text-white">{price.players}</span>
                  </p>
                  <div className="text-right">
                    <p className="text-sm text-[#FD5DA8]">30 mins: {price.half}</p>
                    <p className="text-sm text-[#3FFDFE]">1 hr: {price.full}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-14 text-center">
        <p className="md:text-xl text-zinc-400">
           Cold Drinks & Snacks — <span className="text-[#3FFDFE]">@ MRP</span>
        </p>
      </div>
    </div>
  );
}
  