import React, { useEffect } from "react";

import { Box, Text, VStack } from "@chakra-ui/react";
import { CommandCard } from "../../components/CommandCard/CommandCard";
import { useGetCommandsQuery } from "../../api/store.api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Commands = React.memo(()=> {

    const isAuthenticated = useSelector((state)=> state.user.isAuthenticated)

    const navigate = useNavigate()

    const {
        data: commands,
        isSuccess,
        isError,
        error,
        isLoading,
    } = useGetCommandsQuery()

    useEffect(()=> {
        if(!isAuthenticated){
            navigate('/')
        }
    }, [isAuthenticated])




    if(isSuccess & commands!==undefined){
        return (
            <Box>
                <Text paddingLeft='4' fontSize={'4xl'} fontWeight='bold' bgClip={'text'} bgGradient='linear(to-r, green.200, pink.500)'>Mes commandes</Text>
                <VStack spacing={4} paddingY='4'>
                    {commands.map((command)=> {
                        return <CommandCard key={command.id} command={command} />
                    })}
                </VStack>
    
            </Box>
        )
    }
})
