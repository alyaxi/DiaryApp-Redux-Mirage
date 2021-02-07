import {createSlice, PayloadAction} from "@reduxjs/toolkit"

import {Diary} from "../../Interfaces/Diary";

const diary = createSlice({
    name: "diary",
    initialState: [] as Diary[],
    reducers: {
        addDiary(state, {payload}: PayloadAction<Diary[]>){
            const diaryToSave = payload.filter((diary) => {
                return state.findIndex((item) => item.id === diary.id) === -1
            });
            state.push(...diaryToSave)
        },
        updateDiary(state, {payload}: PayloadAction<Diary>){
            const {id} = payload;
            const diaryIndex = state.findIndex((diary) => diary.id === id);
            console.log(diaryIndex);
            
            if(diaryIndex !== -1){
                state.splice(diaryIndex,1, payload)
            }
        }
    }
})

export const { addDiary, updateDiary } = diary.actions;
export default diary.reducer;