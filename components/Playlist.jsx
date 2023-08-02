"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { createPlaylist } from "@lib/spotify";

const Playlist = ({ userProfile }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePlaylist = async () => {
    setIsLoading(true);
    try {
      if (!session) {
        throw new Error(
          "User not authenticated. Please sign in to create a playlist."
        );
      }

      const playlistData = await createPlaylist(
        userProfile.id,
        "Test playlist",
        session.user.accessToken
      );
      //setPlaylistId(playlistData.id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="playlist">
      {userProfile ? (
        <div>
          <p>User: {userProfile.display_name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="w-full h-screen flex items-center justify-center">
        <button
          onClick={() => handleCreatePlaylist()}
          className="text-white px-8 py-2 rounded-full bg-green-500 font-bold text-lg"
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
};

export default Playlist;
