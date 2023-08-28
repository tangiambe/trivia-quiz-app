import { createSlice } from "@reduxjs/toolkit"


const initialState = {

    _id: "-1",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
        
    
}

export const userSlice = createSlice({
    name: 'user', 
    initialState,
    reducers: {
        login: (state, action) => {
            const {_id, firstName, lastName, username, email, password} = action.payload;
            return {
                ...state,
                _id,
                firstName,
                lastName,
                username,
                email,
                password
            }
        },
        logout: (state) => {
            state._id = -1;
        }
    }
})

export const {login, logout} = userSlice.actions;

export default userSlice.reducer