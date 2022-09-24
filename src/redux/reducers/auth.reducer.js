import { createSlice } from "@reduxjs/toolkit";


const authReducer = createSlice({
    name:"auth",
    initialState: {
        token:null,
        udata:{}
    },
    reducers: {
        successLogin: (state, action)  => {
            state.udata = action.payload
        },
    }

})

export const { successLogin } = authReducer.actions

export const loggedIn = (state) => state.auth.udata
 
export default authReducer.reducer