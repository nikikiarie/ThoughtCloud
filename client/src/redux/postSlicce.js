import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
};

export const toggleLikeAsync = createAsyncThunk(
  'posts/toggleLikeAsync',
  async ({ postId, userId }, { getState }) => {
    console.log(postId, userId)
    const state = getState();
    console.log(state)
    const post = state.posts.posts.find(post => post._id === postId);
    console.log(post)


    // let updatedLikes = new Map(post.likes);
    // console.log(updatedLikes)
    // // Toggle like status before sending to server
    // if (updatedLikes.has(userId)) {
    //   updatedLikes.delete(userId);
    // } else {
    //   updatedLikes.set(userId, true);
    // }
    let updatedLikes = { ...post.likes };

    // Toggle like status before sending to server
    if (updatedLikes[userId]) {
      delete updatedLikes[userId]; // Remove like
      console.log("TRUE")
    } else {
      updatedLikes[userId] = true; // Add like
      console.log("FALSE")
    }

    // Simulated API request to sync with server
    const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/blogs/${postId}/like`, { userId })
    console.log(response)
    return { postId, likes: response.data.likes }; // Expecting `likes` as a Map array from server
  }
);


const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Set the posts list
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    // Add a new post
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    // Update an existing post
    updatePost: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    // Delete a post by ID
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    // Clear all posts
    clearPosts: (state) => {
      state.posts = [];
    },
    toggleLike: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find(post => post._id === postId);
      if (post) {
        // Toggle like in the Map
        if (post.likes.has(userId)) {
          post.likes.delete(userId); // Remove like
        } else {
          post.likes.set(userId, true); // Add like
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleLikeAsync.fulfilled, (state, action) => {
      console.log(state, action.payload);
      const { postId, likes } = action.payload;
      console.log(likes)
      const post = state.posts.find(post => post._id === postId);
      console.log(post)
      if (post) {
        post.likes = { ...likes }; 
      }
    });
  },
});

// Export actions
export const { setPosts, addPost, updatePost, deletePost, clearPosts } = postSlice.actions;

// Export reducer
export default postSlice.reducer;
