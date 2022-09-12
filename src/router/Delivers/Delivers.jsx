import React, { useEffect, useState } from "react";

import { Box, VStack } from '@chakra-ui/react'
import { useGetDeliversQuery } from "../../api/store.api";
import { DeliverCard } from "../../components/DeliverCard/DeliverCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const Delivers = (()=> {


    const isAuthenticated = useSelector((state)=> state.user.isAuthenticated)
    const user = useSelector((state)=> state.user.profile)

    const navigate = useNavigate()

    // const [commands, setCommands] = useState()

    const {
        data: commands,
        isSuccess,
        isError,
        error,
        isLoading,
        refetch,
    } = useGetDeliversQuery('', {refetchOnMountOrArgChange: true})


    useEffect(()=> {
        let fetcher = setInterval(()=> {
            refetch()
        }, 5000)

        return ()=> {
            clearInterval(fetcher)
        }
    }, [])


    if(!isAuthenticated){
        navigate('/')
        return (
            <Box>
            </Box>
        )
    }


    if(isAuthenticated){
        if(isSuccess & commands!==undefined & user.is_staff){
            return (
                <Box paddingY='8'>
        
                    <VStack spacing='4'>
                        {commands.map((command, index)=> {
                            return <DeliverCard key={index} command={command} />
                        })}
                    </VStack>
        
                </Box>
            )
        }
    }
})