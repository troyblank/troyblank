import React from 'react';
import Chance from 'chance';
import Head from 'next/head';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import HeadComponent from './head';

describe('Head', () => {
    const defaultPageTitle = 'Troy Blank Labs';
    const chance = new Chance();

    it('should render', () => {
        const title = chance.word();
        const wrapper = shallow(<HeadComponent title={title} />);

        assert.isTrue(wrapper.contains(
          <Head>
            <title>{`${defaultPageTitle} | ${title}`}</title>

            <meta charset={'utf-8'} />
            <meta name={'viewport'} content={'width=device-width, minimum-scale=1.0'} />

            <link rel={'shortcut icon'} href={'/static/icons/favicon.ico'} />
          </Head>
        ));
    });

    it('should render without a title', () => {
        const wrapper = shallow(<HeadComponent />);

        assert.equal(wrapper.find('title').text(), defaultPageTitle);
    });
});
