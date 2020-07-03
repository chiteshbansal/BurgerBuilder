import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import { BrowserRouter,Route,Switch, Redirect} from 'react-router-dom'
import * as actions from './Store/actions/index';
import {connect} from 'react-redux';
import Auth from './containers/Auth/Auth';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
class  App extends React.Component {
  componentDidMount() {
    console.log('inside the app class');
    this.props.onTryAutoSignUp();
  }


  render(){

    let routes =(
      <Switch>
        <Route path = "/auth"component={Auth}/>
        <Route path ="/" exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    )

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
              <Route path= "/CheckOut" component={CheckOut}/>
              <Route path = "/MyOrder"  component={Orders}/>
              <Route path = "/Logout" component={Logout}/>
              <Route path ="/" exact component={BurgerBuilder}/>
              <Redirect to='/'/>
        </Switch>
      )
    }
    return (
      <BrowserRouter>
          <div>
            <Layout>
              {routes}
            </Layout>
          </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    isAuthenticated:state.auth.idToken !==null,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    onTryAutoSignUp:() => dispatch(actions.checkAuthState()),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
