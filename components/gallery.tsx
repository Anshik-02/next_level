"use client";

import Image from "next/image";

export default function Gallery({ images = [] }) {
  return (
    <div className="flex flex-col items-center text-center px-6 pb-20 relative overflow-hidden md:mx-80 ">
          <h2 className="font-bold text-4xl md:text-6xl mt-20 bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(197,139,255,0.3)] relative z-10">
        Gallery
      </h2>
       <p className="text-zinc-300 md:text-xl mt-2 leading-relaxed max-w-3xl relative z-10 mb-10 md:mb-20">
Some Insites from our Game zone.
      </p>
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
        {images.map((img, i) => (
          <div key={i} className="break-inside-avoid overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <Image
              src={img}
              alt={`img-${i}`}
              width={800}
              height={800}
              className="w-full h-auto rounded-xl object-cover hover:opacity-90 transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
