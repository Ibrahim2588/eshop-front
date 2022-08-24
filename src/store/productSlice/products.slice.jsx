import { createSlice } from "@reduxjs/toolkit";


export const productSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action)=> {
            state = action.payload
            return state
        },

    }
})

export const { setProducts } = productSlice.actions