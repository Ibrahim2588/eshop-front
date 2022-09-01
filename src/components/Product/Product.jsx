import React from "react";
import { Badge, Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


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



const ProductLarge = ({product})=> {

    const navigate = useNavigate()

    const handleBoxClick = (event)=> {
        event.preventDefault()
        navigate(`/product/${product.id}`)
    }

    return (
        <Box onClick={handleBoxClick} boxShadow={'base'} _hover={{boxShadow: 'lg'}} borderColor={'black'} bgColor='white' >
            {product.disccount? <Badge pos={'absolute'} bgColor={'green.300'} color={'white'} >promo</Badge> : null}
            <HStack w={{base: '320px', xl: '400px'}} h={{base: '140px', xl: '170px'}}>
                <Box width='70%' height='full' >
                    <Image w='full' h='full' src={product.main_image} />
                </Box>
                <VStack py={2} spacing={0} width='full' height='full' align='start' justify='start' >
                    <Box>
                        <Text fontSize={'lg'} textTransform='capitalize' noOfLines={1} >{product.title}</Text>
                    </Box>
                    <VStack  spacing={-0.5} alignSelf={'start'}>
                        <Text fontSize='2xl' fontWeight='semibold' color={'primery.900'} fontStyle={'italic'} >XFO {formatPrice(product.current_price)}</Text>
                        {product.disccount? 
                            <HStack spacing={1} alignSelf={'start'}>
                                <Text  textDecorationLine='line-through'  >{product.price}</Text>
                                <Badge rounded={5} bgColor={'primery.600'} fontSize={12} color={'white'} >-{product.reduction}%</Badge>
                            </HStack>
                        : null}
                    </VStack>
                    <Text noOfLines={3} lineHeight='shorter' >{product.description}</Text>

                </VStack>
            </HStack>
        </Box>
    )
}




const ProductThin = ({product})=> {

    const navigate = useNavigate()
    
    const handleBoxClick = (event)=> {
        event.preventDefault()
        navigate(`/product/${product.id}`)
    }

    return (
        
        <Box onClick={handleBoxClick} width={{base: '140px', sm: '160px', md: '180px'}} height={{base: '210px', sm: '230px', md: '250px'}} paddingBottom={2} rounded='lg' bgColor='white' shadow='base'> 
            {/* {product.disccount? <Badge pos={'absolute'} bgColor={'green.300'} color={'white'} >-{product.reduction}%</Badge> : null} */}
            <Box width='full' height='70%' >
                <Image w='full' h='full' roundedTop='lg'  src={product.main_image} fallbackSrc='https://via.placeholder.com/150' />
            </Box>
            <VStack spacing={1} paddingX='10px' paddingTop='5px' width='full' justifyContent='start' >
                <Box width='full'>
                    <Text fontSize={{base: 'md', lg: 'lg'}} lineHeight={1} letterSpacing={'wide'} noOfLines={2} >{product.title}</Text>
                </Box>
                <Box width='full'>
                    <Text fontSize={{base: 'lg', lg: 'xl'}} fontWeight='semibold' color={'primery.900'} fontStyle={'italic'} >XFO {formatPrice(product.current_price)}</Text>
                </Box>
            </VStack>
        </Box>
    )
}


// export default Product

export const Product = {
    Large: ProductLarge,
    Thin: ProductThin,
}
