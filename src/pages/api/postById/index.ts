import { ObjectId } from "mongodb";
import clientPromise from "../../../server/lib/mongodb";

export default async function handler(req: any, res: any) {
  const client = await clientPromise;
  const db = client.db("test");
  const { id } = req.query;
  const currPost = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(id) });
  res.json(currPost);
}
