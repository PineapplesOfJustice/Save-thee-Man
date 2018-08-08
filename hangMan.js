var namespace = "http://www.w3.org/2000/svg"
var hangMan = 0;
var answer = "";
var answerChar;
var wrongChar = [];
var currentLetter = "";
var currentPhrase;
var i = 0;
var length = 0;
var isFocused;
var enderGame = false;
var hintChanger = false;

//paper
makeRect(0, 0, 300, 500, "#ffffcc");
makeLine(50, 0, 50, 500, "red");
for(var i=50; i<440;){
 	makeLine(0, i, 300, i, "blue"); 
 	i+=15;
}
makeCircle(25, 80, 8, "black");
makeCircle(25, 220, 8, "black");
makeCircle(25, 360, 8, "black");

//hangman's hanger
makePolyline("80 400 80 40 210 40", "black", 5)
makeLine(80, 70, 120, 40, "black", 5);
makeLine(20, 399, 140, 399, "black", 8);
var line = makeLine(200, 41, 200, 120, "black", 3);
line.setAttribute("stroke-dasharray", "10,1");

//hangMan
var head = makeCircle(200, 150, 30, "black", 0);
head.setAttribute("fill-opacity", 0);
head.setAttribute("stroke-width", 3);
head.setAttribute("stroke", "black");
var body = makeLine(200, 180, 200, 250, "black", 3, 0);
var leftArm = makeLine(200, 200, 170, 210, "black", 3, 0);
var rightArm = makeLine(200, 200, 230, 210, "black", 3, 0); 
var leftLeg = makeLine(200, 250, 190, 285, "black", 3, 0);
var rightLeg = makeLine(200, 250, 210, 285, "black", 3, 0);
var trashCan = makeImage("Images/Hangman Icon/Trash Can.png", -70, -70, 140, 140, 0);
trashCan.setAttribute("transform", "translate(200, 350)");
var leftEye = makeImage("Images/Hangman Icon/X Icon.png", 181, 135, 16, 16, 0);
var rightEye = makeImage("Images/Hangman Icon/X Icon.png", 203, 135, 16, 16, 0);
var mouth = makeLine(190, 162, 210, 162, "black", 3, 0);
//var dead = makeText("DEAD", 90, 467, 50, "Special Elite", "black", 0);

function startGame(){
  if(Number(document.getElementById("chosenWord").value) != 0){
    document.getElementById("openingBox").setAttribute("style", "display: none;");
    document.getElementById("mainDisplay").setAttribute("style", "display:inline;");    
    document.getElementById("guessingSpace").innerHTML = "";
    document.getElementById("wronged").innerHTML = "";
    if(Number(document.getElementById("chosenHint").value) != 0){ document.getElementById("hintBox").innerHTML = "<span style='text-decoration: underline;'>HINT:</span> " + document.getElementById("chosenHint").value; }
    else{ document.getElementById("hintBox").innerHTML = "<span style='text-decoration: underline;'>ERROR:</span> Hint Not Found"; document.getElementById("changeHint").innerHTML = "Make One"; }
    answer = document.getElementById("chosenWord").value.toUpperCase();
	answerChar = answer.split("");
    for(var i=0, length=answerChar.length; i<length; i++){
	  answerChar[i] = { letter:answerChar[i], guessed:false };
      console.log(answerChar[i].letter);  
	  if(answerChar[i].letter == " "){ document.getElementById("guessingSpace").innerHTML += "&emsp;"; }
	  else if(answerChar[i].guessed == false){ document.getElementById("guessingSpace").innerHTML += "_"; }     
    }    
  }
  else{ document.getElementById("chosenWord").setAttribute("style", "border-right: solid red 2px;"); }  
}

