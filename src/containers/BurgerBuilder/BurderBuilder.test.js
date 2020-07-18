import React ,{Component} from "react";

import { BurgerBuilder } from "./BurgerBuilder.js";
import { shallow } from "enzyme";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

describe("<BurgerBuilder/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder />);
  });

  it(" should render <BuildControls /> when receiving ingredients", () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
