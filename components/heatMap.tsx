"use client";
import React, { useEffect, useState } from "react";

export default function PlayerActivityHeatmap() {
  const xLabels = Array.from({ length: 24 }, (_, i) => i.toString());
  const yLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [data, setData] = useState<number[][]>(
    Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => 0))
  );

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/admin/player-activity");
      const sessions = await res.json();
      const heatmap = transformSessionsToHeatmap(sessions);
      setData(heatmap);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-transparent p-4 rounded-2xl w-full overflow-auto shadow-lg">
      <h2 className="text-white font-semibold mb-4 text-lg">
        Player Activity Heatmap
      </h2>

      <div className="w-full overflow-auto">
        <div className="mt-2">
          {/* X-axis labels */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-16 text-sm text-gray-400"></div>
            <div className="flex flex-wrap gap-1">
              {xLabels.map((xl) => (
                <div
                  key={xl}
                  className="w-7 h-7 flex items-center justify-center text-xs text-gray-400"
                >
                  {xl}
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap rows */}
          <div className="space-y-2">
            {yLabels.map((yLabel, yi) => (
              <div key={yLabel} className="flex items-center gap-2">
                <div className="w-16 text-sm text-gray-400">{yLabel}</div>
                <div className="flex gap-1 flex-wrap">
                  {data[yi].map((value, xi) => {
                    let bg = "";
                    if (value > 0) {
                      const alpha = Math.min(1, value / 10);
                      bg = `rgba(0, 255, 255, ${alpha})`; // neon cyan for active
                    } else {
                      // alternating light background for zero blocks
                      const isLightBlock = (xi + yi) % 2 === 0;
                      bg = isLightBlock
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(255, 255, 255, 0.0)";
                    }

                    return (
                      <div
                        key={`${yi}-${xi}`}
                        title={`${yLabel} ${xLabels[xi]}: ${value}`}
                        className="w-7 h-7 rounded-sm flex items-center justify-center text-xs text-white shadow-md"
                        style={{ background: bg }}
                      >
                        {value !== 0 ? value : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Transform sessions to 7x24 heatmap
function transformSessionsToHeatmap(sessions: any[]) {
  const heatmap: number[][] = Array.from({ length: 7 }, () =>
    Array.from({ length: 24 }, () => 0)
  );

  sessions.forEach((s) => {
    const start = new Date(s.startTime);
    const end = s.endTime ? new Date(s.endTime) : new Date();

    let current = new Date(start);
    while (current <= end) {
      const day = current.getDay(); // 0 = Sun, 1 = Mon...
      const hour = current.getHours();
      const dayIndex = day === 0 ? 6 : day - 1; // Sunday as last

      heatmap[dayIndex][hour] += s.players;
      current.setHours(current.getHours() + 1);
    }
  });

  return heatmap;
}
