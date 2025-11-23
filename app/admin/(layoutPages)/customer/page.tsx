"use client";

import { AddPlayer } from "@/components/admin/add-player-dialogue";
import { PlayerTable } from "@/components/admin/tableComponent";
import { useDeviceStore } from "@/hooks/use-data-store";
import { useEffect } from "react";

const Page = () => {
  const devices = useDeviceStore((state) => state.devices);
  const fetchDevices = useDeviceStore((state) => state.fetchDevices);

  useEffect(() => {
    fetchDevices(); 
  }, [fetchDevices]);

  const availableDevices = devices.filter((d) => d.isAvailable);
  const occupiedCount = devices.filter((d) => !d.isAvailable).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <div className="w-full h-20 border-b border-slate-200 shadow-sm 
        flex items-center md:justify-start justify-center px-8 bg-white/80 backdrop-blur-md">
        <h1 className="text-xl md:text-3xl font-bold">Player Management</h1>
      </div>

      <div className="mx-auto max-w-7xl w-full px-6 mt-8 space-y-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm 
          flex items-center gap-3 flex-wrap">
          
          <div className="flex flex-wrap items-center gap-2">
            {availableDevices.length > 0 ? (
              availableDevices.map((d) => (
                <span
                  key={d.id}
                  className="bg-green-600 text-white px-3 py-1.5 rounded-full 
                    text-xs md:text-sm font-medium shadow-sm"
                >
                  {d.deviceName}
                </span>
              ))
            ) : (
              <span className="text-slate-500">No available devices</span>
            )}
          </div>

          <span className="ml-auto text-slate-700 font-semibold text-sm 
            bg-slate-100 px-3 py-1.5 rounded-lg">
            Occupied Devices: {occupiedCount}
          </span>

          <AddPlayer />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-6">
          <PlayerTable />
        </div>
      </div>
    </div>
  );
};

export default Page;
