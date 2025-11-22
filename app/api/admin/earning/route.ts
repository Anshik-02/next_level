// Correct API route (Next.js 13+)
import { db } from "@/lib/db";

export async function GET() {
  const month = 11; // example month
  const year = 2025;

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const sessions = await db.playerSession.findMany({
    where: { createdAt: { gte: startDate, lte: endDate }, endSession: true },
    select: { totalBill: true, createdAt: true },
  });

  const snackOrders = await db.snackOrder.findMany({
    where: { createdAt: { gte: startDate, lte: endDate } },
    select: { totalPrice: true, createdAt: true },
  });

  const earningsMap: Record<number, number> = {};

  sessions.forEach((s) => {
    const day = s.createdAt.getDate();
    earningsMap[day] = (earningsMap[day] || 0) + s.totalBill;
  });

  snackOrders.forEach((o) => {
    const day = o.createdAt.getDate();
    earningsMap[day] = (earningsMap[day] || 0) + o.totalPrice;
  });

  const daysInMonth = endDate.getDate();
  const chartData = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    total: earningsMap[i + 1] || 0,
  }));

  return new Response(JSON.stringify(chartData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
