import React from "react";
import {
  fetchLikeSongs,
  fetchPlayListSongs,
  fetchSongs,
} from "../api/lib/data";
import SongsPage from "../ui/components/SongsPage";

export default async function page() {
  const songs = await fetchSongs();
  const likeSongs = await fetchLikeSongs();
  const playListSongs = await fetchPlayListSongs();

  return (
    <div className="h-[100vh] bg-secondary md:px-10 px-2 py-5">
      <SongsPage
        songs={songs}
        likeSongs={likeSongs}
        playlistSongs={playListSongs}
      />
    </div>
  );
}
