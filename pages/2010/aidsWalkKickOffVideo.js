import React from 'react';
import { Wrapper } from '../../src/components';

export default function AidsWalkKickOffVideo() {
    return (
      <Wrapper wrapperClassName={'standalone'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>Aids Walk Kick-Off Video</h1><br />
            <h2>Video | ID 008 | AIDS Walk Kansas City | 2010</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band" />
                <div className="region">
                  <div className="under-size-error">
                    <div>The size of your browser is too small to properly display this content.</div>
                    <img src="/static/images/skull.png" />
                  </div>
                  <div className="slide resizeable video" data-width="1024" data-height="593" data-alternative-size="600x355,275x172" data-resizeable="tiered" data-type="video">
                    <div className="video-player">
                      <video id="videoTag" poster="/static/specimens/2010/AidsWalkKickOffVideo/images/kickOffVideo_1.jpg">
                        <source src="/static/specimens/2010/AidsWalkKickOffVideo/video/kickOffVideo.mp4" />
                        <source src="/static/specimens/2010/AidsWalkKickOffVideo/video/kickOffVideo.ogv" />
                        <source src="/static/specimens/2010/AidsWalkKickOffVideo/video/kickOffVideo.webm" />
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
                  <div className="slide resizeable image" data-width="800" data-height="450" data-resizeable="true">
                    <img src="/static/specimens/2010/AidsWalkKickOffVideo/images/kickOffVideo_2.jpg" alt="Aids Walk Kick-Off Video" />
                  </div>
                  <div className="slide resizeable image" data-width="800" data-height="450" data-resizeable="true">
                    <img src="/static/specimens/2010/AidsWalkKickOffVideo/images/kickOffVideo_3.jpg" alt="Aids Walk Kick-Off Video" />
                  </div>
                  <div className="slide resizeable image" data-width="800" data-height="450" data-resizeable="true">
                    <img src="/static/specimens/2010/AidsWalkKickOffVideo/images/kickOffVideo_4.jpg" alt="Aids Walk Kick-Off Video" />
                  </div>
                </div>
              </div>
              <p>This is a video I produced for the AIDS Walk Kansas City kick-off celebration and general promotion. This year&apos;s AIDS Walk theme was &ldquo;Walk Forward, Count Backward.&ldquo; To capture this spirit, the whole video was shot in reverse. The video is constructed around a loose narrative of using the act of walking as a metaphor for how the annual AIDS Walk helps people in the community can lead better lives with HIV. The suffering caused by HIV, represented by the actors&apos; battered physical appearance, is reversed through the course of the video, representing the advances in medical research and community involvement supported by AIDS Walk. With this project, I performed all of the camera work, editing, and special effects. If you are in the KC area and want to help the cause, please check out <a href="http://www.aidswalkkansascity.org/">AIDS Walk Kansas City</a>. Also a special thanks goes out to <a href="https://en.wikipedia.org/wiki/Minus_Story">Minus Story</a> for letting me use their song.</p>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
