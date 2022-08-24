import React, { useEffect, useState } from "react";


import { Box, Button, Heading, HStack, Icon, IconButton, Image, Input, InputGroup, InputLeftElement, Link, LinkBox, Menu, MenuButton, MenuItem, MenuList, Spacer } from '@chakra-ui/react'
import { HamburgerIcon, SearchIcon, SettingsIcon } from "@chakra-ui/icons";
import { Link as Navigation } from "react-router-dom";


import { DrawerNav } from "../DrawerNav/DrawerNav";
import { SearchBar } from "../SearchBar/SearchBar";
import { CartIcon } from "../CartIcon/CardIcon";
import { OrdersDisplay } from "../OrdersDisplay/OrdersDisplay";



export const AppBar = React.memo(()=> {


    return (
        <Box bgColor='gray.700' px={'5px'} pt={'5px'} >
            <HStack spacing={0}>
                <DrawerNav />
                <LinkBox as={Navigation} to={'/'}>
                    <Image width={'100px'} alt="logo de l'entreprise" src='https://parceljs.org/logo.49e8bbc1.svg' />
                </LinkBox>
                <Spacer />
                {/* <CartIcon /> */}
                <OrdersDisplay />
            </HStack>
        </Box>
    )
})
