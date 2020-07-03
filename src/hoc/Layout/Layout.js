import React from "react";
import Aux from "../higher";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect} from'react-redux';
class Layout extends React.Component {
  state = {
    showSideDraw: false,
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDraw: false });
  };
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDraw: !prevState.showSideDraw };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar 
          isAuth={this.props.isAuthenticated}
          DrawerToggler={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDraw}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated : state.auth.idToken !==null,
  }
}

export default connect (mapStateToProps)(Layout);
