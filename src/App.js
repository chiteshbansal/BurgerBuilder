import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import { BrowserRouter,Route} from 'react-router-dom'
class  App extends React.Component {
  render(){
    return (
      <BrowserRouter>
          <div>
            <Layout>
            <Route path ="/" exact component={BurgerBuilder}/>
              <Route path= "/CheckOut" component={CheckOut}/>
            </Layout>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
