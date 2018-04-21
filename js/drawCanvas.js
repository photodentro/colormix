//todo: change the color picking from random
//to simple color wheel
//http://www.colorwithleo.com/art_colorwheel.php


//drawing.js
//the functions that draw on the canvas
var c = document.getElementById('myCanvas');
var ctx = c.getContext("2d");
var diff = 25;
c.width = 500;
c.height = 500;


//button coordinates
var CPlusX = 130;
var CPlusY = 250;
var CMinusX = 30;
var CMinusY = 250;
var MPlusX = 350;
var MPlusY = 250;
var MMinusX = 458;
var MMinusY = 250;
var YPlusX = 240;
var YPlusY = 360;
var YMinusX = 240;
var YMinusY = 460;
var OKx = 300;
var OKy = 300;
var paintAmount = 0;

function nearButton(e){
	var closeness = 40;
	var posX = e.pageX - $("#myCanvas").offset().left;
    var posY = e.pageY - $("#myCanvas").offset().top;
	var distCPlus = Math.sqrt(Math.pow((posX-CPlusX),2) + Math.pow((posY-CPlusY),2));
	var distCMinus = Math.sqrt(Math.pow((posX-CMinusX),2) + Math.pow((posY-CMinusY),2));
	var distMPlus = Math.sqrt(Math.pow((posX-MPlusX),2) + Math.pow((posY-MPlusY),2));
	var distMMinus = Math.sqrt(Math.pow((posX-MMinusX),2) + Math.pow((posY-MMinusY),2));
	var distYPlus = Math.sqrt(Math.pow((posX-YPlusX),2) + Math.pow((posY-YPlusY),2));
	var distYMinus = Math.sqrt(Math.pow((posX-YMinusX),2) + Math.pow((posY-YMinusY),2));


	if (distCPlus<closeness){
		paintAmount += 1;
		return("C+");
	}
	if (distCMinus<closeness){
		paintAmount -= 1;		
		return("C-");
	}
	if (distMPlus<closeness){
		paintAmount += 1;		
		return("M+");
	}
	if (distMMinus<closeness){
		paintAmount -= 1;
		return("M-");
	}
	if (distYPlus<closeness){
		paintAmount += 1;
		return("Y+");
	}
	if (distYMinus<closeness){
		paintAmount -= 1;
		return("Y-");
	}
	return("");
}

function nearOkButton(e){
	var closeness = 60;
	var posX = e.pageX - $("#myCanvas").offset().left;
	var posY = e.pageY - $("#myCanvas").offset().top;
	var distOk = Math.sqrt(Math.pow((posX-OKx),2) + Math.pow((posY-OKy),2))
	if (distOk < closeness)
		return(true);
	else
		return(false);
}

//color handling
var cmyks = {}

var targetcmyks = {}
targetcmyks['C'] = 0;
targetcmyks['M'] = 0;
targetcmyks['Y'] = 0;
targetcmyks['K'] = 0;

function ryb2hex(cmyksDict){
	r = cmyksDict['M']/100;
	y = cmyksDict['Y']/100;
	b = cmyksDict['C']/100;
	var white = [1, 1, 1];
	var red = [1, 0, 0];
	var yellow = [1, 1, 0];
	var blue = [0.163, 0.373, 0.6];
	var violet = [0.5, 0, 0.5];
	var green = [0, 0.66, 0.2];
	var orange = [1, 0.5, 0];
	var black = [0.2, 0.094, 0.0];
	var i;

	i = 0;
	var wred = white[i] * (1 - r) * (1 - b) * (1 - y);
	var rred = red[i] * r * (1 - b) * (1 - y);
	var bred = blue[i] * (1 - r) * b * (1 - y);
	var vred = violet[i] * r * b * (1 - y);
	var yred = yellow[i] * (1 - r) * (1 - b) * y;
	var ored = orange[i] * r * (1 - b) * y;
	var gred = green[i] * (1 - r) * b * y;
	var kred = black[i] * r * b * y;
	rgb_red =  wred+rred+bred+vred+yred+ored+gred+kred;

	i = 1;
	var wgreen = white[i] * (1 - r) * (1 - b) * (1 - y);
	var rgreen = red[i] * r * (1 - b) * (1 - y);
	var bgreen = blue[i] * (1 - r) * b * (1 - y);
	var vgreen = violet[i] * r * b * (1 - y);
	var ygreen = yellow[i] * (1 - r) * (1 - b) * y;
	var ogreen = orange[i] * r * (1 - b) * y;
	var ggreen = green[i] * (1 - r) * b * y;
	var kgreen = black[i] * r * b * y;
	rgb_green =  wgreen+rgreen+bgreen+vgreen+ygreen+ogreen+ggreen+kgreen;

	i = 2;
	var wblue = white[i] * (1 - r) * (1 - b) * (1 - y);
	var rblue = red[i] * r * (1 - b) * (1 - y);
	var bblue = blue[i] * (1 - r) * b * (1 - y);
	var vblue = violet[i] * r * b * (1 - y);
	var yblue = yellow[i] * (1 - r) * (1 - b) * y;
	var oblue = orange[i] * r * (1 - b) * y;
	var gblue = green[i] * (1 - r) * b * y;
	var kblue = black[i] * r * b * y;
	rgb_blue =  wblue+rblue+bgreen+vblue+yblue+oblue+gblue+kblue;

	rgb_red   = Math.floor(255*rgb_red);
	rgb_green = Math.floor(255*rgb_green);
	rgb_blue  = Math.floor(255*rgb_blue);
	var rStr = Math.floor(rgb_red).toString(16);
  	var gStr = Math.floor(rgb_green).toString(16);
  	var bStr = Math.floor(rgb_blue).toString(16);
  	if (rStr.length == 1){
    	rStr = "0"+rStr;
    }
  	if (gStr.length == 1){
   		gStr = "0"+gStr;
   	}
  	if (bStr.length == 1){
    	bStr = "0"+bStr;
    }
  	var retStr = "#" + rStr + gStr + bStr;
  	return(retStr);
}

