import React from 'react';
import { Wrapper } from '../../src/components';

export default function LepsLogo() {
    return (
      <Wrapper wrapperclassNameName={'standalone'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>The Fighting Leprechauns Logo</h1><br />
            <h2>Illustration | ID 013 | 2012</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band" />
                <div className="region">
                  <div className="slide resizeable image" data-width="1050" data-height="500" data-resizeable="true">
                    <img src="/static/specimens/2012/lepsLogo/images/lepsLogo_01.jpg" alt="Fighting Leprachuan Logo" />
                  </div>
                  <div className="slide resizeable image" data-width="1050" data-height="500" data-resizeable="true">
                    <img src="/static/specimens/2012/lepsLogo/images/lepsLogo_02.jpg" alt="Fighting Leprachuan Pinup Girl" />
                  </div>
                </div>
              </div>
              <p>From time to time, I try to exercise my illustration skills as it&apos;s something I rarely get the opportunity to do. The logo above was done for an adult-league hockey team. The wives of the team loved the new sweaters so much that they also wanted something unique to wear while they cheer from the stands.  After much cajoling, I designed a unique t-shirt illustration that to show off the hockey wives’ spirit, too. </p>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
