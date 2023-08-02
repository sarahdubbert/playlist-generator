"use client";

import { useState, useEffect } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";

function Login({ providers }) {
  return (
    <div>
      {Object.values(providers).map((provider) => (
        <div
          key={provider.name}
          className="w-full h-screen flex items-center justify-center"
        >
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="text-white px-8 py-2 rounded-full bg-green-500 font-bold text-lg"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
