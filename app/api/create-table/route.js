const { sql, db } = require("@vercel/postgres");
const { NextResponse } = require("next/server");

export async function GET(client) {
  try {
    const result =
      await client.sql`CREATE TABLE users ( id varchar(255), name varchar(255), email varchar(255), token varchar(255) );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
// const topTrendingSongs = [
//   {
//     id: crypto.randomUUID(),
//     src: "songs/သိချင်းလေးကြားရင်-NayMinEain.mp3",
//     title: "သိချင်းလေးကြားရင်",
//     artist: "Nay Min Eain",
//   },
//   {
//     id: crypto.randomUUID(),
//     src: "songs/ကမ္ဘာအဆက်ဆက်-BunnyPhyoeftAmeraHpone.mp3",
//     title: "ကမ္ဘာ အဆက်ဆက်",
//     artist: "Bunny Phyo & Amera Hpone",
//   },
//   {
//     id: crypto.randomUUID(),
//     src: "songs/PoePhyuPhyu-ထာဝရထက်-တစ်ရက်ပို.mp3",
//     title: "ထာဝရထက် တစ်ရက်ပို",
//     artist: "Poe Phyu Phyu",
//   },
//   {
//     id: crypto.randomUUID(),
//     src: "songs/𝙉𝙤𝙧𝙖-𝙋𝙝𝙚𝙡-𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡-𝙈𝙪𝙨𝙞𝙘.mp3",
//     title: "Phel",
//     artist: "Nora",
//   },
//   {
//     id: crypto.randomUUID(),
//     src: "songs/AungMyintMyat-အင်းလေးသူ.mp3",
//     title: "အင်းလေးသူ",
//     artist: "Aung Myint Myat",
//   },
//   {
//     id: crypto.randomUUID(),
//     src: "songs/MTHREE-တစ်အချိုးတစ်.mp3",
//     title: "တစ်အချိုးတစ်",
//     artist: "MTHREE",
//   },
//   {
//     id: crypto.randomUUID(),
//     src: "songs/SHINE-ကျေးဇူးပါကွယ်.mp3",
//     title: "ကျေးဇူးပါကွယ်",
//     artist: "SHINE",
//   },
//   {
//     id: crypto.randomUUID(),
//     src: "songs/အိပ်မက်ရဲ့အသက်-BunnyPhyoeBobbySoxer.mp3",
//     title: "အိပ်မက်ရဲ့အသက်",
//     artist: "Bunny Phyoe & Bobby Soxer",
//   },
// ];

// async function seedSongs(client) {
//   try {
//     const insertedSongs = await topTrendingSongs.map(
//       (song) => client.sql`
//         INSERT INTO topTrendingSongs (id, title, artist, src)
//         VALUES (${song.id}, ${song.title}, ${song.artist}, ${song.src});`
//     );
//     console.log(`Seeded ${insertedSongs.length} songs`);
//   } catch (err) {
//     console.log(err, "error occur");
//     throw err;
//   }
// }

async function main() {
  const client = await db.connect();
  await GET(client);
  // await seedSongs(client);

  console.log("table created");
}

main().catch((err) => console.log(err));
