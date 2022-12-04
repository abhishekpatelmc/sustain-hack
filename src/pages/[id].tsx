import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "../components/Navbar";
import { server } from "../config";

const DeatilsPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <div>
        <Navbar />
        <div className="my-10 text-center text-4xl font-bold uppercase text-slate-700">
          Post Details
        </div>
        <div className="flex justify-evenly sm:mx-10">
          {/* Left side */}
          <div>
            <div className="my-4  mt-10 block pl-2 text-4xl font-bold text-gray-700">
              {post.title}
            </div>
            <div className="my-4 block pl-2 text-xl font-medium text-gray-600">
              {post.content}
            </div>
            <div className="my-4 block pl-2 text-lg font-normal text-gray-500">
              {post.address}
            </div>
            <div className="text-md my-4 ml-2 flex">
              {post.status === "active" ? (
                <div className="mr-4 w-32 rounded-2xl border border-green-700 px-2 py-1 text-center capitalize  hover:bg-green-700 hover:text-white">
                  Active
                </div>
              ) : (
                <div className="mr-4 w-32 rounded-2xl border border-rose-700 px-2 py-1 text-center capitalize hover:bg-rose-700 hover:text-white ">
                  Inactive
                </div>
              )}
            </div>
          </div>
          {/* Right side */}
          <div className="mt-10">
            <div className="max-w-xl">
              <Image
                width={300}
                height={300}
                className="rounded-2xl"
                alt="Picture of the post"
                src={post.file}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getStaticProps(context: any) {
  const id = context.params.id;

  const res = await fetch(`${server}/api/posts/` + id);
  const data = await res.json();
  console.log("data", data);
  return {
    props: { post: data },
  };
}
export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)

  // Call an external API endpoint to get posts
  const res = await fetch(`${server}/api/posts`);
  const posts = await res.json();

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = posts?.map((post: any) => ({
    params: { id: post._id.toString() },
  }));
  console.log(paths);

  // { fallback: false } means other routes should 404
  return { paths, fallback: "blocking" };
}
export default DeatilsPage;
