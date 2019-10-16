import React from 'react';

export default function FootComponent() {
    return (
      <x>
        <script src={'//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js'}></script>
        <script src={'//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js'}></script>
        <script src={'/static/compiled/troyblank.js'}></script>
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
