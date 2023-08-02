import HomePage from "@components/HomePage";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <main className="">
        <HomePage />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
