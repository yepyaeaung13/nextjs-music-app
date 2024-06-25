import { fetchTopTenSongs, fetchTopTrendingSongs } from "@/app/api/lib/data";
import React from "react";
import dynamic from "next/dynamic";

const TrendingSongsCard = dynamic(() => import("./TrendingSongsCard"), {
  ssr: false,
});
const TopTenSongsCard = dynamic(() => import("./TopTenSongsCard"), {
  ssr: false,
});

const MainSection = async () => {
  const topTenSongs = await fetchTopTenSongs();
  const topTrendingSongs = await fetchTopTrendingSongs();
  return (
    <main className="h-[100vh] overflow-hidden grid grid-cols-10">
      <section className="col-span-7 flex flex-col gap-1 bg-secondary">
        <div className="">
          <div className="w-full h-40 bg-gradient-to-r from-primary via-green-600 to-green-700 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl font-bold">Top 10 Songs</h1>
            <h2 className="text-xl font-bold">of the weekend</h2>
          </div>
        </div>
        <div className="px-2">
          <div className="top-ten-songs-list grid grid-cols-1 gap-1 text-sm px-8 py-5 h-96 overflow-y-scroll scrollbar border border-palette_one rounded-md">
            {topTenSongs.map((song, idx) => {
              return (
                <TopTenSongsCard
                  key={song.id}
                  songs={topTenSongs}
                  song={song}
                  idx={idx}
                />
              );
            })}
          </div>
        </div>
      </section>
      <aside className="col-span-3 p-3 flex flex-col gap-2 bg-secondary">
        <h1 className="text-lg">Trending Songs</h1>
        <div className="trending-songs-list px-2 py-3 text-sm h-[81vh] overflow-y-scroll scrollbar border border-palette_one rounded-md">
          {topTrendingSongs.map((song, idx) => {
            return (
              <TrendingSongsCard
                key={song.id}
                topTrendingSongs={topTrendingSongs}
                song={song}
                idx={idx}
              />
            );
          })}
        </div>
      </aside>
    </main>
  );
};

export default MainSection;
