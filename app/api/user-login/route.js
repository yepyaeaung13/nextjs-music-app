import { login } from "../lib/data";

export const POST = async (request) => {
  try {
    const { email, password } = await request.json();
    const data = await login(email, password);
    if (data.length !== 0) {
      if (data[0].password === password) {
        return Response.json(data);
      }
      return Response.json({ message: "Incorrect Password" });
    }
    return Response.json({ message: "Account does not exist" });
  } catch (error) {
    console.error("failed to create users ", error);
  }
};
