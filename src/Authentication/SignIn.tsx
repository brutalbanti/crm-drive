import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FcGoogle } from 'react-icons/fc';
import { RiFacebookBoxFill } from 'react-icons/ri';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, dbreal } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { onValue, ref, set } from 'firebase/database';
import { uid } from 'uid';

interface signinterface {
    changeSign: any
}
export const SignIn = ({ changeSign }: signinterface) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const push = useNavigate();


    const handleSubmit = () => {
        if (!email || !password) {
            setError('Потрібно заповнити всі поля')
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    auth.onAuthStateChanged((user: any) => {
                        onValue(ref(dbreal, `/users/${user.uid}`), (snapshot) => {
                            const data = snapshot.val();
                            if (data !== null) {
                                Object.values(data).map((todo: any) => {
                                    if(todo.role === 'Адмін') {
                                        push('/users');
                                    } else {
                                        push('/')
                                    }
                                })
                            }
                        })
                    })
                })
                .catch((err) => {
                    if (err.message === 'Firebase: Error (auth/invalid-email).') {
                        setError('Неправильно введено пошту');
                    } else if (err.message === `Firebase: Error (auth/wrong-password).` || `Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).`) {
                        setError('Неправильний пароль або такого аккаунту не існує ');
                    }
                    console.log(err.message)
                })
        }
    }

    const SignGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                onValue(ref(dbreal, `/users/${result.user.uid}`), (snapshot) => {
                    const data = snapshot.val();
                    if (data === null) {
                        const uidd = uid()
                        set(ref(dbreal, `/users/${result.user.uid}/${uidd}`), {
                            first: result.user.displayName,
                            age: 18,
                            role: 'Пасажир',
                            uidd: uidd,
                            uiduser: result.user.uid
                        })
                    } else {
                        let rolesData;
                        Object.values(data).map((todo: any) => {
                            rolesData = todo.role;
                        })
                        if (rolesData === 'Адмін') {
                            console.log(rolesData);
                            push('/users');
                        } else {
                            push('/')
                        }
                    }
                })
            }).catch((error) => {
            });
    }
    const SignFacebook = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                onValue(ref(dbreal, `/users/${result.user.uid}`), (snapshot) => {
                    const data = snapshot.val();
                    if (data === null) {
                        const uidd = uid()
                        set(ref(dbreal, `/users/${result.user.uid}/${uidd}`), {
                            first: result.user.displayName,
                            age: 18,
                            role: 'Пасажир',
                            uidd: uidd,
                            uiduser: result.user.uid
                        })
                    }
                })
                push('/')
            })
            .catch((error) => {
            });
    }

    const handlerEmail = (e: React.ChangeEvent<any>) => {
        setEmail(e.target.value)
    }
    const handlerPassword = (e: React.ChangeEvent<any>) => {
        setPassword(e.target.value)
    }



    return (
        <div className="sign__container">
            <Form className='sign-form'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Електронна пошта</Form.Label>
                    <Form.Control type="email" placeholder="Введіть пошту" onChange={(e) => handlerEmail(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Введіть пароль" onChange={(e) => handlerPassword(e)} />
                </Form.Group>
                {error !== '' &&
                    <div className="error-message__block">
                        <Form.Text className="error-message">
                            {error}
                        </Form.Text>
                    </div>
                }
                <Button variant="primary" onClick={handleSubmit}>
                    Увійти
                </Button>
                <Form.Text className="text-muted text-change-sign-method">
                    Немає аккаунту? <span onClick={changeSign}>Зареєструватися.</span>
                </Form.Text>
                <div className="button-sign">
                    <Button variant="outline-warning" className='button-sign__method' onClick={SignGoogle}><FcGoogle />Увійти з Google</Button>
                    <Button variant="outline-primary" className='button-sign__method' onClick={SignFacebook}><RiFacebookBoxFill />Увійти з Facebook</Button>
                </div>
            </Form>
        </div>
    )
}