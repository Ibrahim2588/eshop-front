import React, { useMemo, useState } from "react";

import { Box, Heading, IconButton, SimpleGrid, Center, Button, HStack, Show, Text } from '@chakra-ui/react'
import { useParams } from "react-router-dom";

import { useGetProductsCategoryQuery } from "../../../api/store.api";
import { AddIcon, ChevronLeftIcon, ChevronRightIcon, InfoIcon } from "@chakra-ui/icons";
import Product from "../../../components/Product/Product";
import { SearchBar } from "../../../components/SearchBar/SearchBar";





export const CategoryPage = React.memo(()=> {

    const params = useParams()
    
    const [paginationPage, setPaginationPage] = useState(1)
    const category = useMemo(()=> {
            setPaginationPage(1)
            return params.category
    }, [params.category])


    const {data, isSuccess, status, isLoading, isError, error} = useGetProductsCategoryQuery({categoryValue: category, pageNumber: paginationPage})

    const products = useMemo(()=> {
        if(!isLoading & isSuccess){
            return data.results
        } else{
            return []
        }
    }, [data, ])


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

    if(isSuccess)
        return (
            <Box>
                <SearchBar />
                <Box>
                    <Text fontSize={'4xl'} fontWeight='bold' letterSpacing={'wide'} bgClip='text' bgGradient={'linear(to-l, red.500, green.500)'} >{products[0].category.title}</Text>
                </Box>
                <Box>
                    <ProductDisplay products={products} />
                </Box>

                <Pagination currentpage={paginationPage} changePage={setPaginationPage} productNumb={data.count } />
            </Box>
        )
})


const Pagination = React.memo(({currentpage, productNumb, changePage})=> {

    const pageNumber = useMemo(()=>{
        return parseInt(productNumb/3)   
    }, [productNumb, ])

    const onInc = (event)=>{
        event.preventDefault()
        if(currentpage<pageNumber){
            changePage(currentpage+1)
        }
    }

    const onDec = (event)=>{
        event.preventDefault()
        if(currentpage>1){
            changePage(currentpage-1)
        }
    }

    return (
        <HStack spacing={2} justify='center' align='center'>
            <IconButton  icon={<ChevronLeftIcon width={6} height={6} />} size={'sm'} onClick={onDec}  />
            <IconButton icon={<ChevronRightIcon width={6} height={6} />} size={'sm'} onClick={onInc}  />
        </HStack>
    )
})


const ProductDisplay = React.memo(({products})=> {

    return (
        <Box>
            <SimpleGrid columns={{base: 2, sm: 3, md: 4, lg: 3, }}  spacingY={5}>
                {products.map((product)=> {
                    return (
                        <Center margin='5px' key={product.id}>
                            <Show above="lg" >
                                <Center>
                                    <Product.Large  key={product.id} product={product} />
                                </Center>
                            </Show>
                            <Show below="lg" >
                                <Center>
                                    <Product.Thin  key={product.id} product={product} />
                                </Center>
                            </Show>
                        </Center>
                    )
                })}
            </SimpleGrid>
        </Box>
    )
})