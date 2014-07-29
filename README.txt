#TROYBLANK .COM

Website for Troy Blank's personal portfolio.

##REPRODUCTION NOTES
###FFMPEG Video Compression (h264 / AAC)

    ffmpeg -i in.avi -threads 6 -vcodec libx264 -s 520x284 -r 30 -b 1000k -ss 00:00:00 -vpre slow -acodec libfaac -ab 128k -ar 44100 out.mp4


###Backgrounds

To make backgrounds useblender with cell frature add on This is [CG Cookie](http://cgcookie.com/blender/lessons/1-getting-started/ "CG Cookie tut").

##TO ADDS
* Pretty Morbid
* Dwolla bees

##ISSUES
* On static specimen html pages browser scroll bar jacks with responive calulation, possible solution to add custom scroll bar to even static html pages.