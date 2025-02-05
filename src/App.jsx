
import React, { useState } from "react";
import { Link } from "react-router-dom";


// Sample blogs
const initialBlogs = [
  {
    id: 1,
    title: "How to Learn React",
    description: "A quick guide to get started with React.",
  },
  {
    id: 2,
    title: "Understanding JavaScript Closures",
    description: "A deep dive into closures in JavaScript.",
  },
];

const App = () => {
  const [blogs, setBlogs] = useState(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs"));
    return storedBlogs || initialBlogs;
  });

  return (
    <div className="App">
      <header>
        <h1>My Blog</h1>
        <p>Welcome! Click on a blog post to read more.</p>
      </header>

      <main>
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <Link to={`/blog/${blog.id}`} className="read-more">
              Read More
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
