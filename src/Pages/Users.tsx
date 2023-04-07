import { MainUsers } from "../Components/Main/MainUsers"
import React, {  useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, dbreal } from "../firebase/config";
import { onValue, ref } from "firebase/database";

export const Users = () => {
    const push = useNavigate();
    // const [user, setUser] = useState<any>([]);

    useEffect(() => {
        auth.onAuthStateChanged((user: any) => {
            if (user) {
                onValue(ref(dbreal, `/users/${user.uid}`), (snapshot) => {
                    const data = snapshot.val();
                    if (data !== null) {
                        let user: any;
                        Object.values(data).map((todo: any) => {
                            user = todo;
                        })
                        if(user.role !== 'Адмін') {
                            push('/');
                        }
                    }
                })
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