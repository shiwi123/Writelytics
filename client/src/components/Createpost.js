import React from "react";
import { Form } from "react-router-dom";

import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "./Editor";

function Createpost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [redirect, setRedirect] = useState(false);
  async function post(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    ev.preventDefault();

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      throw new Error("Network response was not ok.");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="mb-6 w-[80vw] mx-auto" onSubmit={post}>
      <h1 className="mx-auto w-[200px] mb-2 text-black text-2xl ">
        Create Post
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

      <button class="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Post
      </button>
    </form>
  );
}

export default Createpost;
