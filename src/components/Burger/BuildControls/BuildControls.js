import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls =[
    { label:'Salad',type:'salad'},
    { label:'Bacon',type:'bacon'},
    { label:'Meat',type:'meat'},
    { label:'Cheeese',type:'cheese'},
]
const BuildControls = (props)=>{
    return (
        <div className={classes.BuildControls}>
            <p className={classes.CurrentPrice}>Current Price: {props.price.toFixed(2)}</p>
            {controls.map((ctrl)=>(
                <BuildControl 
                    label={ctrl.label} 
                    key={ctrl.label}
                    added={()=>props.ingredientAdded(ctrl.type)}
                    remove = {()=>props.ingredientRemoved(ctrl.type)}
                    disable = {props.disabled[ctrl.type]}/>
            ))}
            <button disabled={!props.purchasble} className = {classes.OrderButton} onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
}


export default BuildControls;