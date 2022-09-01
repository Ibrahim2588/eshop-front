import React, { useCallback, useEffect, useState } from "react";

import { Box, Button, Center, Divider, Grid, GridItem, Heading, HStack, IconButton, Image, SimpleGrid, Spacer, Text, useBreakpointValue, VStack } from "@chakra-ui/react";

import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useGetBestProductsQuery, useGetCategoriesQuery, useGetRecomendedProductsCategoryQuery } from "../../api/store.api";
import { Product } from "../../components/Product/Product";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useMemo } from "react";


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
                        <Slider infinite autoplay autoplaySpeed={5000} speed={500} slidesToShow={1} nextArrow={<ChevronRightIcon width={8} height={8}/>} prevArrow={<ChevronLeftIcon  width={8} height={8}/>} >
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

    if(isSuccess & data!==undefined){
        return (
            <Box boxShadow='xs' width={{base: '310px', sm:'lg', md:'2xl', lg:'md', xl:'2xl'}} marginX={2} marginY={8} padding={2}>
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

    const slidesToShow = useBreakpointValue({
        base: 2,
        sm: 2,
        md: 3,
        lg: 2,
        xl: 3,

    })

    let listItems = useMemo(()=> {
        let list = []
        products.map((product)=> {
            list.push(
                <Box key={product.id} marginY={1} >
                    <Product.Thin  key={product.id}  product={product} />
                </Box>
            )
        })

        return list
    }, [products, ])

    return (
        <Box marginX='2px' paddingBottom={5} >
            {/* <Grid  templateColumns='repeat(10, 1fr)' width='100%' overflowX='scroll' >
                {products.map((product)=> {
                    return (
                        <GridItem  padding='5px' key={product.id}  >
                            <Product.Thin  key={product.id}  product={product} />
                        </GridItem>
                    )
                })}
            </Grid> */}

            <Slider dots slidesToShow={slidesToShow} >
                
                {products.map((product)=> {
                    return (
                        <Box key={product.id} marginY={1} >
                            <Product.Thin  key={product.id}  product={product} />
                        </Box>
                    )
                })}


            </Slider>

        </Box>
    )
})

