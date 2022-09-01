import { createApi } from '@reduxjs/toolkit/query/react'

import { fetchBaseQuery } from '@reduxjs/toolkit/query'


export const storeApi = createApi({
    reducerPath: 'storeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.190.30:8800/api/store/',
        prepareHeaders: (headers, { getState, }) => {
            const authToken = getState().user.authToken
            if (authToken){
                headers.set('Authorization', `Token ${authToken}`)
            }

            return headers
        }
    }),
    endpoints: (builder) => ({

        getAllProducts: builder.query({
            query: () => `product/`,
        }),

        searchProducts: builder.query({
            query: (search)=> `product/?search=${search}`
        }),

        getCategories: builder.query({
            query: ()=> `categories/`
        }),

        getProductsCategory: builder.query({
            query: ({categoryValue, pageNumber})=> `product/category/${categoryValue}/?page=${pageNumber}`
        }),

        getRecomendedProductsCategory: builder.query({
            query: (categoryValue)=> `product/category/recomended/${categoryValue}/`
        }),

        getProduct: builder.query({
            query: (productId) => `product/${productId}/`
        }),

        getOrders: builder.query({
            query: ()=> `order/`
        }),

        createOrder: builder.mutation({
            query: ({productId, quantity}) => ({
                url: 'order/',
                method: 'POST',
                body: {
                    product: productId,
                    quantity: quantity,
                }
            })
        }),

        updateOrder: builder.mutation({
            query: ({orderId, quantity}) => ({
                url: `order/${orderId}/`,
                method: 'PATCH',
                body: {
                    quantity: quantity,
                }
            })
        }),
        
        deleteOrder: builder.mutation({
            query: (orderId)=> ({
                url: `order/${orderId}/`,
                method: 'DELETE',
            })
        }),


        createCommand: builder.mutation({
            query: ({hasDeliver})=> ({
                url: `command/`,
                method: 'POST',
                body: {
                    has_deliver: hasDeliver,
                },
            })
        }),

        getBestProducts: builder.query({
            query: ()=> `bestproduct/`
        })


        //===========================================//


    }),
})


export const {
    useGetAllProductsQuery,
    useGetCategoriesQuery,
    useGetProductQuery,
    useGetProductsCategoryQuery,
    useGetOrdersQuery,
    useCreateOrderMutation,
    useSearchProductsQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useGetRecomendedProductsCategoryQuery,
    useCreateCommandMutation,
    useGetBestProductsQuery,


 } = storeApi