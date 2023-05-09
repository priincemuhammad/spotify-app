import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";

const login = ({ providers }) => {
  return (
    <div>
      <Head>
        <title>Spotity | Login</title>
        <link rel="shortcut icon" href="/spotifyLogo.png" />
      </Head>
      <div className="w-full min-h-screen space-y-5 bg-black flex flex-col justify-center items-center ">
        <img src="/spotifyLogo.png" className="w-40" alt="logo" />
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="bg-[#18D860] text-black font-bold px-12 rounded-full p-5"
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers: providers,
    },
  };
}
