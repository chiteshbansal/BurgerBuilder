import React ,{Component} from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import classes from './Orders.module.css';
import {connect} from 'react-redux';
import * as actions from '../../Store/actions/index';
class Orders extends Component{

    componentDidMount(){
        console.log('inside the order',this.props.orders);
        this.props.onFetchOrders(this.props.token);
    }
    render(){
        let  Orders = this.props.orders.map(order =>(<Order key={order.id} orderDetails = {order}/>));
        if(this.props.orders.length===0){
            Orders = <div className={classes.NoOrderBox}>
                    There are No Orders to Show
            </div>
        }
        
        return(
            <div className={classes.Myorders}>
                {Orders}
            </div>
            
            
        );
    }
}

const mapStateToProps = state =>{
    return {
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.idToken,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        onFetchOrders: (token) => dispatch(actions.fetchOrder(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,axios));