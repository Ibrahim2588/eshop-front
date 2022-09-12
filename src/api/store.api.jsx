import { createApi } from '@reduxjs/toolkit/query/react'

import { fetchBaseQuery } from '@reduxjs/toolkit/query'


export const storeApi = createApi({
    reducerPath: 'storeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.100.30:8800/api/store/',
        prepareHeaders: (headers, { getState, }) => {
            const authToken = getState().user.authToken
            if (authToken){
                headers.set('Authorization', `Token ${authToken}`)
            }

            return headers
        }
    }),
    // refetchOnMountOrArgChange: true,
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
            }),
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

        getCommands: builder.query({
            query: ()=> `command/`
        }),

        getDelivers: builder.query({
            query: ()=> `command/all/`
        }),

        sellCommand: builder.mutation({
            query: (code)=> ({
                url: `sell_command/`,
                method: 'POST',
                body: {
                    code: code,
                }
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
    useGetCommandsQuery,
    useGetDeliversQuery,
    useSellCommandMutation,
    useGetBestProductsQuery,


 } = storeApi