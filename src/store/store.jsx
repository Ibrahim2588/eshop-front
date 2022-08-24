import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";


import { storeApi } from "../api/store.api";
import { productSlice } from "./productSlice/products.slice";

import { userApi } from "../api/user.api";
import { userSlice } from "./userSlice/user.slice";
import { orderSlice } from "./orderSlice/order.slice";


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        orders: orderSlice.reducer,
        products: productSlice.reducer,
        [storeApi.reducerPath]: storeApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },

    middleware: (getDefaultMiddleware) => {
        getDefaultMiddleware().concat(storeApi.middleware)
        getDefaultMiddleware().concat(userApi.middleware)
        return getDefaultMiddleware()
    },
    devTools: process.env.NODE_ENV === 'development'
})

setupListeners(store.dispatch)
