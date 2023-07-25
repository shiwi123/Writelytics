import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "./Editor";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Alert from "./alert";

function EditPost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showError, setShowError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        console.log(postInfo);
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      });
    });
  }, []);

  async function edit(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    data.set("file", files[0]);

    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        console.log("you are not the author");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error occurred during fetch:", error);
      setShowError(true);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form className="mb-6 w-[80vw] mx-auto" onSubmit={edit}>
      {showError && (
        <Alert title="Authorization error" message="You are not the author" />
      )}
      <h1 className="mx-auto w-[200px] mb-2 text-black text-2xl ">
        Edit Post
      </h1>
      <input
        type="text"
        id="title"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   title mb-3"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="text"
        id="summary"
        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500   summary mb-3 "
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none mb-3"
        id="Image"
        type="file"
        onChange={(ev) => setFiles(Array.from(ev.target.files))}
      />
      <Editor value={content} onChange={(newValue) => setContent(newValue)} />

      <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Update Post
      </button>
    </form>
  );
}

export default EditPost;

