"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Receipt, Timer, Gamepad2, Users, Coffee } from "lucide-react";

const Bills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await axios.get("/api/admin/bills");
        if (res.data.success) setBills(res.data.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    getBills();
  }, []);

  return (
    <div className="p-6 grid lg:grid-cols-2 gap-6 bg-gray-50 min-h-screen">
      {bills.length === 0 ? (
        <p className="text-gray-600 text-2xl">No bills found</p>
      ) : (
        bills.map((bill: any) => (
          <div
            key={bill.id}
            className="relative group bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <Receipt className="w-6 h-6 text-blue-500" />
                  Bill #{bill.id}
                </h1>
                <p className="text-gray-500 text-sm">
                  {new Date(bill.endTime).toLocaleString()}
                </p>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
                Completed
              </span>
            </div>

            {/* Player Name */}
            <p className="text-lg font-bold text-gray-900 mb-2">
              {bill.playerName}
            </p>

            <div className="space-y-4 text-gray-700">
              {/* Device */}
              <div className="flex items-center gap-2">
                <Gamepad2 className="text-indigo-500" size={18} />
                <span className="text-gray-800 font-medium">
                  {bill.deviceRelation.deviceName}
                </span>
              </div>

              {/* Number of players */}
              <div className="flex items-center gap-2">
                <Users className="text-yellow-500" size={18} />
                <span>{bill.players} Player(s)</span>
              </div>

              {/* Time Played */}
              <div className="flex items-center gap-2">
                <Timer className="text-red-500" size={18} />
                <span>
                  Total Time:{" "}
                  {Math.floor(bill.totalTimePlayer / 60)} min
                </span>
              </div>

              {/* Snacks */}
              <div className="mt-2">
                <h3 className="text-gray-900 font-semibold flex items-center gap-2 mb-1">
                  <Coffee size={18} className="text-pink-500" />
                  Snacks
                </h3>

                {bill.snacks.length === 0 ? (
                  <p className="text-gray-500 text-sm">No snacks ordered</p>
                ) : (
                  <ul className="space-y-1 text-sm">
                    {bill.snacks.map((s: any) => (
                      <li
                        key={s.id}
                        className="flex justify-between text-gray-700"
                      >
                        <span>{s.snackItem.name}</span>
                        <span className="font-medium">₹{s.snackItem.price}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4" />

              {/* Billing Breakdown */}
              <div className="text-gray-900 space-y-1">
                <p className="flex justify-between text-gray-700">
                  <span>Time Bill:</span>
                  <span className="font-medium">₹{bill.timeBill}</span>
                </p>
                <p className="flex justify-between text-gray-700">
                  <span>Snack Bill:</span>
                  <span className="font-medium">₹{bill.snackBill}</span>
                </p>

                <p className="flex justify-between text-xl font-bold mt-3 text-purple-700">
                  <span>Total:</span>
                  <span>₹{bill.totalBill}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Bills;
