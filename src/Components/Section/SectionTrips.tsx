import React, { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import './trips.css';
import line from '../../source/border_2.svg';
export const SectionTrips = () => {
    const [collectionTrips, setCollectionTrips] = useState<any>([]);
    useEffect(() => {
        const datatrips = async () => {
            const colRef = collection(db, 'trips');
            const snapshot = await getDocs(colRef);
            const data = snapshot.docs.map((doc) => doc.data());
            setCollectionTrips(data)
            console.log(collectionTrips)
        }
        datatrips();
    }, [])
    return (
        <section className="page__trips">
            <div className="trips__container">
                <h1 className="trips__title">
                    Список подорожів
                </h1>
                <div className="trips__items">
                    {collectionTrips.map((item: any, index: number) => (
                        <div className="trips__item" key={index}>
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
        </section>
    )
}