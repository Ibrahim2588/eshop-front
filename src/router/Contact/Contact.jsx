import React from 'react';

import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
  } from '@chakra-ui/react';

  import {
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdFacebook,
    MdOutlineEmail,
  } from 'react-icons/md';

  import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
  
  export default function Contact() {
    return (
      <Container bg="#9DC4FB" maxW="full" mt={0} centerContent overflow="hidden">
        <Flex marginY={10}>
          <Box
            bg="#02054B"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}>
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Heading>Contact</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                      Fill up the form below to contact
                    </Text>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: '2px solid #1C6FEB' }}
                          leftIcon={<MdPhone color="#1970F1" size="20px" />}>

                          +91-988888888
                        
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: '2px solid #1C6FEB' }}
                          leftIcon={<MdEmail color="#1970F1" size="20px" />}>

                          hello@abc.com

                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: '2px solid #1C6FEB' }}
                          leftIcon={<MdLocationOn color="#1970F1" size="20px" />}>
                            
                            Ouagadougou, BF
                          
                        </Button>
                      </VStack>
                    </Box>

                    <HStack
                      mt={{ lg: 10, md: 10 }}
                      spacing={5}
                      px={5}
                      alignItems="flex-start">
                      <IconButton
                        aria-label="facebook"
                        variant="ghost"
                        size="lg"
                        isRound={true}
                        _hover={{ bg: '#0D74FF' }}
                        icon={<MdFacebook size="28px" />}
                      />
                    </HStack>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box bg="white" borderRadius="lg" width='full'>
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3720.4319917391463!2d-1.5119274!3d12.3104793!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sfr!2sbf!4v1661974789494!5m2!1sfr!2sbf" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    );
  }
  