# TROYBLANK .COM

Website for Troy Blank's personal portfolio.

## Requirements
* Node >= 4.2.2

## Setup
First thing you want to do is install all node packages:

    npm install
    
You will need to create the gmail auth file to allow the contact page to work:

    node genauth
    
To build all front end assets run:

    grunt build
  
In order to run the project:

    node server

## REPRODUCTION NOTES
### FFMPEG Video Compression (h264 / AAC)

    ffmpeg -i in.avi -c:v libx264 -pix_fmt yuv420p -b 1000k out.mp4


### Backgrounds

To make backgrounds useblender with cell frature add on This is [CG Cookie](http://cgcookie.com/blender/lessons/1-getting-started/ "CG Cookie tut").

## TO ADDS
* Pretty Morbid
* Dwolla bees

## ISSUES
* On static specimen html pages browser scroll bar jacks with responive calulation, possible solution to add custom scroll bar to even static html pages.

## License

(The MIT License)

Copyright (c) 2015 [Troy Blank](mailto:troy@troyblank.com, "Troy Blank")

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.