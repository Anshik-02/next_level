"use client";

import Navbar from "@/components/admin/sidebar";
import { AddDevice } from "@/components/device/addDevice";
import { useDeviceStore } from "@/hooks/use-data-store";
import axios from "axios";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  const devices = useDeviceStore((state) => state.devices);
  const setDevices = useDeviceStore((state) => state.setDevices);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("/api/device/info");
        setDevices(response.data);
      } catch (err) {
        console.error("Failed to fetch devices:", err);
      }
    };
    fetchDevices();
  }, [setDevices]);

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">

      <div className="hidden md:block">
        <Navbar />
      </div>


      <div className="flex-1 p-8">

        <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-xl px-8 py-6 mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Manage Your Devices
          </h1>
          <p className="text-gray-600 mt-1">
            Track, monitor, and update all devices from one dashboard.
          </p>
        </div>


        <div className="flex justify-end mb-10">
          <AddDevice />
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {devices.length > 0 ? (
            devices.map((device: any) => (
              <div
                key={device.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {device.deviceName}
                  </h3>

                  <Badge
                    variant="outline"
                    className={`${
                      device.isAvailable
                        ? "text-green-600 border-green-400"
                        : "text-red-600 border-red-400"
                    }`}
                  >
                    {device.isAvailable ? "Available" : "Occupied"}
                  </Badge>
                </div>

       
                <p className="text-gray-600 text-sm mb-1">
                  Type: {device.deviceType}
                </p>

                <p className="text-gray-600 text-sm">
                  Players:{" "}
                  {device.pricing?.map((p: any) => p.players).join(", ") || "-"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">
              No devices added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
