import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './sign.css';
import { FcGoogle } from 'react-icons/fc';
import { RiFacebookBoxFill } from 'react-icons/ri';
import React, { useState } from 'react';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, dbreal } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { set, ref } from 'firebase/database';
import { uid } from 'uid';


interface signinterface {
    changeSign: any
}

export const SignUp = ({ changeSign }: signinterface) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [role, setRole] = useState('Пасажир');
    const [error, setError] = useState("");
    const push = useNavigate();

    const handlerEmail = (e: React.ChangeEvent<any>) => {
        setEmail(e.target.value)
    }
    const handlerPassword = (e: React.ChangeEvent<any>) => {
        setPassword(e.target.value)
    }
    const handlerName = (e: React.ChangeEvent<any>) => {
        setName(e.target.value)
    }
    const handlerAge = (e: React.ChangeEvent<any>) => {
        setAge(e.target.value)
    }

    const handlerRole = (e: React.ChangeEvent<any>) => {
        setRole(e.target.value)
    }
    const SignGoogle = () => {
        const provider = new GoogleAuthProvider();
        const uidd = uid()
        signInWithPopup(auth, provider)
            .then((result) => {
                set(ref(dbreal, `/users/${result.user.uid}/${uidd}`), {
                    first: result.user.displayName,
                    age: 18,
                    role: role,
                    uidd: uidd,
                    uiduser: result.user.uid
                })
                push('/');
            }).catch((error) => {
            });
    }
    const SignFacebook = () => {
        const provider = new FacebookAuthProvider();
        const uidd = uid();
        signInWithPopup(auth, provider)
            .then((result) => {
                set(ref(dbreal, `/users/${result.user.uid}/${uidd}`), {
                    first: result.user.displayName,
                    age: 18,
                    role: role,
                    uidd: uidd,
                    uiduser: result.user.uid
                })
                push('/');
            })
            .catch((error) => {
            });
    }
    const handleSubmit = async () => {
        if (!email || !password || !age || !name) {
            setError('Потрібно заповнити всі поля')
        } else {
            const uidd = uid();
            createUserWithEmailAndPassword(auth, email, password)
                .then(({ user }) => {
                    set(ref(dbreal, `/users/${user.uid}/${uidd}`), {
                        first: name,
                        age: age,
                        role: role,
                        uidd: uidd,
                        uiduser: user.uid
                    })
                    push('/');
                })
                .catch((err) => {
                    if (err.message === 'Firebase: Error (auth/invalid-email).') {
                        setError('Неправильно введено пошту');
                    } else if (err.message === `Firebase: Error (auth/wrong-password).` || `Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).`) {
                        setError('Пароль мінімум 6 символів');
                    }
                    console.log(err.message)
                })
        }
    }
    return (
        <div className="sign__container">
            <Form className='sign-form'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Ім'я</Form.Label>
                    <Form.Control type="text" placeholder="Введіть ваше ім'я"  onChange={(e) => handlerName(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Ваш вік</Form.Label>
                    <Form.Control type="number" placeholder="Введіть скільки вам років" onChange={(e) => handlerAge(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Електронна пошта</Form.Label>
                    <Form.Control type="email" placeholder="Введіть пошту" onChange={(e) => handlerEmail(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Введіть пароль" onChange={(e) => handlerPassword(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Оберіть собі роль</Form.Label>
                    <Form.Select aria-label="Оберіть собі роль" onChange={(e) => handlerRole(e)}>
                        <option value="Пасажир">Пасажир</option>
                        <option value="Адмін">Адмін</option>
                        <option value="Диспетчер">Диспетчер</option>
                    </Form.Select>
                </Form.Group>

                {error !== '' &&
                    <div className="error-message__block">
                        <Form.Text className="error-message">
                            {error}
                        </Form.Text>
                    </div>
                }
                <Button variant="primary" onClick={handleSubmit}>
                    Зареєструватися
                </Button>
                <Form.Text className="text-muted text-change-sign-method">
                    Є аккаунту? <span onClick={changeSign}>Увійти.</span>
                </Form.Text>
                <div className="button-sign">
                    <Button variant="outline-warning" className='button-sign__method' onClick={SignGoogle}><FcGoogle />Увійти з Google</Button>
                    <Button variant="outline-primary" className='button-sign__method' onClick={SignFacebook}><RiFacebookBoxFill />Увійти з Facebook</Button>
                </div>
            </Form>
        </div>
    )
}