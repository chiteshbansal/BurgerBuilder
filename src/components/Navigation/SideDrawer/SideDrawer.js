import React from  'react';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux  from "../../../hoc/higher";


const SideDrawer =(props) =>{
    let assignedClasses = [classes.SideDrawer, classes.Close];
    if(props.open)
    {
        assignedClasses=[classes.SideDrawer,classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={assignedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
            
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth}/>
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer;