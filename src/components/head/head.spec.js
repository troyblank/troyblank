import React from 'react';
import Head from 'next/head';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import HeadComponent from './head';

describe('Head', () => {
    it('should render', () => {
        const wrapper = shallow(<HeadComponent />);

        assert.isTrue(wrapper.contains(
          <Head>
            <meta charset={'utf-8'} />
            <meta name={'viewport'} content={'width=device-width, minimum-scale=1.0'} />

            <link rel={'shortcut icon'} href={'/static/icons/favicon.ico'} />
          </Head>
        ));
    });
});
