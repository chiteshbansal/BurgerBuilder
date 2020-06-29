import React ,{Component} from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import classes from './Orders.module.css';
class Orders extends Component{

    state={
        orders:[],
        loading:true,
    }
    componentDidMount(){
        
        axios.get('orders.json')
            .then((response)=>{
                let fetchedOrders = [];

                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id:key,
                    })
                }
                this.setState({loading:false,orders:fetchedOrders});
                
                console.log('fetched orders', fetchedOrders);
               
            }).catch(error=>{
                this.setState({loading:false,})
            })
            
    }
    render(){
        let  Orders = this.state.orders.map(order =>(<Order key={order.id} orderDetails = {order}/>));
        if(this.state.orders.length===0){
            Orders = <div className={classes.NoOrderBox}>
                    There are No Orders to Show
            </div>
        }
        let orders = this.state.orders;
        return(
            <div className={classes.Myorders}>
                {Orders}
            </div>
            
            
        );
    }
}


export default WithErrorHandler(Orders,axios);