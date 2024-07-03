import { login } from "../lib/data";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  try {
    const { email, password } = await request.json();
    const data = await login(email);
    const passwordMatch = await bcrypt.compare(password, data[0].password);
    if (data.length !== 0) {
      if (passwordMatch) {
        return Response.json(data);
      }
      return Response.json({ message: "Incorrect Password" });
    }
    return Response.json({ message: "Account does not exist" });
  } catch (error) {
    console.error("failed to create users ", error);
  }
};
