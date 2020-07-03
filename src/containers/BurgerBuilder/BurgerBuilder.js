import React, { Component } from "react";
import Aux from "../../hoc/higher";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import FinalBurgerPreview from "../../components/Burger/FinalBurgerPreview/FinalBurgerPreview";
import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";

class BurgerBuilder extends Component {
  state = {
    // ingredients:null,
    // totalPrice:4,
    purchasble: false,
    purchased: false,
    purchaseComplete: false,
    Loading: false,
  };

  // Making call to fetch ingredients from the server
  componentDidMount() {
    // console.log('inside the component did mount ');
    // axios.get('/ingredients.json')
    //     .then(response=>{
    //         this.props.onIngredientsFetch(response.data)
    //     })
    // this is one of the method to fetch ingredients from firebase
    // in our component then passing them through dispatch to the reducer
    // to avoid async calling in reducer itself
    // other method can be to apply asyn code in our redux to fetch the ingredients

    this.props.oninitIngredients();
  }
  updatePurchaseHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingd) => ingredients[ingd])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  OrdereHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchased: true });
    } else {
      this.props.onsetAuthRedirectPath('/CheckOut');
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchased: false });
  };

  purchaseContinueHandler = () => {
    this.props.oninitPurchase();
    this.props.history.push("/CheckOut");
  };
  previewClosedHandler = () => {
    this.setState({
      purchaseComplete: false,
    });
  };
  render() {
    const Disabledinfo = { ...this.props.ings };
    for (let key in Disabledinfo) {
      Disabledinfo[key] = Disabledinfo[key] <= 0;
    }
    let burger = this.props.error ? (
      <p>Ingredients can not be fetched </p>
    ) : (
      <Spinner />
    );
    let ordersummary = <Spinner />;
    if (this.props.ings) {
      ordersummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );

      burger = (
        <Aux>
          {/* <FinalBurgerPreview loading ={this.state.Loading} 
                    finalpreview={this.state.purchaseComplete} 
                    ingredients = {this.state.ingredients} 
                    previewClosed={this.previewClosedHandler}/> */}

          <Burger ingredients={this.props.ings} />

          <BuildControls
            ingredientAdded={this.props.onIngredientAdd}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={Disabledinfo}
            isAuth={this.props.isAuthenticated}
            price={this.props.totalPrice}
            purchasble={this.updatePurchaseHandler(this.props.ings)}
            ordered={this.OrdereHandler}
          />
        </Aux>
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchased}
          modalClosed={this.purchaseCancelHandler}
        >
          {ordersummary};
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdd: (igName) => dispatch(actions.addIngredient(igName)),
    onIngredientRemove: (igName) => dispatch(actions.removeIngredient(igName)),
    // onIngredientsFetch : (ings) => dispatch(BurderBuilderActions.fetchIngredients(ings)),
    oninitIngredients: () => dispatch(actions.initIngredients()),
    oninitPurchase: () => dispatch(actions.purchaseInit()),
    onsetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
