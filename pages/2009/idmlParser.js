import React from 'react';
import { Wrapper } from '../../src/components';

export default function IDMLParser() {
    return (
      <Wrapper wrapperClassName={'standalone'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>IDML Parser</h1><br />
            <h2>Flash | ID 001 | Salva O’Renick | 2009</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band" />
                <div className="region">
                  <div className="under-size-error">
                    <div>The size of your browser is too small to properly display this content.</div>
                    <img src="/static/images/skull.png" />
                  </div>
                  <div className="slide resizeable" data-src="/static/specimens/2009/idmlParser/swf/IDMLParser.swf" data-width="945" data-height="600" data-resizeable="false" data-type="flash" data-version="9.0.28" data-flash-vars="name:IDML Test,IDMLPath:/static/specimens/2009/idmlParser/testIDML/,linksPath:/static/specimens/2009/idmlParser/testLinks/,jsonTemplates:/static/specimens/2009/idmlParser/testJSON/templates.json,layer_customization:,price_customization:,can_customize:true" data-flash-params="bgcolor:#C2C2C2,wmode:opaque" data-trap-keys="false">
                    <div className="flashContent">
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
              <p>The IDML Parser is something I developed while working at <a href="http://www.uncommonsense.com/">Salva O&apos;Renick</a>, it was first created to circumvent the lengthy process of a designer having to customize a plethera of Adobe Indesign documents with orders from every branch of a national resturant chain. During a research phase the team I was working with discovered many applications that allowed this sort of customization, but without any impressive real-time visual feedback during the customization process. The application further made it&apos;s significance by using IDML (Indesign&apos;s new standard XML format) to almost completely recreate the Indesign document inside of flash. Also by communicating with Adobe during the Beta development of their Text Layout Framework for Flash I was able to insure that fonts could be produced almost indentically to they way they were laid out in Indesign.</p>
              <p>Above is the application that is displaying a test Indesign document that I created for demonstration.</p>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
