import React, { useState, useEffect } from "react";
import { MainHome } from "../Components/Main/MainHome"
import { auth } from "../firebase/config"
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const push = useNavigate();

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