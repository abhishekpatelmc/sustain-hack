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
      createPost
      <form onSubmit={handleSubmit}>
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
        <input
          name="address"
          onChange={handleChange}
          type="text"
          placeholder="address"
        />
        <button
          type="button"
          name="status"
          onClick={handleChange}
          value="active"
        >
          active
        </button>
        <button
          type="button"
          name="status"
          onClick={handleChange}
          value="inactive"
        >
          inactive
        </button>
        <input name="file" type="file" onChange={handleChange} />
        <button type="button" onClick={handleUpload}>
          upload
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
