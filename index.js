import React from "react";
import ReactDOM from "react-dom/client";


import { ChakraProvider } from "@chakra-ui/react";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { BrowserRouter } from "react-router-dom";


import { storeApi } from "./src/api/store.api";
import { App } from "./src/App";
import { theme } from "./src/theme";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { CookiesProvider } from "react-cookie";


const app = ReactDOM.createRoot(document.getElementById('app'))

app.render(
    <React.StrictMode> 
        <ChakraProvider theme={theme}>
            <Provider store={store}> 
                <BrowserRouter> 
                    <CookiesProvider> 
                        <App />
                    </CookiesProvider>
                </BrowserRouter>
            </Provider>
        </ChakraProvider>
    </React.StrictMode>
)