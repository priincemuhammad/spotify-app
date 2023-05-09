import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Center from "@/components/Center";

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
        <div>{/* Player */}</div>
      </div>
    </>
  );
}
