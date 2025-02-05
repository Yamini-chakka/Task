import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



const blogPosts = [
  {
    id: 1,
    title: "How to Learn React",
    description:
      "A quick guide to get started with React. Learn the basics and become proficient.",
    content: `React is a JavaScript library for building user interfaces. 
    To start learning, it's important to understand components, JSX, props, and state. 
    This guide covers fundamental concepts.React is a powerful JavaScript library for building user interfaces, mainly used for creating dynamic single-page applications. Developed by Facebook, React focuses on the concept of components and helps developers build applications by creating reusable, isolated pieces of code.

To begin learning React, you should have a solid foundation in JavaScript, including ES6 syntax (arrow functions, destructuring, promises, etc.). A good understanding of these features will make React development smoother.

React components are the building blocks of any React application. They can either be functional or class-based. Functional components are simpler and are becoming more popular with the introduction of hooks, which allow you to manage state and side effects.

The basic unit of data flow in React is props. Props are read-only objects that allow you to pass data between components. Every component can receive props and render them dynamically. Props enable parent-child communication in React applications.

Another crucial concept is state. While props are immutable, state is mutable. It allows components to track data that can change over time, such as user input or fetched data. State updates trigger re-rendering, which is key to making interactive UIs.

React uses JSX (JavaScript XML) for creating elements in a syntax that looks like HTML, but it's actually JavaScript. JSX combines the power of JavaScript with the readability of HTML, enabling you to structure components declaratively.

The virtual DOM is another important concept. When the state of a component changes, React first updates the virtual DOM (an in-memory representation) and then compares it to the real DOM. This process, called reconciliation, minimizes direct DOM manipulation and ensures fast rendering.

React also offers lifecycle methods, especially for class components, such as componentDidMount() and componentDidUpdate(), allowing developers to hook into certain stages of a component’s life.

Once you have a basic understanding of React’s core concepts, dive deeper into more advanced topics like React Router for navigation, React Context for managing global state, and React Hooks for managing state and effects in functional components.

Lastly, practice by building small projects. The best way to learn React is through hands-on experience. Start with basic apps like a to-do list or a weather app and gradually build more complex projects as you grow more comfortable with the library.`,
  },
  {
    id: 2,
    title: "Understanding JavaScript Closures",
    description:
      "A deep dive into closures in JavaScript and their real-world applications.",
    content: `Closures are functions that retain access to variables from their parent scope 
    even after the parent function has executed. This article explains them in detail.
    A closure is a fundamental concept in JavaScript where an inner function retains access to the variables from its outer function, even after the outer function has finished executing. Closures are created every time a function is created, and they are essential for managing data privacy, callbacks, and function factories.

In JavaScript, functions are first-class objects, which means they can be passed around, returned from other functions, and stored in variables. When a function is defined inside another function, it forms a closure. This inner function can access the variables and parameters of its outer function, even after the outer function has completed execution.

Closures work by "remembering" the environment in which they were created. This means that an inner function keeps a reference to the variables in its outer function’s scope. This is important for several reasons: it allows for more powerful function compositions, makes data encapsulation possible, and helps to create private variables in JavaScript.

For instance, when you create a function inside another, the inner function retains access to the outer function’s variables even if the outer function has finished running. This allows for data to persist across different function calls without polluting the global scope.

Closures are commonly used in JavaScript for creating private variables and methods. By returning a function from another function, you can effectively hide the implementation details from the outer scope, which is a key aspect of data encapsulation. A classic example is the "counter" function, where the inner function maintains and modifies the count variable even though it’s technically out of scope.

Another important use of closures is in asynchronous programming. In situations like callbacks or event handlers, closures allow functions to "remember" the environment in which they were created, so they can still access relevant variables and perform actions even after an asynchronous operation has completed.

Understanding closures is essential for mastering JavaScript. They enable you to write cleaner, more modular code, manage data effectively, and prevent unexpected behavior in your applications. Closures can sometimes be tricky to grasp, but once understood, they offer immense power in handling scope and maintaining state.`,
  },
];

const BlogPage = () => {
  const { id } = useParams();
  const blog = blogPosts.find((post) => post.id === parseInt(id));

  const [likeCount, setLikeCount] = useState(() => parseInt(localStorage.getItem(`likes-${id}`)) || 0);
  const [comments, setComments] = useState(() => JSON.parse(localStorage.getItem(`comments-${id}`)) || []);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(`likes-${id}`, likeCount);
  }, [likeCount]);

  useEffect(() => {
    localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
  }, [comments]);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = e.target[0].value;
    setComments([...comments, comment]);
    e.target.reset();
  };

  const handleShare = async () => {
    const postUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: blog.title, text: blog.description, url: postUrl });
        setShareMessage("Shared successfully!");
      } catch {
        setShareMessage("Share cancelled.");
      }
    } else {
      navigator.clipboard.writeText(postUrl).then(() => {
        setShareMessage("Link copied to clipboard!");
      });
    }
    setTimeout(() => setShareMessage(""), 2000);
  };

  if (!blog) return <h2>Blog not found</h2>;

  return (
    <div className="blog-post">
      <h1>{blog.title}</h1>
      <p className="description">{blog.description}</p>
      <div className="content">
        <p>{blog.content}</p>
      </div>

      <div className="like-share">
        <button onClick={handleLike} className="like-button">👍 Like ({likeCount})</button>
        <button onClick={handleShare} className="share-button">🔗 Share</button>
      </div>

      {shareMessage && <p className="share-message">{shareMessage}</p>}

      <div className="comments-section">
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea placeholder="Add a comment..." required></textarea>
          <button type="submit">Submit Comment</button>
        </form>
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>{comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
