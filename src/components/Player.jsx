import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import useSpotify from "@/hooks/useSpotify";
import { selectPlaying, selectCurrentTrackId } from "@/features/playerSlice";
import useSongInfo from "@/hooks/useSongInfo";
import { playPause, setCurrentId } from "@/features/playerSlice";
import {
  HeartIcon,
  SpeakerXMarkIcon,
  ArrowsRightLeftIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import {
  BackwardIcon,
  ForwardIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";

const Player = () => {
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();
  const isPlaying = useSelector(selectPlaying);
  const currentTrackId = useSelector(selectCurrentTrackId);
  const [volume, setVolume] = useState(50);
  const { data: session, status } = useSession();
  const songInfo = useSongInfo();

  console.log(songInfo);

  const fetchCurrentShongInfo = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("now playing", data.body?.item.id);
        dispatch(setCurrentId(data.body?.item?.id));

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          dispatch(setCurrentId(data.body?.is_playing));
        });
      });
    }
  };

  const handlePlaypause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        dispatch(playPause(false));
      } else {
        spotifyApi.play();
        dispatch(playPause(true));
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetch songinfo
      fetchCurrentShongInfo();
      setVolume(50);
    }
  }, [songInfo, currentTrackId, session]);

  return (
    <div className="text-white text-xs md:text-base w-full grid grid-cols-3 items-center py-8 px-2 md:px-8 bg-gradient-to-b from-black to-gray-900 ">
      {/* leftside */}
      <div className="hidden md:inline-flex justify-start items-center space-x-5">
        <img
          src={songInfo?.album?.images?.[0].url}
          className="h-12 w-12"
          alt="img"
        />
        <div>
          <p>{songInfo?.name}</p>
          <p className="text-gray-400">{songInfo?.artists?.[0]?.name}</p>
        </div>
        <HeartIcon className="h-5 cursor-pointer hover:scale-125 transition transform duration-300 ease-out" />
      </div>
      {/* middle */}
      <div className="flex justify-center items-center space-x-14">
        <ArrowsRightLeftIcon className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-300 ease-out" />
        <BackwardIcon className="h-8 cursor-pointer hover:scale-125 transition transform duration-300 ease-out" />
        {isPlaying === false ? (
          <PlayCircleIcon
            onClick={handlePlaypause}
            className="h-8 w-8 cursor-pointer hover:scale-125 transition transform duration-300 ease-out"
          />
        ) : (
          <PauseCircleIcon
            onClick={handlePlaypause}
            className="h-8 w-8 cursor-pointer hover:scale-125 transition transform duration-300 ease-out"
          />
        )}
        <ForwardIcon className="h-8 w-8 cursor-pointer hover:scale-125 transition transform duration-300 ease-out" />
        <ArrowUturnLeftIcon className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-300 ease-out" />
      </div>
      {/* rightside */}
      <div className="flex justify-end items-center space-x-4">
        {volume > 0 ? (
          <SpeakerWaveIcon
            onClick={() => setVolume(0)}
            className="h-8 w-8 cursor-pointer hover:scale-125 transition transform duration-300 ease-out"
          />
        ) : (
          <SpeakerXMarkIcon
            onClick={() => setVolume(20)}
            className="h-8 w-8 cursor-pointer hover:scale-125 transition transform duration-300 ease-out"
          />
        )}

        <input
          type="range"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          min={0}
          max={100}
          className="cursor-pointer w-14 md:w-24"
        />
      </div>
    </div>
  );
};

export default Player;
