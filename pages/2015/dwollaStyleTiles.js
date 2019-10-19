import React from 'react';
import { Wrapper } from '../../src/components';

export default function DwollaStyleTilesPage() {
    return (
      <Wrapper wrapperClassName={'standalone'} title={'Dwolla Style Tiles'}>
        <section className={'content-cnt portfolio-piece'}>
          <div className={'content'}>
            <h1>Dwolla Style Tiles</h1><br />
            <h2>CSS | ID 019 | Dwolla | 2015</h2>
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
                    <img src={'/static/specimens/2015/dwollaStyleTiles/images/screenShot_01.jpg'} alt={'Dwolla Style Tiles'} />
                  </div>
                  <div className={'slide resizeable image'} data-width={1024} data-height={680} data-resizeable={true}>
                    <img src={'/static/specimens/2015/dwollaStyleTiles/images/screenShot_02.jpg'} alt={'Dwolla Style Tiles'} />
                  </div>
                  <div className={'slide resizeable image'} data-width={1024} data-height={680} data-resizeable={true}>
                    <img src={'/static/specimens/2015/dwollaStyleTiles/images/screenShot_03.jpg'} alt={'Dwolla Style Tiles'} />
                  </div>
                  <div className={'slide resizeable image'} data-width={1024} data-height={680} data-resizeable={true}>
                    <img src={'/static/specimens/2015/dwollaStyleTiles/images/screenShot_04.jpg'} alt={'Dwolla Style Tiles'} />
                  </div>
                </div>
              </div>
              <p>
                When joining a startup, it’s a good bet that you will be inheriting a significant amount of technical debt. In such a fast-paced environment, the ‘ideal’ way is often put on the back burner in favor of speed; but as the company matures, you need to tackle that debt as soon as you have an opportunity. My biggest contribution at Dwolla to date has been modularizing their interface so any part of it can be used with exceptional flexibility.
              </p>
              <p>
                Awhile back, I heard <a href={'https://twitter.com/samanthatoy'}>Samantha Toy’s</a> talk about Style Tiles and was enamored with this approach. About a year later, I found myself knee deep in legacy spaghetti CSS, and well-organized Style Tiles proved immensely beneficial to the cleanup process. Other developers then used the Tiles as reference to improve production efficiency; the marketing team used information on the Tiles to ensure communications followed brand standards; and the Tiles also added a buffer between the actual application and its visual components, which improved collaboration and productively between the product and engineering teams. The Tiles were not only a living, breathing production tool, but they also provided internal documentation and feedback on user interaction through the main application consuming the tiles. It was obvious that building out such a style system was instantly valuable both internally and externally. The tiles philosophy has since used on many Dwolla projects, but most notably for external facing product pages, such as <a href={'https://www.dwolla.com/about'}>About</a>, <a href={'https://www.dwolla.com/pricing'}>Pricing</a>, and <a href={'https://www.dwolla.com/fisync'}>FiSync</a>.
              </p>
              <p>
                After successfully using the Style Tiles for a year and Dwolla moved onto bigger greenfield projects, I evolved the Tiles into React.js components. Because of their flexibility, not only did the Tiles clean up past technical debt, they minimized future technical debt when it was time to migrate to a new process.
              </p>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
