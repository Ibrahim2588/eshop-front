import React, { useCallback, useEffect, useState } from "react";

import { Box, Button, Center, Divider, Grid, GridItem, Heading, HStack, Image, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react";

import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useGetBestProductsQuery, useGetCategoriesQuery, useGetRecomendedProductsCategoryQuery } from "../../api/store.api";
import Product from "../../components/Product/Product";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


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
                    <Box width={'250px'} height='auto' margin='auto' shadow='xs' >
                        <Slider  dots infinite autoplay autoplaySpeed={5000} speed={500} slidesToShow={1} >
                            {bestProducts.map((product)=> {
                                return (
                                    <Box key={product.id} onClick={()=> navigate(`/product/${product.id}`)}>
                                        <Image src={product.main_image} />
                                    </Box>
                                )
                            })}
                        </Slider>
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