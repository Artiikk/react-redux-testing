import React from 'react';

import App from './App';
import { shallow, mount } from 'enzyme';
import { findByTestAttr, testStore } from './../Utils';
import Button from './component/button';
import { toggleBtn } from './App'

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
  const wrapper = shallow(<App store={store} />).childAt(0).dive();
  // console.log(wrapper.debug());
  return wrapper;
};

describe('App Component', () => {

  let wrapper;
  let appMounted;
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
    const store = testStore(initialState);
    wrapper = setUp(initialState);
    appMounted = mount(<App store={store} />)
  });

  it('Should render without errors', () => {
    const component = findByTestAttr(wrapper, 'appComponent');
    expect(component.length).toBe(1);
  });

  it('Toggle method is updating state as expected', () => {
    const componentButton = findByTestAttr(appMounted, 'buttonComponent')
    componentButton.simulate('click')
    const listItems = findByTestAttr(appMounted, 'listItemComponent')
    // console.log('listItems', listItems.debug());
    expect(listItems.length).toEqual(3);
    
    // const classInstance = wrapper.instance();
    // classInstance.toggleBtn();
    // const newState = classInstance.state.btn;
    // expect(newState).toBe(true);
  });

  it('Expect listItem to have text inside after updated state', () => {
    const componentButton = findByTestAttr(appMounted, 'buttonComponent')
    componentButton.simulate('click')
    const componentTitle = findByTestAttr(appMounted, 'componentTitle')
    componentTitle.forEach((node, idx) => expect(node.text()).toEqual(`Example title ${idx + 1}`))

    // console.log('listItems', componentTitle.at(2).debug()); // at 2 position in found collection
    // first() / last() - to get first and last elements in a collection found
    
    // for classes
    // const classInstance = wrapper.instance();
    // classInstance.toggleBtn();
    // const newState = classInstance.state.btn;
    // expect(newState).toBe(true);
  });
});

// Shallow rendering (неглубокая отрисовка — прим.перев.) отрисовывает только сам компонент, 
// без дочерних компонентов. Поэтому, если что-то измените в дочернем компоненте, 
// то это не изменит неглубокий вывод вашего компонента. 
// И даже баг, находящийся в вашем дочернем компоненте, 
// не изменит результат тестирования вашего компонента. К тому же, для этого не требуется DOM.
// The difference between shallow() and mount() is that  shallow() tests components in isolation from the child components they render while mount() goes deeper and tests a component's children.

// Errors Faced while testing
// Before React 16, Enzyme was used to test class based react components and the instance method was used to access the component class’ methods and test it. But with the latest react 16 adaptor, while testing functional components, the instance object is returned as null.
// Because of this, I was unable to test the inner methods or state of the components. The methods and state variables/methods were inaccessible as they were inside the scope of that particular function definition.
// So, in this case, how are we supposed to test the state updation and inner method of those components. After much research, it became clear that for proper unit testing and getting complete code coverage, it is not recommended to define methods inside the functional component.
// In order to keep the methods unit-testable, it has to be defined outside the functional component and exported along with the component. That way all methods defined can be imported into test file and properly unit tested.
// In the functional approach, we need to use the useState method to define and update the state of the component. How are we suppose to test it as it cannot be exported like the fix given methods inside functional components??
// Well, the truth is we directly cannot test the state change of the state is not directly accessible to test as it is inside the functional scope. Instead, we will have to test the side-effects caused by the state update.
// In our project, we are trying to update the state of email/password field when the on-change event triggers the field. To test the state change, we are simulating the change event and passing the value for event.target.value and then we are comparing if the fields prop “value” is equal to the value given to the simulated event target. If it is equal that means the component state is updating on event change successfully. See the login.test.js file for more clarity.

