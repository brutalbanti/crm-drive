import React, { useState, useEffect } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db, dbreal } from "../../firebase/config";
import './trips.css';
import line from '../../source/border_2.svg';
import { Button } from "react-bootstrap";
import { SectionAddTrips } from "./SectionAddTrips";
import { onValue, ref } from "firebase/database";
import { IoClose } from "react-icons/io5";

export const SectionTrips = () => {
    const [collectionTrips, setCollectionTrips] = useState<any>([]);
    const [isPopUp, setIsPopUp] = useState(false);
    const [profile, setProfile] = useState<any>({role: ''});
    useEffect(() => {
        const datatrips = async () => {
            const colRef = collection(db, 'trips');
            const snapshot = await getDocs(colRef);
            const data = snapshot.docs.map((doc) => doc.data());
            setCollectionTrips(data)
        }
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
    
    const handlerDeleteDoc = async (uidd: string) => {
       console.log('Заглушка')
    }

    return (
        <section className="page__trips">
            <div className="trips__container">
                <h1 className="trips__title">
                    Список подорожів
                </h1>
                <Button variant="warning" className="add-trips-button" onClick={handlerPopUp}>Створити подорож</Button>
                <div className="trips__items">
                    {collectionTrips.map((item: any, index: number) => (
                        <div className="trips__item" key={index}>
                            {profile.role === 'Диспетчер' &&
                                <IoClose className="close-form" onClick={() => handlerDeleteDoc(item.uidd)}/>
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
            <SectionAddTrips isPopUp={isPopUp} handlerPopUp={handlerPopUp} />
        </section>
    )
}