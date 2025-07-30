import React from 'react'
import '../../css/NewNavbar.css'
import navlinksimg from '../../assets/nav.jpg'

const NewNavbar = () => {
    return (
        <div className="new-nav">
            <div className="nav-data">
                <div className="left-data">
                    <p>All</p>
                    <p>Mobile</p>
                    <p>Bestseller</p>
                    <p>Fashion</p>
                    <p>Customer Services</p>
                    <p>Electronics</p>
                    <p>Prime</p>
                    <p>Today's deal</p>
                    <p>Amazon Pay</p>
                </div>
                <div className="right-data">
                    <img src={navlinksimg} alt="no found" />
                </div>
            </div>
        </div>
    )
}

export default NewNavbar