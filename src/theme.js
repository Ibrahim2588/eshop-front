import { extendTheme } from "@chakra-ui/react";


const colors = {
    primery: {
        100: '#fdedeb',
        200: '#fbdcd7',
        300: '#f8cac3',
        400: '#f6b9af',
        500: '#f4a79b',
        600: '#f29587',
        700: '#f08473',
        800: '#ed725f',
        900: '#fb614b',
    },
    secondary: {
        100: '#ecf1fc',
        200: '#c5d5f5',
        300: '#b2c7f2',
        400: '#9fb9ef',
        500: '#8caaeb',
        600: '#799ce8',
        700: '#658ee5',
        800: '#5280e1',
        900: '#3F72DE',
    },
    black: '#0B0D21',
    blackText: '#0B102A',
    white: '#FCFCFE',
    caption: '#D3D6F0',

    navLinkColor: '#d92',
    iconColor: '#f08473'
}


// const breakpoints = {
//     sm: '30em',
//     md: '48em',
//     lg: '62em',
//     xl: '80em',
//     '2xl': '96em',
//   }
//   const breakpoints = {
//     xs: '321px',
//     sm: '480px',
//     md: '768px',
//     lg: '1025px',
//     xl: '1600px',
//   }

//   const breakpoints = {
//     xs: '0px',
//     sm: '480px',
//     md: '620px',
//     lg: '880px',
//     xl: '1025px',
//     '2xl': '1600px',
//   }

// const breakpoints = {
//     sm: '440px',
//     md: '768px',
//     lg: '960px',
//     xl: '1280px',
//     '2xl': '1536px',
//   }


const textStyles= {
    h1: {
        // you can also use responsive styles
        fontSize: '48px',
        fontWeight: 'bold',
        // lineHeight: '110%',
        // letterSpacing: '-2%',
    },
    h2: {
        fontSize: '36px',
        fontWeight: 'semibold',
        // lineHeight: '110%',
        // letterSpacing: '-1%',
    },
    h3: {
        fontSize: '28px',
        fontWeight: 'semibold',
        // lineHeight: '110%',
        // letterSpacing: '-1%',
    },
    h4: {
        fontSize: '20px',
        fontWeight: 'semibold',
        // lineHeight: '110%',
        // letterSpacing: '-1%',
    },
    h5: {
        fontSize: '18px',
        fontWeight: '600',
        lineHeight: '110%',
        // letterSpacing: '-1%',
    },

    title: {
        fontSize: '14px',
        fontWeight: '550',
        lineHeight: '110%',
        // letterSpacing: '-1%',
    },

    body1: {
        fontSize: '16px',
        fontWeight: 'normal',
    },
    body2: {
        fontSize: '14px',
        fontWeight: 'normal',
    },
}


export const theme = extendTheme({
    
    colors: colors,
    // breakpoints: breakpoints,
    textStyles: textStyles,

})