import React from 'react';
import { Wrapper } from '../../src/components';

export default function CheifsZone() {
    return (
      <Wrapper wrapperClassName={'standalone'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>Chiefs Zone</h1><br />
            <h2>Django | ID 009 | Sports Radio 810 WHB | 2010</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band" />
                <div className="region">
                  <div className="under-size-error">
                    <div>The size of your browser is too small to properly display this content.</div>
                    <img src="/static/images/skull.png" />
                  </div>
                  <div className="slide resizeable image" data-width="752" data-height="600" data-resizeable="true">
                    <img src="/static/specimens/2010/chiefsZone/images/810ChiefsZone_1.jpg" alt="Chiefs Zone" />
                  </div>
                  <div className="slide resizeable image" data-width="752" data-height="600" data-resizeable="true">
                    <img src="/static/specimens/2010/chiefsZone/images/810ChiefsZone_2.jpg" alt="Chiefs Zone" />
                  </div>
                  <div className="slide resizeable image" data-width="752" data-height="600" data-resizeable="true">
                    <img src="/static/specimens/2010/chiefsZone/images/810ChiefsZone_3.jpg" alt="Chiefs Zone" />
                  </div>
                </div>
              </div>
              <p>The &ldquo;Chiefs Zone&ldquo; is a special off-shoot of 810 Sports Radio WHB&apos;s main site that is dedicated to news and information for the Kansas City Chiefs. The site is socially fueled and structured around the team&apos;s week by week schedule. This site was my introduction to the amazing speed and flexibility of using Django running on a Linux server. While having an admin that allows the client to update site content seems like pretty standard fare, the instant gratification of having the power to upload virtually any video or audio file, independent of type, and to have the server encode and push to a streaming server for public consumption via Flash with no downtime and completely hands-off is an incredible tool to have in my digital toolbox. Getting to show-off my first Django powered site to the world is just icing on the cake.</p>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
