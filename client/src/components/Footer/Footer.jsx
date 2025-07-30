import React from 'react'
import '../../css/Footer.css'
import AmazonLogo from '../../assets/logo.png'

const Footer = () => {

    const Year = new Date().getFullYear() 
    return (
        <footer>
            <div className="foot-panel1">
                <ul>
                    <div className="foot-heading">
                        <h4>Get to Know Us</h4>
                    </div>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">About Amazon</a></li>
                    <li><a href="#">Investor Relations</a></li>
                    <li><a href="#">Amazon Devices</a></li>
                    <li><a href="#">Amazon Science</a></li>
                </ul>
                <ul>
                    <div className="foot-heading">
                        <h4>Make Money with Us</h4>
                    </div>
                    <li><a href="#">Sell products on Amazon</a></li>
                    <li><a href="#">Sell on Amazon Business</a></li>
                    <li><a href="#">Sell apps on Amazon</a></li>
                    <li><a href="#">Become an Affliate</a></li>
                    <li><a href="#">Advertise Your Product</a></li>
                    <li><a href="#">Self-Publish with Us</a></li>
                    <li><a href="#">&gt; See More Make Money with Us</a></li>
                </ul>
                <ul>
                    <div className="foot-heading">
                        <h4>Amazon Payment Products</h4>
                    </div>
                    <li><a href="#">Amazon Business Card</a></li>
                    <li><a href="#">Shop with Points</a></li>
                    <li><a href="#">Reload Your Balance</a></li>
                    <li><a href="#">Amazon Currency Converter</a></li>
                </ul>
                <ul>
                    <div className="foot-heading">
                        <h4>Let Us Help You</h4>
                    </div>
                    <li><a href="#">Amazon and COVID-19</a></li>
                    <li><a href="#">Your Account</a></li>
                    <li><a href="#">Your Orders</a></li>
                    <li><a href="#">Shipping Rates & Policies</a></li>
                    <li><a href="#">Returns & Replacements</a></li>
                    <li><a href="#">Manage Your Content and Devices</a></li>
                    <li><a href="#">Help</a></li>
                </ul>
            </div>
            <hr />
            <div className="foot-panel4">
                <div className="footer-logo">
                    <img src={AmazonLogo} alt="" />
                </div>
                <div className="pages">
                    <li><a href="#">Conditions of Use</a></li>
                    <li><a href="#">Privacy Notice</a></li>
                    <li><a href="#">Consumer Health Data Privacy Disclosure</a></li>
                    <li><a href="#">Your Ads Privacy Choice</a></li>
                </div>
                <div className="copyrights">
                    © 1996-{Year}, Amazon.com, Inc. or its affiliates
                </div>
            </div>
        </footer>
    )
}

export default Footer