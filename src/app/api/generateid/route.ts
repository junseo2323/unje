import { connectToDatabase } from "../../../util/mongodb";  

export async function GET(request: Request) {  
  const { db } = await connectToDatabase();
  const collection = db.collection('rooms'); // 컬렉션 선택

  // 데이터 가져오기
  const data = await collection.find({}, { projection: { _id: 1 } }).toArray(); // id 필드만 선택해서 가져옴
  const res = data.map(item => item._id.toString()); // id 필드만 추출하여 문자열로 변환 후 리스트로 변환
  return Response.json(res)
}
