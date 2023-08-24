import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userId: -1
}

export const userSlice = createSlice({
    name: 'user', 
    initialState,
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.id;
        },
        logout: (state) => {
            state.userId = -1;
        }
    }
})

export const {login, logout} = userSlice.actions;

export default userSlice.reducer