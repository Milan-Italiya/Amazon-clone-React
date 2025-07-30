import { BACKEND_URI } from "../../utils/utils.js"

export const getProducts = () => async (dispatch) => {
    try {
        const response = await fetch(`${BACKEND_URI}/getproducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
        dispatch({ type: "SUCCESS_GET_PRODUCTS", payload: data })
    } catch (error) {
        dispatch({ type: "FAILED_GET_PRODUCTS", payload: error.response })
    }
}