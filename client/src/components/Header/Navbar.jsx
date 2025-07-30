import "../../css/Header.css";
import AmazonLogo from "../../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { BACKEND_URI } from "../utils/utils";
import { useContext, useEffect } from "react";
import { LoginContext } from "../Context/LoginContext";
import LeftHeader from "./LeftHeader";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LogoutIcon from "@mui/icons-material/Logout";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";

const Navbar = () => {
    const [drOpen, setDrOpen] = useState(false);
    const { account, setAccount } = useContext(LoginContext);

    const { products } = useSelector((state) => state.getproductsData);
    const [text, setText] = useState("");
    const [liopen, setLiopen] = useState("");


    console.log("text", text);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getDetailsOfValidUser = async () => {
        const response = await fetch(`${BACKEND_URI}/validateuser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await response.json();
        console.log(data);
        if (response.status != 201) {
            console.log("error");
        } else {
            console.log("data valid");
            setAccount(data);
        }
    };

    const LogoutUser = async () => {
        try {
            const res = await fetch(`${BACKEND_URI}/logout`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();

            if (res.status !== 201 || !data) {
                console.log("Logout error:", data?.error || "Unknown error");
            } else {
                console.log("User logged out");
                toast.success("Logout Successfull!", {
                    position: "top-right",
                });
                setAccount(false);
                navigate("/");
            }
        } catch (err) {
            console.log("Logout failed: Invalid JSON response", err);
        }
    };

    const handleMenuOpen = () => {
        setDrOpen(true);
    };
    const handleMenuClose = () => {
        setDrOpen(false);
    };

    const getText = (items) => {
        setText(items)
        setLiopen(false)
    }

    useEffect(() => {
        getDetailsOfValidUser();
    }, []);

    return (
        <header>
            <ToastContainer />
            <nav>
                <div className="left">
                    <IconButton className="hamburgur" onClick={handleMenuOpen}>
                        <MenuIcon style={{ color: "white" }} />
                    </IconButton>
                    <Drawer open={drOpen} onClose={handleMenuClose}>
                        <LeftHeader logclose={handleMenuClose} logoutuser={LogoutUser} />
                    </Drawer>
                    <div className="nav-logo">
                        <Link to="/">
                            <img src={AmazonLogo} alt="Amazon Logo" />
                        </Link>
                    </div>
                    <div className="nav-searchbar">
                        <input type="text" placeholder="Search Your Products..." onChange={(e) => { getText(e.target.value) }} />
                        <div className="search-icon">
                            <SearchIcon id="search" />
                        </div>

                        {/* search filter */}

                        {text && (
                            <List className="extrasearch">
                                {products.products
                                    ?.filter((product) =>
                                        product.title.longTitle.toLowerCase().includes(text.toLowerCase())
                                    )
                                    .map((product) => (
                                        <>
                                            <ListItem
                                                key={product.id}
                                                button
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    navigate(`/getproducts/${product.id}`);
                                                    setText(""); // clear search
                                                }}
                                            >
                                                <img src={product.detailUrl} alt="" style={{ height: '35px', marginRight: '2rem' }} />
                                                {product.title.longTitle}
                                            </ListItem>
                                            <Divider />
                                        </>
                                    ))}
                            </List>
                        )}

                    </div>
                </div>

                <div className="right">
                    <div className="nav-btn">
                        <Link to="/login">Sign in</Link>
                    </div>

                    {account ? (
                        <Link to="/buy">
                            <div className="cart-btn">
                                <Badge badgeContent={account?.carts?.length} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                                <p>Cart</p>
                            </div>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <div className="cart-btn">
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                                <p>Cart</p>
                            </div>
                        </Link>
                    )}
                    {account && account.name ? (
                        <Avatar
                            className="avtar2"
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            {account.name[0].toUpperCase()}
                        </Avatar>
                    ) : (
                        <Avatar className="avtar2" />
                    )}

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                            list: {
                                "aria-labelledby": "basic-button",
                            },
                        }}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        {account ? (
                            <MenuItem
                                onClick={() => {
                                    LogoutUser();
                                    handleClose();
                                }}
                            >
                                {" "}
                                <LogoutIcon style={{ fontSize: "16px", marginRight: 3 }} />{" "}
                                Logout
                            </MenuItem>
                        ) : (
                            ""
                        )}
                    </Menu>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
