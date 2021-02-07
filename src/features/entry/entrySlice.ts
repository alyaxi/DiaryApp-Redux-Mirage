import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Entry} from "../../Interfaces/Entry";

const entry = createSlice({
    name: "entry",
    initialState : [] as Entry[],
    reducers: {
        setEntry (state, {payload}: PayloadAction<Entry[] | null>){
            return (state = payload != null ? payload: [])
        },
        updateEntry(state, {payload}: PayloadAction<Entry>){
            const { id } = payload;
            const entryIndex = state.findIndex((entry) => entry.id === id)

            if (entryIndex !== -1){
                return state.splice(entryIndex, 1, payload)
            }
        }
    }
})
export const {setEntry , updateEntry} = entry.actions;
export default entry.reducer;
