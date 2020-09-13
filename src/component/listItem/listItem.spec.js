import React from 'react';

import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../Utils';
import ListItem from './index';

describe('listItem Component', () => {
  
  describe('Component Renders', () => {

    let wrapper;
    beforeEach(() => {
      const props = {
        title: 'Example Text',
        desc: 'Some Text'
      };
      wrapper = shallow(<ListItem {...props} />);
    });

    it('Should renders without error', () => {
      const component = findByTestAttr(wrapper, 'listItemComponent');
      expect(component.length).toBe(1);
    });

    it('Should render a title', () => {
      const title = findByTestAttr(wrapper, 'componentTitle');
      expect(title.length).toBe(1);
    });

    it('Should render a desc', () => {
      const desc = findByTestAttr(wrapper, 'componentDesc');
      expect(desc.length).toBe(1);
    });
  });

  describe('Should not render', () => {

    let wrapper;
    beforeEach(() => {
      const props = {
        desc: 'Some Text'
      };
      wrapper = shallow(<ListItem {...props} />);
    });

  it('Component is not rendered', () => {
      const component = findByTestAttr(wrapper, 'listItemComponent');
      expect(component.length).toBe(0);
    });
  });


});
