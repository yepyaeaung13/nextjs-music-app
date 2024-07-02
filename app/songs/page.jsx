import React from "react";
import { fetchSongs } from "../api/lib/data";
import SongsPage from "../ui/components/SongsPage";

export default async function page() {
  const songs = await fetchSongs();

  return (
    <div className="h-[100vh] bg-secondary md:px-10 px-2 py-5">
      <SongsPage songs={songs} />
    </div>
  );
}
