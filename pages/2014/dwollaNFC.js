import React from 'react';
import { Wrapper } from '../../src/components';

export default function DwollaNFCPage() {
    return (
      <Wrapper wrapperClassName={'standalone'} title={'Dwolla NFC'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>Dwolla NFC</h1><br />
            <h2>Cordova | ID 018 | Dwolla | 2014</h2>
            <div className="body">
              <div className="slideshow center-wrap">
                <nav />
                <div className="slide-band" />
                <div className="region">
                  <div className="under-size-error">
                    <div>The size of your browser is too small to properly display this content.</div>
                    <img src="/images/skull.png" />
                  </div>
                  <div className="slide resizeable video" data-width="1024" data-height="593" data-alternative-size="600x355,275x172" data-resizeable="tiered" data-type="video">
                    <div className="video-player">
                      <video id="videoTag" poster="/static/specimens/2014/dwollaNFC/images/videoStill.jpg">
                        <source src="/static/specimens/2014/dwollaNFC/video/dwollaNFCDemo.mp4" />
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
              <p>Dwolla is an online payment network that allows you to move money for just $0.25 a transaction, making it a very attractive method of taking payments. After personally using Dwolla to purchase goods in the real world, I discovered it can be a bit of an awkward experience. Currently, there is no great way for a merchant to allow a Dwolla transaction and get a confirmation without having to looking up the transaction by comparing the price, transaction id, or knowing the buyers user name on Dwolla. All these scenarios take a little conversation, something most people are not used to doing when purchasing goods on the go. While this might easy for a small shop to accommodate, what if a merchant has a lot transitions happening at once, or verbal communication is not achievable in a given environment?</p>
              <p>To solve this problem, I created a demo that uses Near Field Communication (NFC) to allow transactions to happen without the people involved having to ask each other any questions; this streamlines the purchase process, and allow a Dwolla to save everyone time and money. All that is needed are two NFC-capable devices and a data connection. The merchant enters the price of the purchase on one end, then all the buyer has to do is tap their device to the merchant’s device and enter their pin. Both devices will get a confirmation as soon as the transaction goes through. Not only is this a less awkward and faster buying experience, it allows a merchant to be more anonymous – allowing for cool concepts like arcades or vending machines that take Dwolla instead of credit cards or cash.</p>
              <p>The demo I created is an Android app that allows a “Merchant” and a “Client” mode.  This allows two people running android to facilitate an NFC transaction, meaning a buyer could have an Android tablet or phone and use this app to take NFC payments. It is worthwhile to note that this demo could easily be extended to any device allowing NFC communication: this could be a computer with an NFC adapter attached to USB, a custom kiosk device, or the merchant’s tablet or phone. The video above shows a simple transaction between two people with Android phones.</p>
              <p>Below you can find the code for the Cordova project as well as two unsigned debug apps for testing; one that uses Dwolla and one that uses Dwolla&apos;s sandbox (<a href="https://uat.dwolla.com">uat.dwolla.com</a>). Please note you will need to be sure you Android device is configured to run an application outside of Android Play to install these apps.</p>

              <a href="/static/specimens/2014/dwollaNFC/doc/dwollaNFC-debug.apk">Download the Android Debug App</a>
              <a href="/static/specimens/2014/dwollaNFC/doc/dwollaNFC-debug_uat.apk">Download the Android Sandbox Debug App</a>
              <a href="https://github.com/Dwolla/dwolla-nfc">Access the Code</a>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
