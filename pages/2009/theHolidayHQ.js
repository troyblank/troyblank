import React from 'react';
import { Wrapper } from '../../src/components';

export default function TheHolidayHQ() {
    return (
      <Wrapper wrapperClassName={'standalone'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>The Holiday HQ</h1><br />
            <h2>Processing | ID 005 | Salva O&apos;Renick | 2009</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band" />
                <div className="region">
                  <div className="under-size-error">
                    <div>The size of your browser is too small to properly display this content.</div>
                    <img src="/static/images/skull.png" />
                  </div>
                  <div className="slide resizeable image" data-width="850" data-height="550" data-resizeable="true">
                    <img src="/static/specimens/2009/theHolidayHQ/images/theHolidayHQ_1.jpg" alt="The Holiday HQ" />
                  </div>
                </div>
              </div>
              <p>Every year, the digital development team at Salva O&apos;Renick likes to push new technologies with the annual holiday piece. With the explosion of Twitter in 2009, we decided to use the Twitter API to see if we could start something socially intriguing. I programmed the site to employ HTML’s new canvas tag to display graphics without the need for third-party plug-ins--the snowflakes were programmed in Processing and are displayed using JavaScipt via the canvas tag. Please note since the changes in the Twitter API this site no longer works so you will have to settle for a pretty screen shot.</p>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
