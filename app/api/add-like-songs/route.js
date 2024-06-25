const { addLikeSongs } = require("../lib/data");

export const POST = async (request) => {
  try {
    const { song, userId } = await request.json();
    const data = await addLikeSongs(
      song.id,
      song.title,
      song.artist,
      song.src,
      userId
    );
    return Response.json(data);
  } catch (error) {
    console.error("failed to fetch ", error);
  }
};
