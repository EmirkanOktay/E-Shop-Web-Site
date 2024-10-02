import React, { useEffect, useState } from 'react'
import '../Css/Header.css'
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setInputValue } from '../Slicers/Products';
import { BsBasket } from "react-icons/bs";
import Drawer from '@mui/joy/Drawer';
import Badge from '@mui/joy/Badge';
import { MdDeleteForever } from "react-icons/md";


function Header() {

    const [theme, setTheme] = useState(false)
    const [basket, setBasket] = useState([])
    const [inputValueGet, setInputValueGet] = useState("")
    const [open, setOpen] = React.useState(false);
    const { selectedProduct } = useSelector((state) => state.products);
    const dispatch = useDispatch()


    const themeChange = () => {
        const page = document.getElementById("root")
        if (theme) {
            page.style.backgroundColor = "white"
            page.style.color = "black"
        }
        else {
            page.style.backgroundColor = "black"
            page.style.color = "white"
        }
        setTheme(!theme);
    }

    const filterInputValue = (e) => {
        const value = e.target.value;
        setInputValueGet(value);
        dispatch(setInputValue(value));
    };

    useEffect(() => {
        const products = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const values = localStorage.getItem(key);
            if (values) {
                products.push(JSON.parse(values));
            }
        }
        setBasket(products);
    }, []);

    const basketCounter = () => {
        let counter = 0;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                counter++;
            }
        }

        return counter;
    }
    const deleteFromBasket = (id) => {
        localStorage.removeItem(id);
        setBasket((prevBasket) => prevBasket.filter(item => item.id !== id));
        localStorage.clear()
    };

    return (
        <div>
            <div className='main'>
                <div className='logo'><a href="http://localhost:5173/">Logo</a></div>
                <div className='right'><input
                    value={inputValueGet}
                    onChange={filterInputValue}
                    type="text" placeholder='Search...' />

                    <div className='icon'>
                        {theme ? <FaSun onClick={themeChange} /> : <FaMoon onClick={themeChange} />}
                        <Badge badgeContent={basketCounter()}>
                            <BsBasket onClick={() => setOpen(true)}
                                style={{ marginLeft: "10px" }} />
                        </Badge>
                    </div>

                </div>
            </div>
            <div>
                <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
                    {basket.map((item, index) => (
                        <div className='basket' key={index}>
                            <img src={item.image} alt={item.title} width="50" />
                            <div>{item.title} ({item.count})</div>
                            <div>{item.price} $</div>
                            <MdDeleteForever onClick={() => {
                                deleteFromBasket(item.id);
                            }} />
                        </div>

                    ))}
                    <div>Total Price : {
                        basket.reduce((total, item) => (total + item.count * item.price), 0).toFixed(2)
                    }$</div>

                </Drawer>
            </div>

        </div>
    )
}

export default Header