//drawing.js
//the functions that draw on the canvas
var c = document.getElementById('myCanvas');
var ctx = c.getContext("2d");



var diffLevels = [33,25,17,10,5];
var diff = diffLevels[0];
c.width = 500;
c.height = 500;


//button coordinates
var RPlusX = 350;
var RPlusY = 250;
var RMinusX = 458;
var RMinusY = 250;
var YPlusX = 240;
var YPlusY = 360;
var YMinusX = 240;
var YMinusY = 460;
var BPlusX = 130;
var BPlusY = 250;
var BMinusX = 30;
var BMinusY = 250;

var OKx = 300;
var OKy = 300;
var paintAmount = 0;

function nearButton(e){
	var closeness = 40;
	var posX = e.pageX - $("#myCanvas").offset().left;
    var posY = e.pageY - $("#myCanvas").offset().top;
	var distRPlus = Math.sqrt(Math.pow((posX-RPlusX),2) + Math.pow((posY-RPlusY),2));
	var distRMinus = Math.sqrt(Math.pow((posX-RMinusX),2) + Math.pow((posY-RMinusY),2));
	var distYPlus = Math.sqrt(Math.pow((posX-YPlusX),2) + Math.pow((posY-YPlusY),2));
	var distYMinus = Math.sqrt(Math.pow((posX-YMinusX),2) + Math.pow((posY-YMinusY),2));
	var distBPlus = Math.sqrt(Math.pow((posX-BPlusX),2) + Math.pow((posY-BPlusY),2));
	var distBMinus = Math.sqrt(Math.pow((posX-BMinusX),2) + Math.pow((posY-BMinusY),2));


	if (distRPlus<closeness){
		paintAmount += 1;		
		return("R+");
	}
	if (distRMinus<closeness){
		paintAmount -= 1;
		return("R-");
	}
	if (distYPlus<closeness){
		paintAmount += 1;
		return("Y+");
	}
	if (distYMinus<closeness){
		paintAmount -= 1;
		return("Y-");
	}
	if (distBPlus<closeness){
		paintAmount += 1;
		return("B+");
	}
	if (distBMinus<closeness){
		paintAmount -= 1;		
		return("B-");
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
var rybs = {}

var targetrybs = {}
targetrybs['R'] = 0;
targetrybs['Y'] = 0;
targetrybs['B'] = 0;
targetrybs['K'] = 0;

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



function ryb2hex(rybsDict){
	r = rybsDict['R']/100;
	y = rybsDict['Y']/100;
	b = rybsDict['B']/100;
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

function changeColor(changeId){
	if (changeId!=""){
    if (changeId[1] == '+'){
    	rybs[changeId[0]] += diff;
      	if (rybs[changeId[0]]>100)
        	rybs[changeId[0]] -= diff;
    }
    else{
    	rybs[changeId[0]] -= diff;
      	if (rybs[changeId[0]]<0)
      		rybs[changeId[0]] += diff;
    }
  }
  console.log(rybs);
}


function randomTargetCmyk(diff){
	/*create random color by clicking random + on the three colors
	*/
	maxClicks = Math.floor(100.0/diff);
	randomClicks = Math.floor(Math.random()*maxClicks);
	targetrybs['B'] = diff*randomClicks;
	console.log(randomClicks);
	randomClicks = Math.floor(Math.random()*maxClicks);
	targetrybs['R'] = diff*randomClicks;
	console.log(randomClicks);
	randomClicks = Math.floor(Math.random()*maxClicks);
	targetrybs['Y'] = diff*randomClicks;
	console.log(randomClicks);
	console.log(targetrybs);
}


function drawTarget(){
	ctx.beginPath();
	randomTargetCmyk(diff);
	ctx.fillStyle = ryb2hex(targetrybs);
	ctx.rect(200,50,100,100);
	ctx.fill();
	ctx.closePath();
}

function drawCircle(){
	rybs['R'] = 0;
	rybs['Y'] = 0;
	rybs['B'] = 0;
	rybs['K'] = 0;
	ctx.beginPath();
	ctx.fillStyle = ryb2hex(rybs);
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
	ctx.fillText("+",BPlusX,BPlusY);
	ctx.fillText("-",BMinusX,BMinusY); 
	ctx.fillText("+",RPlusX,RPlusY);
	ctx.fillText("-",RMinusX,RMinusY);	
	ctx.fillText("+",YPlusX,YPlusY);
	ctx.fillText("-",YMinusX,YMinusY);
	ctx.closePath();
	drawTarget();
	ctx.drawImage(okimg,OKx,OKy);

}
img.src = "imgs/bkg.png";
//https://openclipart.org/detail/212394/ok
okimg.src = "imgs/okIcon.png"

//check button click
$('#myCanvas').click(function(e){
	ctx.beginPath();
	changeColor(nearButton(e));
	ctx.fillStyle = ryb2hex(rybs);
	if (nearOkButton(e)){
		if (ryb2hex(targetrybs) == ryb2hex(rybs)){
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