import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";
import { selectAllUsers } from "../Users/userSlice";
import { parseISO, formatDistanceToNow } from "date-fns";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);

  const TimeStamp = (time) => {
    let timeAgo = "";
    const date = parseISO(time);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
    return timeAgo;
  };
  const orderedPosts = posts.slice().sort((a,b)=>b.date.localeCompare(a.date))

  return (
    <section>
      <h2>Posts</h2>
      {orderedPosts.map((post) => {
        const user = users.find((user) => user.name === post.userId);
        return (
          <article key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <div>
              <span>by {user ? post.userId : "Unknown Author"}</span>
              <span>
                &nbsp;<i>{TimeStamp(post.date)}</i>
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default PostList;
