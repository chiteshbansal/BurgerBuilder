import React ,{Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
class CheckOut extends Component{
    state={
        ingredients:{
            salad:1,
            meat:1,
            bacon:1,
            cheese:2,
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients  = {};
        for(let param of query.entries()){
            //['salad','2]
            ingredients[param[0]] = param[1];
        }

        this.setState({
            ingredients:ingredients
        })
        // this.setState({
        //     ingredients:
        // })
    }


    CheckOutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    CheckOutContinuedHandler = () =>{
        this.props.history.replace('/CheckOut/contact-data');
    }
    render(){
           
        return(
            <div>
                <CheckOutSummary 
                    CheckOutCancelled = {this.CheckOutCancelledHandler}
                    CheckOutContinued= {this.CheckOutContinuedHandler}
                    ingredients={this.state.ingredients}/>
            </div>
        )
    }
}

export default CheckOut;