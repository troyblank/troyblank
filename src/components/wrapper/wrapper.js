import React from 'react';
import { Head, Foot } from '../';

export default function Wrapper({ wrapperClassName, children }) {
    return (
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
          { children }
        </div>
        <Foot />
      </x>
    );
}