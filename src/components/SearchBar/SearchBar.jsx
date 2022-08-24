import React, { useEffect, useState } from "react";

import { Box, HStack, InputGroup, Input, IconButton, InputRightElement, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from "react-router-dom";





export const SearchBar = ({searchParams=''})=> {

    const navigate = useNavigate()
    
    const [search, setSearch] = useState('')
    const handleSearch = (event)=> setSearch(event.target.value)

    const handleClickSearch = (event)=> {
        event.preventDefault()
        navigate(`/search/${search}`)
    }

    useEffect(()=> {
        setSearch(searchParams)
    }, [searchParams, ])


    return (
        <Box bgColor='gray.300'>    
            <HStack spacing={'0'} p={'8px'} justifyContent='center'>
                <Input value={search} onChange={handleSearch} 
                onSubmit={handleClickSearch}
                    type='search'
                    focusBorderColor="red.500"
                    placeholder='Recherche' roundedRight='0'  
                    variant='filled' width='170px' height={'35px'} />

                <IconButton onClick={handleClickSearch}  
                    icon={<SearchIcon />}
                    height={'35px'} isDisabled={search===''} roundedLeft='0' />

            </HStack>
        </Box>
    )
}
