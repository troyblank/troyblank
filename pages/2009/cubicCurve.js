import React from 'react';
import { Wrapper } from '../../src/components';

export default function CubicCurve() {
    return (
      <Wrapper wrapperClassName={'standalone'} title={'Cubic Curve'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>Cubic Curve</h1><br />
            <h2>Flash | ID 006 | 2009</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band" />
                <div className="region">
                  <div className="under-size-error">
                    <div>The size of your browser is too small to properly display this content.</div>
                    <img src="/static/images/skull.png" />
                  </div>
                  <div className="slide resizeable" data-src="/static/specimens/2009/cubicCurve/swf/cubicCurve.swf" data-width="600" data-height="400" data-resizeable="true" data-type="flash" data-version="9.0.28" data-flash-vars="" data-flash-params="" data-trap-keys="false">
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
              <p>While programming recently, I found myself lacking control over curves when using the drawing API within ActionScript. My only option appeared to be a Quadratic Bezier curve, which uses only one control point to plot the curve. However, I wanted two control points, similar to what can be created using the pen tool in Adobe Photoshop. After much research into the mathematics behind Bezier curves, I was able to formulate code to plot Cubic Bezier curves using Flash. My source code is linked below—feel free to download this code for creating cubic curves in your own work.</p>
              <a href="/static/specimens/2009/cubicCurve/source/cubicCurve.zip" target="_self">Download Source</a>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
