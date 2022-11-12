import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'KERAKUR. Икра баклажановая', price: 250, description: '500 гр.', image: 'https://armproducti.ru/imgtmp/orign_100_w/data/foto/kerakur/ikra.jpg'},
    {id: '2', title: 'KERAKUR. Аджабсандал', price: 250, description: '1л', image: '' },
    {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые', image: ''},
    {id: '4', title: 'KERAKUR. Икра Баклажанвоая Острая ', price: 250, description: '500гр', image: ''},
    {id: '5', title: 'KERAKUR. Томаты маринованные', price: 5000, description: '1л', image: ''},
    {id: '6', title: 'KERAKUR. Листья виноградные консервированные', price: 600, description: '600гр', image: ''},
    {id: '7', title: 'KERAKUR. Аджика', price: 5500, description: '500мл', image: ''},
    {id: '8', title: 'KERAKUR. Аппетит', price: 12000, description: '500гр', image: ''},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
