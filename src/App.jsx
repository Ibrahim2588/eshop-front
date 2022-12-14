import React, { useEffect, useState } from "react";


import { Box, Button, Container, Divider, Grid, Spinner } from "@chakra-ui/react";


import { useGetAllProductsQuery, useGetOrdersQuery } from "./api/store.api";
import Router from "./router/router";
import { AppBar } from "./components/AppBar/AppBar";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./store/productSlice/products.slice";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { setAllOrders } from "./store/orderSlice/order.slice";
import { useGetAuthTokenMutation, useGetProfileQuery } from "./api/user.api";
import { setAuthToken, setProfile } from "./store/userSlice/user.slice";
import { Footer } from "./components/Footer/Footer";
import { useGeolocated } from "react-geolocated";


const orderGet = ()=> {

    const dispatch = useDispatch()

    const isAuthenticated = useSelector(state=> state.user.isAuthenticated)
    const {
        data: orders,
        isSuccess,
        isLoading,
        isError,
        error,
        status,
        refetch,
    } = useGetOrdersQuery()

    useEffect(()=> {
        if(isAuthenticated){
            refetch()
        }
    }, [isAuthenticated,])

    useEffect(()=> {
        if(isSuccess){
            dispatch(setAllOrders(orders))
        }
    }, [isSuccess, orders])
}


const profileGet = ()=> {

    const dispatch = useDispatch()

    const isAuthenticated = useSelector(state=> state.user.isAuthenticated)
    const {
        data: profile,
        isSuccess,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetProfileQuery()

    useEffect(()=> {
        if(isAuthenticated===true){
            refetch()
        }
    }, [isAuthenticated])

    useEffect(()=> {
        if(isAuthenticated & profile!==null & isSuccess){
            dispatch(setProfile(profile))
        }
    }, [profile, isAuthenticated, isSuccess])

}



export const App = React.memo(()=> {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [location, setLocation] = useState(null)

    const { 
        coords,
        getPosition,
        isGeolocationAvailable,
        isGeolocationEnabled
    } = useGeolocated()

    const [cookies, setCookie, removeCookie] = useCookies([
        'authToken',
    ])

    useEffect(()=> {
        if(cookies.authToken!==undefined){
            dispatch(setAuthToken(cookies.authToken))
        } else {
            // navigate('/account/login')
        }
    }, [cookies])

    useEffect(()=> {
        // getPosition( )
        // console.log(nav.getCurrentPosition())
        // navigator.permissions.query({name: 'geolocation'}).then(()=> {
        //     const nav = navigator.geolocation
        //     // setLocation(nav)
        //     nav.getCurrentPosition((loc)=> {
        //         // console.log(loc.coords)
        //         setLocation(loc)
        //     }, (error)=> {
        //         // setLocation(error.message)
        //     })
        // })
    }, [])



    orderGet()
    profileGet()


    return (
        <>
            <Box bgColor='gray.50'>
                <AppBar />
                salut
                {isGeolocationEnabled}
                {console.log(coords)}
        {/* {location? JSON.stringify(location.latitude) : 'null'}
        {location? JSON.stringify(location.longitude) : 'null'} */}
                <Router />
                <Footer />
            </Box>
        </>
    )
})