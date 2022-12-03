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
      {/* Navbar */}
      <Navbar />

      <div>
        {/* heading */}
        <div className="mt-10 text-center">
          <h1 className="text-4xl font-bold text-gray-600"> Create Post</h1>
        </div>
        {/* Post Submit form */}
        <div className="mt-10 text-center">
          <form className="flex" onSubmit={handleSubmit}>
            <div className="flex-1">
              {/* Left side */}
              <div>
                <input
                  name="title"
                  onChange={handleChange}
                  type="text"
                  placeholder="title"
                />
              </div>
              <div>
                <input
                  name="content"
                  onChange={handleChange}
                  type="text"
                  placeholder="content"
                />
              </div>
              <div>
                <input
                  name="address"
                  onChange={handleChange}
                  type="text"
                  placeholder="address"
                />
              </div>
              <div>
                <button name="status" onClick={handleChange} value="active">
                  active
                </button>
                <button name="status" onClick={handleChange} value="inactive">
                  inactive
                </button>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </div>
            {/* right side */}
            <div className="flex-1">
              <input name="file" type="file" onChange={handleChange} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
