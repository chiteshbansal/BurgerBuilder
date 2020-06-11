import React, {Component} from 'react';
import Aux from '../../hoc/higher';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INTGREDIENT_PRICES ={
    salad:0.5,
    meat:1.3,
    cheese:0.4,
    bacon:0.7,
}
class BurgerBuilder extends Component {

    state={
        ingredients:{
            meat:0,
            cheese:0,
            salad:0,
            bacon:0
        },
        totalPrice:4,
        purchasble:false,
        purchased:false,
    }

    updatePurchaseHandler=(ingredients)=>{
        const sum = Object.keys(ingredients)
            .map((ingd)=>ingredients[ingd])
            .reduce((sum,el)=>{return sum+el},0);

        this.setState({
            purchasble:sum>0
        })
         
    }

    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        let UpdatedCount = oldCount+1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]=UpdatedCount;

        const priceAdditon = INTGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice+priceAdditon;

        this.setState({
            totalPrice:updatedPrice,
            ingredients:updatedIngredients,
        })
        this.updatePurchaseHandler(updatedIngredients);
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0)
        {
            return;
        }
        let UpdatedCount = oldCount-1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]=UpdatedCount;

        const priceDeduction = INTGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice-priceDeduction;

        this.setState({
            totalPrice:updatedPrice,
            ingredients:updatedIngredients,
        })
        this.updatePurchaseHandler(updatedIngredients);
    }

    OrdereHandler = () =>{
        this.setState({purchased:true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchased:false})
    }

    purchaseContinueHandler =() =>{
        alert('This delicious Burger is all your\'s');
    }
    render() {
        const Disabledinfo ={...this.state.ingredients};
        for (let key in  Disabledinfo)
        {
            Disabledinfo[key]=Disabledinfo[key]<=0;
        }
        return(
            <Aux>
                <Modal show =
                    {this.state.purchased} 
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        price = {this.state.totalPrice}
                        purchaseCancelled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled ={Disabledinfo}
                    price={this.state.totalPrice}
                    purchasble={this.state.purchasble}
                    ordered= {this.OrdereHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;