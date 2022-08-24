import React, { useEffect, useState } from "react";
import { Box, Container, Heading, Spinner, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Product from "../../../components/Product/Product";


const prodList = (products)=> {
    let res = []

    for (let i = 0; i < products.length; i++) {
        res.push(<Product key={products[i].id} product={products[i]} />)
    }

    return res
}


export const AllProducts = ()=> {

    const products = useSelector((state)=> state.products)
    
    const [productArray, setProductArray] = useState(null)
    

    useEffect(()=> {
        let res = []
        if(products){
            for (let i = 0; i < products.length; i++) {
                res.push(<Product key={products[i].id} product={products[i]} />)
            }
            setProductArray(res)
        }
    }, [products, ])


    return (
        <Box>
            <Heading>All Products</Heading>
            {/* {data===null? <Heading>Chargement...</Heading> : JSON.stringify(data) } */}

            <VStack>
                {productArray}
                {/* {data===null? 
                <Container marginX={"50%"} marginY={"30%"} ><Spinner size={'xl'} /></Container>
                :
                prodList(data.data)
                } */}
            </VStack>
        </Box>
    )
}