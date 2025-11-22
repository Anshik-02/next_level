"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", link: "/admin/dashboard" },
    { name: "Customers", link: "/admin/customer" },
    { name: "Snacks", link: "/admin/snacks" },
    { name: "Devices", link: "/admin/devices" },
    { name: "Bills", link: "/admin/bills" },
  ];

  return (
    <>
      {/* Hamburger for small screens */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-[#1e293b] rounded-md text-[#38bdf8] shadow-md"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#1e293b] border-r border-[#334155] text-[#f8fafc] shadow-lg flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          z-40
        `}
      >
        <Link href="/admin/dashboard">
          <h3 className="text-3xl font-semibold my-9 text-center text-[#38bdf8] tracking-wide hover:scale-105 transition-transform">
            Next Level
          </h3>
        </Link>

        <Separator className="border-[#334155] mb-4" />

        <div className="flex flex-col gap-1 text-lg px-2">
          {links.map((item, i) => {
            const isActive = pathname === item.link;
            return (
              <Link key={i} href={item.link}>
                <p
                  className={`cursor-pointer py-3 px-6 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-[#38bdf8] text-[#0f172a] font-semibold shadow-lg shadow-[#38bdf8]/50"
                      : "text-[#cbd5e1] hover:text-[#f8fafc] hover:bg-[#38bdf82d]"
                  }`}
                >
                  {item.name}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto mb-6 text-center text-sm text-[#64748b]">
          © 2025 Next Level
        </div>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Navbar;
