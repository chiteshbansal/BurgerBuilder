import React, {Component} from 'react';
import Aux from '../../hoc/higher';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import FinalBurgerPreview from '../../components/Burger/FinalBurgerPreview/FinalBurgerPreview';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const INTGREDIENT_PRICES ={
    salad:0.5,
    meat:1.3,
    cheese:0.4,
    bacon:0.7,
}
class BurgerBuilder extends Component {

    state={
        ingredients:{
            salad:0,
            meat:0,
            bacon:0,
            cheese:0,
        },
        totalPrice:4,
        purchasble:false,
        purchased:false,
        purchaseComplete:false,
        Loading:false,
    }

    // Making call to fetch ingredients from the server
    componentDidMount(){
        console.log('inside the component did mount ');
        // axios.get('/ingredients.json')
        //     .then(response=>{
        //         this.setState({ingredients:response.data});
        //     })
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
        // this.setState({
        //     purchased:false,
        //     purchaseComplete:true,
        //     Loading:true,
        // })
        let queryParams  =[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price'+'='+this.state.totalPrice);
        let queryString = queryParams.join("&");
        this.props.history.push({
            pathname:"/CheckOut",
            search:"?"+queryString,
        });
        // const order = {
        //     ingredients:this.state.ingredients,
        //     price : this.state.totalPrice,
        //     customer:{
        //         name:"chitesh",
        //         address:{
        //             street:"testStreet",
        //             city:"xys",
        //             zipcode:"2324",
        //             country:"abs",
        //         },
        //         email:"chitesh@exp.com",

        //     },
        //     deliveryMethod:'fastest',
        // }
        // axios.post('/orders.json',order)
        //     .then(response=>this.setState({Loading:false,}))
        //     .catch(error=>this.setState({Loading:false,purchaseComplete:false,}));
    }
    previewClosedHandler = ()=>{
        this.setState({
            purchaseComplete:false,
        })
    } 
    render() {
        const Disabledinfo ={...this.state.ingredients};
        for (let key in  Disabledinfo)
        {
            Disabledinfo[key]=Disabledinfo[key]<=0;
        }
        let burger = <Spinner/>
        let ordersummary =<Spinner/>
        if(this.state.ingredients){
            ordersummary=(<OrderSummary 
                ingredients={this.state.ingredients} 
                price = {this.state.totalPrice}
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler} />)

            burger = (
                <Aux>
                    {/* <FinalBurgerPreview loading ={this.state.Loading} 
                    finalpreview={this.state.purchaseComplete} 
                    ingredients = {this.state.ingredients} 
                    previewClosed={this.previewClosedHandler}/> */}

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
        return(
            <Aux>
                <Modal show =
                    {this.state.purchased} 
                    modalClosed={this.purchaseCancelHandler}>
                    {ordersummary};
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default WithErrorHandler(BurgerBuilder,axios);