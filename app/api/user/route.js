import { postUser } from "../lib/data";

export const POST = async (request) => {
  try {
    const { uid, name, email } = await request.json();
    const data = await postUser(uid, name, email);
    return Response.json(data);
  } catch (error) {
    console.error("failed to create users ", error);
  }
};
