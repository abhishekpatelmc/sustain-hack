import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import React from "react";
import Navbar from "../components/Navbar";

const DeatilsPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log("post data", post);
  return (
    <div>
      <div>
        <Navbar />
        <div className="my-10 text-center text-4xl font-bold uppercase text-slate-700">
          Post Details
        </div>
        <div className="flex justify-evenly sm:mx-10">
          {/* Left side */}
          <div className="">
            <div className="my-1 block pl-2 text-lg font-medium text-gray-700">
              {post.title}
            </div>
            <div className="my-1 block pl-2 text-lg font-medium text-gray-700">
              {post.content}
            </div>
            <div className="my-1 block pl-2 text-lg font-medium text-gray-700">
              {post.address}
            </div>
            <div className="my-4 flex justify-evenly text-lg">
              {post.status === "active" ? (
                <div className="mr-4 rounded-2xl border  border-green-700 px-2 py-1 capitalize  hover:bg-green-700 hover:text-white">
                  Active
                </div>
              ) : (
                <div className="mr-4 rounded-2xl border border-rose-700 px-2 py-1  capitalize hover:bg-rose-700 hover:text-white ">
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
  console.log("id", id);
  const res = await fetch("http://localhost:3000/api/posts/" + id);
  const data = await res.json();
  return {
    props: { post: data },
  };
}
export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)

  // Call an external API endpoint to get posts
  const res = await fetch("http://localhost:3000/api/posts");
  const posts = await res.json();

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = posts?.data.map((post: any) => ({
    params: { id: post._id.toString() },
  }));
  console.log(paths);

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}
export default DeatilsPage;
