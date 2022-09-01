import React, { useRef, useState } from "react";

import { Avatar, Box, Button, Collapse, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, HStack, IconButton, Link, StackDivider, Text, useDisclosure, VStack } from '@chakra-ui/react'
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

                    
                    <DrawerHeader hidden={!isAuthenticated} bgColor='yellow.800'>
                         
                        <Head />
                        
                    </DrawerHeader>

                    <DrawerBody bgColor='gray.100'>
                        <VStack  align='start'  divider={<StackDivider height={1} marginY={2} bgColor='black' /> }>

                            <Button variant='link' size='lg' fontSize='2xl' color='gray.600' as={Navigation} to='/aceuil' onClick={onClose}>Aceuil</Button>
                            
                            
                            <Navigations onCloseDrawer={onClose} />


                            <Button variant='link' size='lg' fontSize='2xl' color='gray.600' as={Navigation} to='/about' onClick={onClose}>A propos</Button>
                        </VStack>

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

    return (
        <Box>
            <Box>
                <Button variant='link' size='lg' fontSize='2xl' color='gray.600' >Categories</Button>
                <VStack align='start' paddingLeft={4} paddingTop={1}>
                    {isSuccess?
                        categories.map((category)=> {
                            return <Button variant='link' size='lg' fontSize='xl' color='gray.600' marginY={1} key={category.value} as={Navigation} to={`/categorie/${category.value}`}  onClick={onCloseDrawer} >{category.title}</Button>
                        })
                    :
                        null
                    }
                </VStack>
            </Box>
        </Box>
    )
})



const Head = React.memo(()=> {

    const profile = useSelector(state=> state.user.profile)
    
    
    const fullName = useMemo(()=> {
        if(profile)
            return `${profile.first_name} ${profile.last_name}`
        else
            return ''
    }, [profile])

    if(profile){
        return (
            <HStack >
                <Avatar size='md' name={fullName} src={profile.image} />
                <Box alignSelf='start'>
                    <Text color='whiteAlpha.800'>{fullName}</Text>
                    <Text fontSize='sm' fontWeight='normal' color='whiteAlpha.800' >{profile.email}</Text>
                </Box>
            </HStack>
        )
    }
})