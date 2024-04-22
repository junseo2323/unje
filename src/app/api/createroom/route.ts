import mongoose from "mongoose";
import { connectToDatabase } from "../../../util/mongodb";

export async function POST(request: Request) {
    const { id, newData } = await request.json();
    const { db } = await connectToDatabase();

    const roomsCollection = db.collection('rooms');

    const newRoom = {
        _id: id,
        id: id,
        isfinish: false,
        result: {},
        room_title: newData.room_title,
        room_description: newData.room_description,
        start_date: newData.start_date,
        end_date: newData.end_date,
        start_time: newData.start_time,
        end_time: newData.end_time,
        membercount: 0,
        members: []
    };
    
    const res = await roomsCollection.insertOne(newRoom);
    if (!res) {
        return new Response(JSON.stringify({ error: 'Room not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(res), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
