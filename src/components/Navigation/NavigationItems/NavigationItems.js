import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" >
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated?<NavigationItem link="/MyOrder">My Orders</NavigationItem>:null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Authentication</NavigationItem>
    ) : (
      <NavigationItem link="/Logout">Log Out</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
