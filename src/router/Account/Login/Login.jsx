import React, { useEffect, useState } from "react";

import { Box, Button, Center, FormControl, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "../../../store/userSlice/user.slice";
import { useGetOrdersQuery } from "../../../api/store.api";
import { useCookies } from "react-cookie";
import { useLoginMutation } from "../../../api/user.api";
import { useNavigate } from "react-router-dom";


export const Login = ()=> {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [cookies, setCookie, removeCookie] = useCookies('authToken')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login, {
            data: authToken,
            isLoading,
            isSuccess,
            error,
            isError,
        }] = useLoginMutation()

    useEffect(()=> {
        if(authToken!==null & isSuccess===true){
            
            let expireDate = new Date()
            const month = expireDate.getMonth()
            expireDate.setMonth(month==11? 0 : month+1)

            dispatch(setAuthToken(authToken.key))
            removeCookie('authToken')
            setCookie('authToken', authToken.key, {
                path: '/',
                expires: expireDate
            })
        }
    }, [isSuccess, authToken])

    
    const handleChangeEmail = (event)=> {
        event.preventDefault()
        setEmail(event.target.value)
    }
    const handleChangePassword = (event)=> {
        event.preventDefault()
        setPassword(event.target.value)
    }

    const onSubmit = (event)=> {
        event.preventDefault()
        login({email: email, password: password})
        navigate('/')
    }



    return (
        
        <Box bgColor='pink.300' height='full'>
            <Center padding={12} paddingBottom='96'>
                <Box>
                    <VStack shadow='xs' width={['250px', 'xs', 'md']} bgColor='red.200' padding='4' rounded={'lg'} >
                        <FormControl>
                            <FormLabel>Email: </FormLabel>
                            <Input size={['sm', 'md', 'lg',]} type='email' onChange={handleChangeEmail} value={email} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password: </FormLabel>
                            <Input size={['sm', 'md', 'lg',]} type='password' onChange={handleChangePassword} value={password} />
                        </FormControl>
                    <Button  colorScheme={'twitter'} onClick={onSubmit}>Login</Button>
                    </VStack>
                </Box>
            </Center>
        </Box>
    )
}