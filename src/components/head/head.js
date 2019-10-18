import React from 'react';
import Head from 'next/head';
import './head.scss';

export default function HeadComponent() {
    return (
      <Head>
        <meta charset={'utf-8'} />
        <meta name={'viewport'} content={'width=device-width, minimum-scale=1.0'} />

        <link rel={'shortcut icon'} href={'/static/icons/favicon.ico'} />
      </Head>
    );
}
