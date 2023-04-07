import React, { useState, useEffect } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db, dbreal } from "../../firebase/config";
import './trips.css';
import line from '../../source/border_2.svg';
import { Button, Form } from "react-bootstrap";
import { SectionAddTrips } from "./SectionAddTrips";
import { onValue, ref } from "firebase/database";
import { IoClose } from "react-icons/io5";

export const SectionTrips = () => {
    const [collectionTrips, setCollectionTrips] = useState<any>([]);
    const [isPopUp, setIsPopUp] = useState(false);
    const [profile, setProfile] = useState<any>({ role: '' });
    const [succesDelete, setSuccesDelete] = useState('');
    const [succesModal, setSuccesModal] = useState(false);
    const datatrips = async () => {
        let col: any = [];
        const colRef = collection(db, 'trips');
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map((doc) => col.push({ ...doc.data(), id: doc.id }));
        setCollectionTrips(col)
    }
    useEffect(() => {
        datatrips();
        auth.onAuthStateChanged((user: any) => {
            onValue(ref(dbreal, `/users/${user.uid}`), (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    Object.values(data).map((todo: any) => {
                        setProfile(todo)
                    })
                }
            })
        })
    }, [])

    const handlerPopUp = () => {
        setIsPopUp(!isPopUp)
    }

    const handlerDeleteDoc = async (id: string) => {
        const docRef = doc(db, 'trips', id);
        deleteDoc(docRef);
        setSuccesDelete('Успішно видалено');
        setSuccesModal(true);
        setTimeout(function() {
            setSuccesModal(false);
        }, 2000)
        datatrips();
    }
    const succesAddTrips = () => {
        setSuccesDelete('Успішно створено');
        setSuccesModal(true);
        setTimeout(function() {
            setSuccesModal(false);
        }, 2000)
    }

    return (
        <section className="page__trips">
            <div className="trips__container">
                <h1 className="trips__title">
                    Список подорожів
                </h1>
                <Button variant="warning" className="add-trips-button" onClick={handlerPopUp}>Створити подорож</Button>
                <div className={succesModal ? "succes-message-delete visible" : "succes-message-delete"}>
                    <Form.Text>
                        {succesDelete}
                    </Form.Text>
                </div>
                <div className="trips__items">
                    {collectionTrips.map((item: any, index: number) => (
                        <div className="trips__item" key={index}>
                            {profile.role === 'Диспетчер' &&
                                <IoClose className="close-form" onClick={() => handlerDeleteDoc(item.id)} />
                            }
                            <div className="trips-item__top">
                                <div className="trips-item-top__distance">
                                    {item.start}
                                </div>
                                <div className="trips-item-top__line">
                                    <img src={line} alt="" />
                                </div>
                                <div className="trips-item-top__distance">
                                    {item.finish}
                                </div>
                            </div>
                            <div className="trips-item__down">
                                <div className="trips-item-down__text">
                                    <span>Ім'я водія</span>
                                    <p>{item.name}</p>
                                </div>
                                <div className="trips-item-down__text">
                                    <span>Номер автомобіля</span>
                                    <p>{item.auto}</p>
                                </div>
                                <div className="trips-item-down__text">
                                    <span>К-сть пасажирів</span>
                                    <p>{item.passengers}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <SectionAddTrips isPopUp={isPopUp} handlerPopUp={handlerPopUp} datatrips={datatrips} succesAddTrips={succesAddTrips}/>
        </section>
    )
}