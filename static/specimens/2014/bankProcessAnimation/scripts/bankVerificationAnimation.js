function Form(a){function b(){r++,r%10>5?$(p).hide():$(p).show();var a=r;(5==a|15==a|25==a|35==a|45==a|55==a|65==a|75==a|85==a||95==a)&&d(),165==r||t+1==v&&150==r?e():c()}function c(){for(var a=z?w:x,b=z?x+Math.abs(w):w-x,c=z?.1:.28,d=z?.2:.155,e=u.length-1;e>=0;){var f=u[e];f.time+=1,f.time<=50?(f.x=AnimUtil.easeInOutQuad(f.time,a,b,y),f.time<=y/2?f.r+=c:f.r-=d,f.ele.setAttribute("cx",f.x),f.ele.setAttribute("r",f.r)):$(f.ele).hide(),e--}}function d(){var a=z?w:x,b=z?3:.1,c=document.createElementNS("http://www.w3.org/2000/svg","circle");c.setAttribute("r",b),c.setAttribute("cx",a),c.setAttribute("cy",46.5),c.setAttribute("fill","#3A94F3"),u.push({ele:c,time:0,r:b,x:-50}),$("#transmiter").append(c)}function e(){$("#transmiter").empty(),t++,u=[],v>t?(r=0,z=z?!1:!0):(bankVerificationAnimation.inputState="stop",g())}function f(){s||($(".browser .pane").css("overflow","visible"),s=!0)}function g(){$(".browser .pane").css("overflow","hidden"),s=!1}function h(){switch(o++,o){case 1:$(p).hide();break;case 5:$(p).show(),$(p).css("left","20%"),$(q).css("width","5%");break;case 10:$(p).css("left","25%"),$(q).css("width","10%");break;case 20:$(p).css("left","30%"),$(q).css("width","15%");break;case 22:$(p).css("left","35%"),$(q).css("width","20%");break;case 25:$(p).css("left","40%"),$(q).css("width","25%");break;case 30:$(p).css("left","45%"),$(q).css("width","30%");break;case 33:$(p).css("left","50%"),$(q).css("width","35%");break;case 36:$(p).css("left","55%"),$(q).css("width","40%");break;case 40:$(p).css("left","60%"),$(q).css("width","45%");break;case 50:$(p).css("left","65%"),$(q).css("width","50%");break;case 55:q=$(".input-line",a)[1],$(p).css("left","15%"),$(p).css("top","35%");break;case 60:$(p).hide();break;case 65:$(p).show();break;case 70:$(p).hide();break;case 75:$(p).show(),$(p).css("left","20%"),$(q).css("width","5%");break;case 80:$(p).css("left","25%"),$(q).css("width","10%");break;case 85:$(p).css("left","30%"),$(q).css("width","15%");break;case 90:$(p).css("left","35%"),$(q).css("width","20%");break;case 95:$(p).css("left","40%"),$(q).css("width","25%");break;case 100:$(p).css("left","45%"),$(q).css("width","30%");break;case 105:$(p).css("left","50%"),$(q).css("width","35%");break;case 107:$(p).css("left","55%"),$(q).css("width","40%");break;case 110:$(p).css("left","60%"),$(q).css("width","45%");break;case 115:$(p).css("left","65%"),$(q).css("width","50%");break;case 120:$(p).hide();break;case 125:$(p).show();break;case 130:$(p).hide();break;case 140:$(p).show(),q=$(".input-line",a)[2],$(p).css("left","15%"),$(p).css("top","55%");break;case 145:$(p).hide();break;case 150:$(p).show(),$(p).css("left","20%"),$(q).css("width","5%");break;case 155:$(p).css("left","25%"),$(q).css("width","10%");break;case 160:$(p).css("left","30%"),$(q).css("width","15%");break;case 165:$(p).css("left","35%"),$(q).css("width","20%");break;case 170:$(p).css("left","40%"),$(q).css("width","25%");break;case 172:$(p).css("left","45%"),$(q).css("width","30%");break;case 176:$(p).css("left","50%"),$(q).css("width","35%");break;case 180:$(p).css("left","55%"),$(q).css("width","40%");break;case 182:$(p).css("left","60%"),$(q).css("width","45%");break;case 185:$(p).css("left","65%"),$(q).css("width","50%");break;case 190:q=$(".input-line",a)[3],$(p).css("left","15%"),$(p).css("top","75%");break;case 195:$(p).hide();break;case 200:$(p).show();break;case 205:$(p).hide();break;case 210:$(p).show(),$(p).css("left","20%"),$(q).css("width","5%");break;case 213:$(p).css("left","25%"),$(q).css("width","10%");break;case 215:$(p).css("left","30%"),$(q).css("width","15%");break;case 217:$(p).css("left","35%"),$(q).css("width","20%");break;case 220:$(p).css("left","40%"),$(q).css("width","25%");break;case 225:$(p).css("left","45%"),$(q).css("width","30%");break;case 227:$(p).css("left","50%"),$(q).css("width","35%");break;case 230:$(p).css("left","55%"),$(q).css("width","40%");break;case 235:$(p).css("left","60%"),$(q).css("width","45%");break;case 240:$(p).css("left","65%"),$(q).css("width","50%");break;case 245:$(p).css("left","70%"),$(q).css("width","55%");break;case 246:$(p).css("left","75%"),$(q).css("width","60%");break;case 248:$(p).css("left","80%"),$(q).css("width","65%");break;case 250:$(p).css("left","85%"),$(q).css("width","70%");break;case 260:bankVerificationAnimation.inputState="stop"}}function i(){C++,null==D&&(D=l),l=AnimUtil.easeOutElastic(C,D,-(D-m),100),k()}function j(){A++,null==B&&(B=l),l=AnimUtil.easeInQuad(A,B,n+-B,25),k()}function k(){$(a).css("top",l+"%")}var a=a,l=110,m=15,n=-75,o=0,p=$("#cursor"),q=$(".input-line",a)[0],r=0,s=!1,t=0,u=[],v=3,w=-50,x=130,y=50,z=!0,A=0,B=null,C=0,D=null;this.update=function(){switch(bankVerificationAnimation.formState){case"entering":i();break;case"leaving":j()}switch(bankVerificationAnimation.inputState){case"writting":h();break;case"transmitting":f(),b()}},this.destroy=function(){l=110,vy=3,ay=0,o=0,r=0,t=0,z=!0,A=0,B=null,C=0,D=null,$(p).removeAttr("style"),$(a).removeAttr("style"),$(".input-line",a).removeAttr("style"),q=$(".input-line",a)[0]}}function BankDoorLeft(a){function b(){e-=f,0>=e&&(e=0,bankVerificationAnimation.doorState="stop"),d()}function c(){e+=f,e>=1&&(e=1,bankVerificationAnimation.doorState="stop"),d()}function d(){$("g",a).attr("transform","scale("+e+" 1)")}var a=a,e=1,f=.03;this.update=function(){switch(bankVerificationAnimation.doorState){case"open":b();break;case"close":c()}}}function BankDoorRight(a){function b(){e-=f,0>=e&&(e=0),d()}function c(){e+=f,e>=1&&(e=1),d()}function d(){var b=$(a).width(),c=b/19.3;$("g",a).attr("transform","matrix("+e+",0,0,1,"+(b-e*b)/c+",0)")}var a=a,e=1,f=.03;this.update=function(){switch(bankVerificationAnimation.doorState){case"open":b();break;case"close":c()}}}function CheckMark(a){function b(){g++,e=AnimUtil.easeInQuad(g,.5,1,h),f=AnimUtil.easeOutElastic(g,0,100,i),e>=1&&(e=1),g==i&&(g=0,bankVerificationAnimation.checkState="stop"),d()}function c(){g++,e=AnimUtil.easeInQuad(g,1,-1,h/2),f=AnimUtil.easeInQuad(g,100,-120,i/2),0>=e&&(e=0),g==i&&(g=0,bankVerificationAnimation.checkState="stop"),d()}function d(){$(a).css("display","block"),$(a).css("opacity",e),$("svg",a).css("width",f+"%"),$("svg",a).css("height",f+"%");var b=-Math.round(f/2);$("svg",a).css("margin",b+"% 0 0 "+b+"%")}var e,f,a=a,g=0,h=40,i=60;this.update=function(){switch(bankVerificationAnimation.checkState){case"show":b();break;case"hide":c()}}}var AnimUtil={easeInQuad:function(a,b,c,d){return a/=d,c*a*a+b},easeInOutQuad:function(a,b,c,d){return a/=d/2,1>a?c/2*a*a+b:(a--,-c/2*(a*(a-2)-1)+b)},easeOutElastic:function(a,b,c,d){var e=1.70158,f=0,g=c;if(0==a)return b;if(1==(a/=d))return b+c;if(f||(f=.3*d),g<Math.abs(c)){g=c;var e=f/4}else var e=f/(2*Math.PI)*Math.asin(c/g);return g*Math.pow(2,-10*a)*Math.sin(2*(a*d-e)*Math.PI/f)+c+b}};window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}();var bankVerificationAnimation={time:0,animOn:!0,formState:"stop",inputState:"stop",doorState:"stop",checkState:"stop",form:new Form(document.getElementById("form")),leftDoor:new BankDoorLeft(document.getElementById("left-door")),rightDoor:new BankDoorRight(document.getElementById("right-door")),checkMark:new CheckMark(document.getElementById("check-mark")),stateIndex:0,states:[{time:50,states:{formState:"entering"}},{time:75,states:{inputState:"writting"}},{time:325,states:{inputState:"transmitting"}},{time:350,states:{doorState:"open"}},{time:800,states:{doorState:"close",checkState:"show"}},{time:950,states:{formState:"leaving"}},{time:1e3,states:{animOn:!1,checkState:"hide",formState:"stop",inputState:"stop",doorState:"stop"}}],initialize:function(){bankVerificationAnimation.animloop()},animloop:function(){try{bankVerificationAnimation.animOn?(requestAnimFrame(bankVerificationAnimation.animloop),bankVerificationAnimation.updateTime(),bankVerificationAnimation.checkForNextState(),bankVerificationAnimation.render()):(bankVerificationAnimation.animOn=!0,bankVerificationAnimation.time=0,bankVerificationAnimation.stateIndex=0,bankVerificationAnimation.form.destroy(),requestAnimFrame(bankVerificationAnimation.animloop))}catch(a){}},updateTime:function(){bankVerificationAnimation.time++},checkForNextState:function(){var a=bankVerificationAnimation.states[bankVerificationAnimation.stateIndex];bankVerificationAnimation.time>=a.time&&(bankVerificationAnimation.setStates(a.states),bankVerificationAnimation.stateIndex++)},setStates:function(a){for(var b in a)bankVerificationAnimation[b]=a[b]},render:function(){.5*$(window).width();bankVerificationAnimation.form.update(),bankVerificationAnimation.leftDoor.update(),bankVerificationAnimation.rightDoor.update(),bankVerificationAnimation.checkMark.update()}};$(document).ready(bankVerificationAnimation.initialize);