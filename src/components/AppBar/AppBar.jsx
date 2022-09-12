import React, { useEffect, useState } from "react";


import { Box, Button, Heading, HStack, Icon, IconButton, Image, Input, InputGroup, InputLeftElement, Link, LinkBox, Menu, MenuButton, MenuItem, MenuList, Spacer } from '@chakra-ui/react'
import { HamburgerIcon, SearchIcon, SettingsIcon } from "@chakra-ui/icons";
import { Link as Navigation, useNavigate } from "react-router-dom";


import { DrawerNav } from "../DrawerNav/DrawerNav";
import { SearchBar } from "../SearchBar/SearchBar";
import { CartIcon } from "../CartIcon/CardIcon";
import { OrdersDisplay } from "../OrdersDisplay/OrdersDisplay";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";



export const AppBar = React.memo(()=> {
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state=> state.user.isAuthenticated)
    const user = useSelector((state)=> state.user.profile)

    return (
        <Box bgColor='gray.700' px={1} pt={1} >
            <HStack spacing={0}>
                <DrawerNav />
                <LinkBox as={Navigation} to={'/'}>
                    <Image width={'100px'} alt="logo de l'entreprise" src='https://parceljs.org/logo.49e8bbc1.svg' />
                </LinkBox>
                <Spacer />
                <HStack>
                    {user ? user.is_staff ? <Button size={'sm'} variant='outline' colorScheme='messenger' textTransform='uppercase' onClick={()=> navigate('/delivers') } >Commandes</Button> : null : null}
                    <OrdersDisplay />
                </HStack>
                {!isAuthenticated? <Box>
                    <Button size={'sm'} variant='outline' colorScheme='messenger' textTransform='uppercase' onClick={()=> navigate('/account/login') } >Se connecter</Button>
                </Box>: null}
            </HStack>
        </Box>
    )
})
