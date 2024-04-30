import { connectToDatabase } from "../../../util/mongodb";  


export async function DELETE(request) {  
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    const name = searchParams.get('name');


    const { db } = await connectToDatabase();
    
    // MongoDB에서 해당 ID를 가진 데이터를 삭제합니다.
    const res = await db.collection('rooms').updateOne(
        { id: id, 'members.name': name },

        { $pull: { 'members': { name: name } }},
        {} 
    );
    if (!res) {
        return new Response(JSON.stringify({ error: 'Room not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(res), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
