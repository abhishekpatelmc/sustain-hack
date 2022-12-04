import Image from "next/image";
import React from "react";

const Post = ({ post }: any) => {
  return (
    <div>
      <div key={post.title}>
        <div className="col-span-1 rounded-lg bg-white shadow-lg">
          <div>{post.title}</div>
          <div> {post.content}</div>
          <div>{post.status}</div>
          <div>{post.address}</div>
          <div>
            <Image width={100} height={100} src={post.file} alt={post.title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
