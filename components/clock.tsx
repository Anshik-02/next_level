"use client";
import React, { useEffect, useRef } from "react";

export default function AnalogClock({ size = 240, showSeconds = true }) {
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);

  useEffect(() => {
    let frame;

    const tick = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const secDeg = (seconds / 60) * 360;
      const minDeg = (minutes / 60) * 360 + seconds * 0.1;
      const hrDeg = ((hours % 12) / 12) * 360 + minutes * 0.5;

      if (hourRef.current) hourRef.current.style.transform = `rotate(${hrDeg}deg)`;
      if (minuteRef.current) minuteRef.current.style.transform = `rotate(${minDeg}deg)`;
      if (secondRef.current) secondRef.current.style.transform = `rotate(${secDeg}deg)`;

      frame = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(frame);
  }, []);

  const radius = size / 2;

  return (
    <div className="flex justify-center items-center  ">
      <div
        style={{ width: size, height: size }}
        className="relative rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_60px_rgba(0,255,255,0.3)]"
      >
        {/* Ticks */}
        {[...Array(60)].map((_, i) => {
          const isBig = i % 5 === 0;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 origin-top"
              style={{ transform: `rotate(${i * 6}deg)` }}
            >
              <div
                style={{
                  width: isBig ? 3 : 1,
                  height: isBig ? 14 : 7,
                  marginLeft: -1,
                }}
                className="bg-cyan-400/70"
              />
            </div>
          );
        })}

        {/* Hour numbers */}
        {[...Array(12)].map((_, i) => {
          const n = i + 1;
          const angle = (n / 12) * 360 - 90;
          const rad = angle * (Math.PI / 180);
          return (
            <div
              key={n}
              className="absolute text-lg font-bold text-cyan-300 drop-shadow-lg"
              style={{
                left: radius + Math.cos(rad) * (radius - 30) - 10,
                top: radius + Math.sin(rad) * (radius - 30) - 10,
                width: 20,
                height: 20,
              }}
            >
              <div className="flex items-center justify-center">{n}</div>
            </div>
          );
        })}

        {/* Center Dot */}
        <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(0,255,255,0.7)] z-50"></div>

        {/* HOUR HAND */}
        <div
          ref={hourRef}
          className="absolute left-1/2 top-1/2 z-40"
          style={{ width: 0, height: 0, transformOrigin: "bottom center" }}
        >
          <div
            style={{
              width: 6,
              height: radius * 0.45,
              marginLeft: -3,
              marginTop: -radius * 0.45,
            }}
            className="bg-cyan-400 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.7)]"
          />
        </div>

        {/* MINUTE HAND */}
        <div
          ref={minuteRef}
          className="absolute left-1/2 top-1/2 z-30"
          style={{ width: 0, height: 0, transformOrigin: "bottom center" }}
        >
          <div
            style={{
              width: 4,
              height: radius * 0.65,
              marginLeft: -2,
              marginTop: -radius * 0.65,
            }}
            className="bg-cyan-300 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          />
        </div>

        {/* SECOND HAND */}
        {showSeconds && (
          <div
            ref={secondRef}
            className="absolute left-1/2 top-1/2 z-20"
            style={{ width: 0, height: 0, transformOrigin: "bottom center" }}
          >
            <div
              style={{
                width: 2,
                height: radius * 0.78,
                marginLeft: -1,
                marginTop: -radius * 0.78,
              }}
              className="bg-pink-500 rounded-lg shadow-[0_0_25px_rgba(255,0,255,0.8)]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
