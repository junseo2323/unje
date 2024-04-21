import { connectToDatabase } from "../../../util/mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const { db } = await connectToDatabase();
  const res = await db.collection("rooms").findOne({ id: id });
  console.log(res)
  return Response.json(res)
}
