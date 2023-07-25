import React, { useEffect, useState } from "react";
import Post from "./post";

function DisplayPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
        console.log(posts[0]._id);
      });
  }, []);

  return (
    <div className="mx-10 grid grid-col-1 mt-6">
      {posts.length > 0 &&
        posts.map((post) => (
          <Post
        
            key={post._id} // Don't forget to add a unique key prop when mapping through an array of components
            {...post}
          />

        
        ))}
    </div>
  );
}

export default DisplayPost;
