import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  RssIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import { useDispatch } from "react-redux";
import { addPlaylist } from "@/features/playerSlice";

const Sidebar = () => {
  const initialPlaylistId = "7ELBRC0xLGvsKid6HzTejB";
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState(initialPlaylistId);
  const router = useRouter();
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        dispatch(addPlaylist(data.body));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [spotifyApi, playlistId]);

  useEffect(() => {
    // If the user is not logged in, redirect to the login page
    if (session === null || undefined) {
      router.push("/login");
    }
  }, [session]);

  return (
    <div
      className="text-gray-500 w-80 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide
    sm:max-w-[12rem] xl:max-w-[20rem] hidden md:inline-flex
    "
    >
      <div className="space-y-4">
        <img src="/spotifyFullLogo.jpg" alt="logo" className="w-60" />

        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <BuildingLibraryIcon className="h-5 w-5" />
          <p>Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <p>Linked songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5 text-green-500" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* Playlists  */}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
