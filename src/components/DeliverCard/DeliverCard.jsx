import React, { useCallback, useMemo } from "react";

import { Avatar, Badge, Box, Button, Collapse, HStack, Image, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useSellCommandMutation } from "../../api/store.api";

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



export const DeliverCard = React.memo(({command})=> {

    const {isOpen, onOpen, onClose, onToggle} = useDisclosure()

    const [sellCommand, {
        data,
        isSuccess,
        isError,
        error,
        isLoading,
    }] = useSellCommandMutation()

    const allPrice = useMemo(()=> {
        let price = 0
        command.orders.map((order)=> {
            price += order.order_price
        }) 
        return price
    }, [])

    const nbArticles = useMemo(()=> {
        let nb = 0
        command.orders.map((order)=> {
            nb += order.quantity
        })
        return nb
    }, [])

    const nbProducts = useMemo(()=> {
        return command.orders.length
    }, [])

    const fullName = useMemo(()=> {
        return `${command.user.last_name} ${command.user.first_name}`
    }, [])

    const onValideCommand = useCallback((event)=> {
        sellCommand(command.command_code)
    }, [command, ])


    return (
        <Box width='90%' bgColor='white' marginX='4' rounded='md' shadow='xs'>
            <HStack marginTop='2' marginLeft='2'>
                <Avatar src={command.user.image} size='sm' name={fullName} />
                <Box>
                    <Text fontSize='sm'>{fullName}</Text>
                    <Text fontSize='sm'>{command.user.email}</Text>
                </Box>
                <Spacer />
                <Box paddingRight='4'>
                    <Button onClick={onValideCommand} isLoading={isLoading} colorScheme='green' size='md' >Valider</Button>
                </Box>
            </HStack>
            <Box paddingLeft='5'> 
                <HStack>
                    <Text fontSize='lg' textTransform='capitalize'>code: </Text>
                    <Text fontSize='xl' fontWeight='medium' color='red.400'>{command.command_code}</Text>
                </HStack>
                <HStack>
                    <Text  fontSize='lg' >Prix total : </Text>
                    <Text  fontSize='lg' color='red.400' >{allPrice}</Text>
                </HStack>
                <Box>
                    <Text  fontSize='md' >Nombre d'articles : {nbArticles}</Text>
                    <Text  fontSize='md' >Nombre de produits : {nbProducts}</Text>
                </Box>
            </Box>
            <Box marginBottom='1' >
                <Button paddingLeft='8'  variant='unstyled'  rightIcon={isOpen? <ChevronUpIcon /> : <ChevronDownIcon /> } onClick={onToggle}>Article commander</Button>
                <Collapse in={isOpen}>
                    <VStack spacing={3} paddingBottom='2'>
                        {command.orders.map((order)=> {
                            return (
                                <HStack key={order.id}
                                    spacing={0}
                                    width='95%' height='100px' 
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
                                                <Text fontSize={'lg'} textTransform='capitalize' letterSpacing={'wide'} noOfLines={2} >{order.title}</Text>
                                            </Box>
                                        </HStack>
                                        <HStack>
                                            <Text fontSize={'lg'} fontWeight='semibold' textColor='red.500' >XFO {formatPrice(order.order_price)}</Text>
                                            <Text>=</Text>
                                            <Text fontSize='12px'>{order.product_price} × {order.quantity}</Text>
                                        </HStack>
                                    </VStack>
                                </HStack>
                            )
                        })}
                    </VStack>
                </Collapse>
            </Box>
        </Box>
    )
})