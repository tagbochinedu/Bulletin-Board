import { useSelector} from "react-redux";
import {selectAllPosts} from './postSlice'

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  return (
    <section>
        <h2>Posts</h2>
      {posts.map((post) => {
        return (
          <article key={post.id} className='post'>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
          </article>
        );
      })}
    </section>
  );
};

export default PostList;
