import React from 'react';

import {
    Box,
    chakra,
    Container,
    Image,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
  } from '@chakra-ui/react';
  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
  
  

  const SocialButton = ({ children, label, href, }) => {

    return (
      <chakra.button
        bg='blackAlpha.100'
        rounded={'full'}
        w={8}
        h={8}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };
  



  export default function Footer() {
    return (
      <Box
        paddingTop={4}
        bg='gray.100'
        color='gray.700' >    
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          spacing={4}
          justify={'center'}
          align={'center'}>
          <Image width={24} src={'https://parceljs.org/logo.49e8bbc1.svg'} />
          <Stack direction={'row'} spacing={6}>
            <Link to={'/aceuil'}>Aceuil</Link>
            <Link to={'#'}>A propos</Link>
            <Link to={'/contact'}>Contact</Link>
          </Stack>
        </Container>
  
        <Box
          borderTopWidth={1}
          borderStyle={'solid'}
          borderColor='gray.200'>
          <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ base: 'center', md: 'space-between' }}
            align={{ base: 'center', md: 'center' }}>
            <Text>© 2022 Chakra Templates. All rights reserved</Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Container>
        </Box>
      </Box>
    );
  }
  