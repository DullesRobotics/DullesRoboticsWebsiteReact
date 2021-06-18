import { createSlice } from '@reduxjs/toolkit'
import dataJson from "../data.json"

export const socialSlice = createSlice({
    name: 'social',
    initialState: {
        value: { instagram: [], selected: 0, error: false, loading: false, finished: false }
    },
    reducers: {
        addInstagramPosts: (state, action) => {
            state.value.instagram = action.payload;
            state.value.finished = true;
        },
        setError: (state, action) => {
            state.value.error = action.payload;
            state.value.finished = true;
        },
        setLoading: (state, action) => {
            state.value.loading = action.payload;
        },
        setSelected: (state, action) => {
            state.value.selected = action.payload;
        }
    }
})

export const { addInstagramPosts, setError, setLoading, setSelected } = socialSlice.actions;

export const selectSocialFeed = state => state.social.value;

export const loadInstagramPosts = () => {
    return (dispatch, getState) => {
        try {
            if (!getState().competitions.value.finished) {
                dispatch(setLoading(true));
                fetch(`${dataJson.api_server}/instagram`, { mode: 'cors', credentials: 'include' })
                    .then(res => res.json())
                    .then(json => {
                        if (!json || json.error || !json.data) {
                            dispatch(setError(true));
                            return;
                        }
                        dispatch(addInstagramPosts(json.data))
                    }).catch(() => { dispatch(setError(true)); return; });
            }
        } catch (err) {
            dispatch(setError(true));
        }
    }
}

export default socialSlice.reducer;
