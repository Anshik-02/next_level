import { Clock, Locate, Phone } from "lucide-react";

const cards = [
  {
    name: "Location",
    icon: <Locate className="w-8 h-8 text-[#3FFDFE]" />,
    description:
      "Shop No 27, 28 1st floor, Choudhary Complex Sec 30 Kurukshetra",
  },
  {
    name: "Opening Hours",
    icon: <Clock className="w-8 h-8 text-[#C58BFF]" />,
    description: "7 days a week, 9:00 AM - 8:00 PM",
  },
  {
    name: "Contact",
    icon: <Phone className="w-8 h-8 text-[#FD5DA8]" />,
    description: "nextlevelvirtualgaming@gmail.com . 9306865613",
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center text-center px-6 pb-20">
      <h2 className="font-bold text-4xl md:text-6xl mt-20 bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(197,139,255,0.3)]">
        Contact Us
      </h2>

      <p className="text-zinc-300 md:text-lg mt-4 leading-relaxed max-w-3xl">
        Ready to level up your gaming experience? Visit us or get in touch!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 w-full max-w-6xl">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative  rounded-2xl p-[2px] hover:scale-105 transition-transform duration-300"
          >
            <div className="relative z-10 border bg-[#0D0F10] border-[#0D303A] rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_0_20px_rgba(197,139,255,0.1)]">
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-white">
                {card.name}
              </h3>
              <p className="text-zinc-400 text-base">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-5xl mt-20 border border-[#0D303A] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(197,139,255,0.1)]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2437.7955976701687!2d76.88954960317054!3d29.952871859572966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e47ced07260ab%3A0xcdf5ad2dbd1b51f9!2sNext%20Level%20-%20Fun%20Arena%20%7C%20Fun%20zone%20%7C%20play%20Zone%20%7C%20pool%20table%20%7C%20PS5%20%7C%20VR!5e1!3m2!1sen!2sin!4v1761724238685!5m2!1sen!2sin"
          width="1200"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
