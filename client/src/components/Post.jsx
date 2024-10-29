import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuHeart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeAsync } from '../redux/postSlicce';


const Post = ({post}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  console.log(user.name)
  console.log(post.author)

    const handleLike = () => {
      dispatch(toggleLikeAsync({ postId: post._id, userId: user._id }));
    };
  
  //   const isLiked = post?.likes instanceof Map && post.likes.has(user._id);
  // const likeCount = post?.likes instanceof Map ? post.likes.size : 0;
  // console.log(isLiked)

  const isLiked = post?.likes && post.likes[user._id];
  const likeCount = post?.likes ? Object.keys(post.likes).length : 0;
  console.log(isLiked)
  // const isLiked = Array.isArray(post.likes) && post.likes.includes(user._id);
  // const likeCount = Array.isArray(post.likes) ? post.likes.length : 0;
  // console.log(isLiked)

  return (
    <div>
      
      <div key={post.id} className="py-8 max-w-sm rounded-lg overflow-hidden shadow-lg" >
      <Link to={`/posts/${post._id}`}>
            <img src={post.pic} alt="Blog 3" className="w-full"/>
            <div className="px-6 pt-4 ">
              <span className="text-indigo-600 font-semibold text-sm">{post.title}</span>
              <h2 className="font-bold text-xl mt-2">20 Myths About Web Design</h2>
              <p className="text-gray-700 text-base mt-2">
                {post.description}
              </p>
              

            </div>
            </Link>
            <Link to={`/${post.authorId}/blogs`}><p className="text-gray-700 text-base mt-2" onClick={() => navigate(`/${post.authorId}/blogs`)} >
                {post.author}
              </p>
              </Link>
              <div className="flex items-center mt-2">
          <LuHeart onClick={handleLike} className={`cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-500'}`}  />
          <span className="ml-2 text-gray-700">
          {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
          </span>
        </div>
          
          </div>
    </div>
  )
}

export default Post
