import React from 'react';
import Head from 'next/head';
import './head.scss';

export default function HeadComponent({ title }) {
    let pageTitle = 'Troy Blank Labs';
    if (title) pageTitle += ` | ${title}`;

    return (
      <Head>
        <title>{pageTitle}</title>

        <meta charset={'utf-8'} />
        <meta name={'viewport'} content={'width=device-width, minimum-scale=1.0'} />

        <link rel={'shortcut icon'} href={'/static/icons/favicon.ico'} />
      </Head>
    );
}
