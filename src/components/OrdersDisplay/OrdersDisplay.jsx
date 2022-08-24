import React, { useMemo, useEffect } from "react";

import  { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Checkbox, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { Order } from "../Order/Order";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useCreateCommandMutation } from "../../api/store.api";
import { useNavigate } from "react-router-dom";
import { setAllOrders } from "../../store/orderSlice/order.slice";



export const OrdersDisplay = ({})=> {

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
    
                <Drawer  size={'sm'} isOpen={isOpen} onClose={onClose} placement={screen.width<=600? 'bottom' : 'right'}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton color='red.500' border='1px'  />
    
                        <DrawerHeader>
                            <Head orders={orders} closeDrawer={onClose} />
                        </DrawerHeader>
    
                        <DrawerBody bgColor='blackAlpha.200' padding={[2, 4, 6]}>
                            <_OrdersDisplay orders={orders} />
                        </DrawerBody>
    
                        <DrawerFooter></DrawerFooter>
    
                    </DrawerContent>
                </Drawer>
            </Box>
        )
    }
}


const Head = ({orders, closeDrawer})=> {

    const navigate = useNavigate()

    const allPrice = useMemo(()=> {
        let price = 0
        orders.map((order)=> {
            price += order.order_price
        }) 
        return price
    }, [orders])

    const nbArticles = useMemo(()=> {
        let nb = 0
        orders.map((order)=> {
            nb += order.quantity
        })
        return nb
    }, [orders, ])

    const nbProducts = useMemo(()=> {
        return orders.length
    }, [orders, ])


    return (
        <VStack align='start' >
            <Box>
                <Text  fontSize='md' >Nombre d'articles : {nbArticles}</Text>
                <Text  fontSize='md' >Nombre de produits : {nbProducts}</Text>
            </Box>
            
            <HStack>
                <HStack>
                    <Text  fontSize='lg' >Prix total : </Text>
                    <Text  fontSize='xl' color='red.700' >{allPrice}</Text>
                </HStack>
                
                <Spacer />

                <BuyAction allPrice={allPrice} closeDrawer={closeDrawer} />

            </HStack>

        </VStack>
    )
}


const BuyAction = ({allPrice=0, closeDrawer})=> {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [createCommand, {
        data: command,
        isSuccess,
        isError,
        error,
        isLoading,
    }] = useCreateCommandMutation()

    const {isOpen, onOpen, onClose} = useDisclosure()

    const [hasDeliver, setHasDeliver] = useState(false)

    const handleSelect = (event)=> {
        event.preventDefault()
        setHasDeliver(event.target.value)
    }

    const onValidCommand = (event)=> {
        event.preventDefault()
        createCommand({hasDeliver: hasDeliver}) 
    }

    useEffect(()=> {
        if(isSuccess){
            dispatch(setAllOrders([]))
            onClose()
            closeDrawer()
            navigate('/')
        }
    }, [command, isSuccess, isLoading, ])

    return (
        <Box>
            <Button
                onClick={onOpen}
                variant='outline'
                size='sm'
                colorScheme='red'
                leftIcon={<ShoppingBagIcon width='24' height='24' />}
            >Commander</Button>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />

                    <ModalHeader>
                        {isError? <Alert status="error" display='flex'  >
                            <AlertIcon />
                            <VStack>
                                <AlertTitle>Erreur de requête</AlertTitle>
                                Une erreur c'est produite lors de la requête. Veiller reactualiser la page et ressayer.
                            </VStack>
                        </Alert>: null}
                        <HStack>
                            <Text fontSize={'md'}>Prix total des achats : </Text>
                            <Text fontSize={'xl'} color='red.500' >XFO {allPrice}</Text>
                        </HStack>
                    </ModalHeader>

                    <ModalBody>
                        <Box>
                            <VStack align='start'>
                                <Select size='md' onChange={handleSelect} >
                                    <option value={false}>Je veut récupérer ma commande a la boutique</option>
                                    <option value={true}>Je veut être livrer</option>
                                </Select>
                                <Checkbox colorScheme='green' size='md' isChecked={hasDeliver} >Je veut payer a la livraison</Checkbox>
                            </VStack>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Box >
                            <Button
                                size={'md'}
                                letterSpacing='widest'
                                colorScheme='teal'
                                onClick={onValidCommand}
                                isLoading={isLoading}
                                loadingText='Validation de la commande'
                            >Commnder</Button>
                        </Box>
                    </ModalFooter>

                </ModalContent>
            </Modal>

        </Box>
    )
}


const _OrdersDisplay = React.memo(({orders})=> {


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
