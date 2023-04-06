import React, { useState, useEffect } from "react";
import { MainHome } from "../Components/Main/MainHome"
import { auth, dbreal } from "../firebase/config"
import { useNavigate } from 'react-router-dom';
import { onValue, ref } from "firebase/database";

export const Home = () => {
    const push = useNavigate();
    const [userInfo, setUserInfo] = useState<any>();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                push('/')
            } else {
                push('/authentication')
            }
        })
    }, [])
    return (
        <>
            <MainHome />
        </>
    )
}