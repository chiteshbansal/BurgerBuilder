import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';
import reducer from '../reducers/order';

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
export const purchaseBurger = ( orderData,token) =>{
    console.log("order data is ",orderData)
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData)
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


export const purchaseInit = ()=>{
    return {
        type:actionTypes.PURCHASE_INIT,
    }
}


export const fetchOrdersSuccess = (orders)=>{
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders,
    }
}

export const fetchOrdersFail = (error)=>{
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error,
    }
}

export const fetchOrdersStart = () =>{
    return {
        type:actionTypes.FETCH_ORDERS_START,
        loading :true,
    }
}

export const fetchOrder = (token) =>{
    return dispatch => {
        dispatch(fetchOrdersStart()); 
        console.log('inside the order token is ', token);  
        axios.get('orders.json?auth='+token)
            .then((response)=>{
                let fetchedOrders = [];

                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id:key,
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
               
            }).catch(error=>{
                dispatch(fetchOrdersFail(error));
            })
    }
}



