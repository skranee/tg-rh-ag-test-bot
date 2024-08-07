import React, {useState} from 'react';
import './ProductList.css'
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";

const products = [
    {id: '1', title: 'Jeans', price: 5000, description: 'Blue color, straight'},
    {id: '2', title: 'Jacket', price: 12000, description: 'Green color, warm'},
    {id: '3', title: 'Jeans 2', price: 5000, description: 'Blue color, straight'},
    {id: '4', title: 'Jacket 8', price: 122, description: 'Green color, warm'},
    {id: '5', title: 'Jeans 3', price: 5000, description: 'Blue color, straight'},
    {id: '6', title: 'Jacket 7', price: 600, description: 'Green color, warm'},
    {id: '7', title: 'Jeans 4', price: 5500, description: 'Blue color, straight'},
    {id: '8', title: 'Jacket 5', price: 12000, description: 'Green color, warm'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((a, b) => a + b.price, 0);
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg} = useTelegram();

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
                text: `Buy for ${getTotalPrice(newItems)}$`
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