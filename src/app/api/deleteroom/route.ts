import { connectToDatabase } from "../../../util/mongodb";  

export async function DELETE(request: Request) {  
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const { db } = await connectToDatabase();
    const collection = db.collection('rooms'); // 삭제할 데이터가 있는 컬렉션 선택
    
    // MongoDB에서 해당 ID를 가진 데이터를 삭제합니다.
    const res = await collection.deleteOne({ id: id });
    if (res.deletedCount === 0) {
        return new Response(JSON.stringify({ message: "해당 ID를 가진 데이터를 찾을 수 없습니다." }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: "데이터가 성공적으로 삭제되었습니다." }), { status: 200 });
  }
