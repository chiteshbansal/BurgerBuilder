import React from 'react';
import classes from './Toolbar.module.css';
import BurgerLogo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggler from './DrawerToggler/DrawerToggler';

const toolbar = (props) =>(
    <header className = {classes.Toolbar}>
        <DrawToggler clicked = {props.DrawerToggler}/>
        <div className = {classes.Logo}>
         <BurgerLogo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated = {props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;