function drawHangMan(condition){
	if(hangMan == 0){
  	head.setAttribute("opacity", 1);
  }
	else if(hangMan == 1){
		body.setAttribute("opacity", 1);
	}
	else if(hangMan == 2){
		leftArm.setAttribute("opacity", 1);
		rightArm.setAttribute("opacity", 1);
	}
	else if(hangMan == 3){
		leftLeg.setAttribute("opacity", 1);
		rightLeg.setAttribute("opacity", 1);
	}
	else if(hangMan == 4){
	  trashCan.setAttribute("opacity", 1);
	}
	else if(hangMan == 5){
		leftArm.remove();
	  leftArm = makePolyline("200 200 180 197 200 180", "black", 3);
		rightArm.remove();
  	rightArm = makePolyline("200 200 220 197 200 180", "black", 3);
		leftLeg.setAttribute("x2", 193);
		leftLeg.setAttribute("y2", 289);
		rightLeg.setAttribute("x2", 207);
		rightLeg.setAttribute("y2", 289);
	  trashCan.setAttribute("transform", "translate(200, 350) rotate(-90)");
	}
	else if(hangMan == 6){
		leftArm.remove();
	  leftArm = makeLine(200, 200, 194, 240, "black", 3);
		rightArm.remove();
  	rightArm = makeLine(200, 200, 206, 240, "black", 3);
		leftEye.setAttribute("opacity", 1);
		rightEye.setAttribute("opacity", 1);
		mouth.setAttribute("opacity", 1);
        endGame();    
	}
    if(currentLetter != 0){
      wrongChar.push(currentLetter);
      currentLetter = 0;
    }
    if(condition == "Letter"){
      document.getElementById("wronged").innerHTML = "<span style='text-decoration: underline;'>WRONGED:</span> ";
      for(i=0, length=wrongChar.length; i<length; i++){ document.getElementById("wronged").innerHTML += wrongChar[i] + " "; }
    }
	hangMan += 1;
}

function updateMainDisplay(){
  enderGame = "victory";  
  document.getElementById("guessingSpace").innerHTML = "";
  for(var i=0, length=answerChar.length; i<length; i++){
	if(answerChar[i].letter == " "){ document.getElementById("guessingSpace").innerHTML += "&emsp;"; }
	else if(answerChar[i].guessed == false){ document.getElementById("guessingSpace").innerHTML += "_"; }
	else if(answerChar[i].guessed == "given"){ document.getElementById("guessingSpace").innerHTML += "<span style='color: red;'>" + answerChar[i].letter + "</span>"; }
	else if(answerChar[i].guessed == "instant"){ document.getElementById("guessingSpace").innerHTML += "<span style='color: purple;'>" + answerChar[i].letter + "</span>"; }
	else{ document.getElementById("guessingSpace").innerHTML += answerChar[i].letter; }    
  }
  for(var i=0, length=answerChar.length; i<length; i++){
	if(answerChar[i].letter == " "){}
	else if(answerChar[i].guessed == false){ enderGame = false; }    
	else if(answerChar[i].guessed == "given"){ enderGame = "lose"; }    
  }
  if(enderGame == "lose"){ document.getElementById("guessLetter").setAttribute("placeholder", "You Lose"); document.getElementById("restartButton").setAttribute("style", "display: inline;"); }  
  else if(enderGame == "victory"){ document.getElementById("guessLetter").setAttribute("placeholder", "You Win"); document.getElementById("restartButton").setAttribute("style", "display: inline;"); }  
}

function checkLetter(){
  if(enderGame == false && Number(document.getElementById("guessLetter").value) != 0){  
    var correct = false;  
    currentLetter = document.getElementById("guessLetter").value.toUpperCase();    
    for(i=0, length=answerChar.length; i<length; i++){
    if(currentLetter == answerChar[i].letter && answerChar[i].guessed == false){
      answerChar[i].guessed = true;
      correct = true;
    }
    else if(currentLetter == answerChar[i].letter && answerChar[i].guessed == true){ correct = "neither"; }
    else{}  
  }
    if(correct == true){ updateMainDisplay(); }
    else if(correct == "neither"){}  
    else{  
      for(i=0, length=wrongChar.length; i<length; i++){
        if(wrongChar[i] == currentLetter){ correct = true; }
      }
      if(correct == false){ drawHangMan("Letter"); }
    }
  }
  document.getElementById("guessLetter").value = "";  
}

function checkPhrase(){
  if(enderGame == false && Number(document.getElementById("guessPhrase").value) != 0){  
    currentPhrase = document.getElementById("guessPhrase").value.toUpperCase();
    if(currentPhrase == answer){ 
    for(i=0, length=answerChar.length; i<length; i++){
      if(answerChar[i].letter != " " && answerChar[i].guessed == false){
        answerChar[i].guessed = "instant";
      }  
    }
    updateMainDisplay();  
  }
    else{ drawHangMan("Phrase"); }
  }
  document.getElementById("guessPhrase").value = "";  
}

function endGame(){
  for(i=0, length=answerChar.length; i<length; i++){
	if(answerChar[i].letter == " "){}
	else if(answerChar[i].guessed == false){ answerChar[i].guessed = "given"; }    
  }
  updateMainDisplay();
}

