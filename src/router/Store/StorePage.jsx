import React, { useCallback, useEffect, useState } from "react";

import { Box, Button, Center, Divider, Grid, GridItem, Heading, HStack, Image, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react";

import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useGetBestProductsQuery, useGetCategoriesQuery, useGetRecomendedProductsCategoryQuery } from "../../api/store.api";
import Product from "../../components/Product/Product";


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


export const StorePage = ()=> {



    return (
        <Box>
            <SearchBar />
            <Head />
            
            <Categories />
        </Box>
    )
}

const Head = React.memo(({})=> {
    
    const navigate = useNavigate()

    const {
        data: bestProducts,
        isSuccess,
        isLoading,
        isError,
        error,
    } = useGetBestProductsQuery()

    if(isSuccess){
        return (
            <Box>
                <Box>
                    <Text fontSize={'4xl'} fontWeight='bold' bgClip={'text'} bgGradient='linear(to-r, green.200, pink.500)'>Bienvenue</Text>
                </Box>
                <Box width={'full'}  justifyContent='center' alignContent='center'>
                    <Box width={'250px'} height='' margin='auto' shadow='xs' >
                        <Carousel  autoPlay={true} infiniteLoop={true} interval={3000}>
                            {bestProducts.map((product)=> {
                                return (
                                    <Box key={product.id}>
                                        <Image src={product.main_image} />
                                        <Text position='relative' bottom='52' fontSize='xl' fontWeight='semibold'  >{product.title}</Text>
                                        <Button 
                                        colorScheme='orange' 
                                        variant='outline'
                                        onClick={()=> navigate(`/product/${product.id}`)} 
                                        position='relative' bottom='20' size='sm'>Voir</Button>
                                    </Box>
                                )
                            })}
                        </Carousel>
                    </Box>
                </Box>
            </Box>
        )
    }
})


const Categories = ()=> {

    const {
        data: categories,
        isSuccess,
    } = useGetCategoriesQuery()

    return (
        <Box>
            <SimpleGrid columns={[1, 1, 1, 2, ]} spacing={1} >
                {isSuccess? categories.map((category)=> {
                    return (
                        <Center key={category.id}>
                            <Category key={category.id} category={category} />
                        </Center>
                    )
                }) : null}
            </SimpleGrid>
        </Box>
    )
}


const Category = ({category})=> {

    const navigate = useNavigate()

    const {
        data,
        isSuccess
    } = useGetRecomendedProductsCategoryQuery(category.value)

    const onSeeMore = useCallback((event)=> {
        event.preventDefault()
        navigate(`/categorie/${category.value}`)
    }, [])

    if(isSuccess){
        return (
            <Box boxShadow='xs' width={['310px', 'md', '2xl', 'md', '2xl']} marginX='5px' marginY='10px' padding='5px'>
                <Box marginBottom='10px'>
                    <HStack>
                        <Box onClick={onSeeMore}>
                            <Text  textStyle='h4' >{category.title}</Text>
                        </Box>
                        <Spacer />
                        <Box>
                            <Button onClick={onSeeMore} variant='outline' size='sm' rounded='5' paddingX='8px' >Voir plus</Button>
                        </Box>
                    </HStack>
                </Box>
                <VerticalDisplay products={data.results} />
            </Box>
        )
    }

}

const VerticalDisplay = (({products})=> {

    return (
        <Box marginX='2px' >
            <Grid  templateColumns='repeat(10, 1fr)' width='100%' overflowX='scroll' >
                {products.map((product)=> {
                    return (
                        <GridItem  padding='5px' key={product.id}  >
                            <Product.Thin  key={product.id}  product={product} />
                        </GridItem>
                    )
                })}
            </Grid>
        </Box>
    )
})



// const Category = ({category})=> {

//     return (
//         <Box marginX='2px' paddingX='2px' border='2px' borderColor='gray.500' rounded='xl' bgColor='chocolate' >
//             <Link to={`/categorie/${category.value}`} >{category.title}</Link>
//         </Box>
//     )
// }