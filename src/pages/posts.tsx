import React from "react";
import { GetStaticProps, InferGetStaticPropsType, type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";

const Posts: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession();
  console.log("session data", session);
  console.log("all post", posts);

  const [isActive, setIsActive] = useState(true);
  const [postData, setPostData] = useState(posts?.data);

  useEffect(() => {
    // console.log(isActive);
    // console.log(session);
    if (isActive) {
      const activePost = posts?.data.filter((post: any) => {
        return post.status === "active";
      });
      setPostData(activePost);
    } else {
      const inactivePost = posts?.data.filter((post: any) => {
        return post.status === "inactive";
      });
      setPostData(inactivePost);
    }
  }, [isActive]);
  return (
    <div>
      <Navbar />
      <div className="text-center">
        {/* Heading */}
        {!session ? (
          <div>
            <h1 className="mt-4 text-4xl font-bold text-gray-800">
              Welcome to Sustain Hacks,
            </h1>
          </div>
        ) : (
          <div>
            <h1 className="mt-4 text-4xl font-bold text-gray-800">
              Welcome to Sustain Hacks, {session?.user?.name}
            </h1>
          </div>
        )}

        {/* Active / Inactive bar */}

        <div className="mt-10 flex justify-center">
          <div className="flex gap-2 rounded-3xl border border-gray-200">
            <button
              onClick={() => {
                setIsActive(true);
              }}
              className={
                isActive
                  ? "rounded-3xl border-green-600 bg-green-700 px-4  py-2 text-white "
                  : "rounded-3xl border border-green-600 px-4 py-1"
              }
            >
              Active Posts
            </button>
            <button
              onClick={() => {
                setIsActive(false);
              }}
              className={
                !isActive
                  ? "rounded-3xl border-rose-900 bg-rose-600 px-4  py-2 text-white"
                  : "rounded-3xl border border-rose-900 px-4 py-1"
              }
            >
              Inactive Posts
            </button>
          </div>
        </div>
        {/* Posts */}
        <div className="m-10 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {postData?.length > 0 &&
            postData?.map((post: any) => (
              <Post post={post} isActive={isActive} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async (context) => {
  let res = await fetch("http://localhost:3000/api/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let posts: [] = await res.json();

  return {
    props: { posts },
  };
};

