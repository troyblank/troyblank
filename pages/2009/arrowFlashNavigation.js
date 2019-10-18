import React from 'react';
import { Wrapper } from '../../src/components';

export default function ArrowFlashNavigation() {
    return (
      <Wrapper wrapperClassName={'standalone'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>Arrow Flash Navigation</h1><br />
            <h2>Flash | ID 004 | [Redacted] | 2009</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band" />
                <div className="region">
                  <div className="under-size-error">
                    <div>The size of your browser is too small to properly display this content.</div>
                    <img src="/static/images/skull.png" />
                  </div>
                  <div className="slide resizeable" data-src="/static/specimens/2009/arrowFlashNavigation/swf/arrowFlashNavigation.swf" data-width="979" data-height="431" data-resizeable="true" data-type="flash" data-version="9.0.28" data-flash-vars="" data-flash-params="" data-trap-keys="false">
                    <div className="flash-content">
                      <div id="flashContent1" className="flash-replacement-div">
                        <div className="flash-alternative-content">
                          <div>
                            <strong>You need to install Flash Player to view this content.</strong>
                            <br /><br />
                            <a href="http://www.adobe.com/go/getflashplayer"><img src="/static/images/get_flash_player.png" alt="Get Adobe Flash player" /></a>
                            <br /><br />
                            There is also possibility if you are on a device that does not support flash this content is not accessible to you.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p>I developed this little Flash navigation for a client. A slick interface full of animation and with bold visuals allows the user to access the data they want in an incredibly streamlined and engaging manner, without the user feeling as if they have been bogged down in details or buried by complicated navigation.</p>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
