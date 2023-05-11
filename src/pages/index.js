import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Center from "@/components/Center";
import { getSession } from "next-auth/react";
import Player from "@/components/Player";

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotity music app</title>
        <link rel="shortcut icon" href="/spotifyLogo.png" />
      </Head>
      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          {/* Sidebar */}
          <Sidebar />
          {/* Center */}
          <Center />
        </main>
        <div className="sticky bottom-0 z-20 left-0 right-0">
          {/* Player */}
          <Player />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session: session,
    },
  };
}
