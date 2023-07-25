import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
function Postpage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  useEffect(() => {
    // console.log(id);

    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((data) => {
        setPostInfo(data);
      });
    });
  }, []);
  if (!postInfo) return "";
  return (
    <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gray-200 ">
      <Link to={`/edit/${postInfo._id}`}>
        <button
          type="button"
          class="text-black bg-blue-300 hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 ml-4 mb-10"
        >
          {/* edit icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="edit"
            width="16"
            height="16"
          >
            <path d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"></path>
          </svg>
          Edit this post
        </button>
      </Link>

      <div className="flex justify-center px-4 mx-auto max-w-screen-xl">
        <header className="mb-4 lg:mb-6 not-format">
          {/* <!-- Address section with contact information --> */}
          <address className="flex items-center mb-6 not-italic justify-center">
            <div className=" flex items-center mr-3 text-sm text-gray-900 content-center justify-center flex-col ">
              {/* <!-- Profile picture --> */}
              <img
                className="mr-4 w-[50vw] h-[70vh] object-cover"
                src={`http://localhost:4000/${postInfo.cover}`}
                alt="Jese Leos"
              />
              {/* <!-- Text content container --> */}
              <div className="text-center">
                {/* <!-- Link to the author's profile, with a bold font and different colors based on theme --> */}
                <div
                  href="#"
                  rel="author"
                  className="text-xl font-bold text-gray-900  mt-3"
                >
                  {postInfo.author.username}
                </div>
                {/* <!-- Job title or description with a light font and different colors based on theme --> */}

                {/* <!-- Date and time information with a light font and different colors based on theme --> */}
                <p className="text-sm font-normal text-blue-500 ">
                  <time
                    pubdate
                    datetime="2022-02-08"
                    title="February 8th, 2022"
                  >
                    {new Date(postInfo.createdAt).toLocaleString()}
                  </time>
                </p>
              </div>
            </div>
          </address>

          {/* <!-- Article title with different font sizes and colors based on theme --> */}
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl  text-center w-[90vw]">
            {postInfo.title}
          </h1>

          <div
            className="content  text-justify w-[90vw]"
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          ></div>
        </header>
      </div>
    </div>
  );
}

export default Postpage;
