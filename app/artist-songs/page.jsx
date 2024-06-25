import Link from "next/link";
import React from "react";
import { fetchSongs } from "../api/lib/data";
import ArtistSongsPage from "../ui/components/ArtistSongsPage";

export default async function page() {
  const songs = await fetchSongs();
  return (
    <div className="h-[100vh] w-full flex justify-center bg-secondary relative">
      <Link href={"/artists"} className="absolute top-6 left-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </Link>
      <dir className="w-screen grid grid-rows-12 gap-2 px-10">
        <ArtistSongsPage songs={songs} />
      </dir>
    </div>
  );
}
