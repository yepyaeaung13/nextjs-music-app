import React from "react";
import dynamic from "next/dynamic";

const PlayList = dynamic(() => import("../ui/components/PlayList"), {
  ssr: false,
});

const page = async () => {
  return (
    <div>
      <PlayList />
    </div>
  );
};

export default page;
