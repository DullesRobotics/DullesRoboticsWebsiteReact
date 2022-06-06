import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import postsReducer from './slices/postsSlice'
import competitionsReducer from './slices/competitionsSlice'
import documentsReducer from './slices/documentSlice'
import mediaReducer from './slices/mediaSlice'
import mediaPageReducer from './slices/mediaPageSlice'

enableMapSet();

export default configureStore({
  reducer: {
    posts: postsReducer,
    competitions: competitionsReducer,
    documents: documentsReducer,
    media: mediaReducer,
    mediaPage: mediaPageReducer
  },
});
