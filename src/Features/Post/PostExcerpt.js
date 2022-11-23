import { reactionAdded } from "./postSlice";
import { parseISO, formatDistanceToNow } from "date-fns";
import { selectAllUsers } from "../Users/userSlice";
import { useSelector, useDispatch } from "react-redux";

const PostExcerpt = (props) => {
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  //code snippet for adding how long ago a post was created
  const TimeStamp = (time) => {
    let timeAgo = "";
    const date = parseISO(time);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
    return timeAgo;
  };
  //code snippet for arranging posts from most recent to oldest

  const reactionEmoji = {
    thumbsUp: "👍🏾",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
  };

  return (
    <div>
      {props.post.map((post) => {
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
    </div>
  );
};

export default PostExcerpt;
