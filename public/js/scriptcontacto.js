var mnombre;
var mmensaje;
var memail;
$(document).on('ready',function(){

	



	$('#btnContacto').on("click",function(){

		mnombre = $('#nombre').val();
		mmensaje = $('#mensaje').val();
		

		if ((validaremail()) && (mnombre.length>0) && (mmensaje.length>0)) {
			alert("Gracias por contactarnos, pronto te responderemos");
		}
	});



	function validaremail () {
		memail = $('#email').val();
		var p;
		var pe=false;
		if (memail.length>0){
		}
		else {
			return false;
		}


		for (var i = 0; i < memail.length; i++) {
			
			if (memail[i] == '@'){
				p=i+1;
				pe=true;
			}
		};

		if (!pe){
			return false;
		}

		if (memail.length == p){
			return false;
		}

		return true;
	}

});