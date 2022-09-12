import { createApi } from '@reduxjs/toolkit/query/react'

import { fetchBaseQuery } from '@reduxjs/toolkit/query'


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.100.30:8800/api/account/',
        prepareHeaders: (headers, { getState, }) => {
            const authToken = getState().user.authToken
            if (authToken){
                headers.set('Authorization', `Token ${authToken}`)
            }

            return headers
        }
    }),

    endpoints: (builder) => ({

        login: builder.mutation({
            query: ({email, password}) => ({
                url: `login/`,
                method: 'POST',
                body: {
                    email: email,
                    password: password
                }
            }),
            
        }),

        register: builder.mutation({
            query: ({email, password1, password2})=> ({
                url: `registration/`,
                method: 'POST',
                body: {
                    email: email,
                    password1: password1,
                    password2: password2,
                }
            })
        }),

        profileUpdate: builder.mutation({
            query: ({firstName, lastName})=> ({
                url: `user/`,
                method: 'PUT',
                body: {
                    first_name: firstName,
                    last_name: lastName,
                }
            })
        }),


        getProfile: builder.query({
            query: ()=> `user/`
        }),

    }),
    refetchOnFocus: true,
    
})


export const {
    useLoginMutation,
    useGetProfileQuery,
    useRegisterMutation,
    useProfileUpdateMutation,
} = userApi