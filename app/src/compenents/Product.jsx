import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDatas, setInputValue } from '../Slicers/Products';
import { useNavigate } from 'react-router-dom';
import '../Css/Product.css';

function Product() {
    const products = useSelector((store) => store.products.products);
    const filterValue = useSelector((store) => store.products.filterValue);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDatas());
    }, [dispatch]);

    const goDetails = (id) => {
        navigate(`product/${id}`)
    }

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(filterValue.toLowerCase())
    );


    return (
        <div className='main'>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <div key={product.id} className='box'>
                        <div className='image'><img src={product.image} alt="" /></div>
                        <div className='title'><h2>{product.title}</h2></div>
                        <div className='price'><h2>{product.price} $</h2></div>
                        <button onClick={() => goDetails(product.id)}>Buy</button>
                    </div>
                ))
            ) : (
                <p>Eşleşen ürün bulunamadı.</p>
            )}
        </div>
    );
}

export default Product;
