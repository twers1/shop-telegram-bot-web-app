import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [fio, setFio] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const [phone, setPhone] = useState('');
    const [usernameTg, setUsernameTg] = useState('');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            fio,
            street,
            subject,
            phone,
            usernameTg
        }
        tg.sendData(JSON.stringify(data));
    }, [fio, street, subject, phone, usernameTg])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!street || !fio) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [fio, street])

    const onChangeFio = (e) => {
        setFio(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const onChangeUsernameTg = (e) => {
        setUsernameTg(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'ФИО'}
                value={fio}
                onChange={onChangeFio}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Улица'}
                value={street}
                onChange={onChangeStreet}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Телефон'}
                value={street}
                onChange={onChangePhone}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Ник пользователя(в телеграмме)'}
                value={street}
                onChange={onChangeUsernameTg}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Физ. лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select>
        </div>
    );
};

export default Form;
