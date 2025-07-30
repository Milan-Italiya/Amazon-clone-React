import React from "react";
import "../../css/Buy.css";
import Divider from "@mui/material/Divider";
import fullfilled from "../../assets/full.png";
import { BACKEND_URI } from "../utils/utils.js";
import { useState } from "react";
import { useEffect } from "react";
import Subtotal from "./Subtotal.jsx";
import RightBuy from "./RightBuy.jsx";
import { useContext } from "react";
import { toast, ToastContainer } from 'react-toastify'
import { LoginContext } from "../Context/LoginContext.jsx";

const Buy = () => {
    const [cartData, setCartData] = useState([]);
    const { account, setAccount } = useContext(LoginContext);

    console.log(cartData);

    const getBuyDetails = async () => {
        const res = await fetch(`${BACKEND_URI}/cartdetails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })


        const data = await res.json()
        console.log(data.carts)

        if (res.status === 404 || !data) {
            console.log('Error')
        } else {
            setCartData(data?.carts)
            setAccount(data)
        }
    }


    const deleteData = async (id) => {
        try {
            const res = await fetch(`${BACKEND_URI}/remove/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const data = await res.json()
            console.log(data);
            if (res.status === 404 || !data) {
                console.log("error");
            } else {
                console.log('user Deleted')
                setAccount(data)
                toast.success('Cart-item Deleted Successfully', {
                    position: 'top-right'
                })
                getBuyDetails()
            }
        } catch (error) {
            console.log('error', error)
        }

    }
    useEffect(() => {
        getBuyDetails();
    }, []);


    return (
        <>
            <ToastContainer />
            {cartData ? (
                <div className="buy-section">
                    <div className="buy-container">
                        <div className="left-buy">
                            <h1>Shopping Cart</h1>
                            <div className="cart-header-row">
                                <p>Select All items</p>
                                <span className="left-buy-price">Price</span>
                            </div>
                            <Divider />
                            {cartData.map((ele) => {
                                return (
                                    <>
                                        <React.Fragment key={ele.id}>
                                            <div className="item-container">
                                                <img src={ele.detailUrl} alt="no load" />
                                                <div className="item-details">
                                                    <h3 className="long-title">{ele.title.longTitle}</h3>
                                                    <h3 className="short-title">{ele.title.shortTitle}</h3>
                                                    <h3 className="different-price">40432</h3>
                                                    <p className="unUsuall">
                                                        Lorem ipsum dolor sit amet consectetur adipisicing
                                                        elit. Deleniti sapiente non labore.
                                                    </p>
                                                    <img src={fullfilled} alt="no load" />
                                                    <div className="add-remove-select">
                                                        <select>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                        </select>
                                                        <p className="delete" onClick={() => deleteData(ele.id)}>Delete</p>
                                                        <span>!</span>
                                                        <p className="save-later">Save Or Later</p>
                                                        <span>!</span>
                                                        <p className="save-more">Save More Like this</p>
                                                    </div>
                                                </div>
                                                <h3 className="item-price">{ele.price.cost}.00</h3>
                                            </div>
                                            <Divider />
                                        </React.Fragment>
                                    </>
                                );
                            })}

                            <Subtotal items={cartData} />
                        </div>
                        <RightBuy items={cartData} />
                    </div>

                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default Buy;
