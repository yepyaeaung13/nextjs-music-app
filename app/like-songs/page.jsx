import React from "react";
import dynamic from "next/dynamic";

const LikeSongsPage = dynamic(() => import("../ui/components/LikeSongsPage"), {
  ssr: false,
});

const page = async () => {
  return <LikeSongsPage />;
};

export default page;
