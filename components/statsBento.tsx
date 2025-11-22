"use client";
import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Computer, Tablet, Tv, GamepadIcon } from "lucide-react";

type Device = { name: string; sessions?: number };

export default function TopLeftBentoCard() {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [earningsChange, setEarningsChange] = useState(0);
  const [activeSessions, setActiveSessions] = useState(0);
  const [topDevices, setTopDevices] = useState<Device[]>([]);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/admin/dashboard-stats");
      const data = await res.json();
      setTotalEarnings(data.totalEarnings);
      setEarningsChange(data.earningsChange);
      setActiveSessions(data.activeSessions);


      const iconsMap: { [key: string]: JSX.Element } = {
        PC: <Computer className="w-6 h-6 text-blue-400" />,
        Console: <GamepadIcon className="w-6 h-6 text-green-400" />,
        TV: <Tv className="w-6 h-6 text-purple-400" />,
        Tablet: <Tablet className="w-6 h-6 text-yellow-400" />,
      };

      const devicesWithIcons = data.topDevices.map((d: Device) => ({
        ...d,
        icon: iconsMap[d.name] || <Computer className="w-6 h-6 text-gray-400" />,
      }));

      setTopDevices(devicesWithIcons);
    }

    fetchStats();
  }, []);

  return (
    <div className="shadow-lg rounded-2xl p-6 w-full flex flex-col gap-8 h-full text-white">
      {/* Total Earnings */}
      <div>
        <h2 className="text-gray-400 font-medium text-md">Total Earnings This Month</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-5xl font-bold">₹{totalEarnings.toLocaleString()}</span>
          {earningsChange >= 0 ? (
            <ArrowUp className="w-5 h-5 text-green-400" />
          ) : (
            <ArrowDown className="w-5 h-5 text-red-400" />
          )}
          <span className={`text-sm ${earningsChange >= 0 ? "text-green-400" : "text-red-400"}`}>
            {earningsChange}%
          </span>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-gray-800 p-4 rounded-xl w-full text-center self-start">
        <h3 className="text-gray-400 text-sm">Active Sessions</h3>
        <span className="text-xl font-semibold">{activeSessions}</span>
      </div>

      {/* Top Devices */}
      <div>
        <h3 className="text-gray-400 font-medium text-sm mb-2">Top Devices</h3>
        <div className="flex gap-6">
          {topDevices.map((device: any) => (
            <div key={device.name} className="flex flex-col items-center gap-1">
              <div className="bg-gray-800 p-2 rounded-full">{device.icon}</div>
              <span className="text-xs">{device.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-40 rounded-2xl bg-[url(/assets/122.png)] bg-cover bg-amber-50"> 

      </div>
    </div>
  );
}
