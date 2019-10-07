import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import IndexPage from '../../pages/index';

describe('Page - Index', () => {
    it('should render', () => {
        const wrapper = shallow(<IndexPage />);

        assert.isTrue(wrapper.contains(
            <div>hello world!</div>
        ));
    });
});
