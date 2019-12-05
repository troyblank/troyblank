import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';

class ErrorPage extends React.Component {
    static getInitialProps({ res, xhr }) {
        const xhrCode = xhr ? xhr.status : null;
        const errorCode = res ? res.statusCode : xhrCode;
        return { errorCode };
    }

    render() {
        const { errorCode } = this.props;
        let image, title, message;

        switch (errorCode) {
        case 400:
            title = '400 ERROR!';
            image = '/static/errors/400.jpg';
            message = 'Here at Troy Blank Labs, we are dedicated to providing the finest quality of HTTP communication possible, and we have. So apparently, you are seeing this page because you fail. Please retry using the internet when you are better at it.';
            break;
        case 401:
            title = '401 ERROR!';
            image = '/static/errors/401.jpg';
            message = 'Who do you think you are? This page is intended for people so far above you. Maybe another website would be better suited for you… maybe something like Myspace.com?';
            break;
        case 403:
            title = '403 ERROR!';
            image = '/static/errors/403.jpg';
            message = 'Secret research…we haz it! And it does not include monkeys that can code in C#, so let’s just pretend this little encounter never happened, shall we?';
            break;
        case 404:
            title = '404 ERROR!';
            image = '/static/errors/404.jpg';
            message = 'It appears the URL you wanted exists only in your mind and not on the internet. Or it was taken down by ninjas. Or someone lied to you. I am willing to bet five dollars that you made it up, though.';
            break;
        default:
            title = 'ERROR!';
        }

        return (
          <x>
            <Head>
              <title>Troy Blank Labs | { errorCode }</title>
              <meta charset={'utf-8'} />
              <meta name={'viewport'} content={'width=device-width, minimum-scale=1.0'} />
              <link rel={'shortcut icon'} href={'/static/icons/favicon.ico'} />
              <link href={'/static/errors/styles.css'} rel={'stylesheet'} type={'text/css'} />
            </Head>
            { image && <div className={'periodicImage'}><img src={image} /></div> }
            { title && <div className={'title'}>{title}</div> }
            { message && <div className={'message'}>{message}</div> }
            <a href="/">End Transmission</a>
            <script
          // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
              __html: `
              var _gaq = _gaq || [];
              _gaq.push(['_setAccount', 'UA-10725275-2']);
              _gaq.push(['_trackPageview']);

              (function() {
                var ga = document.createElement('script'); ga.type = 'application/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
              })();
              `
          }}
            />
          </x>
        );
    }
}

export default withRouter(ErrorPage);
