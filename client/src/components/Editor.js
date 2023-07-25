import React from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];



function Editor({value,onChange}) {
  return (
    <ReactQuill
        theme="snow"
        className="mb-3"
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChange}
      />
  )
}

export default Editor