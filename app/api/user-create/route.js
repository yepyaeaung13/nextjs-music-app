import { createUser } from "../lib/data";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  try {
    const { id, name, email, password } = await request.json();
    const hashPassword = await bcrypt.hash(password, 10);
    const data = await createUser(id, name, email, hashPassword);
    if (data == null) {
      return Response.json({ message: "email already exist" });
    } else {
      return Response.json(data);
    }
  } catch (error) {
    console.error(error);
  }
};
