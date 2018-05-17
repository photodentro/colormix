//drawing.js
//the functions that draw on the canvas
var c = document.getElementById('myCanvas');
var ctx = c.getContext("2d");



var diffLevels = [33,25,17,10,5];
var diff = diffLevels[0];
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

//code from https://github.com/bahamas10/node-ryb2rgb/blob/master/ryb2rgb.js
//thanks @alkisg
function cubicInt(t, A, B){
    var weight = t*t*(3-2*t);
    return A + weight*(B-A);
}

  function getR(iR, iY, iB) {
    // red
    var x0 = cubicInt(iB, 1.0, 0.163);
    var x1 = cubicInt(iB, 1.0, 0.0);
    var x2 = cubicInt(iB, 1.0, 0.5);
    var x3 = cubicInt(iB, 1.0, 0.2);
    var y0 = cubicInt(iY, x0, x1);
    var y1 = cubicInt(iY, x2, x3);
    return Math.ceil (255 * cubicInt(iR, y0, y1));
  }

  function getG(iR, iY, iB) {
    // green
    var x0 = cubicInt(iB, 1.0, 0.373);
    var x1 = cubicInt(iB, 1.0, 0.66);
    var x2 = cubicInt(iB, 0.0, 0.0);
    var x3 = cubicInt(iB, 0.5, 0.094);
    var y0 = cubicInt(iY, x0, x1);
    var y1 = cubicInt(iY, x2, x3);
    return Math.ceil (255 * cubicInt(iR, y0, y1));
  }

  function getB(iR, iY, iB) {
    // blue
    var x0 = cubicInt(iB, 1.0, 0.6);
    var x1 = cubicInt(iB, 0.0, 0.2);
    var x2 = cubicInt(iB, 0.0, 0.5);
    var x3 = cubicInt(iB, 0.0, 0.0);
    var y0 = cubicInt(iY, x0, x1);
    var y1 = cubicInt(iY, x2, x3);
    return Math.ceil (255 * cubicInt(iR, y0, y1));
  }



function ryb2hex(cmyksDict){
	r = cmyksDict['M']/100;
	y = cmyksDict['Y']/100;
	b = cmyksDict['C']/100;
	rgb_red   = getR(r,y,b);
	rgb_green = getG(r,y,b);
	rgb_blue  = getB(r,y,b);
	
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
    	cmyks[changeId[0]] += diff;
      	if (cmyks[changeId[0]]>100)
        	cmyks[changeId[0]] -= diff;
    }
    else{
    	cmyks[changeId[0]] -= diff;
      	if (cmyks[changeId[0]]<0)
      		cmyks[changeId[0]] += diff;
    }
  }
  console.log(cmyks);
}


function randomTargetCmyk(diff){
	/*create random color by clicking random + on the three colors
	*/
	maxClicks = Math.floor(100.0/diff);
	randomClicks = Math.floor(Math.random()*maxClicks);
	targetcmyks['C'] = diff*randomClicks;
	console.log(randomClicks);
	randomClicks = Math.floor(Math.random()*maxClicks);
	targetcmyks['M'] = diff*randomClicks;
	console.log(randomClicks);
	randomClicks = Math.floor(Math.random()*maxClicks);
	targetcmyks['Y'] = diff*randomClicks;
	console.log(randomClicks);
	console.log(targetcmyks);
}


function drawTarget(){
	ctx.beginPath();
	randomTargetCmyk(diff);
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