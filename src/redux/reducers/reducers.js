import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth.reducer'
import productReducer from "./product.reducer";

const slices = combineReducers({
    auth: authReducer,
    product: productReducer
})

export default slices