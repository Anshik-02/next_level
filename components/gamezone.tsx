"use client";
import { useState } from "react";
import { Gamepad2, Glasses, Trophy, ChevronLeft, ChevronRight } from "lucide-react";

const zones = [
  {
    name: "PS4/5 Zone",
    icon: <Gamepad2 size={18} />,
    color: "from-[#3FFDFE] to-[#FD5DA8]",
    games: [
      {
        name: "Spider-Man 2",
        image: "/assets/spiderman2.webp",
      },
      {
        name: "God of War Ragnarök",
        image: "/assets/ragnarok.jpg",
      },
      {
        name: "Horizon Forbidden West",
        image: "/assets/hfw.jpg",
      },
      {
        name: "FIFA 24",
        image: "/assets/fc.webp",
      },
      {
        name: "Call of Duty",
        image: "/assets/cod.jpg",
      },
      {
        name: "Gran Turismo 7",
        image: "/assets/gran.jpg",
      },
      {
        name: "Resident Evil 4",
        image: "/assets/re.jpg",
      },
      {
        name: "Elden Ring",
        image: "/assets/elden.jpeg",
      },
    ],
  },
  {
    name: "VR Zone",
    icon: <Glasses size={18} />,
    color: "from-[#C58BFF] to-[#3FFDFE]",
    games: [
      {
        name: "Beat Saber",
        image: "/assets/beatsaber.jpeg",
      },
      {
        name: "All in One sports",
        image: "/assets/allin.avif",
      },
      {
        name: "Creed Boxing",
        image: "/assets/creed.jpg",
      },
      {
        name: "Cricket Vr",
        image: "/assets/cricket.jpg",
      },
      {
        name: "Resident Evil 4",
        image: "/assets/residentevil.jpg",
      },
      {
        name: "Pistol whip",
        image: "/assets/pistolwip.webp",
      },
      {
        name: "Iron man VR",
        image: "/assets/ironman.jpeg",
      },
      {
        name: "Zombie Army",
        image: "/assets/zombie.avif",
      },
    ],
  },
  {
    name: "PC Gaming",
    icon: <Trophy size={18} />,
    color: "from-[#FD5DA8] to-[#C58BFF]",
    games: [
      {
        name: "Valorant",
        image: "/assets/valo.webp",
      },
      {
        name: "Blur",
        image: "/assets/blur.jpg",
      },
      {
        name: "W2K25",
        image: "/assets/w2k.jpg",
      },
      {
        name: "Mortal Kombat",
        image: "/assets/mortal.jpg",
      },
      {
        name: "Assassin's Creed",
        image: "/assets/assassin.jpg",
      },
      {
        name: "Death Stranding",
        image: "/assets/death.webp",
      },
      {
        name: "Ghost of Tushima",
        image: "/assets/ghost.png",
      },
      {
        name: "Tomb Rider",
        image: "/assets/tomb.jpeg",
      },
    ],
  },
];


const GameZone = () => {
  const [activeZone, setActiveZone] = useState(zones[0]);

  return (
    <div className=" text-white flex flex-col items-center pt-16 ">
      {/* Zone Tabs */}
      <div className="flex gap-4 mb-10 flex-wrap justify-center">
        {zones.map((zone, index) => (
          <button
            key={index}
            onClick={() => setActiveZone(zone)}
            className={`flex items-center gap-2 md:px-6 md:py-3 px-3 py-2 text-sm rounded-full md:text-base md:font-medium border transition-all duration-300 ${
              activeZone.name === zone.name
                ? `bg-gradient-to-r ${zone.color} text-black shadow-[0_0_20px_rgba(63,253,254,0.6)]`
                : "border-[#222] hover:border-[#3FFDFE]"
            }`}
          >
            {zone.icon}
            {zone.name}
          </button>
        ))}
      </div>

      {/* Game Cards */}
      <div className="relative flex items-center w-full max-w-6xl">
          

        <div className="grid grid-cols-2 sm:grid-cols-2 text-start h-100 lg:grid-cols-4 gap-6 md:w-7xl">
          {activeZone.games.map((game, i) => (
  <div
    key={i}
    className="rounded-xl  p-5 border border-[#1e1e1e] hover:border-[#3FFDFE] transition-all duration-300 relative overflow-hidden"
  >
    {/* Background Image */}
    <img
      src={game.image}
      alt={game.name}
      className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 group-hover:opacity-30 transition-opacity duration-500"
    />

    {/* background circle pattern */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#10242f] to-transparent rounded-full opacity-40"></div>

    {/* Dark overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>

    {/* Content */}
    <div className="relative z-10">
      {/* Icon */}
      <div className="relative w-10 h-10 rounded-lg bg-[radial-gradient(circle_at_top_left,_#0a0f1f,_#111827,_#1f103f)] flex justify-center items-center text-[#3FFDFE] mb-4">
        <Gamepad2 size={20} />
      </div>

      {/* Game Name */}
      <p className="font-semibold text-lg text-white mt-15">{game.name}</p>
      <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        Available Now
      </p>
    </div>
  </div>
))}

        </div>

       
      </div>
    </div>
  );
};

export default GameZone;
