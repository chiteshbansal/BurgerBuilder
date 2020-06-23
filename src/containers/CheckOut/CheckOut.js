import React ,{Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
class CheckOut extends Component{
    state={
        ingredients:null,
        totalPrice :0,
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients  = {};
        let price  = 0;
        for(let param of query.entries()){
            //['salad','2']
            if(param[0]==='price'){
                price = param[1];
            }else{
                ingredients[param[0]] = Number(param[1]);// we need to have quantity in number 
            }
            
        }
        console.log('inside the component did mount',ingredients);

        this.setState({
            ingredients:ingredients,
            totalPrice :price,
        })

    }


    CheckOutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    CheckOutContinuedHandler = () =>{
        this.props.history.replace('/CheckOut/contact-data');
    }
    render(){
        console.log("indide the render",this.state.ingredients);
        return(
            
            <div>
                <CheckOutSummary 
                    CheckOutCancelled = {this.CheckOutCancelledHandler}
                    CheckOutContinued= {this.CheckOutContinuedHandler}
                    ingredients={this.state.ingredients}/>
                <Route path={this.props.match.path+"/contact-data"} render = {(props)=>{
                    return <ContactData ingredients={this.state.ingredients} price ={this.state.totalPrice} {...props}/>
                }}/>
            </div>
        )
    }
}

export default CheckOut;