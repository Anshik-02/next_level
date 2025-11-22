"use client";
import { useSnackData } from "@/hooks/use-data-store";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import SnacksEditButton from "./snacksEditButton";
import DeleteSnack from "./deleteSnack";

const Cards = () => {
  const snacks = useSnackData((state) => state.snacks);
  const setSnacks = useSnackData((state) => state.setSnacks);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/snack/info");
        setSnacks(response.data);
      } catch (error) {
        console.error("Error fetching snack info:", error);
      }
    };
    fetchData();
  }, [setSnacks]);

  if (!snacks || snacks.length === 0) {
    return (
      <div className="text-slate-500 text-center py-10">
        No snacks found 🍪
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
      {snacks.map((snack, key) => (
        <div
          key={key}
          className={`group relative overflow-hidden rounded-xl border transition-shadow duration-300 
                      ${snack.quantity > 0 
                        ? "bg-white border-slate-200 shadow-sm hover:shadow-lg" 
                        : "bg-gray-100 border-gray-300 shadow-sm opacity-70 cursor-not-allowed"}`
          }
        >
          {/* Image Section */}
          <div className="h-40 bg-slate-100 overflow-hidden relative">
            {snack.image ? (
              <Image
                src={snack.image}
                width={400}
                height={200}
                alt={snack.name || "Snack image"}
                className={`object-cover w-full h-full transition-transform duration-300 
                            ${snack.quantity > 0 ? "group-hover:scale-105" : ""}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                No image
              </div>
            )}

            {/* Out of Stock Badge */}
            {snack.quantity === 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow">
                Out of Stock
              </span>
            )}
          </div>

          {/* Details Section */}
          <div className="p-5 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900 truncate">
                {snack.name}
              </h2>
              <span
                className={`text-sm font-medium px-2 py-1 w-fit rounded-full ${
                  snack.quantity > 0
                    ? "text-slate-500 bg-slate-100"
                    : "text-red-700 bg-rose-100 border border-rose-400"
                }`}
              >
                Qty: {snack.quantity}
              </span>
            </div>

            <div className="text-lg font-semibold text-emerald-600">
              ₹{snack.price}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 items-center pt-3">
              <SnacksEditButton snack={snack} />
              <DeleteSnack snack={snack} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
