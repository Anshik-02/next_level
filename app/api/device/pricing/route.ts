import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { deviceId, pricing } = await req.json();
console.log(deviceId, pricing);
    for (const priceConfig of pricing) {
      await db.devicePricing.create({
        data: {
          deviceId,
          players:Number( priceConfig.players),
          pricePer30: Number(priceConfig.pricePer30),
          pricePerHour: Number(priceConfig.pricePerHour),
        },
      });
    }

    return new Response("Pricing added successfully", { status: 201 });
  } catch (err) {
    return new Response("Failed to add pricing", { status: 500 });
  }
}

export async function GET() {
  try {
  const devicePricing = await db.devicePricing.findMany();
  return new Response(JSON.stringify(devicePricing), { status: 200 });
} catch (err) {
  return new Response("Failed to fetch pricing", { status: 500 });
}
}

