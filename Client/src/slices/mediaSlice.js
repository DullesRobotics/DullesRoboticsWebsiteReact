import { createSlice } from '@reduxjs/toolkit'
import dataJson from "../data.json"

export const mediaSlice = createSlice({
    name: 'media',
    initialState: {
        value: { cached: new Map() }
    },
    reducers: {
        addMedia: (state, action) => {
            state.value.cached.set(action.payload.file, action.payload.blob);
        }
    }
})

export const { addMedia } = mediaSlice.actions;

export const selectMedia = state => state.media.value;

export const loadMediaFile = (file) => {
    return (dispatch, getState) => {
        try {
            if (!selectMedia(getState()).cached.has(file)) {
                dispatch(addMedia({ file: file, blob: null }))
                fetch(`${dataJson.api_server}/resource/get/blob?file=${file}`, { mode: 'cors', credentials: 'include' })
                    .then(res => res.blob())
                    .then(blob => {
                        if (!blob)
                            return console.log("error loading file: " + file)
                        dispatch(addMedia({ file: file, blob: URL.createObjectURL(blob) }))
                    }).catch((err) => { console.log(err) });
            }
        } catch (err) { console.log(err) }
    }
}

export default mediaSlice.reducer;
