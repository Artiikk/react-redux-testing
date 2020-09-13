import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../Utils';
import Button from '../button';

describe('Button Component', () => {

  describe('Renders', () => {

    let wrapper;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        buttonText: 'Button Text',
        emitEvent: mockFunc
      };
      wrapper = shallow(<Button {...props} />);
    });

    it('Should render a button', () => {
      const button = findByTestAttr(wrapper, 'buttonComponent');
      expect(button.length).toBe(1);
    });

    it('Should emit callback on click event', () => {
      const button = findByTestAttr(wrapper, 'buttonComponent');
      button.simulate('click');
      const callback = mockFunc.mock.calls.length;
      expect(callback).toBe(1);
    });

  });

});

