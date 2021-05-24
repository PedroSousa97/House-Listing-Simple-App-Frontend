import React from 'react';
import {NavLink} from 'react-router-dom'

import '../styles/header.css';

import logo from '../imgs/logo.png'

//Simple component that renders the Header and respective links

const Header = ()=>{
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="" width="60" height="60" className='logo'/>
                <h1 className="Title">Pedro's Places</h1>
            </div>
            <div className='links'>
            <NavLink className='homelink' to='/' exact activeStyle={{fontWeight:'bold',color:'#0099ff'}}>
                Home
            </NavLink>
            <NavLink className='createlink'  to='/create' exact activeStyle={{fontWeight:'bold',color:'#0099ff'}}>
                List your place
            </NavLink>
            </div>
        </div>
    )

}

export default Header