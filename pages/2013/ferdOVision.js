import React from 'react';
import { Wrapper } from '../../src/components';

export default function FerdOVision() {
    return (
      <Wrapper wrapperClassName={'standalone'} title={'Ferd-O-Vision'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>Ferd-O-Vision</h1><br />
            <h2>Python | ID 015 | 2013</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band" />
                <div className="region">
                  <div className="under-size-error">
                    <div>The size of your browser is too small to properly display this content.</div>
                    <img src="/static/images/skull.png" />
                  </div>
                  <div className="slide resizeable image" data-width="1024" data-height="683" data-resizeable="true">
                    <img src="/static/specimens/2013/ferdOVision/images/finalProduct.jpg" alt="Ferd-O-Vision Final Product" />
                  </div>
                  <div className="slide resizeable image" data-width="1024" data-height="683" data-resizeable="true">
                    <img src="/static/specimens/2013/ferdOVision/images/guts.jpg" alt="Ferd-O-Vision Camera Guts" />
                  </div>
                  <div className="slide resizeable image" data-width="1024" data-height="683" data-resizeable="true">
                    <img src="/static/specimens/2013/ferdOVision/images/raspPi.jpg" alt="Ferd-O-Vision Raspberry Pi Web Server" />
                  </div>
                  <div className="slide resizeable image" data-width="1024" data-height="683" data-resizeable="true">
                    <img src="/static/specimens/2013/ferdOVision/images/prototype.jpg" alt="Ferd-O-Vision Prototype" />
                  </div>
                  <div className="slide resizeable image" data-width="1024" data-height="683" data-resizeable="true">
                    <img src="/static/specimens/2013/ferdOVision/images/screenGrab.jpg" alt="Ferd-O-Vision Screen Grab" />
                  </div>
                </div>
              </div>
              <p>At home, there are many things I wish I could control or have access to when I am on the go. Pet monitoring was one that stuck out to me. After getting a new addition to my home, I found it very comforting to be able to keep a close eye on something that depends on. So, I turned to the advancements of modern programmable electronics.</p>
              <p>Over the past few years, I have become enamored with electronics. Ferd-O-Vision is a production piece that has broken a lot of new ground for me, jumping the gap between programming and electronics. Ferd-O-Vision is essentially a monitoring system for a chameleon named Ferdinand Jackson that resides at my home – in real life and real time using three cameras – although it could be used to monitor just about anything. Using a combination of Raspberry Pi, socketIO, Redis, gevent, and Beaglebone Black all glued together programmatically with Python, I was able to create a web service only accessible from inside my home network, broadcasting real time data from video cameras run by a microcontroller via a simple web page utilizing concurrent connections via socketIO, like Node.js offers. What this solution provided, as opposed to just buying a webcam and using already available online streaming services, was that I was able to customize the experience in a much greater way. The advantages were many, but primarily I was able to use very low profile camera components set in custom-built enclosures that could fit in places a web cam could not, as well as to have the potential to send notifications based on movement detection. Also, I could restrict the amount of data being sent by the cameras; because chameleons are pretty slow, I can send only one image per 10 seconds, allowing the webpage to be low bandwidth and easy to view on something like a mobile connection.</p>
              <div className="stand-alone center-wrap">
                <div className="slide-band" />
                <div className="region">
                  <div className="resizeable image active" data-width="1024" data-height="683" data-resizeable="true">
                    <img src="/static/specimens/2013/ferdOVision/images/inAction.jpg" alt="Ferd-O-Vision In Action" />
                  </div>
                </div>
              </div>
              <p>The first puzzle piece for my lizard viewing problem was solved with a <a href="http://www.raspberrypi.org/">Raspberry Pi</a> running Debian as a home web server. This allowed me to run Redis and Django together using gevent so I could not only serve the images from the cameras but also allow real time events from the server to notify the client side when an image was taken from one of the cameras. The method is much more efficient than using AJAX to constantly check the status of data because the server is never queried in vain. To retrieve the data from the camera, I created a web service to be consumed by the Beaglebone Black wirelessly on my local network. It was important to ensure these services were accessible locally only so that the rest of the world would not have access to the cameras and be able to surprise me with unwanted (but interesting) images.</p>
              <p>Near the lizard enclosure, I have a waterproofed <a href="http://beagleboard.org/Products/BeagleBone%20Black">Beaglebone Black</a> also running Debian. I originally tried to use an Arduino, but the network capabilities of running Linux provided far more flexibility for this project. The main purpose of the Beaglebone Black is to act as a trigger for the cameras via a UART serial connection to grab and store the image data. From here, the Beaglebone Black simply calls the webservice provided by the Raspberry Pi and tells it where to find the image to use on the Ferd-O-Vision website.</p>
              <p>Overall, a pretty simple concept. However, given the number of technologies that had to work together, combined with the hurdle of gathering real world input as data, it was definitely a very challenging, fun, and rewarding project.</p>
              <div className="stand-alone center-wrap">
                <div className="slide-band" />
                <div className="region">
                  <div className="resizeable image active" data-width="828" data-height="996" data-resizeable="true">
                    <img src="/static/specimens/2013/ferdOVision/images/ferdOVision_schematic.jpg" alt="Ferd-O-Vision Schematic" />
                  </div>
                </div>
              </div>
              <p>Above you will find a schematic for the camera system so you can see how it is built. All cameras are <a href="http://www.adafruit.com/products/397">Adafruit TTL Serial Jpeg Cameras</a>. Also for any electronic geeks using <a href="http://fritzing.org/">Fritzing</a>, I have supplied the schematics below for download.</p>
              <a target="_self" href="/static/specimens/2013/ferdOVision/doc/ferdoVision.zip">Download Fritzing Schematic</a>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
