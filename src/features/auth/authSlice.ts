import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface authState {
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: authState = {
    token: null,
    isAuthenticated: false,
}

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveToken(state, {payload}: PayloadAction<string>){
            if(payload){
                state.token = payload;
            }
        },
        clearToken(state, {payload}: PayloadAction<string>){
            if(payload){
                state.token = null
            }
        },
        setAuthState(state, {payload}: PayloadAction<boolean>){
            if(payload) {
                state.isAuthenticated = payload
            }
        }
    }
})

export const {saveToken, clearToken, setAuthState} = auth.actions;

export default auth.reducer;