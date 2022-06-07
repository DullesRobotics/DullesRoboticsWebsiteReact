import { createSlice } from '@reduxjs/toolkit'
import dataJson from "../data.json"

export const documentsSlice = createSlice({
    name: 'documents',
    initialState: {
        value: { documents: [], error: false, loading: false, finished: false, downloading: false }
    },
    reducers: {
        addDocuments: (state, action) => {
            state.value.documents = action.payload;
            state.value.finished = true;
        },
        setError: (state, action) => {
            state.value.error = action.payload;
            state.value.finished = true;
        },
        setLoading: (state, action) => {
            state.value.loading = action.payload;
        },
        setDownloading: (state, action) => {
            state.value.downloading = action.payload
        }
    }
})

export const { addDocuments, setError, setLoading, setDownloading } = documentsSlice.actions;

export const selectDocuments = state => state.documents.value;

export const loadDocuments = () => {
    return (dispatch, getState) => {
        try {
            if (!getState().documents.value.finished) {
                dispatch(setLoading(true));
                fetch(`${dataJson.api_server}/resource/list`, { mode: 'cors', credentials: 'include' })
                    .then(res => res.json())
                    .then(json => {
                        if (!json || json.error || !json.resources) {
                            dispatch(setError(true));
                            return;
                        }
                        dispatch(addDocuments(json.resources))
                    }).catch(() => { dispatch(setError(true)); return; });
            }
        } catch (err) {
            dispatch(setError(true));
        }
    }
}

export default documentsSlice.reducer;
