import React, { useEffect, useMemo, useState } from "react";

import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Collapse, Heading, Hide, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberInput, NumberInputField, Show, SimpleGrid, Skeleton, Spacer, Table, TableContainer, Tabs, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useNumberInput, VStack } from '@chakra-ui/react'
import { useNavigate, useParams } from "react-router-dom";
import { useCreateOrderMutation, useGetProductQuery } from "../../api/store.api";
import { AddIcon, ChevronDownIcon, ChevronUpIcon, RepeatIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { InputNumber } from "../../components/InputNumber/InputNumber";
import { addOrder } from "../../store/orderSlice/order.slice";


export default ProductDetailPage = ()=> {

    const navigate = useNavigate()

    const isAuthenticated = useSelector((state)=> state.user.isAuthenticated)

    const {productId} = useParams()

    // const [product, setProduct] = useState(null) 

    const {
        data: product,
        isSuccess,
        isError,
        isLoading,
        error
    } = useGetProductQuery(productId)


    if(isLoading){
        return (
            <Box>
                <Skeleton height='20px' />
                <Skeleton height='100px' />
                <Skeleton height='50px' />
                <Skeleton height='50px' />
            </Box>
        )}

    if(isError){
        console.log(error)
        return (
            <Modal isOpen={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Une erreur c'est produite!<br /> Veiller réactualiser la page.</ModalHeader>
                    {/* <ModalCloseButton /> */}
                    <ModalBody>
                        <Center>
                            {/* <Button  leftIcon={<RepeatIcon />} >Reactualiser</Button> */}
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }
    
    if(isSuccess){
        return (
            <Box>
                <SearchBar />
                <Box paddingX='10px'>
                    <SimpleGrid columns={{base: 1, md: 2}} marginTop={4} >
                        <Box>
                            <Hide above="md" >
                                <Title title={product.title} />
                            </Hide>
                            <ProductImages mainImageLink={product.main_image} images={product.images} />
                        </Box>
                        <Box paddingX={4} >
                            <Title title={product.title} />
                            <PurchaseAction product={product} />
                            <Description  description={product.description} />
                            <Characteristics characteristics={product.characteristics} />
                        </Box>
                    </SimpleGrid>
                </Box>
            </Box>
        )
    }

}

const Title = ({title})=> {
    
    return (
        <Box>
            <Text 
              fontSize={{base: 'xl', lg: '3xl'}}
              textTransform='capitalize'
              paddingLeft={2}
              letterSpacing='wide'
              fontWeight='semibold'
              >{title}</Text>
        </Box>
    )
}

const ProductImages = React.memo(({mainImageLink, images})=> {

    const [currentImage, setCurrentImage] = useState(0)

    const Images = useMemo(()=> {
        let list = []
        list.push(<Image  shadow={'xs'} rounded='lg' src={mainImageLink} />)
        images.map((image)=> {
            list.push(<Image  shadow={'xs'} rounded='lg' src={image.image} />)
        })
        return list
    }, [])


    return (
        <HStack marginX={2} marginY={2} position='static' >
            <Box width='80%'>
                {Images[currentImage]}
            </Box>
            <VStack>
                {Images.map((image, index)=> {
                    return (
                        <Box  key={index} width='50px' 
                        onClick={(event)=> {
                            event.preventDefault()
                            setCurrentImage(index)
                        }}  >
                            {image}
                        </Box>
                    )
                })}
            </VStack>
        </HStack>
    )
})


const Description = ({description})=> {

    const { isOpen, onToggle, onOpen } = useDisclosure()
    const ChevronSise = 'md'

    useEffect(()=> {
        onOpen()
    }, [])

    return (
        <Box marginY={4}>
            <HStack onClick={onToggle}>
                <Text fontSize={{base: 'lg', md: 'xl', lg: '2xl'}} fontWeight='semibold'>Description</Text>
                {isOpen? <ChevronUpIcon   width={6} height={6} /> : <ChevronDownIcon  width={6} height={6} />}
            </HStack>
            <Box>
                <Collapse in={isOpen}>
                    <Text 
                      fontSize={{base: 'md', md: 'lg', lg: 'xl'}}
                      paddingLeft={2}
                      
                      >{description}</Text>
                </Collapse>
            </Box>
        </Box>
    )
}


const Characteristics = ({characteristics})=> {

    const { isOpen, onToggle, onOpen } = useDisclosure()

    useEffect(()=> {
        onOpen()
    }, [])

    return (
        <Box marginY={4}>
            <HStack onClick={onToggle}>
                <Text  fontSize={{base: 'lg', md: 'xl', lg: '2xl'}} fontWeight='semibold' >Characteristics</Text>
                {isOpen? <ChevronUpIcon width={6} height={6} /> : <ChevronDownIcon  width={6} height={6} />}
            </HStack>
            <Box>
                <Collapse in={isOpen}>
                    <TableContainer >
                        <Table  size='md' variant='striped'>
                            <Tbody>
                                {characteristics.map((characteristic)=> {
                                    return (
                                        <Tr>
                                            <Th fontSize={'md'}>{characteristic.title}</Th>
                                            <Td>{characteristic.value}</Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Collapse>
            </Box>
        </Box>
    )
}


const PurchaseAction = (({product})=> {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state)=> state.user.isAuthenticated)
    const orders = useSelector((state)=> state.orders)

    const [quantity, setQuantity] = useState(1)
    const [isError, setIsError] = useState(false)

    const isInOrder = useMemo(()=> {
        let value = false
        orders.map((order)=> {
            if(order.product === product.id){
                value = true
            }
        })

        return value
    }, [orders])

    const [createOrder, {
        data: newOrder,
        isSuccess,
        isLoading,
        error,
    }] = useCreateOrderMutation()

    const onAddToCart = (event)=> {
        event.preventDefault()
        if(!isError){
        }
        createOrder({
            productId: product.id,
            quantity: quantity
        })
    }

    useEffect(()=> {
        if(isSuccess){
            dispatch(addOrder(newOrder))
        }
    }, [newOrder, isSuccess])

    if(isAuthenticated){
        if(!isInOrder){
            return (
                <Box marginY={2}>
                    <HStack>
                        <InputNumber size='sm' onChangeQuantity={setQuantity} initialquantity={quantity} onError={setIsError} />
                        {/* <Spacer /> */}
                        <Button onClick={onAddToCart} rightIcon={<AddIcon/>} colorScheme='yellow' size={{base: 'xs', md: 'sm'}} >Ajouter</Button>
                    </HStack>
                </Box>
            )
        }
        else {
            return (
                <Box>
                    <Button>Voir le panier</Button>
                </Box>
            )
        }
    }

    else{
        return(
            <Box>
                <Button onClick={()=> navigate('/account/login')}>Se conecter</Button>
            </Box>
        )
    }
})
