import React, { useEffect, useState } from 'react';
import { auth, db, dbreal } from '../../firebase/config';
import { onValue, ref, update } from 'firebase/database';
import './users.css'
import { Button } from 'react-bootstrap';
import { PopUp } from '../PopUp';

export const SectionUsers = () => {
    const [users, setUsers] = useState<any>([]);
    const [isPopUp, setIsPopUp] = useState(false);
    const [valueFirst, setValueFirst] = useState('');
    const [valueAge, setValueAge] = useState('');
    const [valueRole, setValueRole] = useState('');
    const [uidd, setUidd] = useState('');
    const [userUidd, setUserUidd] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged((user: any) => {
            onValue(ref(dbreal, `/`), (snapshot) => {
                const data = snapshot.val();
                if (data !== null || undefined) {
                    setUsers([]);
                    Object.values(data).map((todo: any) => {
                        const result = Object.values(todo);
                        result.map((item: any) => {
                            setUsers((prev: any) => [...prev, Object.values(item)]);
                        })
                    })
                }
            })
        })
    }, []);
    const handlerPopUp = () => {
        setIsPopUp(!isPopUp);
    }
    const handlerValueFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueFirst(e.target.value);
    }
    const handlerValueAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueAge(e.target.value);
    }
    const handlerValueRole = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueRole(e.target.value);
    }
    const handlerEditPopUp = (first: string, age: string, role: string, uidd: string, useruid: string) => {
        handlerPopUp();
        console.log(first)
        setValueFirst(first);
        setValueAge(age);
        setValueRole(role);
        setUidd(uidd);
        setUserUidd(useruid);
        console.log(useruid)
    }
    const handleConfirmEdit = () => {
        auth.onAuthStateChanged((user: any) => {
            update(ref(dbreal, `/users/${userUidd}/${uidd}`), {
                first: valueFirst,
                age: valueAge,
                role: valueRole,
                uidd: uidd,
                uiduser: userUidd
            })
        })
        handlerPopUp();
    }

    // users.map((item: any, index: number) => {
    //     console.log('------------------------------------------')
    //     console.log(item[0].first)
    // })
    return (
        <section className="page__users">
            <div className="users__container">
                <h1 className="users__title">Редагування користувачів</h1>
                <div className="users__items">
                    {users.map((item: any, index: number) => (
                        <div className="user__item" key={index}>
                            <div className="user-item__block-item">
                                <h4 className="user-item__sub-title">Ім'я</h4>
                                <div key={index} className='user-item__text'>{item[0].first}</div>
                            </div>
                            <div className="user-item__block-item">
                                <h4 className="user-item__sub-title">Вік</h4>
                                <div key={index} className='user-item__text'>{item[0].age}</div>
                            </div>
                            <div className="user-item__block-item">
                                <h4 className="user-item__sub-title">Роль</h4>
                                <div key={index} className='user-item__text'>{item[0].role}</div>
                            </div>
                            <div className="user-item__block-item">
                                <div className="user-item__button">
                                    <Button variant="info" onClick={() => handlerEditPopUp(item[0].first, item[0].age, item[0].role, item[0].uidd, item[0].uiduser)}>Змінити</Button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <PopUp
                isPopUp={isPopUp}
                handlerPopUp={handlerPopUp}
                handleConfirmEdit={handleConfirmEdit}
                valueFirst={valueFirst}
                handlerValueFirst={handlerValueFirst}
                valueAge={valueAge}
                handlerValueAge={handlerValueAge}
                valueRole={valueRole}
                handlerValueRole={handlerValueRole}
            />
        </section>
    )
}