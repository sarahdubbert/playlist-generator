"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Playlist from "./Playlist";
import { getUserProfile } from "@lib/spotify";

const HomePage = () => {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session) {
        try {
          const profileData = await getUserProfile(session.user.accessToken);
          setUserProfile(profileData);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [session]);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <header className="py-4 px-6 flex items-center justify-between bg-gray-800">
        <h1 className="text-3xl font-bold font-serif">Playlist Generator</h1>
      </header>

      <main className="p-6">
        <div className="max-w-3xl mx-auto">
          <Playlist userProfile={userProfile} />
        </div>
      </main>

      <footer className="py-4 px-6 bg-gray-800">
        <p>
          &copy; {new Date().getFullYear()} Playlist Generator. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
