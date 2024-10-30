import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuHeart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeAsync } from "../redux/postSlicce";

const Post = ({ post }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = () => {
    user?.token
      ? dispatch(toggleLikeAsync({ postId: post._id, userId: user._id }))
      : navigate("/email", { state: { fromPost: true } });
  };

  const isLiked = post?.likes && post.likes[user._id];
  const likeCount = post?.likes ? Object.keys(post.likes).length : 0;

  return (
    <div className="py- max-w-sm rounded-lg overflow-hidden shadow-lg h-[400px] ">
      <div className="h-[45%]">
        <Link to={`/posts/${post._id}`}>
          <img
            src={post.pic}
            alt="Blog"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className="px-6 pt-4 flex flex-col justify-evenly h-[45%]">
        <span className="text-indigo-600 font-semibold text-lg">
          {post.title}
        </span>
        <p className="text-gray-700 text-base mt-2 line-clamp-3">
          {post.description}
        </p>

        <Link to={`/${post.authorId}/blogs`}>
          <p
            className="text-gray-700 text-base mt-2 font-bold"
            onClick={() => navigate(`/${post.authorId}/blogs`)}
          >
            {post.author}
          </p>
        </Link>
        
      </div>
      <div className=" px-6 flex items-center justify-end font-medium text-base h-[10%]">
          <LuHeart
            onClick={handleLike}
            className={`cursor-pointer ${isLiked ? "fill-current" : ""} ${
              isLiked ? "text-red-500" : "text-gray-500"
            }`}
          />
          <span className="ml-2 text-gray-700">
            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </span>
        </div>

     
    </div>
  );
};

export default Post;
