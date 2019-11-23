import React from 'react';
import { Wrapper } from '../../src/components';

export default function DigitalHeader() {
    return (
      <Wrapper wrapperClassName={'standalone'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>Digital Header</h1><br />
            <h2>Flash | ID 011 | Salva O&apos;Renick | 2010</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band" />
                <div className="region">
                  <div className="under-size-error">
                    <div>The size of your browser is too small to properly display this content.</div>
                    <img src="/static/images/skull.png" />
                  </div>
                  <div className="slide resizeable" data-src="/static/specimens/2010/digitalHeader/swf/salvaOrenick_digiHeader.swf" data-width="900" data-height="600" data-resizeable="true" data-type="flash" data-version="9.0.28" data-flash-vars="" data-flash-params="" data-trap-keys="false">
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
                  <div className="slide resizeable image" data-width="752" data-height="600" data-resizeable="true">
                    <img src="/static/specimens/2010/digitalHeader/images/salvaOrenickHeader_1.jpg" alt="Digital Header" />
                  </div>
                </div>
              </div>
              <p>This header animation was created for a website that never got to see the light of day, but the animation was too interesting to scrap. It&apos;s a random, slow moving particle animation that is mirrored across the centerline of the header. Originally, it was meant to add a cool factor to the site and not be overly distracting. Let this lively little banner mesmerize you.</p>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
