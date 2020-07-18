import React from "react";

import { shallow } from "enzyme";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("should render two <NavigationItems/>  elements if not authenticated", () => {
    // render components shallowing not deeply that is if the component has child components then they are not render
    // child comp. are only rendered as placeholders , the content of them is not rendered
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItems/>  elements if  authenticated", () => {
    // render components shallowing not deeply that is if the component has child components then they are not render
    // child comp. are only rendered as placeholders , the content of them is not rendered
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should render three <NavigationItems/>  elements if  authenticated", () => {
    // render components shallowing not deeply that is if the component has child components then they are not render
    // child comp. are only rendered as placeholders , the content of them is not rendered
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/Logout">Log Out</NavigationItem>)
    ).toEqual(true);
  });
});
