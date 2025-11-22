import { db } from "@/lib/db";

export async function POST(req:Request) {
try{
    const {deviceName,deviceType,status}=await req.json();

    const device=await db.device.create({
        data:{
            deviceName,
            deviceType,
            status
        }
    })
    return new Response(JSON.stringify({device}),{status:201});

}catch(err){
    return new Response("Failed to create device", {status:500});
}

}