import React from 'react';
import './Login.css';
import AUTH_ENDPOINT from './spotify';
import logo from './spotifest.jpg'

function Login() {
    return (
        <div className='Login'>
           {/*  <img src={logo} /> */}
            <img src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg' />
            <a href={AUTH_ENDPOINT}>LOGIN WITH SPOTIFY</a>
        </div>
    );
}

export default Login;