import { connectToDatabase } from "../../../util/mongodb";

export async function GET(request) {
  const requestBody = await request.json();
  console.log(requestBody)
  const id  = "3DRXU1";

  const { db } = await connectToDatabase();

  const res = await db.collection("rooms").findOne({ _id: id });
  console.log(res)
  return Response.json(res)
}