function restartGame(){
  document.getElementById("mainDisplay").setAttribute("style", "display: none;");
  document.getElementById("openingBox").setAttribute("style", "display: inline;");
  document.getElementById("openingBox").setAttribute("style", "background-color: black;");
  document.getElementById("restartButton").setAttribute("style", "display:none;");
  hangMan = 0;
  answerChar;
  wrongChar.splice(0, wrongChar.length);
  enderGame = false;
  hintChanger = false;
  head.setAttribute("opacity", 0);
  body.setAttribute("opacity", 0);
  leftArm.remove();  
  leftArm = makeLine(200, 200, 170, 210, "black", 3, 0);
  rightArm.remove();
  rightArm = makeLine(200, 200, 230, 210, "black", 3, 0);
  leftLeg.remove();  
  leftLeg = makeLine(200, 250, 190, 285, "black", 3, 0);
  rightLeg.remove();  
  rightLeg = makeLine(200, 250, 210, 285, "black", 3, 0);
  trashCan.setAttribute("opacity", 0);
  trashCan.setAttribute("transform", "translate(200, 350)");
  leftEye.setAttribute("opacity", 0);
  rightEye.setAttribute("opacity", 0);
  mouth.setAttribute("opacity", 0);
  document.getElementById("chosenWord").value = "";
  document.getElementById("chosenHint").value = "";
  document.getElementById("guessLetter").value = "";
  document.getElementById("guessLetter").setAttribute("placeholder", "Letter");
  document.getElementById("guessPhrase").value = "";
}

function changeHint(){
  if(hintChanger == false){
    document.getElementById("newHint").setAttribute("style", "display: block;");
    document.getElementById("hintBox").setAttribute("style", "display: none;");
    document.getElementById("newHint").value = document.getElementById("chosenHint").value;  
    hintChanger = true;  
    document.getElementById("changeHint").innerHTML = "Confirm"; 
  }
  else if(hintChanger == true){
    document.getElementById("newHint").setAttribute("style", "display: none;");
    document.getElementById("hintBox").setAttribute("style", "display: block;");
    document.getElementById("chosenHint").value = document.getElementById("newHint").value;
    if(Number(document.getElementById("newHint").value) != 0){ document.getElementById("hintBox").innerHTML = "<span style='text-decoration: underline;'>HINT:</span> " + document.getElementById("chosenHint").value; document.getElementById("changeHint").innerHTML = "Change"; }
    else{ document.getElementById("hintBox").innerHTML = "<span style='text-decoration: underline;'>ERROR:</span> Hint Not Found"; document.getElementById("changeHint").innerHTML = "Make One"; }  
    hintChanger = false;  
  }
}

document.getElementById("guessLetter").addEventListener('focus', function(){ isFocused = "guessLetter"; })
document.getElementById("guessLetter").addEventListener('blur', function(){ isFocused = false; })
document.getElementById("guessPhrase").addEventListener('focus', function(){ isFocused = "guessPhrase"; })
document.getElementById("guessPhrase").addEventListener('blur', function(){ isFocused = false; })

document.addEventListener('keypress',hello)
function hello(event) {       
  if(event.key == "Enter" && isFocused == "guessLetter"){
    checkLetter();  
  }
  else if(isFocused == "guessLetter"){
    document.getElementById("guessLetter").value = "";
  }
  else if(event.key == "Enter" && isFocused == "guessPhrase"){
    checkPhrase();
  }
}


// DO NOT EDIT CODE BELOW THIS LINE!
function getX(shape) {
  if (shape.hasAttribute("x")) {
    return parseFloat(shape.getAttribute("x"))
  } else {
    return parseFloat(shape.getAttribute("cx"))
  }  
}

function getY(shape) {
  if (shape.hasAttribute("y")) {
    return parseFloat(shape.getAttribute("y"))
  } else {
    return parseFloat(shape.getAttribute("cy"))
  }   
}

function setX(shape, x) {
  if (shape.hasAttribute("x")) {
    shape.setAttribute("x", x)
  } else {
    shape.setAttribute("cx", x)
  } 
}

function setY(shape, y) {
  if (shape.hasAttribute("y")) {
    shape.setAttribute("y", y)
  } else {
    shape.setAttribute("cy", y)
  } 
}

