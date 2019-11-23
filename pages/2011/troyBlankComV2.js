import React from 'react';
import { Wrapper } from '../../src/components';

export default function TroyBlankComV2() {
    return (
      <Wrapper wrapperclassNameName={'standalone'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>troyblank.com V2</h1><br />
            <h2>Flash | ID 013 | 2011</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band" />
                <div className="region">
                  <div className="under-size-error">
                    <div>The size of your browser is too small to properly display this content.</div>
                    <img src="/static/images/skull.png" />
                  </div>
                  <div className="slide resizeable image" data-width="1050" data-height="362" data-resizeable="true">
                    <img src="/static/specimens/2011/troyblankcomV2/images/troyblankcomV2.jpg" alt="Troy Blank dot Com" />
                  </div>
                </div>
              </div>
              <p>This is my portfolio website, only made for the days when Flash dominated the Internet. The modern site you currently see was developed with the same key goal as its Flash predecessor: to display the portfolio pieces of its creator. In the old design concept, each portfolio piece is represented by an amoeba floating in the browser window. Generation and behavior of the amoebas was programmed to mimic real-world physics for a naturalistic and hypnotic effect.</p>
              <p>With the rise of mobile devices, screens for viewing the web have become increasingly smaller and require increasing flexibility of execution for optimum display across the various mobile platforms. Additionally, with Apple’s elimination of the Adobe Flash plugin, this animation-rich website has become obsolete and needed updating with something more flexible.</p>
              <p>For those that wish to experience this piece of personal history, make sure your browser is Flash enabled and click the link below.</p>
              <a href="http://v2.troyblank.com">View Website</a>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
