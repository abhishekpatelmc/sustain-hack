import { GetStaticProps, InferGetStaticPropsType, type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

const Home: NextPage = ({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession();
  console.log("session data", session);
  console.log("all users", users);
  return (
    <>
      <Head>
        <title>Susutain Hacks</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="text-center">
        {/* Heading */}
        {!session ? (
          <div>
            <h1 className="mt-4 text-5xl font-bold text-gray-800">
              Welcome to Sustain Hacks,
            </h1>
          </div>
        ) : (
          <div>
            <h1 className="mt-4 text-5xl font-bold text-gray-800">
              Welcome to Sustain Hacks, {session?.user?.name}
            </h1>
          </div>
        )}

        {/* Active / Inactive bar */}
        <div className="mt-10 flex justify-center">
          <div className="flex gap-2 rounded-2xl border-2  px-2">
            <div className="rounded-2xl border-2 border-green-600 px-2 py-1">
              active bar
            </div>
            <div className="rounded-2xl border-2 border-rose-900 px-2 py-1">
              Inactive bar
            </div>
          </div>
        </div>
        {/* Posts */}
        <div className="mt-10 flex justify-around">
          <div className="rounded-lg border-2 px-20 py-20">One </div>
          <div className="rounded-lg border-2 px-20 py-20">two</div>
          <div className="rounded-lg border-2 px-20 py-20">three</div>
          <div className="rounded-lg border-2 px-20 py-20">three</div>
        </div>
      </main>
    </>
  );
};
export const getStaticProps: GetStaticProps = async (context) => {
  let res = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let users: object = await res.json();

  return {
    props: { users },
  };
};
export default Home;
