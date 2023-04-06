import React, { useState } from 'react';
import { SignIn } from '../Authentication/SignIn';
import { SignUp } from '../Authentication/SignUp';

export const Authentication = () => {
    const [chekerSign, setChekerSign] = useState(false);
    const changeSign = () => {
        setChekerSign(!chekerSign);
    }
    return (
        <main className='page'>
            {chekerSign ?
                <SignIn changeSign={changeSign}/>
                :
                <SignUp changeSign={changeSign}/>
            }
        </main>
    )
}