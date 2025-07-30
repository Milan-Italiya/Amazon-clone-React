import React, { useContext } from 'react'
import Avatar from "@mui/material/Avatar";
import { LoginContext } from '../Context/LoginContext';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import LogoutIcon from "@mui/icons-material/Logout";
import indiaimg from '../../assets/india.jpg'
import '../../css/LeftHeader.css'

const LeftHeader = ({ logclose, logoutuser }) => {
    const { account, setAccount } = useContext(LoginContext);
    return (
        <>
            <div className="leftheader">
                <div className="left_nav">
                    {
                        account && account.name ? (
                            <Avatar className="avtar2">
                                {account.name[0].toUpperCase()}
                            </Avatar>
                        ) : (
                            <Avatar className="avtar2" />
                        )
                    }
                    {account ? <h4>Hello, {account?.name?.toUpperCase()} </h4> : ''}
                </div>
                <div className="nav_btn" onClick={() => logclose()}>
                    <Link to="/">Home</Link>
                    <Link to="/">Shop Category</Link>
                    <Divider style={{ width: '100%', marginLeft: '-20px' }} />
                    <Link to="/">today's deal</Link>
                    {
                        account ? <Link to="/buy">Your orders</Link> : <Link to="/login">Your orders</Link>
                    }
                    <Divider style={{ width: '100%', marginLeft: '-20px' }} />

                    <div className="flag">
                        <Link to="/">Settings</Link>
                        <img src={indiaimg} style={{ width: '35px', marginLeft: '10px' }} alt="" />
                    </div>

                    {
                        account ?
                            <div className="flag">
                                <LogoutIcon style={{ fontSize: '18px', marginRight: '4px' }} />
                                <h3 onClick={() => logoutuser()} style={{ cursor: 'pointer', fontWeight: '500' }}>Logout</h3>
                            </div> :
                            <Link to='/login'>Register</Link>
                    }
                </div>
            </div>
        </>
    )
}

export default LeftHeader