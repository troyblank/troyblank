import React from 'react';
import { Wrapper } from '../../src/components';

export default function KurchaMysterGame() {
    return (
      <Wrapper wrapperClassName={'standalone'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>Kurca Murder Mystery Game</h1><br />
            <h2>Flash | ID 002 | Sugar Creek Missouri | 2009</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band" />
                <div className="region">
                  <div className="under-size-error">
                    <div>The size of your browser is too small to properly display this content.</div>
                    <img src="/static/images/skull.png" />
                  </div>
                  <div className="slide resizeable" data-src="/static/specimens/2009/kurcaMysteryGame/swf/game_preloader.swf" data-width="800" data-height="500" data-resizeable="false" data-type="flash" data-version="9.0.28" data-flash-vars="gameURL:/static/specimens/2009/kurcaMysteryGame/swf/game.swf" data-flash-params="" data-trap-keys="true">
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
                  <div className="slide image" data-width="800" data-height="500" data-resizeable="true">
                    <img src="/static/specimens/2009/kurcaMysteryGame/images/kurcaMysteryGame_1.jpg" alt="Kurca Mystery Game" />
                  </div>
                  <div className="slide image" data-width="800" data-height="500" data-resizeable="true">
                    <img src="/static/specimens/2009/kurcaMysteryGame/images/kurcaMysteryGame_2.jpg" alt="Kurca Mystery Game" />
                  </div>
                  <div className="slide image" data-width="800" data-height="500" data-resizeable="true">
                    <img src="/static/specimens/2009/kurcaMysteryGame/images/kurcaMysteryGame_3.jpg" alt="Kurca Mystery Game" />
                  </div>
                  <div className="slide image" data-width="800" data-height="500" data-resizeable="true">
                    <img src="/static/specimens/2009/kurcaMysteryGame/images/kurcaMysteryGame_4.jpg" alt="Kurca Mystery Game" />
                  </div>
                  <div className="slide image" data-width="800" data-height="500" data-resizeable="true">
                    <img src="/static/specimens/2009/kurcaMysteryGame/images/kurcaMysteryGame_5.jpg" alt="Kurca Mystery Game" />
                  </div>
                </div>
              </div>
              <p>This is a traditional platform game that I developed to promote the Slavic Fest cultural festival in Sugar Creek Missouri. The game is themed around an ongoing festival gag about a chicken and his exciting adventures. High Scores are stored on a database through the use of a Python web service, and the game itself utilizes basic game psychics to give the player a taste of old school platform gaming at its best. If do you end up playing the game — good luck, it’s pretty challenging!</p>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
