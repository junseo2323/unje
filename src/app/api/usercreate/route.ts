import { connectToDatabase } from "../../../util/mongodb";

export async function POST(request: Request) {
    const { id, member } = await request.json();
    const { db } = await connectToDatabase();

    const res = await db.collection('rooms').findOneAndUpdate(
        { "id": id },
        { $push: { "members": member },            
            $inc: { "membercount": 1 } 
        },
        {} 
    );

    if (!res) {
        return new Response(JSON.stringify({ error: 'Room not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(res.value), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
