import { getLikeSongsById } from "../lib/data";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  try {
    const userId = searchParams.get("id");
    const data = await getLikeSongsById(userId);
    return Response.json(data);
  } catch (error) {
    console.error(error);
  }
};
