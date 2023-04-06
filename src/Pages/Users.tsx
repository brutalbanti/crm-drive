import { MainUsers } from "../Components/Main/MainUsers"
import React, {  useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase/config";

export const Users = () => {
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
            <MainUsers />
        </>
    )
}