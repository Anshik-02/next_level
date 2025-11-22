"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "About Us", id: "about" },
    { label: "Games", id: "games" },
    { label: "Pricing", id: "pricing" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className="text-white flex justify-between items-center h-20 px-6 sm:px-10 lg:px-40 sticky top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-zinc-800">
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] text-transparent bg-clip-text">
        NEXT LEVEL
      </h2>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-lg">
        {menuItems.map((item, i) => (
          <p
            key={i}
            onClick={() => {
              document.getElementById(item.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="cursor-pointer transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-[#3FFDFE] hover:via-[#C58BFF] hover:to-[#FD5DA8] hover:bg-clip-text"
          >
            {item.label}
          </p>
        ))}
      </div>

      {/* Desktop Button */}
      <div className="hidden md:block">
        <Button
          className="rounded-full font-semibold text-white px-6 py-2 bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8]
          transition-all duration-500 ease-in-out hover:from-[#FD5DA8] hover:via-[#C58BFF] hover:to-[#3FFDFE]
          shadow-[0_0_20px_rgba(197,139,255,0.5)] hover:shadow-[0_0_40px_rgba(253,93,168,0.8)]"
        >
          Get Started
        </Button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-black/90 flex flex-col items-center py-6 space-y-4 md:hidden backdrop-blur-lg border-b border-zinc-800 z-40">
          {menuItems.map((item, i) => (
            <p
              key={i}
              onClick={() => {
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                });
                setIsOpen(false);
              }}
              className="cursor-pointer text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-[#3FFDFE] hover:via-[#C58BFF] hover:to-[#FD5DA8] hover:bg-clip-text"
            >
              {item.label}
            </p>
          ))}

          {/* Mobile CTA */}
          <Button
            className="rounded-full font-semibold text-white px-6 py-2 bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8]
            transition-all duration-500 ease-in-out hover:from-[#FD5DA8] hover:via-[#C58BFF] hover:to-[#3FFDFE]
            shadow-[0_0_20px_rgba(197,139,255,0.5)] hover:shadow-[0_0_40px_rgba(253,93,168,0.8)]"
          >
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
