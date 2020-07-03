import React from 'react';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../Store/actions/index';
import { connect } from 'react-redux';
class Logout extends React.Component {
    componentDidMount() {
        this.props.onLogoutHandler();
    }
    render() {
        return <Redirect to ='/'/>
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        onLogoutHandler :()=> dispatch(actions.authLogout()),
    }
}

export default connect(null,mapDispatchToProps)(Logout);