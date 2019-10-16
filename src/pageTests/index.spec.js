import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import { Head, Foot } from '../components';
import IndexPage from '../../pages/index';

describe('Page - Index', () => {
    it('should render', () => {
        const wrapper = shallow(<IndexPage />);

        assert.isTrue(wrapper.contains(
          <x>
            <Head />
            <header>
              <a className={'logo'} />
              <nav>
                <ul>
                  <li><a data-href={'/about/'}>About</a></li>
                </ul>
              </nav>
            </header>
            <div id={'content-wrapper'}>
              <section id={'mainNavContent'} className={'content-cnt nav-content'}>
                <a className={'close-btn'} />
                <div className={'mask'}>
                  {/* content to go here */}
                </div>
                <div className={'scroll-bar'}>
                  <div className={'thumb'} />
                </div>
                <div className={'nav nav-up'}>
                  <a className={'btn'} />
                </div>
              </section>
    
              <section id={'portfolioCanvas'} className={'content-cnt portfolio-piece'}>
                <a className={'close-btn'} />
                <div className={'mask'}>
                  {/* portfolio content to go here */}
                </div>
                <div className={'scroll-bar'}>
                  <div className={'thumb'} />
                </div>
                <div className={'nav nav-down'}>
                  <a className={'btn'} />
                </div>
              </section>
    
              <section id={'portfolioCarousel'}>
                <a data-image={'/static/specimens/2016/dwollaDashboard/images/header.jpg'} data-image-mobile={'/static/specimens/2016/dwollaDashboard/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2016/dwollaDashboard/'}>
                  <div className={'headers'}>
                    <h1>Dwolla Dashboard</h1><br />
                    <h2>React.js | ID 021 | Dwolla | 2016</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2016/dwollaDevDocs/images/header.jpg'} data-image-mobile={'/static/specimens/2016/dwollaDevDocs/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2016/dwollaDevDocs/'}>
                  <div className={'headers'}>
                    <h1>Dwolla Dev Docs</h1>
                    <br />
                    <h2>Jeckyll | ID 020 | Dwolla | 2016</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2015/dwollaStyleTiles/images/header.jpg'} data-image-mobile={'/static/specimens/2015/dwollaStyleTiles/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2015/dwollaStyleTiles/'}>
                  <div className={'headers'}>
                    <h1>Dwolla Style Tiles</h1><br />
                    <h2>CSS | ID 019 | Dwolla | 2015</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2014/dwollaNFC/images/header.jpg'} data-image-mobile={'/static/specimens/2014/dwollaNFC/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2014/dwollaNFC/'}>
                  <div className={'headers'}>
                    <h1>Dwolla NFC</h1><br />
                    <h2>Cordova | ID 018 | Dwolla | 2014</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2014/foodHow/images/header.jpg'} data-image-mobile={'/static/specimens/2014/foodHow/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2014/foodHow/'}>
                  <div className={'headers'}>
                    <h1>Food How</h1><br />
                    <h2>Node | ID 017 | 2014</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2014/bankProcessAnimation/images/header.jpg'} data-image-mobile={'/static/specimens/2014/bankProcessAnimation/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2014/bankProcessAnimation/'}>
                  <div className={'headers'}>
                    <h1>Bank Process Animation</h1><br />
                    <h2>Javascript | ID 016 | Dwolla | 2014</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2013/ferdOVision/images/header.jpg'} data-image-mobile={'/static/specimens/2013/ferdOVision/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2013/ferdOVision/'}>
                  <div className={'headers'}>
                    <h1>Ferd-O-Vision</h1><br />
                    <h2>Python | ID 015 | 2013</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2012/lepsLogo/images/header.jpg'} data-image-mobile={'/static/specimens/2012/lepsLogo/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2012/lepsLogo/'}>
                  <div className={'headers'}>
                    <h1>The Fighting Leprechauns Logo</h1><br />
                    <h2>Illustration | ID 014 | 2012</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2011/troyblankcomV2/images/header.jpg'} data-image-mobile={'/static/specimens/2011/troyblankcomV2/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2011/troyblankcomV2/'}>
                  <div className={'headers'}>
                    <h1>troyblank.com V2</h1><br />
                    <h2>Flash | ID 013 | 2011</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2010/webAnalyticsVisualization/images/header.jpg'} data-image-mobile={'/static/specimens/2010/webAnalyticsVisualization/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2010/webAnalyticsVisualization/'}>
                  <div className={'headers'}>
                    <h1>Web Analytics Visualization</h1><br />
                    <h2>Flash | ID 012 | Salva O&apos;Renick | 2010</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2010/digitalHeader/images/header.jpg'} data-image-mobile={'/static/specimens/2010/digitalHeader/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2010/digitalHeader/'}>
                  <div className={'headers'}>
                    <h1>Digital Header</h1><br />
                    <h2>Flash | ID 011 | Salva O&apos;Renick | 2010</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2010/inYourPocketCommercial/images/header.jpg'} data-image-mobile={'/static/specimens/2010/inYourPocketCommercial/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2010/inYourPocketCommercial/'}>
                  <div className={'headers'}>
                    <h1>In Your Pocket Commercial</h1><br />
                    <h2>Video | ID 010 | Central Bancompany | 2010</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2010/chiefsZone/images/header.jpg'} data-image-mobile={'/static/specimens/2010/chiefsZone/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2010/chiefsZone/'}>
                  <div className={'headers'}>
                    <h1>Chiefs Zone</h1><br />
                    <h2>Django | ID 009 | Sports Radio 810 WHB | 2010</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2010/AidsWalkKickOffVideo/images/header.jpg'} data-image-mobile={'/static/specimens/2010/AidsWalkKickOffVideo/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2010/AidsWalkKickOffVideo/'}>
                  <div className={'headers'}>
                    <h1>Aids Walk Kick-Off Video</h1><br />
                    <h2>Video | ID 008 | AIDS Walk Kansas City | 2010</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2009/recurringCircles/images/header.jpg'} data-image-mobile={'/static/specimens/2009/recurringCircles/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2009/recurringCircles/'}>
                  <div className={'headers'}>
                    <h1>Recurring Circles</h1><br />
                    <h2>Flash | ID 007 | 2009</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2009/cubicCurve/images/header.jpg'} data-image-mobile={'/static/specimens/2009/cubicCurve/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2009/cubicCurve/'}>
                  <div className={'headers'}>
                    <h1>Cubic Curve</h1><br />
                    <h2>Flash | ID 006 | 2009</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2009/theHolidayHQ/images/header.jpg'} data-image-mobile={'/static/specimens/2009/theHolidayHQ/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2009/theHolidayHQ/'}>
                  <div className={'headers'}>
                    <h1>The Holiday HQ</h1><br />
                    <h2>Processing | ID 005 | Salva O&apos;Renick | 2009</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2009/arrowFlashNavigation/images/header.jpg'} data-image-mobile={'/static/specimens/2009/arrowFlashNavigation/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2009/arrowFlashNavigation/'}>
                  <div className={'headers'}>
                    <h1>Arrow Flash Navigation</h1><br />
                    <h2>Flash | ID 004 | [Redacted] | 2009</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2009/demoReel/images/header.jpg'} data-image-mobile={'/static/specimens/2009/demoReel/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2009/demoReel/'}>
                  <div className={'headers'}>
                    <h1>Demo Reel</h1><br />
                    <h2>Video | ID 003 | Salva O&apos;Renick | 2009</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2009/kurcaMysteryGame/images/header.jpg'} data-image-mobile={'/static/specimens/2009/kurcaMysteryGame/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2009/kurcaMysteryGame/'}>
                  <div className={'headers'}>
                    <h1>Kurca Murder Mystery Game</h1><br />
                    <h2>Flash | ID 002 | Sugar Creek Missouri | 2009</h2>
                  </div>
                </a>
                <a data-image={'/static/specimens/2009/idmlParser/images/header.jpg'} data-image-mobile={'/static/specimens/2009/idmlParser/images/header_mobile.jpg'} data-loaded={'false'} data-lnk={'/static/specimens/2009/idmlParser/'}>
                  <div className={'headers'}>
                    <h1>IDML Parser</h1><br />
                    <h2>Flash | ID 001 | Salva O&apos;Renick | 2009</h2>
                  </div>
                </a>
              </section>
              <div className={'nav nav-right'}>
                <a className={'btn'} />
              </div>
              <div className={'nav nav-left'}>
                <a className={'btn'} />
              </div>
            </div>
            <Foot />
          </x>
        ));
    });
});
