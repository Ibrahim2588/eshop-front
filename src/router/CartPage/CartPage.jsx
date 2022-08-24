import React, { useEffect, useMemo } from "react";

import { Box, Button, Checkbox, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, Hide, HStack, Select, Show, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../api/store.api";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Order } from "../../components/Order/Order";
import { setAllOrders } from "../../store/orderSlice/order.slice";
import { ShoppingBagIcon } from "@heroicons/react/solid";




export const CartPage = ()=> {

    const isAuthenticated = useSelector(state=> state.user.isAuthenticated)
    const navigate = useNavigate()
    
    const orders = useSelector(state=> state.orders)
    
    
    useEffect(()=> {
    }, [])

    if(!isAuthenticated){
        navigate('/account/login')  
    }


    return (
        <Box>
            <SearchBar />
            <BuyAction orders={orders} />
            <Heading>Cart page</Heading>
            <OrdersDisplay orders={orders} />
        </Box>
    )
}



const BuyAction = React.memo(({orders})=> {

    const {isOpen, onOpen, onClose} = useDisclosure()

    const allPrice = useMemo(()=> {
        let price = 0
        orders.map((order)=> {
            price += order.order_price
        }) 
        return price
    }, [orders])

    return (
        <HStack>

            <Button
                onClick={onOpen}
                size='md'
                colorScheme='red'
                leftIcon={<ShoppingBagIcon width='32' height='32' />}
            >Acheter Le Panier</Button>

            <Drawer isOpen={isOpen} onClose={onClose} placement='bottom'  >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Confirmer vos achat</DrawerHeader>
                    <DrawerBody>
                        <Box>
                            <HStack>
                                <Text textStyle='h5'>Prix Total : </Text>
                                <Text textStyle='h4' textColor='red.500'>{allPrice} XFO</Text>
                            </HStack>
                        </Box>
                        <Box>
                            <VStack>
                                <Select size='sm'  >
                                    <option value={false}>Je veut récupérer ma commande a la boutique</option>
                                    <option value={true}>Je veut être livrer</option>
                                </Select>
                                <Checkbox colorScheme='green' size='md' defaultChecked isChecked>Je veut payer a la livraison</Checkbox>
                            </VStack>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button  >Comander</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </HStack>
    )
})


const OrdersDisplay = React.memo(({orders})=> {


    return (
        <Box>
            <VStack spacing={4} >    
                {orders.map((order)=> {
                    return <Order key={order.id} order={order} />
                })}
            </VStack>
        </Box>
    )
})


