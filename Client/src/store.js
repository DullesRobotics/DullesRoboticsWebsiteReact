import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice'
import competitionsReducer from './slices/competitionsSlice'
import socialReducer from './slices/socialSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    competitions: competitionsReducer,
    social: socialReducer
  },
});
