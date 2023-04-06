import { MainAddTrips } from "../Components/Main/MainAddTrips"
import React, {  useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase/config";

export const AddTrips = () => {
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
            <MainAddTrips />
        </>
    )
}