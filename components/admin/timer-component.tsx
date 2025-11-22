import { useEffect, useRef, useState } from "react";

type TimerProps = {
  sessionId: number;
  isActive: boolean;
  startTime: string;
  pausedAt?: string | null;
  totalPausedDuration?: number;
  players: number;
  deviceId: number;
  devicePricingList: DevicePricing[];
  onBillUpdate?: (sessionId: number, bill: number) => void;
};

export default function Timer({
  sessionId,
  isActive,
  startTime,
  pausedAt,
  totalPausedDuration = 0,
  players,
  deviceId,
  devicePricingList,
  onBillUpdate,
}: TimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const lastBillRef = useRef(0);

  const calculateElapsed = () => {
    const startMs = new Date(startTime).getTime();
    const nowMs = pausedAt ? new Date(pausedAt).getTime() : Date.now();
    const activeMs = nowMs - startMs - totalPausedDuration;
    return Math.max(0, Math.floor(activeMs / 1000));
  };

  useEffect(() => {
    setElapsedTime(calculateElapsed());
  }, [startTime, pausedAt, totalPausedDuration]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

 
  useEffect(() => {
    if (!onBillUpdate) return;

    const pricing = devicePricingList.find(
      (d) => d.deviceId === deviceId && d.players === players
    );
    if (!pricing) return;

    const bill = Math.ceil(elapsedTime / 1800) * pricing.pricePer30; 
    if (bill !== lastBillRef.current) {
      lastBillRef.current = bill;
      onBillUpdate(sessionId, bill);
    }
  }, [elapsedTime, deviceId, players, devicePricingList, onBillUpdate, sessionId]);

  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  return (
    <div>
      {hours.toString().padStart(2,"0")}:
      {minutes.toString().padStart(2,"0")}:
      {seconds.toString().padStart(2,"0")}
    </div>
  );
}
