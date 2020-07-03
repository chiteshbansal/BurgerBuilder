import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

// Reducers 
import BurgerBuilderreducer from './Store/reducers/BurgerBuilder';
import OrderReducer from './Store/reducers/order';
import authReducer  from './Store/reducers/Auth';

const rootReducer = combineReducers({
    burgerBuilder:BurgerBuilderreducer,
    order:OrderReducer,
    auth:authReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
    <App/>
    
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

