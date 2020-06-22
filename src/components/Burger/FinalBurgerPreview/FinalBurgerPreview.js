import React from 'react';
import Modal from '../../UI/Modal/Modal';
import Burger from '../Burger';
import Aux from '../../../hoc/higher';
import classes from './FinalBurgerPreview.module.css';
import Spinner from '../../UI/Spinner/Spinner';
const FinalBurgerPreview = (props)=>{

    let finalPreview = <div className={classes.finalPreview}>
                            <p>Here is your Delicious burger</p>
                            <div className={classes.Burger}>
                                <Burger  ingredients={props.ingredients} />
                            </div>
                        </div>

    if(props.loading){
        finalPreview=<Spinner/>;
    }
    return(
        
        <Aux>
            <Modal show={props.finalpreview} modalClosed={props.previewClosed} style={{width:'80%'}}>
                {finalPreview}
            </Modal>
        </Aux>
    )
}

export default FinalBurgerPreview;