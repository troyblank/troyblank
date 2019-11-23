import React from 'react';
import Chance from 'chance';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import { Head, Foot } from '..';
import Wrapper from './wrapper';

describe('Wrapper', () => {
    const chance = new Chance();
    const wrapperClassName = chance.word();

    it('should render', () => {
        const child = (<div />);
        const wrapper = shallow(<Wrapper wrapperClassName={wrapperClassName}>{ child }</Wrapper>);

        assert.isTrue(wrapper.contains(
          <x>
            <Head />
            <header>
              <a className={'logo'} />
              <nav>
                <ul>
                  <li><a data-href={'/about/'}>About</a></li>
                </ul>
              </nav>
            </header>
            <div id={'content-wrapper'} className={wrapperClassName}>
              { child }
            </div>
            <Foot />
          </x>
        ));
    });
});
