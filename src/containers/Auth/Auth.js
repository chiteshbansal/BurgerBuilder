import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from "../../Store/actions/index";
import { Redirect } from "react-router";
class Auth extends Component {
  state = {
    controls: {
      email: {
        ElementType: "input",
        ElementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        validate: {
          required: true,
          isEmail: true,
        },
        valid: false,
        value: "",
        touched: false,
      },
      password: {
        ElementType: "input",
        ElementConfig: {
          type: "password",
          placeholder: "Password",
        },
        validate: {
          required: true,
          minLength: 8,
        },
        valid: false,
        value: "",
        touched: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if(!this.props.building && this.props.authRedirectPath!=='/'){
      this.props.onsetAuthRedirectPath();
    }
  }
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

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      Isvalid = pattern.test(value) && Isvalid;
    }
    return Isvalid;
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    const { email, password } = this.state.controls;
    this.props.onAuthHandler(email.value, password.value, this.state.isSignUp);
  };

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.CheckValidiy(
          event.target.value,
          this.state.controls[controlName].validate
        ),
        touched: true,
      },
    };

    this.setState({
      controls: updatedControls,
    });
  };

  onSwitchAuthHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };
  render() {
    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let errormessage = null;
    if(this.props.error){
        errormessage = <div>
            {this.props.error.message}
        </div>
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
      </form>
    );
    let complete_form = <div className={classes.Auth}>
                            {this.props.isAuthenticated?<Redirect to={this.props.authRedirectPath}/>:null}
                            {errormessage}
                            {form}
                            <Button type="Success" clicked={this.onSubmitHandler}>
                            Submit
                            </Button>
                            <Button type="Danger" clicked={this.onSwitchAuthHandler}>
                            Switch to {this.state.isSignUp ? "Sign IN" : "Sign Up"}
                            </Button>
                        </div>
    if(this.props.loading){
        complete_form=<Spinner/>
    }
    return complete_form;
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken!==null,
    loading: state.auth.loading,
    error : state.auth.error,
    building:state.burgerBuilder.building,
    authRedirectPath : state.auth.authRedirectPath,
  };
};
const mapDispatchToprops = (dispatch) => {
  return {
    onAuthHandler: (email, password, isSignUp) =>
      dispatch(actions.Auth(email, password, isSignUp)),
    onsetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(Auth);
