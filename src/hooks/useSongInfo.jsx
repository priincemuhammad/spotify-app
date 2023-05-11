import { useEffect, useState } from "react";
import useSpotify from "@/hooks/useSpotify";
import { useSelector } from "react-redux";
import { selectCurrentTrackId } from "@/features/playerSlice";

const useSongInfo = () => {
  const currentTrackId = useSelector(selectCurrentTrackId);
  const spotifyApi = useSpotify();
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());
        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
};

export default useSongInfo;
