import React from 'react';
import { Wrapper } from '../../src/components';

export default function DwollaDevDocs() {
    return (
      <Wrapper wrapperClassName={'standalone'} title={'Dwolla Dev Docs'}>
        <section className={'content-cnt portfolio-piece'}>
          <div className={'content'}>
            <h1>Dwolla Dev Docs</h1><br />
            <h2>Jekyll | ID 020 | Dwolla | 2016</h2>
            <div className={'body'}>
              <div className={'slideshow center-wrap'}>
                <nav />
                <div className={'slide-band'} />
                <div className={'region'}>
                  <div className={'under-size-error'}>
                    <div>The size of your browser is too small to properly display this content.</div>
                    <img src={'/static/images/skull.png'} />
                  </div>
                  <div className={'slide resizeable image'} data-width={1024} data-height={680} data-resizeable={true}>
                    <img src={'/static/specimens/2016/dwollaDevDocs/images/screenShot_01.jpg'} alt={'Dwolla developer documentation'} />
                  </div>
                  <div className={'slide resizeable image'} data-width={1024} data-height={680} data-resizeable={true}>
                    <img src={'/static/specimens/2016/dwollaDevDocs/images/screenShot_02.jpg'} alt={'Dwolla developer documentation'} />
                  </div>
                </div>
              </div>
              <p>
                  Documentation sites are usually broken down into instructions, code samples, and menus, menus, and more menus. When it comes to organizing truly useful developer documentation, I have two beliefs: 1) important information should not be buried and 2) the user interface should be as intuitive as possible.
              </p>
              <p>
                  From personal experience trying to navigate some of the better known dev docs sites “out in the wild”, I get frustrated when the code snippets are not user friendly and when the documentation is poorly identified – like when it is assembled from a grab-bag of code examples, undocumented assumptions, and unsorted programming languages.
              </p>
              <p>
                  For the dev docs for Dwolla’s API, I added several features to polish the experience and make the site easy to use. By making the code snippets compact, adding the ability to sort by language within the snippet panel itself, and by mirroring navigation for user convenience, the reorganized dev doc site now allows users to identify preferred languages, which removes a lot of the clutter and confusion normally seen with developer documentation. The second solution I implemented was the ability to copy the snippets easily with a “Quick Copy” feature at the bottom of the snippet panel, allowing users to speedily extract pertinent bits of code.
              </p>
              <p>
                  One of my favorite parts of the dev docs site is that it was built with Jekyll, which paired so nicely with my modular style. Any future content editor’s additions to the site will look great no matter what.
              </p>
              <a href={'https://developers.dwolla.com/'}>Visit the developer docs themselves</a>
              <a href={'http://blog.dwolla.com/dwollas-open-sourced-developer-documentation-portal/'}>Read Dwolla’s blog post about the Developer docs</a>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
