import { createSlice } from "@reduxjs/toolkit";


export const orderSlice = createSlice({
    name: 'orders',
    initialState: [],
    reducers: {
        setAllOrders: (state, action)=> {
            state = action.payload
            return state
        },

        addOrder: (state, action)=> {
            state.push(action.payload)
        },

        updateOrder: (state, action)=> {
            const {orderId, newQuantity} = action.payload
            state.map((order)=> {
                if(order.id === orderId){
                    order.quantity = newQuantity
                    order.order_price = newQuantity*order.product_price
                }
            })

            return state
        },

        deleteOrder: (state, action)=> {
            state = state.filter(order=> order.id!==action.payload)
            return state
        },

        //================================================//

        incrementOrderQuantity: (state, action)=> {
            let orders = state
            let new_order = action.payload

            const order = orders.find((order)=> order.id === new_order.id)
            order.quantity += 1
        },

        decrementOrderQuantity: (state, action)=> {
            let orders = state
            let new_order = action.payload

            const order = orders.find((order)=> order.id === new_order.id)
            order.quantity -= 1
        },

        

        toggleOrderInCard: (state, action)=> {
            const orderId = action.payload
            const order = state.filter((order)=> order.id === orderId)
            order.is_in_card = !order.is_in_card
        }
    }
})


export const {
    setAllOrders,
    addOrder,
    updateOrder,
    deleteOrder,
} = orderSlice.actions