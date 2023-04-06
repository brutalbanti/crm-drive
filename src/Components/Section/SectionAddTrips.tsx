import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { db } from '../../firebase/config';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import './trips.css';
import { IoClose } from 'react-icons/io5';

interface popuptrips {
    isPopUp?: boolean,
    handlerPopUp: any
}

export const SectionAddTrips = ({ isPopUp, handlerPopUp }: popuptrips) => {
    const [dataTrips, setDataTrips] = useState<any>({ name: '', auto: '', start: '', finish: '', passengers: '' });
    const [error, setError] = useState('');
    const [succes, setSucces] = useState('');

    const handlerName = (e: React.ChangeEvent<any>) => {
        setDataTrips({ name: e.target.value, auto: dataTrips.auto, start: dataTrips.start, finish: dataTrips.finish, passengers: dataTrips.passengers })
    }
    const handlerAuto = (e: React.ChangeEvent<any>) => {
        setDataTrips({ name: dataTrips.name, auto: e.target.value, start: dataTrips.start, finish: dataTrips.finish, passengers: dataTrips.passengers })
    }
    const handlerStart = (e: React.ChangeEvent<any>) => {
        setDataTrips({ name: dataTrips.name, auto: dataTrips.auto, start: e.target.value, finish: dataTrips.finish, passengers: dataTrips.passengers })
    }
    const handlerFinish = (e: React.ChangeEvent<any>) => {
        setDataTrips({ name: dataTrips.name, auto: dataTrips.auto, start: dataTrips.start, finish: e.target.value, passengers: dataTrips.passengers })
    }
    const handlerPassengers = (e: React.ChangeEvent<any>) => {
        setDataTrips({ name: dataTrips.name, auto: dataTrips.auto, start: dataTrips.start, finish: dataTrips.finish, passengers: e.target.value })
    }

    const submitAddTrips = () => {
        if (!dataTrips.name || !dataTrips.auto || !dataTrips.start || !dataTrips.finish || !dataTrips.passengers) {
            setError('Потрібно заповнити всі поля')
        } else {
            setError('');
            addDoc(collection(db, `trips`), {
                name: dataTrips.name,
                auto: dataTrips.auto,
                start: dataTrips.start,
                finish: dataTrips.finish,
                passengers: dataTrips.passengers
            });
            setSucces('Поїздку успішно створено')
            setTimeout(function () {
                setSucces('');
            }, 2000)
            setDataTrips({ name: '', auto: '', start: '', finish: '', passengers: '' })
            handlerPopUp();
        }
    }
    return (
        <section className={isPopUp ? "page__add-trips visible" : 'page__add-trips'}>
            <div className="add-trips__container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Form className='form-add-trips'>
                    <h1 className="add-trips__title">Створення поїздки</h1>
                    <IoClose className='close-form' onClick={handlerPopUp} />
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Ім'я водія</Form.Label>
                        <Form.Control type="text" placeholder="Введіть ім'я" value={dataTrips.name} onChange={(e) => handlerName(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Номер автомобіля</Form.Label>
                        <Form.Control type="text" placeholder="Введіть номер автомобіля" value={dataTrips.auto} onChange={(e) => handlerAuto(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Звідки їхати?</Form.Label>
                        <Form.Control type="text" placeholder="Введіть звідки буде подорож" value={dataTrips.start} onChange={(e) => handlerStart(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Куди їхати?</Form.Label>
                        <Form.Control type="text" placeholder="Введіть куди буде подорож" value={dataTrips.finish} onChange={(e) => handlerFinish(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Кількість пасажирів</Form.Label>
                        <Form.Control type="number" placeholder="Вкажіть кількість пасажирів" value={dataTrips.passengers} onChange={(e) => handlerPassengers(e)} />
                    </Form.Group>
                    {error !== '' &&
                        <div className="error-message__block">
                            <Form.Text className="error-message">
                                {error}
                            </Form.Text>
                        </div>
                    }
                    {succes !== '' &&
                        <div className="succes-message">
                            <Form.Text>
                                {succes}
                            </Form.Text>
                        </div>
                    }
                    <Button variant="primary" className='button-add-trips' onClick={submitAddTrips}>
                        Створити
                    </Button>
                </Form>
            </div>

        </section>
    )
}