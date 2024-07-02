import { createUser } from "../lib/data";

export const POST = async (request) => {
  try {
    const { id, name, email, password } = await request.json();
    const data = await createUser(id, name, email, password);
    if (data == null) {
      return Response.json({ message: "email already exist" });
    } else {
      return Response.json(data);
    }
  } catch (error) {
    console.error(error);
  }
};
