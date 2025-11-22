import { db } from "@/lib/db";


export async function GET() {
  // get sessions from last 7 days
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 6); 

  const sessions = await db.playerSession.findMany({
    where: {
      startTime: {
        gte: weekAgo,
        lte: now,
      },
    },
    select: {
      startTime: true,
      endTime: true,
      players: true,
    },
  });

  return new Response(JSON.stringify(sessions), { status: 200 });
}
