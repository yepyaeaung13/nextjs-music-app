import React from "react";
import dynamic from "next/dynamic";

const LikeSongs = dynamic(() => import("../ui/components/LikeSongs"), {
  ssr: false,
});

const page = () => {
  return (
    <div>
      <LikeSongs />
    </div>
  );
};

export default page;
