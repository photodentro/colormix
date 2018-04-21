//https://math.stackexchange.com/questions/305395/ryb-and-rgb-color-space-conversion
function ryb2hex(r,y,b){
	r = r/100;
	y = y/100;
	b = b/100;
	var white = [1, 1, 1];
	var red = [1, 0, 0];
	var yellow = [1, 1, 0];
	var blue = [0.163, 0.373, 0.6];
	var violet = [0.5, 0, 0.5];
	var green = [0, 0.66, 0.2];
	var orange = [1, 0.5, 0];
	var black = [0.2, 0.094, 0.0];

	i = 1;
	var wred = white[i] * (1 - r) * (1 - b) * (1 - y);
	var rred = red[i] * r * (1 - b) * (1 - y);
	var bred = blue[i] * (1 - r) * b * (1 - y);
	var vred = violet[i] * r * b * (1 - y);
	var yred = yellow[i] * (1 - r) * (1 - b) * y;
	var ored = orange[i] * r * (1 - b) * y;
	var gred = green[i] * (1 - r) * b * y;
	var kred = black[i] * r * b * y;
	rgb_red =  wred+rred+bred+vred+yred+ored+gred+kred;

	i = 2;
	var wgreen = white[i] * (1 - r) * (1 - b) * (1 - y);
	var rgreen = red[i] * r * (1 - b) * (1 - y);
	var bgreen = blue[i] * (1 - r) * b * (1 - y);
	var vgreen = violet[i] * r * b * (1 - y);
	var ygreen = yellow[i] * (1 - r) * (1 - b) * y;
	var ogreen = orange[i] * r * (1 - b) * y;
	var ggreen = green[i] * (1 - r) * b * y;
	var kgreen = black[i] * r * b * y;
	rgb_green =  wgreen+rgreen+bgreen+vgreen+ygreen+ogreen+ggreen+kgreen;

	i = 3;
	var wblue = white[i] * (1 - r) * (1 - b) * (1 - y);
	var rblue = red[i] * r * (1 - b) * (1 - y);
	var bblue = blue[i] * (1 - r) * b * (1 - y);
	var vblue = violet[i] * r * b * (1 - y);
	var yblue = yellow[i] * (1 - r) * (1 - b) * y;
	var oblue = orange[i] * r * (1 - b) * y;
	var gblue = green[i] * (1 - r) * b * y;
	var kblue = black[i] * r * b * y;
	rgb_blue =  wblue+rblue+bgreeb+vblue+yblue+oblue+gblue+kblue;

	rgb_red   = Math.floor(255*rgb_red);
	rgb_green = Math.floor(255*rgb_green);
	rgb_blue  = Math.floor(255*rgb_blue);
	var rStr = Math.floor(r).toString(16);
  	var gStr = Math.floor(g).toString(16);
  	var bStr = Math.floor(b).toString(16);
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
  	console.log(retStr);
  	return(retStr);
}



var cmyks = {}
cmyks['C'] = 50;
cmyks['M'] = 50;
cmyks['Y'] = 50;
cmyks['K'] = 0;



function cmyktoHex(C,M,Y,K){
  var r = 255 * (100 - C)/100 * (100 - K)/100;
  var g = 255 * (100 - M)/100 * (100 - K)/100;
  var b = 255 * (100 - Y)/100 * (100 - K)/100;

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
  console.log(retStr);
  return(retStr);
  }
function changeColor(changeId){
    if (changeId[1] == '+'){
      if (cmyks[changeId[0]]<100)
        cmyks[changeId[0]] += diff;
    }
    else{
      if (cmyks[colorId[0]]>10)
        cmyks[colorId[0]] -= diff;
    }
  }
