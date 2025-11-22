"use client";

import axios from "axios";
import { Pause, Play, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TooltipComponent } from "../toolTip";
import { usePlayerData } from "@/hooks/use-data-store";

type ActionProps = {
  playerId: number;
  isActive: boolean;
  isPaused: boolean;
};

const Action = ({ playerId, isActive, isPaused }: ActionProps) => {
  const updatePlayer = usePlayerData((state) => state.updatePlayer);
  const setPlayers = usePlayerData((state) => state.setPlayers);

const sessionId = playerId;
const pauseTimer = async () => {
  try {
    const response = await axios.patch(`/api/player/pauseTimer?sessionId=${sessionId}`, {
      isPaused: !isPaused,
    });
    const updatedPlayer = response.data.updatedSession;
     updatePlayer(playerId, {
      isPaused: updatedPlayer.isPaused,
      isActive: !updatedPlayer.isPaused, // active when not paused
    });
  } catch (err) {
    console.error("Failed to pause/resume timer:", err);
  }
};


  const endSession = async () => {
    try {
  const response = await axios.patch(`/api/player/endSession?sessionId=${sessionId}`);
    setPlayers(prev => prev.filter(p => p.id !== playerId));
      updatePlayer(playerId, { isActive: false, isPaused: false, endSession: true });

    } catch (err) {
      console.error("Failed to end session:", err);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <span onClick={pauseTimer} className="hover:bg-zinc-200 cursor-pointer rounded-full p-3">
        {isPaused ? (
          <TooltipComponent button={<Play className="w-5 h-5 text-green-400" />} text="Resume Timer" />
        ) : (
          <TooltipComponent button={<Pause className="w-5 h-5 text-blue-400" />} text="Pause Timer" />
        )}
      </span>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <span className="hover:bg-zinc-200 rounded-full cursor-pointer p-3">
            <TooltipComponent button={<X className="w-5 h-5 text-rose-400" />} text="End Session" />
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">End this session?</AlertDialogTitle>
            <AlertDialogDescription>
              This will stop the timer and close the player’s session permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={endSession}>Yes, End Session</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Action;
