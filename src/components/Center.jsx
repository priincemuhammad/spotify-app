import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { shuffle } from "lodash";
import { selectItem } from "@/features/playerSlice";
import { useSelector } from "react-redux";
import Songs from "./Songs";
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-red-500",
  "from-yellow-500",
  "from-green-500",
  "from-purple-500",
  "from-pink-500",
  "from-orange-500",
];

const Center = () => {
  const getPlaylist = useSelector(selectItem);
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [getPlaylist]);
  const [dropdown, setDropdown] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    return document.addEventListener("click", handleDropdown, true);
  }, []);

  const handleDropdown = (e) => {
    if (!accountRef.current.contains(e.target)) {
      setDropdown(false);
    }
  };

  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        <div
          ref={accountRef}
          onClick={() => setDropdown(!dropdown)}
          className="group relative flex justify-center items-center space-x-3 rounded-full bg-black opacity-90 hover:opacity-80 cursor-pointer p-1 pr-2"
        >
          <img
            src={session?.user.image}
            className="h-10 w-10 rounded-full"
            alt="userImage"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />

          {/* dropdown */}
          <div
            className={`${
              dropdown === true
                ? "translate-y-0 opacity-100"
                : "-translate-y-14 opacity-0 "
            } bg-white text-black absolute space-y-2 top-12 right-0 w-[100%] rounded-md p-5`}
          >
            <div className="flex items-center space-x-2">
              <UserCircleIcon className="h-5 w-5" />
              <p>Profile</p>
            </div>
            <div
              onClick={() => signOut()}
              className="flex items-center space-x-2"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <p>Sign out</p>
            </div>
          </div>
        </div>
      </header>
      <section
        className={`flex items-end space-x-7   h-80 p-8 bg-gradient-to-b to-black ${color}`}
      >
        <div className="flex items-end space-x-5">
          <img
            src={getPlaylist?.images?.[0]?.url}
            className="h-44 w-44 shadow-2xl rounded-md"
            alt="playlistImg"
          />
          <div>
            <p className="uppercase">Playlist</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
              {getPlaylist?.name}
            </h1>
          </div>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
