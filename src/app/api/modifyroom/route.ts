import { connectToDatabase } from "../../../util/mongodb";

export async function PUT(request: Request) {
    const { id, newData } = await request.json();
    const { db } = await connectToDatabase();

    const updateData = {
        room_title: newData.room_title,
        room_description: newData.room_description,
        start_date: newData.start_date,
        end_date: newData.end_date,
        start_time: newData.start_time,
        end_time: newData.end_time
    };

    const res = await db.collection('rooms').findOneAndUpdate(
        { "id": id },
        { $set: updateData},
        {} 
    );

    if (!res) {
        return new Response(JSON.stringify({ error: 'Room not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(res.value), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
