import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDatas, setSelectedProduct } from '../Slicers/Products';
import { useParams } from 'react-router-dom';
import '../Css/ProductDetails.css';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { selectedProduct } = useSelector((state) => state.products);
    const [count, setCount] = useState(0);
    const page = document.getElementById("root")
    page.style.height = "100vh"

    const toBasket = () => {
        if (count == 0) {
            alert("Before add to basket you must choose minium one product!")
            return
        }
        const product = products.find((p) => p.id === parseInt(id));
        dispatch(setSelectedProduct(product));
        const productBasket = {
            title: product.title,
            image: product.image,
            count: count,
            price: product.price
        };
        localStorage.setItem(product.id, JSON.stringify(productBasket));
    };

    const plus = () => {
        setCount(count + 1);
    };


    const minus = () => {
        if (count <= 0) {
            alert("You Don't Have This Product!");
            return;
        }
        setCount(count - 1);
    };

    useEffect(() => {
        dispatch(getDatas());
    }, []);

    const product = products.find((p) => p.id === parseInt(id));

    return (
        <div className='details'>
            <img className='imageDetail' src={product.image} alt={product.title} />
            <div>
                <h2 className='titleDetail'>{product.title}</h2>
                <span className='descDetail'>{product.description}</span>
                <div className='priceDetail'>{product.price} $</div>
                <div className='icons'>
                    <CiCirclePlus onClick={plus} style={{ marginRight: "10px", cursor: "pointer" }} />
                    <span style={{ fontSize: "40px" }}>{count}</span>
                    <CiCircleMinus onClick={minus} style={{ marginLeft: "10px", cursor: "pointer" }} />
                </div>
                <div className='buttonPurchase'>
                    <button style={{ width: "100px", marginTop: "30px" }} onClick={toBasket}>Add To Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
