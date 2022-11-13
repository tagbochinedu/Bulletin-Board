import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdd } from "./postSlice";
import { nanoid } from "@reduxjs/toolkit";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const formSubmitHandler = () => {
    const body = { id: nanoid(), title: title, content: content };
    dispatch(postAdd(body));
  };
  return (
    <section>
      <h2>Add A New Post</h2>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <input
            type="text"
            id="content"
            required
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;
