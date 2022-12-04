import React, { useEffect, useState } from "react";
import { storage } from "../server/lib/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Navbar from "../components/Navbar";

const CreatePost = () => {
  const [postsState, setPostsState] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: "",
    status: "active",
    address: "",
  });
  const [file, setFile] = useState<any>(null);

  const handleChange = (e: any) => {
    if (e.target.name !== "file") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const [imgUrl, setImgUrl] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);
  const handleUpload = async () => {
    console.log(file);
    if (!file) return;
    const storageRef = ref(storage, `files/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          setFormData({
            ...formData,
            file: downloadURL,
          });
        });
      }
    );
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
      }),
    });
    res = await res.json();
  };

  return (
    <div>
      <Navbar />
      <div className="my-10 text-center text-4xl font-bold uppercase text-slate-700">
        Add your post
      </div>
      <form className="flex justify-evenly sm:mx-10" onSubmit={handleSubmit}>
        {/* Left side */}
        <div className="">
          <div>
            <label className="my-1 block pl-2 text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              className="my-2 h-10 w-80 rounded-3xl border-2 pl-2"
              name="title"
              onChange={handleChange}
              type="text"
              placeholder="Title"
            />
          </div>
          <div>
            <label className="my-1 block pl-2 text-lg font-medium text-gray-700">
              Description
            </label>
            <input
              className="my-2 h-10 w-80 rounded-3xl border-2 pl-2"
              name="content"
              onChange={handleChange}
              type="text"
              placeholder="Description"
            />
          </div>
          <div>
            <label className="my-1 block pl-2 text-lg font-medium text-gray-700">
              Address
            </label>
            <input
              className="my-2 h-10 w-80 rounded-3xl border-2 pl-2"
              name="address"
              onChange={handleChange}
              type="text"
              placeholder="Address"
            />
          </div>
          <div className="my-4 flex justify-evenly text-lg">
            <button
              className="mr-4 rounded-3xl border-2 border-green-600 py-1 px-4 hover:bg-green-600 hover:text-white"
              type="button"
              name="status"
              onClick={handleChange}
              value="active"
            >
              Active
            </button>
            <button
              className="mr-4 rounded-3xl border-2 border-rose-700 py-1 px-4 hover:bg-rose-700 hover:text-white"
              type="button"
              name="status"
              onClick={handleChange}
              value="inactive"
            >
              Inactive
            </button>
          </div>
          <button
            className="my-2 h-10 w-80 rounded-3xl border-2 border-green-700 text-lg hover:bg-green-700 hover:text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
        {/* Right side */}
        <div className="mt-10">
          <div className="max-w-xl">
            <label className="flex h-64 w-full cursor-pointer appearance-none justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white px-4 transition hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  Drop files to Attach, or
                  <span className="text-blue-600 underline">browse</span>
                </span>
              </span>
              <input
                type="file"
                onChange={handleChange}
                name="file"
                className="hidden"
              />
            </label>
          </div>
          {/* <input
            className="mb-10 block w-80 rounded-2xl border-2 py-20"
            name="file"
            type="file"
            onChange={handleChange}
          /> */}
          <button
            type="button"
            className="my-4 h-10 w-80 rounded-3xl border-2 border-green-700 text-lg hover:bg-green-700 hover:text-white"
            onClick={handleUpload}
          >
            upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
