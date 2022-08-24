import { createSlice } from "@reduxjs/toolkit";

const user = {
    isAuthenticated: false,
    authToken: null,
    profile: null,
    // is_seller: false,
    // is_cashier: false,
    // is_delivery_man: false,
    // is_staff: false,
    // refreshToken: null
}


export const userSlice = createSlice({
    name: 'user',
    initialState: user,
    reducers: {

        setAuthToken: (state, action)=> {
            state.authToken = action.payload
            state.isAuthenticated = true
            return state
        },
        
        setProfile: (state, action)=> {
            state.profile = action.payload
            return state
        },


        // setRefreshToken: (state, action)=> {
        //     state.refreshToken = action.payload
        // },

    }
})


export const { 
    setProfile, 
    setAuthToken,
} = userSlice.actions

