import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'KERAKUR. Икра баклажановая', price: 230, description: '500 гр., в наличие есть и острая', image: 'https://armproducti.ru/imgtmp/orign_100_w/data/foto/kerakur/ikra.jpg'},
    {id: '2', title: 'KERAKUR. Аджабсандал', price: 250, description: '1л', image: 'https://bon-jur.ru/wp-content/uploads/2021/12/AJAP-1000x1000-1.jpg' },
    {id: '3', title: 'KERAKUR. Бамия маринованная', price: 210, description: 'с чесноком(500гр)', image: 'https://basket-02.wb.ru/vol162/part16210/16210487/images/big/1.jpg'},
    {id: '4', title: 'KERAKUR. Иман Баялды ', price: 240, description: '500гр, 650гр', image: 'https://basket-01.wb.ru/vol116/part11677/11677844/images/big/1.jpg'},
    {id: '5', title: 'KERAKUR. Томаты маринованные', price: 250, description: '1л', image: 'https://avatars.mds.yandex.net/get-eda/3735503/b01d36c69a93f8cfbd72d0c2f19b2f5c/800x800nocrop'},
    {id: '6', title: 'KERAKUR. Листья виноградные консервированные', price: 600, description: '600гр', image: 'https://media.vprok.ru/products/x250/cg/sz/uxa5srup5z3n3yks3pza32t3zjkwszcg.jpeg'},
    {id: '7', title: 'KERAKUR. Аджика', price: 250, description: '500мл, 350мл, в наличии есть острая', image: 'https://img.vkusvill.ru/pim/images/site_LargeWebP/69eedd5b-3efc-4e72-afc8-64d5f2dbdfb3.jpg?1646832248.989'},
    {id: '8', title: 'KERAKUR. Аппетит', price: 250, description: '500гр', image: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/-1/96/44/26/67/63/3/100024903757b0.jpg'},
    {id: '9', title: 'KERAKUR. Маринованный красный перец', price: 250, description: '500гр', image: 'https://avatars.mds.yandex.net/get-mpic/5145248/img_id4533068567984307591.jpeg/orig'},
    {id: '10', title: 'KERAKUR. Овощи печеные', price: 12000, description: '1л, на костре', image: 'https://avatars.mds.yandex.net/get-eda/3401132/67878b4727c36493ab0c5efb6b84878a/orig'},
    {id: '11', title: 'KERAKUR. Огурцы маринованные', price: 12000, description: '1л', image: 'https://apeti.ru/upload/iblock/f00/ogurtsy_marinovannye_kerakur_950_g.jpg'},
    {id: '12', title: 'KERAKUR. Томаты очищенные в собственном соку', price: 12000, description: '950гр', image: 'https://basket-01.wb.ru/vol130/part13026/13026879/images/big/1.jpg'},
    {id: '13', title: 'KERAKUR. Маринад Ассорти', price: 12000, description: '1л', image: 'https://cdn0.ozone.ru/multimedia/c250/1023565970.jpg'},
    {id: '14', title: 'KERAKUR. Томатная паста', price: 220, description: '500гр', image: 'https://24-ok.ru/image/lot/hires/2021/03/05/21/7c710a4e1b1f87ad8d48730bc7d8d77d.jpg'},
    {id: '15', title: 'KERAKUR. Перец острый с чесноком и зеленью', price: 170, description: '450гр', image: 'https://freshlavka.com/wp-content/uploads/2020/04/9P2A3078-1.jpg'},
    {id: '16', title: 'KERAKUR. Лечо', price: 1170, description: '650гр', image: 'https://img.vkusvill.ru/pim/images/site_LargeWebP/2c39a594-dcea-4b56-951c-0f464c7a0a23.jpg?1646832606.9341'},
    {id: '17', title: 'KERAKUR. Абрикос', price: 250, description: '650гр, джем', image: 'https://img.vkusvill.ru/pim/images/site/c5d7341d-b90d-487a-add3-86d358211ef3.jpg?1646832430.6169?21_10_2022_23_27_27'},
    {id: '18', title: 'KERAKUR. Айва', price: 12000, description: '610гр, варенье', image: 'https://xaviar.ru/uploads/product/200/221/varene-iz-ayvy-kerakur»-610_2022-03-15_13-15-24.jpg'},
    {id: '19', title: 'KERAKUR. Белая черешня', price: 250, description: '610гр, варенье', image: 'https://apeti.ru/upload/iblock/e9c/varene_kerakur_belaya_chereshnya_610_g.jpg'},
    {id: '20', title: 'KERAKUR. Вишня', price: 12000, description: '610гр, варенье', image: 'https://newyog.ru/upload/iblock/064/aon4j1w9ypdsqgsazbkukzgokqe70ecd.jpg'},
    {id: '21', title: 'KERAKUR. Грецкий орех', price: 250, description: '610гр, варенье', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3N0YXRpY3Mvc3ByZWUvcHJvZHVjdHMvMjAyMTc0MS9vcmlnaW5hbC8xNjExMzE5LmpwZz8xNjE5MDEyMTM4.jpg'},
    {id: '22', title: 'KERAKUR. Инжир', price: 220, description: '610гр, джем', image: 'https://basket-03.wb.ru/vol293/part29324/29324764/images/big/1.jpg'},
    {id: '23', title: 'KERAKUR. Кизил', price: 190, description: '610гр, варенье', image: 'https://basket-03.wb.ru/vol293/part29322/29322536/images/big/1.jpg'},
    {id: '24', title: 'KERAKUR. Клубника', price: 210, description: '610гр, варенье', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9idXNpbmVzcy5zYmVybWFya2V0LnJ1L3NwcmVlL3Byb2R1Y3RzLzIwMjE3Mzkvb3JpZ2luYWwvMTYxMTMxNS5qcGc_MTYxOTAxMjEzNQ.jpg'},
    {id: '25', title: 'KERAKUR. Малина', price: 12000, description: '610гр, варенье', image: 'https://img.vkusvill.ru/pim/images/site_LargeWebP/8127a18c-e19a-49c1-ad8f-5f78a7bf0f37.jpg?1646832429.7289'},
    {id: '26', title: 'KERAKUR. Персик', price: 12000, description: '610гр, джем', image: 'https://basket-03.wb.ru/vol428/part42879/42879068/images/big/1.jpg'},
    {id: '27', title: 'KERAKUR. Тутовник(шелковица)', price: 230, description: '610гр, варенье, белая тута', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3NwcmVlL3Byb2R1Y3RzLzIwMjE3Mjkvb3JpZ2luYWwvMTYxMTI5MS5qcGc_MTYxOTAxMjExOQ.jpg'},
    {id: '28', title: 'KERAKUR. Тыква', price: 230, description: '500гр, варенье', image: 'https://sun9-80.userapi.com/impg/foL5kKKk7RYaFjexYtbDAVnneUlWiCuCHf5_Sw/f65UTgG29Os.jpg?size=0x400&crop=0.118,0.016,0.745,0.875&quality=95&sign=40e333fff5daf72aeb6d9b545af877cf'},
    {id: '29', title: 'KERAKUR. Компот из вишни', price: 12000, description: '1л', image: 'https://basket-03.wb.ru/vol290/part29020/29020553/images/big/1.jpg'},
    {id: '30', title: 'KERAKUR. Икра кабачковая', price: 255, description: 'обычная, острая', image: 'https://www.waterbaikal.ru/image/cache/catalog/miniral/jermuk/voda-jermuk-05-glass-768x576.jpg'},
    {id: '31', title: 'Минеральная Вода Джермук, пэт', price: 12000, description: '0.5, 1л', image: 'https://apeti.ru/upload/iblock/67d/voda_mineralnaya_dzhermuk_0_5_l.jpg'},
    {id: '32', title: 'Минеральная Вода Бжни', price: 12000, description: '0.5 - стекло, пэт; 1л - пэт', image: 'https://www.healthwaters.ru/upload/iblock/f8f/f8fb6eff21523d70e5134cbc483a889f.jpg'},
    {id: '33', title: 'Родниковая вода Апаран', price: 85, description: '0.5л, ,1л, 1.5л - пэт', image: ''},
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
    {id: '56', title: 'Maaza. Манго', price: 80, description: '250мл - 80 руб, 1л - 200, 1.5л. - 230', image: 'https://cdn.100sp.ru/pictures/477531693'},
    {id: '57', title: 'Maaza. Яблоко', price: 80, description: '250мл - 80 руб, 1л - 200, 1.5л. - 230', image: 'https://tsiran.am/images/products/060630/cf6c3bf255504015230e9c4b8ad89f79/764x600.JPG'},
    {id: '58', title: 'Zovk. Шиповник', price: 80, description: '250мл - 80 руб, 1л - 200, 1.5л. - 230', image: 'https://www.sas.am/upload/Sh/imageCache/171/651/6517821983947399.jpg'},
    {id: '59', title: 'Noyan. Вишня', price: 45, description: '200мл', image: 'https://avatars.mds.yandex.net/get-mpic/4353087/img_id5653770386752001950.jpeg/orig'},
    {id: '60', title: 'Noyan. Ананас', price: 45, description: '200мл', image: 'https://avatars.mds.yandex.net/get-mpic/4362876/img_id6599198538109662970.jpeg/5'},
    {id: '61', title: 'Noyan. Яблоко с мякотью', price: 45, description: '200мл', image: 'https://avatars.mds.yandex.net/get-mpic/4466970/img_id8332669616838953157.jpeg/orig'},
    {id: '62', title: 'Любимый. Тропический микс', price: 25, description: '200мл', image: 'https://prazdnichniy40.ru/system/App/Models/Product/3559/cover/main/medium/1-00048005.jpg'},
    {id: '63', title: 'Любимый. Вишневая черешня', price: 25, description: '200мл', image: 'http://otlichnye-tseny.ru/upload/iblock/263/dncbp1p5106419p33fx3vev2q5euhfah.jpg'},
    {id: '64', title: 'Любимый. Яблоко', price: 25, description: '200мл', image: 'https://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/9f/5f/689f076d61194bc4f585a28bd93a.jpg'},
    {id: '65', title: 'Добрый. Яблоко', price: 28, description: '200мл', image: 'https://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/05/5a/e71faf450e725bf4fac450b4bc4c.jpg'},
    {id: '66', title: 'Armatfood. Компот из терна', price: 205, description: '1.1л', image: 'https://gurmanarmenia.ru/image/cache/catalog/irafoto/armatfud/tern-228x228.png'},
    {id: '67', title: 'Armatfood. Компот из абрикоса и вишни', price: 205, description: '1.1л', image: 'https://eda.yandex.ru/images/3454897/42ebc7178b2a322cb64d58189f211c2c-680x500.jpeg'},
    {id: '68', title: 'Armatfood. Компот из клубники', price: 205, description: '1.1л(фотография не соответвует существующему)', image: 'https://avatars.mds.yandex.net/get-mpic/5238263/img_id2389603678739428058.jpeg/orig'},
    {id: '69', title: 'Armatfood. Компот из вишни', price: 205, description: '1.1л', image: 'https://gurmanarmenia.ru/image/cache/catalog/irafoto/armatfud/vishnja-228x228.png'},
    {id: '70', title: 'Armatfood. Компот из кизила', price: 190, description: '1.1л', image: 'https://cdn1.ozone.ru/s3/multimedia-q/c500/6067785794.jpg'},
    {id: '71', title: 'Armatfood. Компот айвовый', price: 190, description: '1.1л', image: 'https://api.investin.am/storage/products/21.-Kompot-iz-aivy-1.1l.jpg'},
    {id: '72', title: 'Armatfood. Компот из облепихи', price: 220, description: '1.1л', image: 'https://dariarmenii.ru/thumb/2/KhE-8EXR5uYFxNTHjZ4_1g/450r450/d/armatfood_product-photos_20_rus_preview_web_20201127.jpg'},
    {id: '73', title: 'Armatfood. Компот из фейхоа', price: 220, description: '1.1л', image: ''},
    {id: '74', title: 'Armatfood. Компот персиковый', price: 205, description: '1.1л', image: 'https://dariarmenii.ru/thumb/2/d8UyMcdW2Lahy6drbN47oA/r/d/armatfood_product-photos_18_rus_preview_web_20201127.jpg'},
    {id: '75', title: 'Menq. Вишня', price: 120, description: '1л, сок', image: 'https://avatars.mds.yandex.net/get-mpic/4785755/img_id5175251967552092928.jpeg/orig'},
    {id: '76', title: 'Menq. Манго', price: 120, description: '1л, сок', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3N0YXRpY3Mvc3ByZWUvcHJvZHVjdHMvMzQxODc4Mi9vcmlnaW5hbC8xNTkzMzc4MV8zLmpwZz8xNjQwMjQzMDc2.jpg'},
    {id: '77', title: 'Menq. Томат острый ', price: 120, description: '1л, сок', image: 'https://avatars.mds.yandex.net/get-mpic/3741589/img_id2246296204828655857.jpeg/orig'},
    {id: '78', title: 'Menq. Яблоко', price: 120, description: '1л, сок', image: 'https://otziv-otziv.ru/assets/cache/images/417/4162/img_id4061707761565934985-600x600-d90.jpeg'},
    {id: '79', title: 'Ararat Премиум. Банан и клубника', price: 175, description: '0.97л.', image: 'https://ae04.alicdn.com/kf/Uf7041cfa87a64c67b5552fd4f7508f67O/ARARAT-PREMIUM.png'},
    {id: '80', title: 'Ararat Премиум. Мультифрукт', price: 175, description: '0.97л.', image: 'https://basket-03.wb.ru/vol427/part42726/42726637/images/big/1.jpg'},
    {id: '81', title: 'Ararat Премиум. Армянская вишня', price: 170, description: '0.97л.', image: 'https://avatars.mds.yandex.net/get-eda/3529621/d1a941fd9bf2f3daa18c01a2e6566f16/800x800nocrop'},
    {id: '82', title: 'Ararat Премиум. Апельсин', price: 220, description: '0.97л.', image: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/21/19/09/96/53/41/600001207313b0.jpeg'},
    {id: '83', title: 'Ararat Премиум. Армянский томат', price: 170, description: '0.97л.', image: 'https://sbermarket.ru/statics/spree/products/570319/original/429712_1.jpg?1640006110'},
    {id: '84', title: 'Noyan Премимум. Томат', price: 155, description: '1л.', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3N0YXRpY3Mvc3ByZWUvcHJvZHVjdHMvMzI2OTE5L29yaWdpbmFsLzM0ODg2Ni5qcGc_MTU5NjAyNjg4OA.jpg'},
    {id: '85', title: 'Noyan Премимум. Гранат', price: 330, description: '1л.', image: 'https://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/a2/46/ff8a778032dcefc1b0ab7c963af5.jpg'},
    {id: '86', title: 'Noyan Премимум. Яблоко', price: 155, description: '1л.', image: 'https://www.sas.am/upload/iblock/3c9/000689.jpg'},
    {id: '87', title: 'Noyan Премимум. Черная смородина-виноград', price: 160, description: '1л.', image: 'https://cdn1.ozone.ru/multimedia/c1000/1023214267.jpg'},
    {id: '88', title: 'Noyan Премимум. Банан', price: 160, description: '1л.', image: 'https://cdn1.ozone.ru/multimedia/c1200/1025296861.jpg'},
    {id: '89', title: 'Noyan Премимум. Абрикос', price: 155, description: '1л.', image: 'https://cdn1.ozone.ru/multimedia/c1000/1023214244.jpg'},
    {id: '90', title: 'Noyan Премимум. Персик', price: 160, description: '1л.', image: 'https://avatars.mds.yandex.net/get-eda/1962206/43ce1a0eac8ce865de4a6a9ae8ab04c9/800x800nocrop'},
    {id: '91', title: 'Noyan Премимум. Апельсин', price: 180, description: '1л.', image: 'https://foodmall.ru/upload/resize_cache/iblock/9c3/7b6sc9h2pxp8kln72l8czx3yghev4orf/1200_1200_140cd750bba9870f18aada2478b24840a/3659_1.jpg'},
    {id: '92', title: 'Noyan Премимум. Мультифрукт', price: 180, description: '1л.', image: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/1514739414/100024018216b0.jpeg'},
    {id: '93', title: 'Noyan Премимум. Облепиха', price: 200, description: '1л.', image: 'https://www.sas.am/upload/iblock/122/000684.jpg'},
    {id: '94', title: 'Noyan Премимум. Кизил', price: 200, description: '1л.', image: 'https://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/08/d2/3106a36fb26xdaa3dd1a7d79b0fd.jpg'},
    {id: '95', title: 'Noyan. Компот из вишни', price: 185, description: '', image: ''},
    {id: '96', title: 'Noyan. Компот из айвы', price: 185, description: '', image: ''},
    {id: '97', title: 'Noyan. Компот из ежевики', price: 185, description: '', image: ''},
    {id: '98', title: 'Noyan. Компот из клубники', price: 185, description: '', image: ''},
    {id: '99', title: 'Tamara fruit. Компот из ежевики', price: 185, description: '', image: ''},
    {id: '100', title: 'Tamara fruit. Компот из персика', price: 185, description: '', image: ''},
    {id: '101', title: 'Tamara fruit. Компот из терна', price: 185, description: '', image: ''},
    {id: '102', title: 'Tamara fruit. Компот из смородины', price: 185, description: '', image: ''},
    {id: '103', title: 'Tamara fruit. Компот из айвы', price: 185, description: '', image: ''},
    {id: '104', title: 'Ecofood. Компот из айвы', price: 185, description: '', image: ''},
    {id: '105', title: 'Natakhtari. Лимонад', price: 100, description: '1л, пэт, вкусы: груша, тархун, апельсин, крем-сливки, лимон, фейхоа', image: 'https://avatars.mds.yandex.net/get-mpic/5303294/img_id1622355467941350856.jpeg/orig'},
    {id: '106', title: 'Natakhtari. Лимонад', price: 12000, description: '', image: ''},
    {id: '107', title: 'Джермук. Минеральная вода с лимоном', price: 100, description: '1л', image: 'https://bon-jur.ru/wp-content/uploads/2022/08/джермук-лимон-1-600x600.png'},
    {id: '108', title: 'Джермук. Минеральная вода', price: 100, description: '1л', image: 'https://cdn1.ozone.ru/s3/multimedia-w/c1000/6106332692.jpg'},
    {id: '109', title: 'CocaCola', price: 75, description: '0,5л - 75руб, 0.9л - 100руб, 1.5л - 180руб, сделанное в Армении, в наличии есть ваниль', image: 'https://api.magonline.ru/thumbnail/740x494/28/020/28020.png'},
    {id: '110', title: 'Fanta', price: 75, description: '0.5 - 75руб', image: ''},
    {id: '111', title: 'Дилиджан', price: 12000, description: '', image: ''},
    {id: '112', title: 'Noy', price: 12000, description: '', image: ''},
    {id: '113', title: '7up', price: 1, description: '', image: ''},
    {id: '114', title: 'Burn', price: 1, description: '', image: ''},
    {id: '115', title: 'Adrenaline Rush', price: 1, description: '', image: ''},
    {id: '116', title: 'Голд Cold. Natural Mineral Water', price: 1, description: '', image: ''},
    {id: '117', title: 'Сок Добрый', price: 1, description: '', image: ''},
    {id: '118', title: 'Рычалсу', price: 1, description: '', image: ''},
    {id: '119', title: 'Sprite', price: 1, description: '', image: ''},
    {id: '120', title: 'Kilikia. Тархун', price:65, description: 'лимонад', image: ''},
    {id: '121', title: 'Kilikia. Лайм', price: 65, description: 'лимонад', image: ''},
    {id: '122', title: 'Kilikia. Апельсин', price:65, description: 'лимонад', image: ''},
    {id: '123', title: 'Noy. Дюшес', price: 75, description: '', image: ''},
    {id: '124', title: 'Noy. Тархун', price: 75, description: '', image: ''},
    {id: '125', title: 'JoSo. Лимонад', price: 85, description: '', image: ''},
    {id: '126', title: 'Чито грито. Фейхоа', price: 85, description: 'лимонад', image: ''},
    {id: '127', title: 'Pulpy', price: 75, description: 'сок с мякотью, со вкусом клубники и апельсина', image: ''},
    {id: '128', title: 'Jermuk.  Минеральная вода', price: 60, description: 'железная банка, ', image: ''},
    {id: '129', title: 'Добрый. Апельсин', price: 50, description: 'железная банка', image: ''},
    {id: '130', title: 'Добрый. Спрайт', price: 50, description: 'железная банка', image: ''},
    {id: '131', title: 'Добрый. Кола', price: 1, description: '', image: ''},
    {id: '132', title: '', price: 1, description: '', image: ''},
    {id: '133', title: '', price: 1, description: '', image: ''},
    {id: '134', title: '', price: 1, description: '', image: ''},
    {id: '135', title: '', price: 1, description: '', image: ''},
    {id: '136', title: '', price: 1, description: '', image: ''},
    {id: '137', title: '', price: 1, description: '', image: ''},
    {id: '138', title: '', price: 1, description: '', image: ''},
    {id: '139', title: '', price: 1, description: '', image: ''},
    {id: '140', title: '', price: 1, description: '', image: ''},
    {id: '141', title: '', price: 1, description: '', image: ''},
    {id: '142', title: '', price: 1, description: '', image: ''},
    {id: '142', title: '', price: 1, description: '', image: ''},






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
