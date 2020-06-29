import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';


const Burger = (props) =>{

    console.log('burger',props.ingredients);
    let transformedIngredients = null;
    if(props.ingredients)
    {
     transformedIngredients = Object.keys(props.ingredients)
        .map((igkey)=>{
            return[...Array(props.ingredients[igkey])].map((_,i)=>{
                return <BurgerIngredient key={igkey+i} type={igkey}/>
            });
        }).reduce((arr,el)=>{return arr.concat(el)},[]);

        if(transformedIngredients.length===0)
        {
            transformedIngredients = <p>Please start adding ingredients</p>
        }
    }
    return (
        <div className={classes.Burger} style={props.style}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients} 
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}


export default Burger;  