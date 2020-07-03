import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import { BrowserRouter,Route} from 'react-router-dom'
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
    return (
      <BrowserRouter>
          <div>
            <Layout>
            <Route path ="/" exact component={BurgerBuilder}/>
              <Route path= "/CheckOut" component={CheckOut}/>
              <Route path = "/MyOrder" exact component={Orders}/>
              <Route path = "/auth" exact component={Auth}/>
              <Route path = "/Logout" exact component={Logout}/>
            </Layout>
          </div>
      </BrowserRouter>
    );
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    onTryAutoSignUp:() => dispatch(actions.checkAuthState()),
  }
}
export default connect(null,mapDispatchToProps)(App);
