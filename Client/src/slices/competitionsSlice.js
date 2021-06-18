import { createSlice } from '@reduxjs/toolkit'
import dataJson from "../data.json"

export const competitionsSlice = createSlice({
    name: 'competitions',
    initialState: {
        value: { season: null, district_info: {}, comps: [], error: false, loading: false }
    },
    reducers: {
        addCompetitions: (state, action) => {
            state.value.season = action.payload.season;
            state.value.district_info = action.payload.comps.district_info;
            action.payload.comps.comps.forEach(element => state.value.comps.push(element));
        },
        setError: (state, action) => {
            state.value.error = action.payload;
        },
        setLoading: (state, action) => {
            state.value.loading = action.payload;
        }
    }
})

export const { addCompetitions, setError, setLoading } = competitionsSlice.actions;

export const selectCompetitions = state => state.competitions.value;

export const loadCompetitions = () => {
    return (dispatch, getState) => {
        try {
            if (!getState().competitions.value.finished) {
                dispatch(setLoading(true));
                let season = new Date().getFullYear();
                fetch(`${dataJson.api_server}/tba/season`, { mode: 'cors', credentials: 'include' })
                    .then(res => res.json())
                    .then(json => {
                        if (!json || json["error"] || !json["max_season"]) {
                            dispatch(setError(true));
                            return;
                        }
                        season = json["max_season"];
                        fetch(`${dataJson.api_server}/tba?year=${season}`, { mode: 'cors', credentials: 'include' })
                            .then(res => res.json())
                            .then(json2 => {
                                if (!json2 || json2["error"]) {
                                    dispatch(setError(true));
                                    return;
                                }
                                dispatch(addCompetitions({ season: season, comps: json2 }));
                                dispatch(setLoading(false));
                            }).catch(() => { dispatch(setError(true)); return; });
                    }).catch(() => { dispatch(setError(true)); return; });
            }
        } catch (err) {
            dispatch(setError(true));
        }
    }
}

export default competitionsSlice.reducer;
