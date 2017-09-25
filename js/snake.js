/*
* @Author: Aditya Raj Gupta
* @Date: 2017-09-26 00:11:30
* @Last Modified by: Aditya Raj Gupta
* @Last Modified time: 2017-09-26 02:00:49
* @Email: argupta2301@gmail.com
* @Website: http://adityargupta.com
*/

// Initializing Variables
var snake = document.getElementById("snake"),
    bait = document.getElementById("bait"),
    wrapper = document.getElementById("wrapper"),
    posY = 35,
    posX = 50,
    width = 75,
    height = 10,
    flow = 'ltr',
    speed = 700;


// Get Wrapper Properties
function getWrapperWidthHeight() {
	console.info('innerHeight: ', window.getComputedStyle(wrapper, null).getPropertyValue("height"));
	console.info('innerWidth: ', window.getComputedStyle(wrapper, null).getPropertyValue("width"));
	return {
	    height: window.getComputedStyle(wrapper, null).getPropertyValue("height").replace('px', ''),
	    width: window.getComputedStyle(wrapper, null).getPropertyValue("width").replace('px', '')
	}
}


// Get Snake Position
function getSnakePosition () {
	var wrapperOptions = getWrapperWidthHeight();
	var sTop = ((snake.offsetTop - snake.parentElement.offsetTop) * 100) / parseInt(wrapperOptions.height);
	var sLeft = ((snake.offsetLeft - snake.parentElement.offsetLeft) * 100) / parseInt(wrapperOptions.width);
	if(flow == "ltr") {
		sLeft = sLeft + width;
	}
	if(flow == "ttb") {
		sTop = sTop + height;
	}
	console.info('sTop: ', sTop);
	console.info('sLeft: ', sLeft);
	return {
	    top: sTop,
	    left: sLeft
	}
}


// Get Bait Position
function getBait() {
	var snakePos = getSnakePosition();
	var newPos = Math.floor(Math.random() * (99) + 1);
	if(snakePos.top != newPos && snakePos.left != newPos) {
    	console.info('newPos: ', newPos);
    	return newPos;
	}
}


// Initail Function
function init() {
    snake.style.top = posX + "%";
    snake.style.left = posY + "%";
    snake.style.width = width + "px";
    snake.style.height = height + "px";
   	bait.style.top = getBait() + "%";
	bait.style.left = getBait() + "%";	
}
init();


// Left To Right Movement
function ltr() {
	posY = posY + 1;
	snake.style.left = posY + "%";
}


// Top To Bottom Movement
function ttb() {
	posY = posX + 1;
	snake.style.left = posY + "%";
}


// Bottom To Top Movement
function btt() {
	posY = posX - 1;
	snake.style.left = posY + "%";
}


// Right To Left Movement
function rtl() {
	posY = posY - 1;
	snake.style.left = posY + "%";
}


//Changing Direction on Key Hit
function changeDirection(newFlow) {
	snakePos = getSnakePosition();
	console.info("Have to break the div to change direction");
}


// Detecting Key Hit
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38' || e.keyCode == '87') {
        if(flow == "ttb") {
        	console.info('Opposite Direction!!!');
        } else if(flow == "btt") {
        	console.info('Same Direction!!!');
        } else {
        	changeDirection('btt');
        }
    }
    else if (e.keyCode == '40' || e.keyCode == '83') {
        if(flow == "btt") {
        	console.info('Opposite Direction!!!');
        } else if(flow == "ttb") {
        	console.info('Same Direction!!!');
        } else {
        	changeDirection('ttb');
        }
    }
    else if (e.keyCode == '37' || e.keyCode == '65') {
       	if(flow == "rtl") {
        	console.info('Opposite Direction!!!');
        } else if(flow == "ltr") {
        	console.info('Same Direction!!!');
        } else {
        	changeDirection('ltr');
        }
    }
    else if (e.keyCode == '39' || e.keyCode == '68') {
       	if(flow == "ltr") {
        	console.info('Opposite Direction!!!');
        } else if(flow == "rtl") {
        	console.info('Same Direction!!!');
        } else {
        	changeDirection('rtl');
        }
    }
}
document.onkeydown = checkKey;


// Interval to move snake
setInterval(function() {
    console.info("Snake is moving from " + flow);
    switch(flow) {
		case 'ltr':
    	ltr();
    	break;
    	case 'ttb':
    	ttb();
    	break;
    	case 'btt':
    	btt();
    	break;
    	default: 
    	rtl();
    	break;
    }
}, speed);