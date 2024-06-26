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

export const fetchLikeSongs = async () => {
  try {
    const client = await db.connect();
    const data = await client.sql`SELECT * FROM likeSongs`;
    return data.rows;
  } catch (error) {
    console.error("failed to fetch songs", error);
  }
};

export const fetchPlayListSongs = async () => {
  try {
    const client = await db.connect();
    const data = await client.sql`SELECT * FROM playList`;
    return data.rows;
  } catch (error) {
    console.error("failed to fetch songs", error);
  }
};

export const postUser = async (uid, name, email) => {
  try {
    const client = await db.connect();
    const checkUser = await client.sql`SELECT * FROM users WHERE id = ${uid}`;
    if (checkUser.rows.length !== 0) {
      return checkUser.rows;
    } else {
      const user =
        await client.sql`INSERT INTO users (id, name, email) VALUES (${uid}, ${name}, ${email})`;
      return user.rows;
    }
  } catch (error) {
    console.error("failt to post user ", error);
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
