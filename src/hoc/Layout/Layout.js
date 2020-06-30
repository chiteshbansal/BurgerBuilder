import React from "react";
import Aux from "../higher";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
        <Toolbar DrawerToggler={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDraw}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
