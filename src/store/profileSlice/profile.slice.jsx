import { createSlice } from "@reduxjs/toolkit";

const initialProfile = {
    "first_name": "Ibrahim",
    "last_name": "Bako",
    "phone_number": null,
    "email": "bakoibrahim258@gmail.com",
    "home_location": {
        "latitude": 47.87,
        "longitude": 545.58565
    }
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState: initialProfile,
    reducers: {
        
        setProfile: (state, action)=> {
            state = action.payload
        }

    }
})
