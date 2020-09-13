import React from 'react';

import App from './App';
import { shallow } from 'enzyme';
import { findByTestAttr, testStore } from './../Utils';


// A typical HOC wraps a Component, and injects props, strips props, injects context, 
// and/or hooks into lifecycle methods, and then renders that Component. 
// Shallow wrapping an HOC does not actually exercise any of the code in Component, 
// it creates a wrapper around <Component /> itself - you can verify this with wrapper.debug(). 
// When you .dive(), you're throwing away the HOC, and rendering (exercising the code in) 
// Component, and creating a wrapper around what Component renders. 
// You can dive on any custom component - it's just that usually you're doing it on an HOC.

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  // at child at 0 we are getting a decoration of a component, not a component itself
  // const wrapper = shallow(<App store={store} />).childAt(0).shallow();
  const wrapper = shallow(<App store={store} />).childAt(0).dive();
  // console.log(wrapper.debug());
  return wrapper;
};

describe('App Component', () => {

  let wrapper;
  beforeEach(() => {
    const initialState = {
      posts: [
        {
          title: 'Example title 1',
          body: 'Some text'
        },
        {
          title: 'Example title 2',
          body: 'Some text'
        },
        {
          title: 'Example title 3',
          body: 'Some text'
        }
      ]
    };
    wrapper = setUp(initialState);
  });

  it('Should render without errors', () => {
    const component = findByTestAttr(wrapper, 'appComponent');
    expect(component.length).toBe(1);
  });
});
