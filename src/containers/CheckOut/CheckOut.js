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
        this.props.history.replace('/CheckOut/contact-data');
    }
    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ings){
            summary = <CheckOutSummary 
            CheckOutCancelled = {this.CheckOutCancelledHandler}
            CheckOutContinued= {this.CheckOutContinuedHandler}
            ingredients={this.props.ings}/>
        }
        return(
            
            <div>
                {summary}
                <Route path={this.props.match.path+"/contact-data"} component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
    }
}

export default connect(mapStateToProps)(CheckOut);