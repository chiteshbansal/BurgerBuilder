import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as orderActions from "../../../Store/actions/index";
class ContactData extends Component {
  state = {
    OrderForm: {
      name: {
        ElementType: "input",
        ElementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        validate: {
          required: true,
        },
        valid: false,
        value: "",
        touched: false,
      },
      street: {
        ElementType: "input",
        ElementConfig: {
          type: "text",
          placeholder: "Street",
        },
        validate: {
          required: true,
        },
        valid: false,
        value: "",
        touched: false,
      },
      city: {
        ElementType: "input",
        ElementConfig: {
          type: "text",
          placeholder: "Your City",
        },
        validate: {
          required: true,
        },
        valid: false,
        value: "",
        touched: false,
      },
      zipcode: {
        ElementType: "input",
        ElementConfig: {
          type: "text",
          placeholder: "Zipcode",
        },
        validate: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        valid: false,
        value: "",
        touched: false,
      },
      country: {
        ElementType: "input",
        ElementConfig: {
          type: "text",
          placeholder: "Country",
        },
        validate: {
          required: true,
        },
        valid: false,
        value: "",
        touched: false,
      },
      email: {
        ElementType: "input",
        ElementConfig: {
          type: "email",
          placeholder: "Your Mail",
        },
        validate: {
          required: true,
        },
        valid: false,
        value: "",
        touched: false,
      },
      deliveryMethod: {
        ElementType: "select",
        ElementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
      },
    },
    formIsvalid: false,
  };

  CheckValidiy(value, rules) {
    let Isvalid = true;

    if (rules.required) {
      Isvalid = value.trim() !== "" && Isvalid;
    }

    if (rules.minLength) {
      Isvalid = value.length >= rules.minLength && Isvalid;
    }

    if (rules.maxLength) {
      Isvalid = value.length <= rules.maxLength && Isvalid;
    }
    return Isvalid;
  }
  inputChangeHandler = (event, InputIdentifier) => {
    // whenever we are dealing with input elements
    // remember to use onchange handler
    // to change the value state of the input element
    // event argument is passed by react by default
    // we can access it anytime
    let OldOrderForms = { ...this.state.OrderForm };
    const UpdatedformElement = { ...OldOrderForms[InputIdentifier] };
    UpdatedformElement.value = event.target.value;
    if (UpdatedformElement.validate)
      UpdatedformElement.valid = this.CheckValidiy(
        UpdatedformElement.value,
        UpdatedformElement.validate
      );
    UpdatedformElement.touched = true;
    OldOrderForms[InputIdentifier] = UpdatedformElement;

    let formIsvalid = true;
    for (let identifier in OldOrderForms) {
      if (OldOrderForms[identifier].validate)
        formIsvalid = OldOrderForms[identifier].valid && formIsvalid;
    }

    console.log("form disable", !formIsvalid);
    this.setState({
      OrderForm: OldOrderForms,
      formIsvalid: formIsvalid,
    });
  };
  OrderHandler = (event) => {
    // event.preventDefault();
    const FormData = {};
    for (let formElementIdentifier in this.state.OrderForm) {
      FormData[formElementIdentifier] = this.state.OrderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      OrderData: FormData,
      userId: this.props.userId,
    };

    this.props.onOrderHandler(order, this.props.token);
    //     axios.post('/orders.json',order)
    //         .then(response=>{
    //             this.setState({loading:false,});
    //             this.props.history.push('/');
    //         })
    //         .catch(error=>this.setState({Loading:false,}));
    // console.log('indide the order handler',this.props.ingredients);
  };
  render() {
    console.log("inside the contact data");
    const formElements = [];
    for (let key in this.state.OrderForm) {
      formElements.push({
        id: key,
        config: this.state.OrderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.OrderHandler}>
        {formElements.map((formElement) => {
          return (
            <Input
              elementType={formElement.config.ElementType}
              elementConfig={formElement.config.ElementConfig}
              value={formElement.config.value}
              key={formElement.id}
              label={formElement.id}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validate}
              Invalid={!formElement.config.valid}
              changed={(event) =>
                this.inputChangeHandler(event, formElement.id)
              }
            />
          );
        })}
        <Button type="Success" disabled={!this.state.formIsvalid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h3>Enter you contact Details</h3>
        {form}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    onOrderHandler: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToprops
)(withErrorHandler(ContactData, axios));
