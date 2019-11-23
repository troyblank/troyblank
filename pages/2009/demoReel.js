import React from 'react';
import { Wrapper } from '../../src/components';

export default function DemoReel() {
    return (
      <Wrapper wrapperClassName={'standalone'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>Demo Reel</h1><br />
            <h2>Video | ID 003 | Salva O&apos;Renick | 2009</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band" />
                <div className="region">
                  <div className="slide resizeable video" data-width="1024" data-height="593" data-alternative-size="600x355,275x172" data-resizeable="tiered" data-type="video">
                    <div className="video-player">
                      <video id="videoTag" poster="/static/specimens/2009/demoReel/images/demoReel.jpg">
                        <source src="/static/specimens/2009/demoReel/video/demoReel.mp4" />
                        <source src="/static/specimens/2009/demoReel/video/demoReel.ogv" />
                        <source src="/static/specimens/2009/demoReel/video/demoReel.webm" />
                      </video>
                      <div className="overlays">
                        <div className="buffer" />
                        <div className="big-play-btn" />
                      </div>
                      <div className="control-bar">
                        <a className="rewind-btn" />
                        <a className="play-pause-btn" />
                        <div className="scrub-bar">
                          <div className="load-bar" />
                          <div className="progress-bar" />
                          <div className="cursor" />
                        </div>
                        <div className="timer">
                          <span>00:00</span>
                        </div>
                        <div className="volume-bar">
                          <div className="status-bar" />
                          <div className="icon" />
                          <div className="cursor" />
                        </div>
                        <a className="full-screen-btn" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p>I put together a reel of some of the promotional video/motion work Salva O&apos;Renick had laying around collecting dust. I produced all but two of the videos on this reel.</p>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
