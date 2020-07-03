import React ,{Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
class CheckOut extends Component{

    CheckOutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    CheckOutContinuedHandler = () =>{
        this.props.history.push('/CheckOut/contact-data');
    }
    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ings){
           let purchasedRedirect  = this.props.purchased?<Redirect to ='/'/>:null;
            summary = <div>
                    {purchasedRedirect}
                    <CheckOutSummary 
                    CheckOutCancelled = {this.CheckOutCancelledHandler}
                    CheckOutContinued= {this.CheckOutContinuedHandler}
                    ingredients={this.props.ings}/>
                    <Route path={this.props.match.url+"/contact-data"} component={ContactData}/>
            </div>
        }
        return (
            <div> 
                {summary}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased,
    }
}

export default connect(mapStateToProps)(CheckOut);