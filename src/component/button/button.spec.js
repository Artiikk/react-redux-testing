import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../Utils';
import Button from '../button';

describe('Button Component', () => {

  describe('Renders', () => {

    let wrapper;
    beforeEach(() => {
      const props = {
        buttonText: 'Button Text',
        emitEvent: () => {}
      };
      wrapper = shallow(<Button {...props} />);
    });

    it('Should render a button', () => {
      const button = findByTestAttr(wrapper, 'buttonComponent');
      expect(button.length).toBe(1);
    });

  });

});

