import React from "react";
import { useSelector } from "react-redux";
import { selectItem } from "@/features/playerSlice";
import Song from "./Song";

const Songs = () => {
  const playlists = useSelector(selectItem);

  return (
    <div className="px-8 py-4 pb-[450px] flex flex-col  text-white h-screen overflow-y-scroll scrollbar-hide">
      {playlists?.tracks?.items?.map((data, index) => (
        <Song key={index} data={data} index={index} />
      ))}
    </div>
  );
};

export default Songs;
