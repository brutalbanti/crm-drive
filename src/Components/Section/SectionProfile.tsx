import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import { auth, dbreal } from '../../firebase/config';
import { onValue, ref, update } from 'firebase/database';
import './profile.css'
export const SectionProfile = () => {
    const [profile, setProfile] = useState<any>({ first: '', age: '', role: '', uidd: '' });
    const [succes, setSucces] = useState<any>({ message: '', cheker: false });
    useEffect(() => {
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
    }, []);

    const handlerRole = (e: React.ChangeEvent<any>) => {
        setProfile({ first: profile.first, age: profile.age, role: e.target.value, uidd: profile.uidd })
    }
    const handlerSubmit = () => {
        auth.onAuthStateChanged((user: any) => {
            update(ref(dbreal, `/users/${user.uid}/${profile.uidd}`), {
                first: profile.first,
                age: profile.age,
                role: profile.role,
                uidd: profile.uidd,
            })
            setSucces({ message: 'Успішно змінено', cheker: true })
            setTimeout(function() {
                setSucces({ message: '', cheker: false })
            }, 2000)
        })
    }

    const handlerAge = (e: React.ChangeEvent<any>) => {
        setProfile({ first: profile.first, age: e.target.value, role: profile.role, uidd: profile.uidd })
    }

    return (
        <section className="page__profile">
            <div className="profile__container">
                <h1 className="profile__title">Налаштування профілю</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control type="text" readOnly value={profile.first} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Вік</Form.Label>
                        <Form.Control type="number" value={profile.age} onChange={handlerAge} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Оберіть собі роль</Form.Label>
                        <Form.Select aria-label="Оберіть собі роль" onChange={(e) => handlerRole(e)}>
                            <option value={profile.role}>{profile.role}</option>
                            {profile.role !== 'Пасажир' &&
                                <option value="Пасажир">Пасажир</option>
                            }
                            {profile.role !== 'Адмін' &&
                                <option value="Адмін">Адмін</option>
                            }
                            {profile.role !== 'Диспетчер' &&
                                <option value="Диспетчер">Диспетчер</option>
                            }
                        </Form.Select>
                        {profile.role !== '' &&
                            <Form.Text>
                                Наразі ваша роль {profile.role}
                            </Form.Text>
                        }
                    </Form.Group>
                    {succes.cheker &&
                        <div className="succes-message">
                            <Form.Text>
                                {succes.message}
                            </Form.Text>
                        </div>
                    }
                    <Button variant="primary" onClick={handlerSubmit}>
                        Зберегти змін
                    </Button>
                </Form>
            </div>
        </section>
    )
}