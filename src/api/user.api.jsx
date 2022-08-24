import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.11.145:8800/api/account/',
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

        getProfile: builder.query({
            query: ()=> `user/`
        }),

    }),
    refetchOnFocus: true,
    
})


export const {
    useLoginMutation,
    useGetProfileQuery,
} = userApi