import { ObjectId } from "mongodb";
import clientPromise from "../../../server/lib/mongodb";

export default async function handler(req: any, res: any) {
  const client = await clientPromise;
  const db = client.db("test");
  const { id } = req.query;
  const currPost = await db.collection("posts").find({}).toArray();
  const resData = currPost.filter((post: any) => post._id == id);
  res.json(resData[0]);
}
