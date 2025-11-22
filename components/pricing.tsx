import PriceList from "./priceList";
import { Button } from "./ui/button";

const combo = [
  {
    name: "Pool Power Pack",
    time: 2,
    description: "2Hr of Pool+2 cold drinks (₹20)",
    Price: 300,
  },
  {
    name: "Pool Power Pack",
    time: 2,
    description: "2Hr of Pool+2 cold drinks(₹20)",
    Price: 300,
  },
  {
    name: "Pool Power Pack",
    time: 2,
    description: "2Hr of Pool+2 cold drinks(₹20)",
    Price: 300,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center text-center px-6 pb-20 ">
      <h2 className="font-bold text-4xl md:text-6xl mt-20 bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(197,139,255,0.3)]">
        Pricing & Plans
      </h2>
      <p className="text-zinc-300 md:text-lg mt-4 leading-relaxed max-w-3xl relative z-10">
        Minimum charges of 30 minutes of gameplay
      </p>
      <PriceList />

      <h4 className="font-bold text-4xl hidden md:block  bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(197,139,255,0.3)]">
        {" "}
        Combo Packages
      </h4>
      <div className="hidden md:flex justify-between md:flex-row flex-col gap-10 mt-10">
        {combo.map((card, key) => (
          <div className="flex  justify-between text-start border bg-[#0c0c0c] p-8 gap-10 rounded-2xl border-[#1e1e1e] shadow-2xl hover:border-[#3FFDFE] transition-all duration-300 shadow-[0_0_20px_rgba(63,253,254,0.1)] hover:shadow-[0_0_30px_rgba(63,253,254,0.3)]">
            <span className="flex flex-col ">
              <h5 className="text-2xl font-semibold text-white">{card.name}</h5>
              <p className="text-md text-zinc-400">{card.description}</p>
              <h4 className="text-3xl font-bold mt-5 bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(197,139,255,0.3)]">
                ₹{card.Price}
              </h4>
            </span>
            <div className="border border-zinc-500 px-4 py-2 rounded-full bg-[#0E2C34] text-[#4AFBFF] text-md font-semibold h-fit">
              {card.time}hrs
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0A1118] border border-[#13323D] rounded-2xl mt-16  text-white flex flex-col items-center text-center md:w-7xl py-10 px-10 relative overflow-hidden group transition-all duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,253,254,0.05),_transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(253,93,168,0.05),_transparent_60%)]"></div>

        <h3 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(197,139,255,0.4)]">
          Group Bookings
        </h3>

        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          Planning a gaming night with friends? Get special{" "}
          <span className="text-[#3FFDFE] font-medium">group rates</span> and{" "}
          <span className="text-[#FD5DA8] font-medium">custom packages</span>{" "}
          for your squad.
        </p>

        <Button
          className="rounded-full font-semibold text-white px-8 py-3 mt-10 bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8]
    transition-all duration-500 ease-in-out hover:from-[#FD5DA8] hover:via-[#C58BFF] hover:to-[#3FFDFE]
    shadow-[0_0_20px_rgba(197,139,255,0.5)] hover:shadow-[0_0_40px_rgba(253,93,168,0.8)]"
        >
          Contact for Group Bookings
        </Button>
      </div>
    </div>
  );
};

export default Pricing;
