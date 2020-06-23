import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './Order.module.css';
const Order = (props) =>{
    console.log('orderdetails',props.orderDetails);
    let ingredients = props.orderDetails.ingredients;
    let orderSummary = Object.keys(ingredients)
                        .map(ingred=>(
                            <div 
                                style ={{textTransform:"capitalize"}}
                                key ={ingred}>
                                {ingred}:{ingredients[ingred]}
                            </div>))
                        
    return(
        <div className={classes.Order}>
            <div className={classes.OrderSummary}>
                <div className={classes.summary}>
                    <h3>Ingredients</h3>
                    {orderSummary}
                </div>
                <div className={classes.Burger}>
                    <Burger  ingredients={props.orderDetails.ingredients} style = {{width: '250px',height: '250px'}}/>
                </div>
            </div>
            <p className={classes.TotalPrice }>Total Price: <strong>{Number(props.orderDetails.price).toFixed(2)}</strong></p>
        </div>
    )
}


export default Order;