function move(shape, dx, dy) {
  if (shape.hasAttribute("x") && shape.hasAttribute("y")) {
    var x = parseFloat(shape.getAttribute("x"))
    var y = parseFloat(shape.getAttribute("y"))
    shape.setAttribute("x", x + dx)
    shape.setAttribute("y", y + dy)
  } else {
    var cx = parseFloat(shape.getAttribute("cx"))
    var cy = parseFloat(shape.getAttribute("cy"))
    shape.setAttribute("cx", cx + dx)
    shape.setAttribute("cy", cy + dy)
  }
}

function makeCircle(cx, cy, r, fill, opacity) {
  var circle = document.createElementNS(namespace, "circle")
  circle.setAttribute("cx", cx)
  circle.setAttribute("cy", cy)
  circle.setAttribute("r", r)
  circle.setAttribute("fill", fill)
  circle.setAttribute("opacity", opacity)
  
  var canvas = document.getElementById("canvas")
  canvas.appendChild(circle)
  return circle
}

function makeRect(x, y, width, height, fill, opacity) {
  var rect = document.createElementNS(namespace, "rect")
  rect.setAttribute("x", x)
  rect.setAttribute("y", y)
  rect.setAttribute("width", width)
  rect.setAttribute("height", height)
  rect.setAttribute("fill", fill)
  rect.setAttribute("opacity", opacity)
  
  var canvas = document.getElementById("canvas")
  canvas.appendChild(rect)
  return rect
}

function makeEllipse(cx, cy, rx, ry, fill, opacity) {
  var ellipse = document.createElementNS(namespace, "ellipse")
  ellipse.setAttribute("cx", cx)
  ellipse.setAttribute("cy", cy)
  ellipse.setAttribute("rx", rx)
  ellipse.setAttribute("ry", ry)
  ellipse.setAttribute("fill", fill)
  ellipse.setAttribute("opacity", opacity)
  
  var canvas = document.getElementById("canvas")
  canvas.appendChild(ellipse)
  return ellipse
}

function makeLine(x1, y1, x2, y2, stroke, strokeWidth, opacity) {
  var line = document.createElementNS(namespace, "line")
  line.setAttribute("x1", x1)
  line.setAttribute("y1", y1)
  line.setAttribute("x2", x2)
  line.setAttribute("y2", y2)
  line.setAttribute("stroke", stroke)
  line.setAttribute("stroke-width", strokeWidth)
  line.setAttribute("opacity", opacity)
  
  var canvas = document.getElementById("canvas")
  canvas.appendChild(line)
  return line
}

function makePolyline(points, stroke, strokeWidth, opacity) {
  var polyline = document.createElementNS(namespace, "polyline")
  polyline.setAttribute("points", points)
  polyline.setAttribute("stroke", stroke)
  polyline.setAttribute("stroke-width", strokeWidth)
  polyline.setAttribute("opacity", opacity)
  polyline.setAttribute("fill", "none")
  
  var canvas = document.getElementById("canvas")
  canvas.appendChild(polyline)
  return polyline
}

function makePolygon(points, fill, opacity) {
  var polygon = document.createElementNS(namespace, "polygon")
  polygon.setAttribute("points", points)
  polygon.setAttribute("opacity", opacity)
  polygon.setAttribute("fill", fill)
  
  var canvas = document.getElementById("canvas")
  canvas.appendChild(polygon)
  return polygon
}

function makeText(message, x, y, fontSize, fontFamily, fill, opacity) {
  var text = document.createElementNS(namespace, "text")
  text.innerHTML = message
  text.setAttribute("x", x)
  text.setAttribute("y", y)
  text.setAttribute("font-size", fontSize)
  text.setAttribute("font-family", fontFamily)
  text.setAttribute("fill", fill)
  text.setAttribute("opacity", opacity)
  
  var canvas = document.getElementById("canvas")
  canvas.appendChild(text)
  return text
}

function makeImage(url, x, y, width, height, opacity) {
  var image = document.createElementNS(namespace, "image")
  image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", url)
  image.setAttribute("x", x)
  image.setAttribute("y", y)
  image.setAttribute("width", width)
  image.setAttribute("height", height)
  image.setAttribute("opacity", opacity)
  
  var canvas = document.getElementById("canvas")
  canvas.appendChild(image)
  return image
}

function collides(rect1, rect2) {
  var centerX = getX(rect1) + parseFloat(rect1.getAttribute("width"))/2
  var centerY = getY(rect1) + parseFloat(rect1.getAttribute("height"))/2
  return (centerX > getX(rect2) && 
          centerX < getX(rect2) + parseFloat(rect2.getAttribute("width")) &&
         centerY > getY(rect2) &&
         centerY < getY(rect2) + parseFloat(rect2.getAttribute("height")))
}
