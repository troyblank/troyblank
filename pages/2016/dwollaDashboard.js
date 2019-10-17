import React from 'react';
import { Wrapper } from '../../src/components';

export default function DwollaDashboardPage() {
    return (
      <Wrapper wrapperClassName={'standalone'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>Dwolla Dashboard</h1><br />
            <h2>React.js | ID 021 | Dwolla | 2016</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band"></div>
                <div className="region">
                    <div className="under-size-error">
                        <div>The size of your browser is too small to properly display this content.</div>
                        <img src="/static/images/skull.png" />
                    </div>
                    <div className="slide resizeable image" data-width="1024" data-height="680" data-resizeable="true" >
                        <img src="/static/specimens/2016/dwollaDashboard/images/screenShot_01.jpg" alt="Dwolla dashboard charts" />
                    </div>
                    <div className="slide resizeable image" data-width="1024" data-height="680" data-resizeable="true" >
                        <img src="/static/specimens/2016/dwollaDashboard/images/screenShot_02.jpg" alt="Dwolla dashboard charts" />
                    </div>
                    <div className="slide resizeable image" data-width="1024" data-height="680" data-resizeable="true" >
                        <img src="/static/specimens/2016/dwollaDashboard/images/screenShot_03.jpg" alt="Dwolla dashboard transactions" />
                    </div>
                    <div className="slide resizeable image" data-width="1024" data-height="680" data-resizeable="true" >
                        <img src="/static/specimens/2016/dwollaDashboard/images/screenShot_04.jpg" alt="Dwolla dashboard customer" />
                    </div>  
                    <div className="slide resizeable image" data-width="1024" data-height="680" data-resizeable="true" >
                        <img src="/static/specimens/2016/dwollaDashboard/images/screenShot_05.jpg" alt="Dwolla dashboard customer" />
                    </div>
                    <div className="slide resizeable image" data-width="1024" data-height="550" data-resizeable="true" >
                        <img src="/static/specimens/2016/dwollaDashboard/images/storyBook_01.jpg" alt="Dwolla story book" />
                    </div>
                    <div className="slide resizeable image" data-width="1024" data-height="550" data-resizeable="true" >
                        <img src="/static/specimens/2016/dwollaDashboard/images/storyBook_02.jpg" alt="Dwolla story book" />
                    </div>
                </div>
              </div>
              <p>
                  Being a successful startup means responding to ever-adapting user needs, particularly with the rollout of new products and services. At Dwolla, we realized that this meant we needed to better leverage our <a href="https://docsv2.dwolla.com/">API</a>. This is where my team came in. We rebuilt the dashboard solution with a new focus on our API users. It was an exciting challenge to create user-tested prototypes, build production-ready React.js component libraries from those prototypes, and ensure across-the-board browser compatibility for the production application.
              </p>
              <p>
                  Highlights of this project included beautiful account overview charts, amazing filtering tools like date range selectors, and a suite of tools for managing customers. The project relied heavily on React.js to utilize our public API and we were even able to dogfood these services for internal benefit. From the start, we focused on semantics and accessibility, which are too often an afterthought in the development process
              </p>
              <p>
                  My contribution was to provide React.js components through a library called <a href="https://github.com/kadirahq/react-storybook">React-Storybook</a>. These components were then consumed as an npm package and then glued together in an isomorphic fashion.
              </p>
              <p>
                  I could talk about this gem for hours but the marketing people at Dwolla said it best on <a href="https://www.dwolla.com/updates/ach-transfer-dashboard/">their blog</a> so please read that for any more information on this project. Also if you really like the product, please upvote it on <a href="https://www.producthunt.com/tech/dwolla-dashboard-and-admin">Product Hunt</a>!
              </p>
            </div>
          </div>
        </section>
      </Wrapper>
    )
}