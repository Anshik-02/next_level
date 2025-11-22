import { Star } from "lucide-react";

const reviews = [
  {
    name: "Pooja Kharangar",
    date: "A year ago",
    text: "Good place to go for gaming. The staff here is very friendly and co-operative and I recommend everyone to must visit there.",
    rating: 5,
  },
  {
    name: "Kailash Chander",
    date: "2 month ago",
    text: "I tell really it was so amazing 🤩 I love it the owner of the next level gaming arena the owner talk very politely and the price were too low we play 1 hour 30 minutes",
    rating: 5,
  },
  {
    name: "Vansh Khokhar",
    date: "4 months ago",
    text: "I visited this gaming shop and had an amazing 8 ball pool and VR games. The environment was lively and welcoming, and the owner was very polite and helpful. I especially enjoyed playing 8 baal pool game. The VR experience was amazing. It felt like I was truly inside the game world. Overall, it was a fantastic experience, and I highly recommend this place to anyone looking for fun and engaging games.",
    rating: 4,
  },
  {
    name: "Aarav Sharma",
    date: "1 month ago",
    text: "Awesome place for gaming. I could literally spend the whole day here!",
    rating: 5,
  },
  {
    name: "Maths Concept & Tricks",
    date: "2 months ago",
    text: "Brilliant experience, i enjoyed very much, also my son enjoy a lot. Its lovely sunday. Thanks Next Level- Fun Arena",
    rating: 5,
  },
  {
      name: "Rajpal Meel",
    date: "A year ago",
    text: "Very good place were I visited for play games. And there staff was also friendly. I suggested to everyone to visit.",
    rating: 5,
  },
];

export default function ReviewsSection() {
  return (
    <div className="text-white py-20 px-6 bg-black flex flex-col items-center">
   

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
        {reviews.map((review, i) => (
          <div
            key={i}
            className={`border border-zinc-700 rounded-2xl p-6 bg-[#080C10] shadow-[0_0_15px_rgba(197,139,255,0.1)]      hover:shadow-[0_0_25px_rgba(63,253,254,0.6)] transition-all duration-300"
            }`}
          >
            <div className="border border-zinc-700 rounded-2xl p-8 shadow-[0_0_6px_white] bg-[#0B0F12] flex flex-col items-start">
          
              <div className="flex gap-5 items-center">
                <div className="rounded-full h-14 w-14 bg-[radial-gradient(circle_at_top_left,_#0a0f1f,_#111827,_#1f103f)] shadow-[0_0_15px_rgba(63,253,254,0.3)] border border-zinc-600 flex items-center justify-center text-white font-semibold text-xl">
                  {review.name.charAt(0)}
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-lg font-semibold text-start">{review.name}</p>
                  {review.date && (
                    <p className="text-zinc-400 text-sm">{review.date}</p>
                  )}
                </div>
              </div>

              <div className="flex mt-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    fill="#FFFF00"
                    className="w-4 h-4 text-[#FFFF00] drop-shadow-[0_0_5px_#FFFF00]"
                  />
                ))}
              </div>

     
              <p className="text-sm mt-3 max-w-sm text-start text-zinc-300 leading-relaxed">
                {review.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <a
        href="https://www.google.com/maps/place/Next+Level+-+Fun+Arena+%7C+Fun+zone+%7C+play+Zone+%7C+pool+table+%7C+PS5+%7C+VR/@29.9525034,76.8895165,877m/data=!3m1!1e3!4m10!1m2!2m1!1sgamezone!3m6!1s0x390e47ced07260ab:0xcdf5ad2dbd1b51f9!8m2!3d29.9525034!4d76.8922094!15sCghnYW1lem9uZVoKIghnYW1lem9uZZIBCmdhbWVfc3RvcmWaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMjFLU2xsdE1VbFZNamt4VlVSb2FGUlhlRmxTTW14RVRGUk9kbE5HUlJBQuABAPoBBAgAEEc!16s%2Fg%2F11vpzj92qs?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-16 text-white font-semibold bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] px-6 py-3 rounded-full
        transition-all duration-500 hover:from-[#FD5DA8] hover:to-[#3FFDFE] shadow-[0_0_30px_rgba(197,139,255,0.4)]"
      >
        View More Reviews on Google
      </a>
    </div>
  );
}
