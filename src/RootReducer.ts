import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/auth/userSlice"
import diaryReducer from "./features/diary/diarySlice"
import editorReducer from "./features/entry/editiorSlice"
import entryReducer from "./features/entry/entrySlice"

const rootReducer = combineReducers({
    auth: authReducer,
    diary: diaryReducer,
    user: userReducer,
    editor: editorReducer,
    entry: entryReducer,

})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;