import React from "react";

import { Route, Routes } from "react-router-dom";

import { Login } from "./Account/Login/Login";
import { Signup } from "./Account/Signup/Signup";

import { HomePage } from "./HomePage/HomePage";
import { ProductDetailPage } from "./ProductDetail/ProductDetailPage";
import { CategoryPage } from "./Store/CategoryPage/CategoryPage";
import { SearchPage } from "./Store/SearchPage/SearchPage";
import { StorePage } from "./Store/StorePage";


const Router = React.memo(()=> {

    return (
        <Routes >
            
            <Route path="/" index element={<StorePage />} />
            
            <Route path="/search/:search" element={<SearchPage />} />
            
            <Route path="/categorie/:category" element={<CategoryPage />}  />
            
            <Route path="/product/:productId" element={<ProductDetailPage />}  />

            <Route path="/aceuil" element={<HomePage />}  />


            <Route path="/account/login" element={<Login />} />
            <Route path="/account/signup" element={<Signup />} />

            {/* <Route path="/*"  element={<Auther />}  /> */}

        </Routes>
    )
})

export default Router



