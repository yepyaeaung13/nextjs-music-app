import { deletePlayListSongById } from "../lib/data";

export const POST = async (request) => {
  try {
    const { id } = await request.json();
    const data = await deletePlayListSongById(id);
    return Response.json({ delete: true });
  } catch (error) {}
};
