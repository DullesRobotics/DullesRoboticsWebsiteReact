import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import postsReducer from './slices/postsSlice'
import competitionsReducer from './slices/competitionsSlice'
import socialReducer from './slices/socialSlice'
import documentsReducer from './slices/documentSlice'
import mediaReducer from './slices/mediaSlice'

enableMapSet();

export default configureStore({
  reducer: {
    posts: postsReducer,
    competitions: competitionsReducer,
    social: socialReducer,
    documents: documentsReducer,
    media: mediaReducer
  },
});
