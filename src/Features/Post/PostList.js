import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, reactionAdded } from "./postSlice";
import { selectAllUsers } from "../Users/userSlice";
import { parseISO, formatDistanceToNow } from "date-fns";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);
  const dispatch= useDispatch()

  const TimeStamp = (time) => {
    let timeAgo = "";
    const date = parseISO(time);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
    return timeAgo;
  };
  //code snippet for arranging posts from most recent to oldest
  const OrderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const reactionEmoji = {
    thumbsUp: "👍🏾",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
  };

  return (
    <section>
      <h2>Posts</h2>
      {OrderedPosts.map((post) => {
        const user = users.find((user) => user.name === post.userId);
        return (
          <article key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <div>
              {Object.entries(reactionEmoji).map(([name, emoji]) => {
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      dispatch(
                        reactionAdded({ postId: post.id, reaction: name })
                      );
                    }}
                  >
                    {emoji} {post.reactions[name]}
                  </button>
                );
              })}
            </div>
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
