import { connectToDatabase } from "../../../util/mongodb";

export async function PUT(request: Request) {
    const { id, name,newname, time } = await request.json();
    const { db } = await connectToDatabase();

    const res = await db.collection('rooms').findOneAndUpdate(
        { id: id, 'members.name': name },
        { $set: { 'members.$.time': time, 'members.$.name': newname  } },
        {} 
    );

    if (!res) {
        return new Response(JSON.stringify({ error: 'Room not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(res.value), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
