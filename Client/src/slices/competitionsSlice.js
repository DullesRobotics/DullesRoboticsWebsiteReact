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
            state.value.district_info = action.payload.frc_info;
            action.payload.comps.forEach(element => state.value.comps.push(element));
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
                            console.log("1")
                            dispatch(setError(true));
                            return;
                        }
                        season = json["max_season"];
                        fetch(`${dataJson.api_server}/tba?year=${"20" + String(season).slice(2, 4)}`, { mode: 'cors', credentials: 'include' })
                            .then(res => res.json())
                            .then(json2 => {
                                if (!json2 || json2["error"]) {
                                    console.log("2")
                                    dispatch(setError(true));
                                    return;
                                }
                                fetch(`${dataJson.api_server}/toa?year=${season}`, { mode: 'cors', credentials: 'include' })
                                    .then(res => res.json())
                                    .then(json3 => {
                                        if (!json3 || json3["error"]) {
                                            console.log("3")
                                            dispatch(setError(true));
                                            return;
                                        }

                                        let masterJSON = [...json2.comps, ...json3.comps];
                                        dispatch(addCompetitions({ season: "20" + String(season).slice(2, 4), comps: masterJSON, frc_info: json2.district_info }));
                                        dispatch(setLoading(false));
                                    }).catch((e) => { console.log(e); dispatch(setError(true)); return; });

                            }).catch(() => { console.log("5"); dispatch(setError(true)); return; });
                    }).catch(() => { console.log("6"); dispatch(setError(true)); return; });
            }
        } catch (err) {
            dispatch(setError(true));
        }
    }
}

export default competitionsSlice.reducer;
