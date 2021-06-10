import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice'
import competitionsReducer from './slices/competitionsSlice'
import socialReducer from './slices/socialSlice'
import documentsReducer from './slices/documentSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    competitions: competitionsReducer,
    social: socialReducer,
    documents: documentsReducer
  },
});
