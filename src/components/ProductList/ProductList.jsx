import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'KERAKUR. Икра баклажановая', price: 250, description: '500 гр., в наличие есть и острая', image: 'https://armproducti.ru/imgtmp/orign_100_w/data/foto/kerakur/ikra.jpg'},
    {id: '2', title: 'KERAKUR. Аджабсандал', price: 250, description: '1л', image: 'https://bon-jur.ru/wp-content/uploads/2021/12/AJAP-1000x1000-1.jpg' },
    {id: '3', title: 'KERAKUR. Бамия маринованная', price: 250, description: 'с чесноком(500гр)', image: 'https://basket-02.wb.ru/vol162/part16210/16210487/images/big/1.jpg'},
    {id: '4', title: 'KERAKUR. Иман Баялды ', price: 250, description: '500гр, 650гр', image: 'https://basket-01.wb.ru/vol116/part11677/11677844/images/big/1.jpg'},
    {id: '5', title: 'KERAKUR. Томаты маринованные', price: 250, description: '1л', image: 'https://avatars.mds.yandex.net/get-eda/3735503/b01d36c69a93f8cfbd72d0c2f19b2f5c/800x800nocrop'},
    {id: '6', title: 'KERAKUR. Листья виноградные консервированные', price: 600, description: '600гр', image: 'https://media.vprok.ru/products/x250/cg/sz/uxa5srup5z3n3yks3pza32t3zjkwszcg.jpeg'},
    {id: '7', title: 'KERAKUR. Аджика', price: 250, description: '500мл, 350мл, в наличии есть острая', image: 'https://img.vkusvill.ru/pim/images/site_LargeWebP/69eedd5b-3efc-4e72-afc8-64d5f2dbdfb3.jpg?1646832248.989'},
    {id: '8', title: 'KERAKUR. Аппетит', price: 250, description: '500гр', image: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/-1/96/44/26/67/63/3/100024903757b0.jpg'},
    {id: '9', title: 'KERAKUR. Маринованный красный перец', price: 250, description: '500гр', image: 'https://avatars.mds.yandex.net/get-mpic/5145248/img_id4533068567984307591.jpeg/orig'},
    {id: '10', title: 'KERAKUR. Овощи печеные', price: 12000, description: '1л, на костре', image: 'https://avatars.mds.yandex.net/get-eda/3401132/67878b4727c36493ab0c5efb6b84878a/orig'},
    {id: '11', title: 'KERAKUR. Огурцы маринованные', price: 12000, description: '1л', image: 'https://apeti.ru/upload/iblock/f00/ogurtsy_marinovannye_kerakur_950_g.jpg'},
    {id: '12', title: 'KERAKUR. Томаты очищенные в собственном соку', price: 12000, description: '950гр', image: 'https://basket-01.wb.ru/vol130/part13026/13026879/images/big/1.jpg'},
    {id: '13', title: 'KERAKUR. Маринад Ассорти', price: 12000, description: '1л', image: 'https://cdn0.ozone.ru/multimedia/c250/1023565970.jpg'},
    {id: '14', title: 'KERAKUR. Томатная паста', price: 12000, description: '500гр', image: 'https://24-ok.ru/image/lot/hires/2021/03/05/21/7c710a4e1b1f87ad8d48730bc7d8d77d.jpg'},
    {id: '15', title: 'KERAKUR. Перец острый с чесноком и зеленью', price: 12000, description: '450гр', image: 'https://freshlavka.com/wp-content/uploads/2020/04/9P2A3078-1.jpg'},
    {id: '16', title: 'KERAKUR. Лечо', price: 12000, description: '650гр', image: 'https://img.vkusvill.ru/pim/images/site_LargeWebP/2c39a594-dcea-4b56-951c-0f464c7a0a23.jpg?1646832606.9341'},
    {id: '17', title: 'KERAKUR. Абрикос', price: 12000, description: '820гр, джем', image: 'https://img.vkusvill.ru/pim/images/site/c5d7341d-b90d-487a-add3-86d358211ef3.jpg?1646832430.6169?21_10_2022_23_27_27'},
    {id: '18', title: 'KERAKUR. Айва', price: 12000, description: '610гр, варенье', image: 'https://xaviar.ru/uploads/product/200/221/varene-iz-ayvy-kerakur»-610_2022-03-15_13-15-24.jpg'},
    {id: '19', title: 'KERAKUR. Белая черешня', price: 12000, description: '610гр, варенье', image: 'https://apeti.ru/upload/iblock/e9c/varene_kerakur_belaya_chereshnya_610_g.jpg'},
    {id: '20', title: 'KERAKUR. Вишня', price: 12000, description: '610гр, варенье', image: 'https://newyog.ru/upload/iblock/064/aon4j1w9ypdsqgsazbkukzgokqe70ecd.jpg'},
    {id: '21', title: 'KERAKUR. Грецкий орех', price: 12000, description: '610гр, варенье', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3N0YXRpY3Mvc3ByZWUvcHJvZHVjdHMvMjAyMTc0MS9vcmlnaW5hbC8xNjExMzE5LmpwZz8xNjE5MDEyMTM4.jpg'},
    {id: '22', title: 'KERAKUR. Инжир', price: 12000, description: '610гр, джем', image: 'https://basket-03.wb.ru/vol293/part29324/29324764/images/big/1.jpg'},
    {id: '23', title: 'KERAKUR. Кизил', price: 12000, description: '610гр, варенье', image: 'https://basket-03.wb.ru/vol293/part29322/29322536/images/big/1.jpg'},
    {id: '24', title: 'KERAKUR. Клубника', price: 12000, description: '610гр, варенье', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9idXNpbmVzcy5zYmVybWFya2V0LnJ1L3NwcmVlL3Byb2R1Y3RzLzIwMjE3Mzkvb3JpZ2luYWwvMTYxMTMxNS5qcGc_MTYxOTAxMjEzNQ.jpg'},
    {id: '25', title: 'KERAKUR. Малина', price: 12000, description: '610гр, варенье', image: 'https://img.vkusvill.ru/pim/images/site_LargeWebP/8127a18c-e19a-49c1-ad8f-5f78a7bf0f37.jpg?1646832429.7289'},
    {id: '26', title: 'KERAKUR. Персик', price: 12000, description: '610гр, джем', image: 'https://basket-03.wb.ru/vol428/part42879/42879068/images/big/1.jpg'},
    {id: '27', title: 'KERAKUR. Тутовник(шелковица)', price: 12000, description: '610гр, варенье', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3NwcmVlL3Byb2R1Y3RzLzIwMjE3Mjkvb3JpZ2luYWwvMTYxMTI5MS5qcGc_MTYxOTAxMjExOQ.jpg'},
    {id: '28', title: 'KERAKUR. Тыква', price: 12000, description: '500гр, варенье', image: 'https://sun9-80.userapi.com/impg/foL5kKKk7RYaFjexYtbDAVnneUlWiCuCHf5_Sw/f65UTgG29Os.jpg?size=0x400&crop=0.118,0.016,0.745,0.875&quality=95&sign=40e333fff5daf72aeb6d9b545af877cf'},
    {id: '29', title: 'KERAKUR. Аппетит', price: 12000, description: '500гр', image: ''},
    {id: '30', title: 'KERAKUR. Аппетит', price: 12000, description: '500гр', image: ''},
    {id: '31', title: 'KERAKUR. Аппетит', price: 12000, description: '500гр', image: ''},
    {id: '32', title: 'KERAKUR. Аппетит', price: 12000, description: '500гр', image: ''},
    {id: '33', title: 'KERAKUR. Аппетит', price: 12000, description: '500гр', image: ''},


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
