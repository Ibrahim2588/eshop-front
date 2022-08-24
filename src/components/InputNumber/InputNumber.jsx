import React, { useEffect, useState } from "react"

import { Box, Button, HStack, IconButton, NumberInput, NumberInputField, Tooltip } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from "@chakra-ui/icons"


const sm = {
    inputWidth: '40px',
    inputHeigth: '24px',
    buttonSize: 'xs'
}
const md = {
    inputWidth: '40px',
    inputHeigth: '32px',
    buttonSize: 'sm'
}
const lg = {
    inputWidth: '60px',
    inputHeigth: '40px',
    buttonSize: 'md'
}

export const InputNumber = React.memo(({size, onChangeQuantity, initialquantity, onError= ()=> null})=> {

    const [isError, setIsError] = useState(false)

    const [style, setStyles] = useState(sm)

    useEffect(()=> {
        switch (size) {
            case 'sm':
                    setStyles(sm)
                break;
            case 'md':
                    setStyles(md)
                break;
            case 'lg':
                    setStyles(lg)
                break;
            default:
                setStyles(sm)
                break;
        }
    }, [])

    const [quantity, setQuantity] = useState(initialquantity)
    const increment = (event)=> {
        event.preventDefault()
        if(quantity<=1000){
            setQuantity(()=> quantity+1)
        }
    }
    const decrement = (event)=> {
        event.preventDefault()
        if(quantity>1){
            setQuantity(()=> quantity-1)
        }
    }
    const handleQuantityChange = (value)=> {
        if(value===''){
            setQuantity('')
        } else{
            setQuantity(parseInt(value))
        }
    }

    useEffect(()=> {
        if(quantity<1 | quantity>1000 | typeof quantity!=='number'){
            setIsError(true)
            onError(!true)
        } else{
            setIsError(false)
            onError(!false)
        }
    }, [quantity])

    useEffect(()=> {
        if(!isError){
            onChangeQuantity(quantity)
        }
    }, [quantity])

    return (
        <Box>
            <Tooltip label='minimum 1 | maximum 1000' bgColor='red.400' hasArrow placement='top' isOpen={isError} >
                <HStack spacing='0' border='2px' borderColor={isError? 'red.400' : 'transparent'} rounded='lg' >
                    <IconButton onClick={decrement}  size={style.buttonSize} roundedRight='0' icon={<MinusIcon />} />
                    <NumberInput value={quantity} onChange={handleQuantityChange}  >
                        <NumberInputField  width={style.inputWidth} height={style.inputHeigth} paddingX='5px' rounded='0' />
                    </NumberInput>
                    <IconButton onClick={increment} size={style.buttonSize} roundedLeft='0' icon={<AddIcon />} />
                </HStack>
            </Tooltip>
        </Box>
    )
})



