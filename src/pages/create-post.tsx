import React, { useEffect, useState } from "react";

const CreatePost = () => {
  const [postsState, setPostsState] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // useEffect(() => {
  //     setPostsState(allPosts);
  //   }, [allPosts]);
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  let submitForm = async (e: any) => {
    e.preventDefault();

    let res = await fetch("http://localhost:3000/api/post", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
      }),
    });
    res = await res.json();
    // setPostsState([...postsState, res]);
    // setTitle("");
    // setContent("");
    // setLoading(false);
  };
  return (
    <div>
      createPost
      <form onSubmit={submitForm}>
        <input
          name="title"
          onChange={handleChange}
          type="text"
          placeholder="title"
        />
        <input
          name="content"
          onChange={handleChange}
          type="text"
          placeholder="content"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
