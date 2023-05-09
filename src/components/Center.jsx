import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";

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
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);

  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        <div className="flex justify-center items-center space-x-3 rounded-full bg-black opacity-90 hover:opacity-80 cursor-pointer p-1 pr-2">
          <img
            src={session?.user.image}
            className="h-10 w-10 rounded-full"
            alt="userImage"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7   h-80 p-8 bg-gradient-to-b to-black ${color}`}
      ></section>
    </div>
  );
};

export default Center;
