import { db } from "@vercel/postgres";

export const fetchTopTenSongs = async () => {
  try {
    const client = await db.connect();
    const data = await client.sql`SELECT * FROM topTenSongs`;
    return data.rows;
  } catch (error) {
    console.error("error occur", error);
  }
};

export const fetchTopTrendingSongs = async () => {
  try {
    const client = await db.connect();
    const data = await client.sql`SELECT * FROM topTrendingSongs`;
    return data.rows;
  } catch (error) {
    console.error("failed to fetch top trending songs", error);
  }
};

export const fetchSongs = async () => {
  try {
    const client = await db.connect();
    const data = await client.sql`SELECT * FROM songs`;
    return data.rows;
  } catch (error) {
    console.error("failed to fetch songs", error);
  }
};

export const login = async (email) => {
  try {
    const client = await db.connect();
    const data = await client.sql`SELECT * FROM users WHERE email=${email}`;
    return data.rows;
  } catch (err) {
    console.error(err);
  }
};

export const createUser = async (id, name, email, password) => {
  try {
    const client = await db.connect();
    const checkUser =
      await client.sql`SELECT * FROM users WHERE email = ${email}`;
    if (checkUser.rowCount == 0) {
      const data =
        await client.sql`INSERT INTO users (id, name, email, password) VALUES (${id}, ${name}, ${email}, ${password}) RETURNING *`;
      return data.rows;
    } else {
      return null;
    }
  } catch (error) {
    console.error("failed to post user ", error);
  }
};

export const addLikeSongs = async (id, title, artist, src, userId) => {
  try {
    const client = await db.connect();
    const checkSongs =
      await client.sql`SELECT * FROM likeSongs WHERE id=${id} AND user_id=${userId}`;
    if (checkSongs.rowCount !== 0) {
      return checkSongs.rows;
    } else {
      const data =
        await client.sql`INSERT INTO likeSongs (id, title, artist, src, user_id) VALUES (${id}, ${title}, ${artist}, ${src}, ${userId})`;
      return data.rows;
    }
  } catch (error) {
    console.error("error occur query ", error);
  }
};

export const addPlayListSongs = async (id, title, artist, src, userId) => {
  try {
    const client = await db.connect();
    const checkSongs =
      await client.sql`SELECT * FROM playList WHERE id=${id} AND user_id=${userId}`;
    if (checkSongs.rowCount !== 0) {
      return checkSongs.rows;
    } else {
      const data =
        await client.sql`INSERT INTO playList (id, title, artist, src, user_id) VALUES (${id}, ${title}, ${artist}, ${src}, ${userId})`;
      return data.rows;
    }
  } catch (error) {
    console.error("error occur query ", error);
  }
};

export const getLikeSongsById = async (id) => {
  try {
    const client = await db.connect();
    const data = await client.sql`SELECT * FROM likeSongs WHERE user_id=${id}`;
    return data.rows;
  } catch (error) {
    console.error(error);
  }
};
export const getPlayListById = async (id) => {
  try {
    const client = await db.connect();
    const data = await client.sql`SELECT * FROM playList WHERE user_id=${id}`;
    return data.rows;
  } catch (error) {
    console.error(error);
  }
};

export const deletePlayListSongById = async (id) => {
  try {
    const client = await db.connect();
    const data = await client.sql`DELETE FROM playList WHERE id=${id}`;
  } catch (error) {
    console.error(error);
  }
};

export const deleteLikeSongById = async (id) => {
  try {
    const client = await db.connect();
    const data = await client.sql`DELETE FROM likeSongs WHERE id=${id}`;
  } catch (error) {
    console.error(error);
  }
};
