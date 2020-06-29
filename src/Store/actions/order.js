import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId,orderData) =>{
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:orderId,
        orderData:orderData,
    }
}

export const purchaseBurgerFail = (error )=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error,
    }
}

export const purchaseBurgerStart = () =>{
    return {
        type:actionTypes.PURCHASE_BURGER_START,
    }
}
export const purchaseBurger = ( orderData) =>{
    console.log("order data is ",orderData)
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json',orderData)
        .then(response=>{
            console.log("response is ",response.data);
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
            // this.setState({loading:false,});
            // this.props.history.push('/');
        })
        .catch(error=>{
            console.log('error',error);
            dispatch(purchaseBurgerFail(error));
        });    
    }
}