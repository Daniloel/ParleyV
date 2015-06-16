$(document).on("ready",configurarApp);

function configurarApp () {
	var canvas = document.getElementById("miCanvas");
	var canvas2 = document.getElementById("miCanvas2");
	
	var ctx = canvas.getContext("2d");
	var ctx2 = canvas2.getContext("2d");
	dibujaFooter(canvas,ctx);
	dibujaFooter(canvas2,ctx2);
}

function dibujaFooter(canvas,contexto){
	contexto.moveTo(0,0);
	contexto.quadraticCurveTo(10,0,10,55)
	contexto.stroke();
}