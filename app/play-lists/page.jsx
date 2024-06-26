import React from "react";
import { fetchPlayListSongs } from "../api/lib/data";
import dynamic from "next/dynamic";

const PlayList = dynamic(() => import("../ui/components/PlayList"), {
  ssr: false,
});

const page = async () => {
  const playList = await fetchPlayListSongs();
  return (
    <div>
      <PlayList playList={playList} />
    </div>
  );
};

export default page;
