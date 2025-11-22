import { db } from "@/lib/db";


export async function GET() {
  // Total earnings this month
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

  const sessionsThisMonth = await db.playerSession.findMany({
    where: {
      createdAt: {
        gte: firstDay,
        lte: now,
      },
    },
    select: {
      totalBill: true,
      device: true,
    },
  });

  const totalEarnings = sessionsThisMonth.reduce((sum, s) => sum + (s.totalBill || 0), 0);

  // Previous month earnings for comparison
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastDayPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const sessionsLastMonth = await db.playerSession.findMany({
    where: {
      createdAt: {
        gte: prevMonth,
        lte: lastDayPrevMonth,
      },
    },
    select: { totalBill: true },
  });

  const prevEarnings = sessionsLastMonth.reduce((sum, s) => sum + (s.totalBill || 0), 0);
  const earningsChange = prevEarnings
    ? Math.round(((totalEarnings - prevEarnings) / prevEarnings) * 100)
    : 0;

  // Active sessions
  const activeSessions = await db.playerSession.count({
    where: { isActive: true },
  });

  // Top devices (by number of sessions)
  const devices = await db.device.findMany({
    include: { currsession: true },
  });

  const topDevices = devices
    .map((d) => ({ name: d.deviceName, sessions: d.currsession.length }))
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 4);

  return new Response(
    JSON.stringify({ totalEarnings, earningsChange, activeSessions, topDevices }),
    { status: 200 }
  );
}
