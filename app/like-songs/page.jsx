import React from "react";
import dynamic from "next/dynamic";
import { fetchLikeSongs } from "../api/lib/data";

const LikeSongsPage = dynamic(() => import("../ui/components/LikeSongsPage"), {
  ssr: false,
});

const page = async () => {
  const likeSongs = await fetchLikeSongs();
  return (
    <div>
      <LikeSongsPage likeSongs={likeSongs} />
    </div>
  );
};

export default page;
