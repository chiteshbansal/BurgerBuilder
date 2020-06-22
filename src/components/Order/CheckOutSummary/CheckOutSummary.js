import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckOutSummary.module.css';
const CheckOutSummary = (props) =>{
    return(
        <div className={classes.CheckOutSummary}>
            <h1>We hope it tastes well</h1>
            <div>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <Button 
                type ="Success"
                clicked ={props.CheckOutContinued}>
                CONTINUE</Button>
            <Button 
                type ="Danger"
                clicked={props.CheckOutCancelled}>
                CANCEL</Button>
        </div>
    )
}

export default  CheckOutSummary;