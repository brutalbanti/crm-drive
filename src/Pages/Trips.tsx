import { MainTrips } from "../Components/Main/MainTrips"
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase/config";

export const Trips = () => {
    const push = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                return
            } else {
                push('/authentication')
            }
        })
    }, [])
    return (
        <>
            <MainTrips />
        </>
    )
}