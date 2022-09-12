import React, { useEffect, useState } from "react";

import { Box, Button, Center, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Link, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "../../../store/userSlice/user.slice";
import { useGetOrdersQuery } from "../../../api/store.api";
import { useCookies } from "react-cookie";
import { useLoginMutation } from "../../../api/user.api";
import { useNavigate } from "react-router-dom";


export const Login = ()=> {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuthenticated = useSelector(state=> state.user.isAuthenticated)

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
        if(authToken!==undefined & isSuccess){

            let expireDate = new Date()
            const month = expireDate.getMonth()
            expireDate.setMonth(month==11? 0 : month+1)

            dispatch(setAuthToken(authToken.key))
            // removeCookie('authToken')
            // setCookie('authToken', authToken.key, {
            //     path: '/',
            //     expires: expireDate
            // })

            navigate('/')

        }
    }, [isSuccess, authToken, ])

    
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
    }



    if(isAuthenticated){
        return (
            <Box>
                
            </Box>
        )
    }

    if(isError){
        console.log('erreur', error)
        return (
            <Box>
                <Heading>Error: </Heading>
                <Text align='center' fontSize='xl' fontWeight='bold'>Attention vous ête déjà connecter.</Text>
            </Box>
        )
    }

    return (
        

        <Flex
        // marginTop='-12'
        minH={'80vh'}
        align={'center'}
        justify={'center'}
        bg='gray.50'>
            <Stack spacing={4} mx={'auto'} maxW={'lg'} py={8} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Se connecter </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg='white'
                    boxShadow={'lg'}
                    p={8}>

                    <Stack spacing={4}>

                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" onChange={handleChangeEmail} value={email} />
                        </FormControl>
                        
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" onChange={handleChangePassword} value={password} />
                        </FormControl>
                        
                        <Stack spacing={10}>
                        
                        {/* <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Checkbox>Remember me</Checkbox>
                            <Link color={'blue.400'}>Forgot password?</Link>
                        </Stack> */}
                        <Button
                            onClick={onSubmit}
                            isLoading={isLoading}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                            bg: 'blue.500',
                            }}>
                            Sign in
                        </Button>
                        <Link color={'blue.400'} onClick={()=> navigate('/account/signup')}>Je n'ai pas de compte</Link>

                        </Stack>
                    </Stack>
                </Box>
            </Stack>
    </Flex>

    )
}