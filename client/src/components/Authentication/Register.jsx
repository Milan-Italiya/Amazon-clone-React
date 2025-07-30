import React, { useState } from "react";
import "../../css/Authentication.css";
import AmazonLogo from "../../assets/black_logo.png";
import { Link } from "react-router-dom";
import { BACKEND_URI } from "../utils/utils.js";
import { ToastContainer, toast } from 'react-toastify'
import { LoginContext } from "../Context/LoginContext.jsx";
import { useContext } from "react";

const SignUp = () => {
    const { account,setAccount } = useContext(LoginContext);
    const [regdata, setRegdata] = useState({
        name: "",
        email: "",
        phno: "",
        password: "",
        repassword: "",
    });
    console.log(regdata);

    const addData = (e) => {
        const { name, value } = e.target;

        setRegdata(() => {
            return {
                ...regdata,
                [name]: value,
            };
        });
    };

    const sendData = async (e) => {
        e.preventDefault();

        const { name, email, phno, password, repassword } = regdata;

        const res = await fetch(`${BACKEND_URI}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                phno,
                password,
                repassword,
            }),
        });

        const data = await res.json()
        console.log(data);

        if (res.status === 404) {
            // alert('No Data')
            toast.warning('Invalid Details', {
                position: 'top-right'
            })
        } else {
            // alert('Data Added Successfully')
            toast.success('Data Added Successfully', {
                position: 'top-right'
            })
            setAccount(data)
            setRegdata({ ...regdata, name: "", email: "", phno: "", password: "", repassword: "" })
        }
    };
    return (
        <div className="auth-container">
            <img className="auth-logo" src={AmazonLogo} alt="Amazon Logo" />
            <h1>Create account</h1>
            <form method="POST">
                <label htmlFor="name">Your name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={regdata.name}
                    placeholder="First and last name"
                    onChange={addData}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={regdata.email}
                    onChange={addData}
                />

                <label htmlFor="phno">Mobile number</label>
                <input
                    type="number"
                    id="phno"
                    name="phno"
                    value={regdata.phno}
                    onChange={addData}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={regdata.password}
                    placeholder="At least 6 characters"
                    onChange={addData}
                />

                <label htmlFor="repassword">Re-enter password</label>
                <input
                    type="password"
                    id="repassword"
                    name="repassword"
                    value={regdata.repassword}
                    onChange={addData}
                />

                <button type="submit" className="auth-button" onClick={sendData}>
                    Continue
                </button>

                <p className="auth-helper-text">
                    By creating an account, you agree to Amazon's{" "}
                    <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
                </p>

                <p className="auth-helper-text">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </form>
            <ToastContainer autoClose={2000} />
        </div>
    );  
};

export default SignUp;
