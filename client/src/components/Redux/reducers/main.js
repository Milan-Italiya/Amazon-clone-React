import { getProductsReducers } from "./productsReducers";
import {combineReducers} from 'redux'

const rootReducers = combineReducers({
    getproductsData:getProductsReducers
})

export default rootReducers;