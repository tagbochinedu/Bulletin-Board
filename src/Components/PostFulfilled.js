import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, addReaction } from "../Features/Posts/PostsSlice";
import { selectAllUsers } from "../Features/Users/UsersSlice";
import { parseISO, formatDistanceToNow } from "date-fns";

const PostFulfilled = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);
  //snippet for creating
  const TimeStamp = (time) => {
    let timeAgo = "";
    const date = parseISO(time);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
    return timeAgo;
  };
  const reactions = {
    thumbsUp: "👍🏾",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
  };
  const OrderedPost = posts.slice();
  const OrderedPosts = OrderedPost.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <h2 className="text-4xl font-bold text-center">Posts</h2>
      {OrderedPosts.map((post) => {
        const author = users.find((user) => user.id === post.userId);
        return (
          <article
            key={post.id}
            className="rounded-lg border-[2px] border-white max-w-xl p-6 mx-auto my-7 min-h-[130px]"
          >
            <h3 className="text-3xl font-semibold mb-2">{post.title}</h3>
            <h2 className="text-xl font-medium">
              {post.body.substring(0, 100)}
            </h2>
            <div className="flex justify-between">
              <span>by {author ? author.name : "Unknown Author"}</span>
              <span>
                &nbsp;<i>{TimeStamp(post.date)}</i>
              </span>
            </div>
            <div>
              {Object.entries(reactions).map(([name, emoji]) => {
                return (
                  <button
                    key={name}
                    className="bg-transparent mx-2"
                    onClick={() => {
                      dispatch(
                        addReaction({ postId: post.id, reaction: name })
                      );
                    }}
                  >
                    {emoji} {post.reactions[name]}
                  </button>
                );
              })}
            </div>
          </article>
        );
      })}
    </>
  );
};

export default PostFulfilled;
