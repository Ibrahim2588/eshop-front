import React, { useRef, useState } from "react";

import { Avatar, Box, Button, Collapse, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, HStack, IconButton, Link, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { AddIcon, ChevronDownIcon, ChevronUpIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link as Navigation } from 'react-router-dom'
import { MenuIcon } from '@heroicons/react/solid'

import { useGetCategoriesQuery } from "../../api/store.api";
import { useSelector } from "react-redux";
import { useMemo } from "react";


export const DrawerNav = ()=> {

    const isAuthenticated = useSelector(state=> state.user.isAuthenticated)

    const {isOpen, onOpen, onClose} = useDisclosure()

    const drawerRef = useRef()


    return (
        <Box>
            <IconButton variant='unstyled' size='md' icon={<HamburgerIcon  width='8' height='8' color={'iconColor'} />} ref={drawerRef} onClick={onOpen} />
            <Drawer isOpen={isOpen} placement='left' size='xs' onClose={onClose} finalFocusRef={drawerRef }>
                <DrawerOverlay />
                
                <DrawerContent>
                    <DrawerCloseButton color={'red.600'} border='2px' />

                    <DrawerHeader bgColor='yellow.800'>
                        {isAuthenticated? 
                        <Head /> : null }
                        
                    </DrawerHeader>

                    <DrawerBody bgColor='blackAlpha.100'>
                        <Button variant='link' size='lg' fontSize='2xl' colorScheme='orange' as={Navigation} to='/aceuil' onClick={onClose}>Aceuil</Button>
                        
                        <Divider height={4} color='black' variant='solid' />
                        
                        <Navigations onCloseDrawer={onClose} />
                    </DrawerBody>

                    <DrawerFooter></DrawerFooter>

                </DrawerContent>
            </Drawer>
        </Box>
    )
}



const Navigations = React.memo(({onCloseDrawer})=> {

    const {
        data: categories, 
        isSuccess
    } = useGetCategoriesQuery()

    const {isOpen, onOpen, onClose, onToggle} = useDisclosure()


    return (
        <Box>
            <Box>
                <Button size='lg' fontSize='2xl' onClick={onToggle} variant='link' colorScheme='orange' rightIcon={isOpen? <ChevronUpIcon /> : <ChevronDownIcon />} >Categories</Button>
                <Collapse in={isOpen} animateOpacity >
                    <VStack align='start' paddingLeft={8} paddingTop={1}>
                        {isSuccess?
                            categories.map((category)=> {
                                return <Button variant='link' size='lg' fontSize='xl' marginY={1} key={category.value} as={Navigation} to={`/categorie/${category.value}`} colorScheme='orange' onClick={onCloseDrawer} >{category.title}</Button>
                            })
                        :
                            null
                        }
                    </VStack>
                </Collapse>
            </Box>
        </Box>
    )
})



const Head = React.memo(()=> {

    const profile = useSelector(state=> state.user.profile)

    const fullName = useMemo(()=> {
        return `${profile.first_name} ${profile.last_name}`
    })

    return (
        <HStack >
            <Avatar size='md' name={fullName} src={profile.image} />
            <Box alignSelf='start'>
                <Text color='whiteAlpha.800'>{fullName}</Text>
                <Text fontSize='sm' fontWeight='normal' color='whiteAlpha.800' >{profile.email}</Text>
            </Box>
        </HStack>
    )
})