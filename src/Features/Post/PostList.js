import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";
import { selectAllUsers } from "../Users/userSlice";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);

  return (
    <section>
      <h2>Posts</h2>
      {posts.map((post) => {
        const user = users.find((user) => user.name === post.userId);
        return (
          <article key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <span>by {user ? post.userId : "Unknown Author"}</span>
          </article>
        );
      })}
    </section>
  );
};

export default PostList;
