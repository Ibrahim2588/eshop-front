import React from 'react';

import { Box, Button, Container, HStack, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { MdEmail, MdMap, MdPhone } from 'react-icons/md';

// import {
//     Box,
//     Button,
//     chakra,
//     Container,
//     Image,
//     Stack,
//     Text,
//     useColorModeValue,
//     VisuallyHidden,
//   } from '@chakra-ui/react';
//   import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
//   import { ReactNode } from 'react';
// import { Link } from 'react-router-dom';
// import { MdPhone } from 'react-icons/md';
  
  

export const Footer = ()=> {


    return (
        <Box  paddingTop={4} bg='gray.100' color='gray.700'>
            <Container>
                <Box width='full'>
                    <Image align='center'  width={24} alt='logo' src={'https://parceljs.org/logo.49e8bbc1.svg'} />
                </Box>
                <SimpleGrid columns={2}>
                    <Box>
                        <Text  fontSize='xl' fontWeight='semibold' align='center'>Navigation</Text>
                        <VStack>
                            <Button as={Link} variant='link' color='gray.600' size='lg' to={'/aceuil'}>Aceuil</Button>
                            <Button as={Link} variant='link' color='gray.600' size='lg' to={'#'}>A propos</Button>
                        </VStack>   
                    </Box>

                    <Box>
                        <Text fontSize='xl' fontWeight='semibold' align='center'>Contact</Text>
                        <VStack alignContent='start' >

                            <Button as={'a'} href='tel:+22654377601' size="md" variant="ghost" color='black' leftIcon={<MdPhone color="#1970F1" size="20px" />}>
                                +226 54 37 76 01
                            </Button>

                            <Button as={'a'} href='email:exemple@gmail.com' size="md" variant="ghost" color='black' leftIcon={<MdEmail color="#1970F1" size="20px" />}>
                                exemple@gmail.com
                            </Button>
                            
                            <Button as={'a'} href='#' size="md" variant="ghost" color='black' leftIcon={<MdMap     color="#1970F1" size="20px" />}>
                                Quartier, Ville 
                            </Button>

                        </VStack>
                    </Box>
                </SimpleGrid>
                <Box width='full' marginY={2}>
                    <Text align='center'>© 2022 Chakra Templates. All rights reserved</Text>
                </Box>
            </Container>
        </Box>
    )

}



//   export default function _Footer() {
//     return (
//       <Box
//         paddingTop={4}
//         bg='gray.100'
//         color='gray.700' >    
//         <Container
//           as={Stack}
//           maxW={'6xl'}
//           py={4}
//           spacing={4}
//           justify={'center'}
//           align={'center'}>

//           <Image width={24} alt='logo' src={'https://parceljs.org/logo.49e8bbc1.svg'} />

//           <Stack direction={'row'} spacing={6}>
//             <Link to={'/aceuil'}>Aceuil</Link>
//             <Link to={'#'}>A propos</Link>
//             <Link to={'/contact'}>Contact</Link>
//           </Stack>
//         </Container>
  
//         <Box
//           borderTopWidth={1}
//           borderStyle={'solid'}
//           borderColor='gray.200'>
//           <Container
//             as={Stack}
//             maxW={'6xl'}
//             py={4}
//             direction={{ base: 'column', md: 'row' }}
//             spacing={4}
//             justify={{ base: 'center', md: 'space-between' }}
//             align={{ base: 'center', md: 'center' }}>
//             <Text>© 2022 Chakra Templates. All rights reserved</Text>
//             <Stack direction={'row'} spacing={6}>
//               <SocialButton label={'Twitter'} href={'#'}>
//                 <FaTwitter />
//               </SocialButton>
//               <Button
//                           size="md"
//                           height="48px"
//                           width="200px"
//                           variant="ghost"
//                           color="#DCE2FF"
//                           _hover={{ border: '2px solid #1C6FEB' }}
//                           leftIcon={<MdPhone color="#1970F1" size="20px" />}>

//                           +91-988888888
                        
//                         </Button>
//             </Stack>
//           </Container>
//         </Box>
//       </Box>
//     );
//   }
  