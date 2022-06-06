import { createSlice } from '@reduxjs/toolkit'
import dataJson from "../data.json"

export const mediaSlice = createSlice({
    name: 'mediaPage',
    initialState: {
        value: {
            media: {},
            error: false,
            loading: false,
        }
    },
    reducers: {
        addMediaFolder: (state, action) => {
            state.value.media[action.payload.folderName] = action.payload.folderMedia;
            state.value.loading = false;
        },
        setError: (state, action) => {
            state.value.loading = action.payload === true ? false : state.value.loading;
            state.value.error = action.payload;
        },
        setLoading: (state, action) => {
            state.value.loading = action.payload;
        }
    }
})

export const { addMediaFolder, setError, setLoading } = mediaSlice.actions;

export const selectMediaFolders = state => state.mediaPage.value;

export const loadMediaFolder = () => {
    return (dispatch, getState) => {
        if (!getState().mediaPage.value.loading) {
            dispatch(setLoading(true));
            fetch(`${dataJson.api_server}/media_folder/list`, { mode: 'cors', credentials: 'include' })
                .then(res => res.json())
                .then(json => {
                    if (!json || json.error || !json.media_folders) {
                        dispatch(setError(true));
                        return;
                    }
                    fetch(`${dataJson.api_server}/media/list`, { mode: 'cors', credentials: 'include' })
                        .then(res => res.json())
                        .then(json2 => {
                            if (!json2 || json2.error || !json2.media) {
                                dispatch(setError(true));
                                return;
                            }
                            const mediaFolders = json.media_folders;
                            const serverMediaArray = json2.media

                            for (let m in mediaFolders) {
                                const clientMediaArray = []
                                for (let ma in serverMediaArray) {
                                    if (Number(serverMediaArray[ma].group) === Number(mediaFolders[m].id))
                                        clientMediaArray.push(serverMediaArray[ma])
                                }

                                dispatch(addMediaFolder({ folderName: mediaFolders[m].title, folderMedia: clientMediaArray }))
                            }

                        }).catch((err) => { dispatch(setError(true)); });

                }).catch((err) => { dispatch(setError(true)); });
        }

    }
}

export default mediaSlice.reducer;
