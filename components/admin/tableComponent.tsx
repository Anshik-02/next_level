"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { usePlayerData } from "@/hooks/use-data-store";
import Timer, { DevicePricing } from "./timer-component";
import Action from "./action";
import SnackDropDown from "./snackDropDown";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

export function PlayerTable() {
  const players = usePlayerData((state) => state.players);
  const setPlayers = usePlayerData((state) => state.setPlayers);

  const [devicePricingList, setDevicePricingList] = useState<DevicePricing[]>(
    []
  );
  const [bills, setBills] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("/api/player/info");
        setPlayers(response.data);
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    };
    fetchPlayers();

    const fetchPricing = async () => {
      try {
        const response = await axios.get("/api/device/pricing");
        setDevicePricingList(response.data);
      } catch (err) {
        console.error("Error fetching device pricing:", err);
      }
    };
    fetchPricing();
  }, [setPlayers]);

  const handleBillUpdate = (sessionId: number, bill: number) => {
    setBills((prev) => ({ ...prev, [sessionId]: bill }));
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <Table className="min-w-full rounded-xl border border-slate-200 overflow-hidden">
        {/* HEADER */}
        <TableHeader>
          <TableRow className="bg-slate-900 h-16 hover:bg-slate-900 border-none">
            {[
              "Player Name",
              "Device",
              "Players",
              "Start Time",
              "Snacks",
              "Total Time",
              "Bill",
              "Status",
              "Actions",
            ].map((head) => (
              <TableHead
                key={head}
                className="text-white text-sm font-semibold tracking-wide"
              >
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {players.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center py-6 text-slate-500 text-lg"
              >
                No players yet
              </TableCell>
            </TableRow>
          ) : (
            players.map((player) => {
              const startTime = new Date(player.startTime).getTime();
              const pausedMsTotal = player.totalPausedDuration ?? 0;

              let elapsedTime: number;
              if (player.isPaused && player.pausedAt) {
                const pausedAtMs = new Date(player.pausedAt).getTime();
                elapsedTime = Math.max(
                  0,
                  Math.floor((pausedAtMs - startTime - pausedMsTotal) / 1000)
                );
              } else if (!player.isPaused && player.isActive) {
                elapsedTime = Math.max(
                  0,
                  Math.floor((Date.now() - startTime - pausedMsTotal) / 1000)
                );
              } else {
                elapsedTime = player.totalTimePlayer ?? 0;
              }

              const bill = bills[player.id] ?? 0;

              return (
                <TableRow
                  key={player.id}
                  className="bg-white border-b hover:bg-slate-50 transition-all"
                >
                  <TableCell className="font-medium">
                    {player.playerName}
                  </TableCell>
                  <TableCell>{player.device}</TableCell>
                  <TableCell>{player.players}</TableCell>
                  <TableCell>
                    {new Date(player.startTime).toLocaleTimeString()}
                  </TableCell>

                  {/* SNACK LIST */}
                  <TableCell className="align-top min-w-[180px]">
                    {/* SNACK LIST */}
                    {player.snacks?.length > 0 ? (
                      <div style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }} className="max-h-20 overflow-y-auto space-y-1 pr-1 custom-scroll">
                        {player.snacks.map((s) => (
                          <div
                            key={s.id}
                            className="flex items-center justify-between bg-slate-100 px-3 py-1.5 
                     rounded-lg border border-slate-300 text-xs shadow-sm"
                          >
                            <span className="font-medium">
                              {s.snackItem.name}
                            </span>
                            <span className="text-slate-500 ml-2">
                              × {s.quantity}
                            </span>
                            <span className="text-green-600 font-semibold ml-auto">
                              ₹{s.totalPrice}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm">
                        No snacks ordered
                      </p>
                    )}

                    <div className="mt-2">
                      <SnackDropDown playerId={String(player.id)} />
                    </div>
                  </TableCell>

                  {/* TIMER */}
                  <TableCell>
                    <Timer
                      sessionId={Number(player.id)}
                      isActive={!!(player.isActive && !player.isPaused)}
                      startTime={player.startTime}
                      pausedAt={player.pausedAt}
                      totalPausedDuration={player.totalPausedDuration ?? 0}
                      players={player.players}
                      deviceId={player.deviceId}
                      devicePricingList={devicePricingList}
                      onBillUpdate={handleBillUpdate}
                    />
                  </TableCell>

                  {/* BILL */}
                  <TableCell className="text-green-600 font-bold">
                    ₹{bill + (player.snackBill || 0)}
                  </TableCell>

                  {/* STATUS */}
                  <TableCell>
                    {player.isActive ? (
                      <span className="text-green-600 font-medium">Active</span>
                    ) : (
                      <span className="text-red-500 font-medium">Paused</span>
                    )}
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell>
                    <Action
                      playerId={Number(player.id)}
                      isActive={!!player.isActive}
                      isPaused={!!player.isPaused}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>

        {/* FOOTER */}
        <TableFooter className="bg-slate-100">
          <TableRow>
            <TableCell colSpan={5} className="font-medium">
              Total Active Players
            </TableCell>
            <TableCell
              colSpan={4}
              className="text-right text-blue-600 font-semibold"
            >
              {players.filter((p) => p.isActive).length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
