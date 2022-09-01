import React from "react";

import { Box, Center, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { useSearchProductsQuery } from "../../api/store.api";
import {Product} from "../Product/Product";



export const SearchProducts = React.memo(({search})=> {

    const {
        data: products,
        isSuccess,
        isError,
        isLoading,
        error,
    } = useSearchProductsQuery(search)
    

    if(isLoading){
        return (
            <Heading>Chargement...</Heading>
        )
    }

    if(isError){
        console.log(error)
        return (
            <Center>
                <Heading>Une erreur c'est produite</Heading>
            </Center>
        )
    }

    if(isSuccess){
        return (
            <Box>
                <Center>
                    <Text fontSize={'2xl'} fontWeight={'semibold'}>{products.length} Résultas</Text>
                </Center>
                <Box>
                    <ProductDisplay products={products} />
                </Box>
            </Box>
        )
    }
})


const ProductDisplay = React.memo(({products})=> {

    return (
        <Box>
            <SimpleGrid columns={2}  spacingY={5}>
                {products.map((product)=> {
                    return (
                        <Center margin='5px' key={product.id}>
                            <Product.Thin  key={product.id} product={product} />
                        </Center>
                    )
                })}
            </SimpleGrid>
        </Box>
    )
})