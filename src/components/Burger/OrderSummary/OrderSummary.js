import React from 'react';
import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button'

const orderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
        .map((ingd)=>{
            return(
                <li key={ingd}>
                    <span style={{textTransform:'capitalize'}}>
                        {ingd}
                    </span>
                    :{props.ingredients[ingd]}
                </li>
            )
                    })
    return (
        <div className={classes.OrderSummary}>
            <h3>Your Order summary</h3>
            <p>A Delicious burger with the following Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price :{props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button type='Danger' clicked ={props.purchaseCancelled}>CANCEL</Button>
            <Button type='Success' clicked = {props.purchaseContinued}>CONTINUE</Button>
        </div>
    )
}

export default orderSummary