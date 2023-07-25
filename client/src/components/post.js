import React from "react";
import { Link } from "react-router-dom";
function Post({ _id, title, summary, content, cover, createdAt, author}) {
  const coverWithoutBackslashes = cover.replace(/\\/g, "/");
  const encodedCover = encodeURIComponent(coverWithoutBackslashes);

  // Reverse the encoding to get the correct imageUrl
  const imageUrl = `http://localhost:4000/${decodeURIComponent(encodedCover)}`;

  return (
    <>
      <div className="mx-10 lg:flex mt-6">
        {/* image */}
        <Link to={`/post/${_id}`}>
          <div className="h-48 lg:h-auto lg:w-48 flex-none  rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            <img src={imageUrl} className="object-cover h-48 w-96 " />
          </div>
        </Link>

        {/* title,summary,date */}
        <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <Link to={`/post/${_id}`}>
            <div className="text-black font-bold text-2xl mb-2">{title}</div>
          </Link>
          {/* <p className="text-grey-darker text-base" dangerouslySetInnerHTML={{ __html: content }}></p> */}

          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-black space-y-[5px] ">{summary}</p>
              <p className="text-blue-800 font-medium">{author.username}</p>
              <p className="text-blue-500 text-xs">
                {new Date(createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
