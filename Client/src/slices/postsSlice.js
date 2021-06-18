import { createSlice } from '@reduxjs/toolkit'
import dataJson from "../data.json"

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        value: { posts: [], error: false, loading: false, finished: false, indPost: [] }
    },
    reducers: {
        addPosts: (state, action) => {
            action.payload.forEach(element => state.value.posts.push(element));
        },
        setError: (state, action) => {
            state.value.error = action.payload;
        },
        setLoading: (state, action) => {
            state.value.loading = action.payload;
        },
        setFinished: (state, action) => {
            state.value.finished = action.payload;
        },
        addPostIndividually: (state, action) => {
            state.value.indPost.push(action.payload);
        },
        deleteIndPosts: (state, action) => {
            state.value.indPost = [];
        }
    }
})

export const { addPosts, setError, setLoading, setFinished, addPostIndividually, deleteIndPosts } = postsSlice.actions;

export const selectPosts = state => state.posts.value;

export const getPost = (id) => {
    return (dispatch, getState) => {
        try {
            if (!getState().posts.value.finished && !getState().posts.value.loading) {
                dispatch(setLoading(true));
                fetch(`${dataJson.api_server}/post?id=${id}`, { mode: 'cors', credentials: 'include' })
                    .then(res => res.json())
                    .then(json => {
                        if (!json || json["error"]) {
                            dispatch(setError(true));
                            return;
                        } else {
                            if (JSON.stringify(json) === "{}")
                                dispatch(addPostIndividually({ "id": id }));
                            else
                                dispatch(addPostIndividually(json))
                        }
                        dispatch(setLoading(false));
                        return;
                    }).catch(() => { dispatch(setError(true)); return; });
            }
        } catch (err) {
            dispatch(setError(true));
        }
    }
}

export const getMorePosts = () => {
    return (dispatch, getState) => {
        try {
            if (!getState().posts.value.finished) {
                dispatch(setLoading(true));
                let bundle = getState().posts.value.posts, _bundlelength = bundle.length;
                fetch(`${dataJson.api_server}/posts?i=${_bundlelength}`, { mode: 'cors', credentials: 'include' })
                    .then(res => res.json())
                    .then(json => {
                        if (!json.posts) {
                            dispatch(setError(true));
                            return;
                        } else {
                            if (json.posts.length < 1)
                                dispatch(setFinished(true));
                            else
                                dispatch(addPosts(json.posts));
                        }
                        dispatch(setLoading(false));
                    }).catch(() => { dispatch(setError(true)); return; });
            }
        } catch (err) {
            dispatch(setError(true));
        }
    }
}

export default postsSlice.reducer;
