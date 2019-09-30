# TROYBLANK.COM

[![Build Status](https://travis-ci.org/troyblank/troyblank.svg?branch=master)](https://travis-ci.org/troyblank/troyblank)
[![Coverage Status](https://coveralls.io/repos/github/troyblank/troyblank/badge.svg?branch=master)](https://coveralls.io/github/troyblank/troyblank?branch=master)

Website for Troy Blank's personal portfolio.

## Setup
First thing you want to do is install all node packages run:

    npm install

In order to build and run the project run:

    npm start

## Test

    npm test

## REPRODUCTION NOTES
### FFMPEG Video Compression (h264 / AAC)

    ffmpeg -i in.avi -c:v libx264 -pix_fmt yuv420p -b 1000k out.mp4


### Backgrounds

To make backgrounds useblender with cell frature add on This is [CG Cookie](http://cgcookie.com/blender/lessons/1-getting-started/ "CG Cookie tut").

## License

(The MIT License)

Copyright (c) 2015 [Troy Blank](mailto:troy@troyblank.com, "Troy Blank")

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.