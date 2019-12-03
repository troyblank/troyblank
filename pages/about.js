import React from 'react';
import { Wrapper } from '../src/components';

export default function About() {
    return (
      <Wrapper wrapperClassName={'standalone'} title={'About'}>
        <section className="content-cnt">
          <div id="about" className="content">
            <div>
              <span className="title-1">Hello,</span><span className="title-2">my name is Troy Blank</span><h2>and I am a Developer.</h2>
              <p>I can do a lot of things, but a few things I do pretty well. Some of the things that I do really well you will find on this website.</p>
              <a className="resume-btn" href="/static/pdf/troyBlank_Resume.pdf" target="_blank">Download my resume.</a>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
