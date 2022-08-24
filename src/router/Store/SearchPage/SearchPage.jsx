import React from "react";

import { Box, Heading } from '@chakra-ui/react'
import { useParams } from "react-router-dom";

import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { SearchProducts } from "../../../components/SearchProducts/SearchProducts";

export const SearchPage = ()=> {

    const params = useParams()


    return (
        <Box>
            <SearchBar searchParams={params.search} />
            <SearchProducts search={params.search} />
        </Box>
    )
}