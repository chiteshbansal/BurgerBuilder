import React from 'react';
import classes from './Input.module.css';


const Input = (props)=>{
    
    let Inputclass = [classes.InputElement];

    if(props.Invalid && props.shouldValidate && props.touched){
        Inputclass.push(classes.Invalid);
    }   

    let InputElement = null;
    let details = props.elementConfig.type==='password' && props.Invalid && props.touched?
            <div style={{color:'red',}}>
                Password should be at least {props.shouldValidate.minLength} characters long
            </div>:null;
    switch(props.elementType){
        case('input'):
            InputElement=<input 
                className={Inputclass.join(" ")} 
                 {...props.elementConfig}
                 defaultValue={props.value}
                 onChange={props.changed}/>
                 
            break;
        
        case('textarea'):
            InputElement=<textarea 
                 className={Inputclass.join(" ")}
                  {...props.elementConfig}
                  defaultValue={props.value}
                  onChange={props.changed}/>;
            break;
        case('select'):
            InputElement=<select className={Inputclass.join(" ")}
                            onChange={props.changed}>
                            {props.elementConfig.options.map((option)=>{
                                return <option key={option.value} 
                                        value={option.value}>
                                        {option.displayValue}
                                        </option>
                            })}
                        </select>
                        break;
        default:
            InputElement=<input
                required={props.required}  
                className={Inputclass.join(" ")} 
                {...props.elementConfig}
                defaultValue={props.value}
                onChange={props.changed}/>;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {InputElement}
            {details}
        </div>
    )
}


export default Input;