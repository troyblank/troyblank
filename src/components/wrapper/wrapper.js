import React from 'react';
import Head from '../head/head';
import Foot from '../foot/foot';

export default function Wrapper({ wrapperClassName, title, children }) {
    return (
      <x>
        <Head title={title} />
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
