import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Box, Button, Heading, HStack, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, NumberInput, NumberInputField, Spacer, Text, Tooltip, VStack } from '@chakra-ui/react'
import { InputNumber } from "../InputNumber/InputNumber";
import { useDispatch } from "react-redux";
import { deleteOrder, updateOrder } from "../../store/orderSlice/order.slice";
import { useDeleteOrderMutation, useUpdateOrderMutation } from "../../api/store.api";
import { DeleteIcon } from "@chakra-ui/icons";
import { DotsVerticalIcon } from "@heroicons/react/outline";


function formatPrice(n) {
    let price = n.toFixed(2).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
    return new String(price).split('.')[0].replace(',', '.')
    // return new String(price)
    /*return {
        start: new String(price).split('.')[0],
        end: new String(price).split('.')[1]
    }*/
}


export const Order = React.memo(({order})=> {



    return (
        <HStack 
            spacing={0}
            width='90%' height='100px' 
            shadow='md' 
            bgColor='gray.100'
            rounded='md'
            border='0px' >
            <Box  width='150px' height='100%' padding='5px' >
                <Image boxSize='full' objectFit='fill' borderRadius='md'  src={order.image} />
            </Box>
            <VStack 
                alignItems='start' 
                spacing={0}
                paddingX='4px'
                width='full' height='full' >
                <HStack paddingY='5px' width='full' spacing={0} justifyContent='space-between' >
                    <Box border='0px' width='100%'>
                        <Text fontSize={'lg'} textTransform='capitalize' letterSpacing={'wide'} noOfLines={1} >{order.title}</Text>
                    </Box>
                    {/* <Spacer /> */}
                    <OrderChoiseMenu orderId={order.id} />
                </HStack>
                <HStack>
                    <Text fontSize={'lg'} fontWeight='semibold' textColor='red.500' >XFO {formatPrice(order.order_price)}</Text>
                    <Text>=</Text>
                    <Text fontSize='12px'>{order.product_price} × {order.quantity}</Text>
                </HStack>

                <OrderQuantityAction order={order} />
            </VStack>
        </HStack>
    )
})


const OrderQuantityAction = React.memo(({order})=> {



    const dispatch = useDispatch()

    const [isValid, setIsValid] = useState(true)

    const [quantity, setQuantity] = useState(order.quantity)

    const [updateOrderData, {
        data: orderReceived,
        isSuccess,
        isLoading,
        isError,
        error,
        reset
    }] = useUpdateOrderMutation()


    const updateIsApply = useMemo(()=> {
        if(quantity===order.quantity){
            return (true)
        } else{
            return (false)
        }
    }, [quantity, order])



    const onClickSave = useCallback((event)=> {
        event.preventDefault()
        if(isValid){
            updateOrderData({
                orderId: order.id,
                quantity: quantity,
            })
        }
    }, [quantity, isValid, ])

    useEffect(()=> {
        if(isLoading===false & isSuccess===true){
            dispatch(updateOrder({
                orderId: order.id,
                newQuantity: quantity,
            }))
        }
    }, [isLoading])


    return (
        <HStack >
            {isError? console.log(error) : null}
            <InputNumber size={'sm'} onChangeQuantity={setQuantity} onError={setIsValid} initialquantity={order.quantity} />
            {updateIsApply? null:
            <Tooltip label='Enregistrer les modification'  openDelay={1000}>
                <Button onClick={onClickSave} size={'xs'} colorScheme='orange' >Enregistrer</Button>
            </Tooltip>}
        </HStack>
    )
})



const OrderChoiseMenu = React.memo(({orderId})=> {

    const dispatch = useDispatch()

    const [deleteOrderData, {
        isSuccess,
        isLoading,
        isError,
        error,
    }] =  useDeleteOrderMutation()

    const onClickDelete = (event)=> {
        event.preventDefault()
        deleteOrderData(orderId)
    }

    useEffect(()=> {
        if(isLoading===false & isSuccess===true){
            dispatch(deleteOrder(orderId))
        }
    }, [isLoading])


    return (
        <Box>
            <Menu >
                <MenuButton
                as={IconButton}
                variant='ghost'
                colorScheme='orange'
                size='xs'
                icon={<DotsVerticalIcon width='22' heigth='22' />} />

                <MenuList>
                    <MenuItem
                      onClick={onClickDelete}  
                      icon={<DeleteIcon />} >Delete</MenuItem>
                </MenuList>

            </Menu>
        </Box>
    )
})