/*deprecated
function cmyktoHex(cmyksDict){
  var r = 255 * (100 - cmyksDict['C'])/100 * (100 - cmyksDict['K'])/100;
  var g = 255 * (100 - cmyksDict['M'])/100 * (100 - cmyksDict['K'])/100;
  var b = 255 * (100 - cmyksDict['Y'])/100 * (100 - cmyksDict['K'])/100;

  var rStr = Math.floor(r).toString(16);
  var gStr = Math.floor(g).toString(16);
  var bStr = Math.floor(b).toString(16);
  if (rStr.length == 1){
    rStr = "0"+rStr;}
  if (gStr.length == 1){
    gStr = "0"+gStr;}
  if (bStr.length == 1){
    bStr = "0"+bStr;}
  var retStr = "#" + rStr + gStr + bStr;
  return(retStr);
}*/

function changeColor(changeId){
	if (changeId!=""){
    if (changeId[1] == '+'){
      if (cmyks[changeId[0]]<100)
        cmyks[changeId[0]] += diff;
    }
    else{
      if (cmyks[changeId[0]]>diff)
        cmyks[changeId[0]] -= diff;
    }
  }
}


function randomColor(){
	possibleColors = 100 / diff;
	rColor = Math.floor(Math.random()*possibleColors);
	return(rColor*diff);
}

function randomTargetCmyk(){
	targetcmyks['C'] = randomColor();
	targetcmyks['M'] = randomColor();
	targetcmyks['Y'] = randomColor();
	console.log(targetcmyks);
}


function drawTarget(){
	ctx.beginPath();
	randomTargetCmyk();
	ctx.fillStyle = ryb2hex(targetcmyks);
	ctx.rect(200,50,100,100);
	ctx.fill();
	ctx.closePath();
}

function drawCircle(){
	cmyks['C'] = 0;
	cmyks['M'] = 0;
	cmyks['Y'] = 0;
	cmyks['K'] = 0;
	ctx.beginPath();
	ctx.fillStyle = ryb2hex(cmyks);
	ctx.arc(250,240,70,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}

//drawing
var img = new Image();
var okimg = new Image();

img.onload = function () {
    ctx.drawImage(img, 0, 0);
    drawCircle();
	ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.font = "30px Arial";
	ctx.fillText("+",CPlusX,CPlusY);
	ctx.fillText("-",CMinusX,CMinusY); 
	ctx.fillText("+",MPlusX,MPlusY);
	ctx.fillText("-",MMinusX,MMinusY);	
	ctx.fillText("+",YPlusX,YPlusY);
	ctx.fillText("-",YMinusX,YMinusY);
	ctx.closePath();
	drawTarget();
	ctx.drawImage(okimg,OKx,OKy);

}
img.src = "imgs/watermelon2.png";
//https://openclipart.org/detail/212394/ok
okimg.src = "imgs/okIcon.png"

//check button click
$('#myCanvas').click(function(e){
	ctx.beginPath();
	changeColor(nearButton(e));
	ctx.fillStyle = ryb2hex(cmyks);
	if (nearOkButton(e)){
		if (ryb2hex(targetcmyks) == ryb2hex(cmyks)){
			drawTarget();
			drawCircle();
		}

	}
	ctx.beginPath();
	ctx.arc(250,240,70,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();	
	ctx.closePath();
});