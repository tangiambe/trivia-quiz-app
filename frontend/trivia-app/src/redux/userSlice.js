import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    _id: -1
}

export const userSlice = createSlice({
    name: 'user', 
    initialState,
    reducers: {
        login: (state, action) => {
            state._id = action.payload.id;
        },
        logout: (state) => {
            state._id = -1;
        }
    }
})

export const {login, logout} = userSlice.actions;

export default userSlice.reducer