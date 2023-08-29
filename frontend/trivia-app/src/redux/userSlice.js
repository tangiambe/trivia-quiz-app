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
            console.log(`Action.payload: ${JSON.stringify(action.payload)}`)
            state._id = _id;
            state.firstName = firstName;
            state.lastName = lastName;
            state.username = username;
            state.email = email;
            state.password = password;
        },
        logout: (state) => {
            state._id = "-1";
            state.firstName = "";
            state.lastName = "";
            state.username = "";
            state.email = "";
            state.password = "";
        }
    }
})

export const {login, logout} = userSlice.actions;

export default userSlice.reducer