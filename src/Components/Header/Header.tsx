import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { auth, dbreal } from '../../firebase/config';
import React, { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './header.css'
import { SectionAddTrips } from '../Section/SectionAddTrips';
import { Button, Form } from 'react-bootstrap';
export const Header = () => {
    const [userInfo, setUserInfo] = useState<any>({ role: '' });
    // const [isPopUp, setIsPopUp] = useState(false);
    // const [succesDelete, setSuccesDelete] = useState('');
    // const [succesModal, setSuccesModal] = useState(false);


    const push = useNavigate();
    const signOunt = (e: any) => {
        e.preventDefault();
        auth.signOut();
        push('/authentication')
    }
    useEffect(() => {
        auth.onAuthStateChanged((user: any) => {
            onValue(ref(dbreal, `/users/${user.uid}`), (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    Object.values(data).map((todo: any) => {
                        setUserInfo(todo)
                    })
                }
            })
        })
    }, []);
    // const handlerPopUp = () => {
    //     setIsPopUp(!isPopUp);
    // }
    // const succesAddTrips = () => {
    //     setSuccesDelete('Успішно створено');
    //     setSuccesModal(true);
    //     setTimeout(function () {
    //         setSuccesModal(false);
    //     }, 2000)
    // }
    return (
        <header style={{position: 'relative'}}>
            {/* <div className={succesModal ? "succes-message-delete visible" : "succes-message-delete"}>
                <Form.Text>
                    {succesDelete}
                </Form.Text>
            </div> */}
            {[false].map((expand, index) => (
                <Navbar bg="white" expand={expand} className="" key={index}>

                    <Container fluid>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Brand href="/" style={{ fontWeight: '500' }}>CRM DRIVE</Navbar.Brand>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Меню
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="/">Редагування профілю</Nav.Link>
                                    <Nav.Link href="/trips">Поїздки</Nav.Link>
                                    {/* <Button onClick={handlerPopUp}>Створити поїздку</Button> */}
                                    {userInfo.role === 'Адмін' &&
                                        <Nav.Link href="/users">Редагування користувачів</Nav.Link>
                                    }
                                    <Nav.Link onClick={(e) => signOunt(e)}>Вийти</Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </header>
    );
}