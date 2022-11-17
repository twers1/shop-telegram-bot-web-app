import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'KERAKUR. Икра баклажановая', price: 230, description: '500 гр., в наличие есть и острая', image: 'https://armproducti.ru/imgtmp/orign_100_w/data/foto/kerakur/ikra.jpg'},
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
    {id: '17', title: 'KERAKUR. Абрикос', price: 250, description: '820гр, джем', image: 'https://img.vkusvill.ru/pim/images/site/c5d7341d-b90d-487a-add3-86d358211ef3.jpg?1646832430.6169?21_10_2022_23_27_27'},
    {id: '18', title: 'KERAKUR. Айва', price: 12000, description: '610гр, варенье', image: 'https://xaviar.ru/uploads/product/200/221/varene-iz-ayvy-kerakur»-610_2022-03-15_13-15-24.jpg'},
    {id: '19', title: 'KERAKUR. Белая черешня', price: 250, description: '610гр, варенье', image: 'https://apeti.ru/upload/iblock/e9c/varene_kerakur_belaya_chereshnya_610_g.jpg'},
    {id: '20', title: 'KERAKUR. Вишня', price: 12000, description: '610гр, варенье', image: 'https://newyog.ru/upload/iblock/064/aon4j1w9ypdsqgsazbkukzgokqe70ecd.jpg'},
    {id: '21', title: 'KERAKUR. Грецкий орех', price: 250, description: '610гр, варенье', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3N0YXRpY3Mvc3ByZWUvcHJvZHVjdHMvMjAyMTc0MS9vcmlnaW5hbC8xNjExMzE5LmpwZz8xNjE5MDEyMTM4.jpg'},
    {id: '22', title: 'KERAKUR. Инжир', price: 220, description: '610гр, джем', image: 'https://basket-03.wb.ru/vol293/part29324/29324764/images/big/1.jpg'},
    {id: '23', title: 'KERAKUR. Кизил', price: 230, description: '610гр, варенье', image: 'https://basket-03.wb.ru/vol293/part29322/29322536/images/big/1.jpg'},
    {id: '24', title: 'KERAKUR. Клубника', price: 250, description: '610гр, варенье', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9idXNpbmVzcy5zYmVybWFya2V0LnJ1L3NwcmVlL3Byb2R1Y3RzLzIwMjE3Mzkvb3JpZ2luYWwvMTYxMTMxNS5qcGc_MTYxOTAxMjEzNQ.jpg'},
    {id: '25', title: 'KERAKUR. Малина', price: 12000, description: '610гр, варенье', image: 'https://img.vkusvill.ru/pim/images/site_LargeWebP/8127a18c-e19a-49c1-ad8f-5f78a7bf0f37.jpg?1646832429.7289'},
    {id: '26', title: 'KERAKUR. Персик', price: 12000, description: '610гр, джем', image: 'https://basket-03.wb.ru/vol428/part42879/42879068/images/big/1.jpg'},
    {id: '27', title: 'KERAKUR. Тутовник(шелковица)', price: 230, description: '610гр, варенье, белая тута', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3NwcmVlL3Byb2R1Y3RzLzIwMjE3Mjkvb3JpZ2luYWwvMTYxMTI5MS5qcGc_MTYxOTAxMjExOQ.jpg'},
    {id: '28', title: 'KERAKUR. Тыква', price: 230, description: '500гр, варенье', image: 'https://sun9-80.userapi.com/impg/foL5kKKk7RYaFjexYtbDAVnneUlWiCuCHf5_Sw/f65UTgG29Os.jpg?size=0x400&crop=0.118,0.016,0.745,0.875&quality=95&sign=40e333fff5daf72aeb6d9b545af877cf'},
    {id: '29', title: 'KERAKUR. Компот из вишни', price: 12000, description: '1л', image: 'https://basket-03.wb.ru/vol290/part29020/29020553/images/big/1.jpg'},
    {id: '30', title: 'KERAKUR. Икра кабачковая', price: 255, description: 'обычная, острая', image: 'https://www.waterbaikal.ru/image/cache/catalog/miniral/jermuk/voda-jermuk-05-glass-768x576.jpg'},
    {id: '31', title: 'Минеральная Вода Джермук, пэт', price: 12000, description: '0.5, 1л', image: 'https://apeti.ru/upload/iblock/67d/voda_mineralnaya_dzhermuk_0_5_l.jpg'},
    {id: '32', title: 'Минеральная Вода Бжни', price: 12000, description: '0.5 - стекло, пэт; 1л - пэт', image: 'https://www.healthwaters.ru/upload/iblock/f8f/f8fb6eff21523d70e5134cbc483a889f.jpg'},
    {id: '33', title: 'Родниковая вода Апаран', price: 12000, description: '0.5л, ,1л, 1.5л - пэт', image: ''},
    {id: '34', title: 'Минеральная вода Джермук, стекло ', price: 255, description: '0.5л,  стекло', image: ''},
    {id: '35', title: 'Ecofood. Компот из айвы', price: 185, description: '1л', image: 'https://finegastronomy.ru/upload/iblock/576/yljs0z23g49lgnp00h4rwuroqn0400gj.jpeg'},
    {id: '36', title: 'Ecofood. Компот из персика', price: 185, description: '1л', image: 'https://alania-market.ru/image/cache/catalog/konservy-sousy-pripravy/fruktovye-konservy/8/16350691-1-360x360.jpg'},
    {id: '37', title: 'Ecofood. Компот из абрикоса', price: 185, description: '1л', image: 'https://avatars.mds.yandex.net/get-mpic/5209712/img_id195476974076435664.png/orig'},
    {id: '38', title: 'Tamara fruit. Нектар из абрикосов ', price: 210, description: '1л', image: 'https://cdn1.ozone.ru/s3/multimedia-6/c1000/6046688514.jpg'},
    {id: '39', title: 'Tamara fruit. Нектар из персиков', price: 210, description: '1л', image: 'https://gcdn.utkonos.ru/resample/500x500q90/images/photo/3460/3460361H.jpg?mtime=6142fce5'},
    {id: '40', title: 'Tamara fruit. Нектар из вишни', price: 210, description: '1л', image: 'https://cdn1.ozone.ru/s3/multimedia-2/c1000/6000190514.jpg'},
    {id: '41', title: 'Tamara fruit. Нектар из шиповника', price: 210, description: '1л', image: 'https://ethnopolis.ru/wp-content/uploads/2022/10/1480028.png'},
    {id: '42', title: 'Tamara fruit. Нектар из яблока', price: 210, description: '1л, яблочный сок', image: 'https://cdn1.ozone.ru/s3/multimedia-b/c1000/6025284215.jpg'},
    {id: '43', title: 'Tamara fruit. Нектар из малины', price: 240, description: '1л', image: 'https://cdn1.ozone.ru/s3/multimedia-6/c1000/6025394658.jpg'},
    {id: '44', title: 'Tamara fruit. Нектар из граната', price: 260, description: '1л', image: 'https://ethnopolis.ru/wp-content/uploads/2022/10/1480019.jpg'},
    {id: '45', title: 'Yan. Ананас', price: 240, description: '0,93л., сок', image: 'https://napitkistore.ru/wp-content/uploads/2017/03/sok-yan-tropicheskij-0.93-l.jpg'},
    {id: '46', title: 'Yan. Красный апельсин', price: 12000, description: '0,93л., сок', image: 'https://arm-food.ru/wa-data/public/shop/products/19/01/119/images/974/krasnyy-apelsin-930.750x0.jpg'},
    {id: '47', title: 'Yan. Апельсин', price: 12000, description: '0,93л., сок', image: 'https://avatars.mds.yandex.net/get-mpic/4334746/img_id8171040962226206517.jpeg/orig'},
    {id: '48', title: 'Yan. Банан', price: 12000, description: '0,93л., сок', image: 'https://avatars.mds.yandex.net/get-mpic/1865885/img_id6746647864933535679.jpeg/orig'},
    {id: '49', title: 'Yan. Зеленое яблоко', price: 12000, description: '0,93л., сок', image: 'https://irkdelikates.ru/pic/b9cc4424926e9cc1340b01236e7c6e0d/nektar-zelenoe-yabloko-yan-0.93-l-st.b-1.6-armeniya-1.jpg'},
    {id: '50', title: 'Yan. Шиповник', price: 12000, description: '0,93л., сок', image: 'https://sbermarket.ru/statics/spree/products/3412681/original/17862905.jpg?1640185388'},
    {id: '51', title: 'Yan. Гранат', price: 12000, description: '0,93л., сок', image: 'https://avatars.mds.yandex.net/get-mpic/5246613/img_id1686396562673862032.png/orig'},
    {id: '52', title: 'Yan. Манго', price: 12000, description: '0,93л., сок', image: 'https://avatars.mds.yandex.net/get-mpic/5275484/img_id3625041831368782559.jpeg/orig'},
    {id: '53', title: 'Yan. Облепиха', price: 12000, description: '0,93л., сок', image: 'https://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/ef/a1/07f441fd65d554206e8d3865c70b.jpg'},
    {id: '54', title: 'Yan. Тропический', price: 12000, description: '0,93л., сок', image: 'https://sbermarket.ru/spree/products/558386/original/417648.jpg?1599756525'},
    {id: '55', title: 'Yan. ', price: 12000, description: '0,93л., сок', image: ''},
    {id: '56', title: '', price: 12000, description: '', image: ''},
    {id: '57', title: '', price: 12000, description: '', image: ''},
    {id: '58', title: '', price: 12000, description: '', image: ''},
    {id: '59', title: '', price: 12000, description: '', image: ''},
    {id: '60', title: '', price: 12000, description: '', image: ''},
    {id: '61', title: '', price: 12000, description: '', image: ''},
    {id: '62', title: '', price: 12000, description: '', image: ''},
    {id: '63', title: '', price: 12000, description: '', image: ''},
    {id: '64', title: '', price: 12000, description: '', image: ''},
    {id: '65', title: '', price: 12000, description: '', image: ''},
    {id: '66', title: '', price: 12000, description: '', image: ''},
    {id: '67', title: '', price: 12000, description: '', image: ''},
    {id: '68', title: '', price: 12000, description: '', image: ''},
    {id: '69', title: '', price: 12000, description: '', image: ''},
    {id: '70', title: '', price: 12000, description: '', image: ''},
    {id: '71', title: '', price: 12000, description: '', image: ''},
    {id: '72', title: '', price: 12000, description: '', image: ''},
    {id: '73', title: '', price: 12000, description: '', image: ''},
    {id: '74', title: '', price: 12000, description: '', image: ''},
    {id: '75', title: '', price: 12000, description: '', image: ''},
    {id: '76', title: '', price: 12000, description: '', image: ''},
    {id: '77', title: '', price: 12000, description: '', image: ''},
    {id: '78', title: '', price: 12000, description: '', image: ''},
    {id: '79', title: '', price: 12000, description: '', image: ''},
    {id: '80', title: '', price: 12000, description: '', image: ''},
    {id: '81', title: '', price: 12000, description: '', image: ''},
    {id: '82', title: '', price: 12000, description: '', image: ''},
    {id: '83', title: '', price: 12000, description: '', image: ''},
    {id: '84', title: '', price: 12000, description: '', image: ''},




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
