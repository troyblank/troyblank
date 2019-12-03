import React from 'react';
import { Wrapper } from '../../src/components';

export default function FoodHowPage() {
    return (
      <Wrapper wrapperClassName={'standalone'} title={'Food How'}>
        <section className="content-cnt portfolio-piece">
          <div className="content">
            <h1>Food How</h1><br />
            <h2>Node | ID 017 | 2014</h2>
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
                    <img src="/static/specimens/2014/foodHow/images/cuttingBoard.jpg" alt="Cutting board showing FoodHow app" />
                  </div>
                </div>
              </div>
              <p>I often find myself at a grocery store without a list and end up picking up generic ingredients to make lame, repetitive meals. With this frustration, plus my desire to make everything in my life digital, I decided to take all my recipes and put them on the web so I could view them anywhere – that&apos;s the day Food How was born. Food How is a Node application that draws its content from a folder full of JSON file recipes.</p>
              <p>The cool thing about Food How is that if you are on the go, you can quickly make a grocery list from your recipes by selecting ingredients to save to your browser’s local store. Blam! No more lame meals because you weren&apos;t prepared!  Not only did this solve a frustration in my life, it was also a fun way to play around and learn new technologies. Checkout my own personal demo below, or if you want to make your own Food How with your own ingredients (or even modify Food How for your own personal enjoyment) feel free to download or fork my code in the link below.</p>

              <a href="http://foodhow.troyblank.com">View Demo</a>
              <a href="https://github.com/troyblank/foodhow">Access the Code</a>
            </div>
          </div>
        </section>
      </Wrapper>
    );
}
