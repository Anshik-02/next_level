import Bills from "@/components/bills/bills";
import React from "react";

const Page = () => {
  return (
    <div className="bg-[#F8FAFC]">
      <div
        className="w-full sticky top-0 z-20 h-24 border-b border-slate-200 shadow-sm 
                      flex items-center md:justify-start justify-center px-8 bg-white/70 backdrop-blur-md"
      >
        <h1 className="text-3xl  font-bold tracking-tight">Bills</h1>
      </div>

      <Bills />
    </div>
  );
};

export default Page;
