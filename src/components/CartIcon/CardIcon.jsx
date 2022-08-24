import React from "react";

import { Box, Button, HStack, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { BeakerIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OrdersDisplay } from "../OrdersDisplay/OrdersDisplay";


export const CartIcon = ()=> {

    const navigate = useNavigate()

    const isAuthenticated = useSelector(state=> state.user.isAuthenticated)

    const orders = useSelector(state=> state.orders)


    const { isOpen, onOpen, onClose } = useDisclosure()


    if(isAuthenticated){
        return (
            <Box>
                <Button 
                    onClick={onOpen}
                    size='sm'
                    variant='outline'
                    rounded='lg'
                    paddingX='5px'
                    _hover={{bgColor: 'gray.800'}}
                    colorScheme='red'
                    leftIcon={<ShoppingBagIcon  width='24' height='24' />}
                >
                    <Text fontSize='xl' >{orders.length}</Text>
                </Button>

                <OrdersDisplay isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            </Box>
        )
    }
}