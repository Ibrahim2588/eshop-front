import React, { useMemo } from "react";

import { Box, Button, Center, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Input, Modal, Text, VStack } from '@chakra-ui/react'
import { useState } from "react";
import { useProfileUpdateMutation, useRegisterMutation } from "../../../api/user.api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../../store/userSlice/user.slice";
import { useDispatch, useSelector } from "react-redux";


export const Signup = ()=> {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isAuthenticated = useSelector(state=> state.user.isAuthenticated)

    const [register, {
        data: token,
        isSuccess: registerIsSuccess,
        isLoading: registerIsLoading,
        isError: registerIsError,
        error
    }] = useRegisterMutation()

    const [createProfile, {
        data: profile,
        isSuccess: profileUpdateIsSuccess,
        isLoading: profileUpdateIsLoading,
        isError: profileUpdateIsError,
        error: profileUpdateError,
    }] = useProfileUpdateMutation()


    const [email, setEmail] = useState('')
    const handleChangeEmail = (event)=> {
        event.preventDefault()
        setEmail(event.target.value)
    }

    const [password1, setPassword1] = useState('')
    const handleChangePassword1 = (event)=> {
        event.preventDefault()
        setPassword1(event.target.value)
    }

    const [password2, setPassword2] = useState(null)
    const handleChangePassword2 = (event)=> {
        event.preventDefault()
        setPassword2(event.target.value)
    }

    const [lastName, setLastName] = useState('')
    const handleChangeLastName = (event)=> {
        event.preventDefault()
        setLastName(event.target.value)
    }

    const [firstName, setFirstName] = useState('')
    const handleChangeFirstName = (event)=> {
        event.preventDefault()
        setFirstName(event.target.value)
    }

    const [image, setImage] = useState('')
    const handleChangeImage = (event)=> {
        event.preventDefault()
        setImage(event.target.value)
    }


    const isValidPassword = useMemo(()=> {
        if(password1===password2 | password2===null){
            return true
        } else {
            return false
        }
    }, [password1, password2])

    const signupDisable = useMemo(()=> {
        if(!isValidPassword){
            return true
        } else {
            return false
        }
    }, [isValidPassword, ])


    const onRegister = (event)=> {
        event.preventDefault()

        register({
            email: email,
            password1: password1,
            password2: password2,
        })

    }

    useEffect(()=> {
        if(registerIsSuccess & token!==undefined){
            dispatch(setAuthToken(token.key))
            createProfile({
                firstName: firstName,
                lastName: lastName,
            })
        }

        if(profileUpdateIsSuccess & profile!==undefined){
            navigate('/')
        }
    }, [registerIsSuccess, profileUpdateIsSuccess, token, ])

    const isLoading = useMemo(()=> {
        if(registerIsLoading | profileUpdateIsLoading){
            return true
        } else {
            return false
        }
    }, [registerIsLoading, profileUpdateIsLoading, ])


    if(isAuthenticated){
        console.log(isAuthenticated)
        return (
            <Box>
                <Text align='center' fontSize='4xl' fontWeight='bold'>Attention vous ête déjà connecter</Text>
            </Box>
        )
    }

    return (
        <Box >
            <Center paddingY={10} >
                <Box rounded='lg' shadow='xs' padding={8} paddingY={4} bgColor='white' margin='auto'>
                    <Text align='center' padding={2} fontSize={{base: 'xl'}} fontWeight='semibold'>S'enregistrer</Text>
                    <VStack spacing={4}>
                        
                        <FormControl isRequired  isInvalid={false} >
                            <FormLabel>Email : </FormLabel>
                            <FormErrorMessage>L'email entrer n'est pas valide</FormErrorMessage>
                            <Input type='email' onChange={handleChangeEmail} value={email} size={{base: 'sm'}} placeholder='Jean@exemple.com' />
                        </FormControl>
                        <FormControl isRequired isInvalid={false} >
                            <FormLabel>Mot de passe : </FormLabel>
                            <Input type='password' onChange={handleChangePassword1} value={password1} size={{base: 'sm'}} />
                        </FormControl>
                        <FormControl isRequired isInvalid={!isValidPassword} >
                            <FormLabel>Confirmer le mot de passe : </FormLabel>
                            <FormErrorMessage fontSize={'xs'}>Les deux mots de passe ne <br/>sont pas les même</FormErrorMessage>
                            <Input type='password' onChange={handleChangePassword2} value={password2} size={{base: 'sm'}} />
                        </FormControl>

                        <Divider />
                        
                        <FormControl isRequired  isInvalid={false} >
                            <FormLabel>Nom : </FormLabel>
                            <Input type='text' onChange={handleChangeLastName} value={lastName} size={{base: 'sm'}} placeholder='Ouedraogo' />
                        </FormControl>
                        <FormControl isRequired  isInvalid={false} >
                            <FormLabel>Prénom : </FormLabel>
                            <Input type='text' onChange={handleChangeFirstName} value={firstName}  size={{base: 'sm'}} placeholder='Jean' />
                        </FormControl>
                        <FormControl isRequired  isInvalid={false} >
                            <FormLabel>Photo de profile : </FormLabel>
                            <Input type='file' onChange={handleChangeImage}  size={{base: 'xs'}} maxWidth={40} />
                        </FormControl>
                        <Button type="submit" onClick={onRegister} isDisabled={signupDisable} isLoading={isLoading} loadingText='Creation du compte' variant='solid'  colorScheme='twitter' >M'EREGISTRER</Button>
                    </VStack>
                </Box>
            </Center>
        </Box>
    )
}