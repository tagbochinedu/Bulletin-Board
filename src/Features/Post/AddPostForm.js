import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdd } from "./postSlice";
import { selectAllPosts } from "./postSlice";
import { selectAllUsers } from "../Users/userSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const body = { title, content, userId };
    dispatch(postAdd(body));
    setTitle("");
    setContent("");
  };
  return (
    <section className="form-container">
      <h2 className="form-title">Add A New Post</h2>
      <form onSubmit={formSubmitHandler}>
        <div className="input-container">
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
        <div className="input-container">
          <label htmlFor="user Id">Author</label>
          <select
            value={userId}
            id="user Id"
            required
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            className='input-select'
          >
            <option value=''>
                Select a name
              </option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
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
        <div className="btn-container">
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;
