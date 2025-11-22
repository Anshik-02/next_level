import { db } from "@/lib/db";

export async function DELETE(req:Request) {
    try {
        const value = await req.json();
        const { id } = value;

        const deletedSnack = await db.snackItem.delete({
            where: {
                id: Number(id),
            },
        });

        return new Response(JSON.stringify({ success: true, deletedSnack }), { status: 200 });
    } catch (error) {
        console.error("Error deleting snack:", error);

        return new Response(JSON.stringify({ success: false, message: "Something went wrong!" }), { status: 500 });
    }
           
    


}