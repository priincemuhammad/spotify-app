import Durationmanager from "../../lib/time";
import { useDispatch } from "react-redux";
import { setCurrentId, playPause, selectPlaying } from "@/features/playerSlice";
import useSpotify from "@/hooks/useSpotify";
import { useSelector } from "react-redux";

const Song = ({ data, index }) => {
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();
  const isPlaying = useSelector(selectPlaying);

  const playSong = () => {
    dispatch(setCurrentId(data?.track.id));
    if (isPlaying === true) {
      dispatch(playPause(false));
      spotifyApi.play({
        uris: [data.track.uri],
      });
    } else {
      dispatch(playPause(true));
      spotifyApi.pause({
        uris: [data.track.uri],
      });
    }
  };

  return (
    <div
      onClick={playSong}
      className="grid grid-cols-2 p-5 rounded-md cursor-pointer  hover:bg-gray-900"
    >
      <div className="flex justify-start items-start space-x-4 ">
        <div className="flex justify-start items-center space-x-4">
          <p>{index + 1}</p>
          <img
            src={data?.track.album.images[0].url}
            className="h-10 w-10"
            alt="img"
          />
        </div>
        <div>
          <h1>{data.track.name}</h1>
          <p className="text-gray-400">{data?.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex justify-end md:justify-between  items-center">
        <p className="hidden md:inline">{data?.track.album.name}</p>
        <p className="text-right">{Durationmanager(data?.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
