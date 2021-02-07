import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { bool } from "yup";
import { boolean } from "yup/lib/locale";
import {Entry} from "../../Interfaces/Entry";
import entry from "./entry";

interface EditorState {
    canEdit: boolean;
    currentlyEdit: Entry | null;
    activeDiaryID: string | null;

};

const initialState: EditorState = {
    canEdit: false,
    currentlyEdit: null,
    activeDiaryID: null,
};

const editor = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setCanEdit(state, {payload}: PayloadAction<boolean>){
            state.canEdit = payload != null ? payload: !state.canEdit
        },
        setCurrentlyEdit(state, {payload}: PayloadAction<Entry | null>){
            state.currentlyEdit = payload;
        },
        setActiveDiaryId(state, {payload}: PayloadAction<string | null>){
            state.activeDiaryID = payload;
        }
    }
})
export const {setCurrentlyEdit, setActiveDiaryId, setCanEdit} = editor.actions;
export default editor.reducer;