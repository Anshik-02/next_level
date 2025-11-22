import { Star } from "lucide-react";
import ReviewCard from "./reviewCard";

const Reviews = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center text-center px-6 pb-20">
      <h2 className="font-bold text-4xl md:text-6xl mt-20 bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(197,139,255,0.3)]">
        What Gamers Say
      </h2>

      <p className="text-zinc-300 md:text-lg mt-4 leading-relaxed max-w-3xl">
        Don't just take our word for it. Here's what our community has to say
        about their experience.
      </p>
      <div className="flex gap-10 mt-5">
        <div className="flex items-center flex-col">
          <span className="flex">
            <Star fill="yellow" className="md:w-8 md:h-8" />
            <Star fill="yellow" className="md:w-8 md:h-8" />
            <Star fill="yellow" className="md:w-8 md:h-8" />
            <Star fill="yellow" className="md:w-8 md:h-8" />
            <Star fill="yellow" className="md:w-8 md:h-8" />
          </span>
          <p className="text-white font-bold md:text-3xl">4.8</p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-[#FFFF00] font-bold md:text-3xl">100+</h3>
          <p className="font-bold md:text-xl text-white"> Happy Gamers</p>
        </div>
      </div>

      <ReviewCard />
    </div>
  );
};

export default Reviews;
