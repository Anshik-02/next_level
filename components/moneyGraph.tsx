"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MoneyGraph() {
  const [data, setData] = useState<{ day: number; total: number }[]>([]);

  useEffect(() => {
    const getEarningsData = async () => {
      try {
        const response = await axios.get('/api/admin/earning');
        setData(response.data); 
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      }
    }
    getEarningsData();
  }, []);

  return (
    <div className="bg-black rounded-lg shadow p-4">
      <h3 className="text-gray-300 font-semibold mb-2">Earnings This Month</h3>
      <ResponsiveContainer width={368} height={329}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#4F46E5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
