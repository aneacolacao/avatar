window.fbAsyncInit = function() {
  console.log('Iniciar SDK');
  FB.init({
    appId      : '2017006578570129',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    status     : true,
    version    : 'v2.12' // use graph api version 2.5
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  // FB.getLoginStatus(function(response) {
  // 	console.log('Obtener status');
  //   statusChangeCallback(response);
  // });

};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/es_MX/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
	  
// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
  	console.log('funcion checkLoginState');
    statusChangeCallback(response);
  });
}
var color, img_f, font; //variables del random color
var token, first, last, letters, media; //nombre, apellido, letras en apellido, la mitad redondeado abajo
var chars_lastname, height, f_size, nl, ml, ll, space; //array de apellido, altura de imagen, font size, margin de first, margin de year, letra normal, letra de en medio, última letra, espacio
var line_h, line_h_y, height_a, margin_img_a; //margin de first, margin de year, altura imagen c/acento, margin de first c/acento


var acentos = /^[\u00C0-\u00FF]+$/;
var img_acento = false;
var container_canvas = document.getElementById('container-canvas'); //div donde estará el canvas
var simbolos = /[ áéíóúàèìòùÁÉÍÓÚÀÈÌÒÙnÑ ]/;

//Validate status
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
		console.log('Welcome!  Fetching your information.... ');
	    // $('#fblogout').show();
	    FB.api('/me', function(response) {
	      console.log(JSON.stringify(response));
	      console.log('Successful login for: ' + response.name);
	      // document.getElementById('status').innerHTML = '¡Elige tu foto, ' + response.name + '!' ;
	      // $('#inicio').hide();
	      // console.log('display inicio');
	      // $('#status').show();
	      // fbupload();
	    });
	    getUserInfo();
		token = response.authResponse.accessToken;
		console.log(token);
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      // document.getElementById('status').innerHTML = 'Por favor autoriza nuestra aplicación.';
      // $('#inicio').show();
      console.log('tu aplicación no ha sido autorizada');
    } else{
    	console.log('Status desconectado de facebook');
    	// $('#inicio').show();
    }
}

function getUserInfo() {    
    FB.api('/me','GET',{"fields":"id,name,first_name,last_name,email"},function(response) {
      console.log(JSON.stringify(response));
      first = response.first_name.toLowerCase();
      last_initial = response.last_name.toLowerCase();
      // first = 'Maura Andrea Guadalupe'.toLowerCase();
      // var lastName = 'Ley'.toLowerCase();

      if (/\s/.test(last_initial)) {
	    console.log('este apellido tiene un espacio');
	  	var last_n = last_initial.split(' ');
	  	console.log(last_n);
      	last = last_n[0]; 
	  }else{
	  	last = last_initial;
	  }
     
      createAvtr(first, last);
      	// $.ajax({
       //      type: "POST",
       //      data: response,
       //      url: 'check_user.php',
       //      success: function(response) {
       //          console.log('Lo lograste: '+response);
       //      },
       //      error: function(msg){
       //          console.log(msg);
       //      }
      	// });
    });
}

function createAvtr(first, last){
	var bg = Math.floor((Math.random() * 9) + 1);
	console.log('este es el background elegido' + bg);
	switch(true){
		case bg >= 1:
			color = 'azul';
			img_f = 'bco';
			font = '#ffffff';
			break;
		case bg >= 4:
			color = 'negro';
			img_f = 'bco';
			font = '#ffffff';
			break;
		case bg >= 7:
			color = 'blanco';
			img_f = 'azul';
			font = '#1d1645';
			break;
		default:
			color = 'blanco';
			img_f = 'azul';
			font = '#1d1645';
	}
	console.log('estoy jalando el fondo del avatar');
	$('#avatar').css('background-image', 'url("/avatar/images/bg-'+ color +'.jpg")');
	// $('#avatar').css('background-color', '#acacac');
	$('#first').prepend(first);
	$('#first').css('color',color);
	lastName(last);
	$('#year').prepend('2018');
	console.log('esto es el alto de linea de first' + line_h);
	console.log('esto es el alto de linea de year' + line_h_y);

	$('.correct').append('<div class="button" onclick="inputs(); return false;">Corregir nombre</button>');
	$('.correct').append('<div class="button" onclick="createImg(); return false;">Publicar</button>');
	// createImg();
};

function lastName(last){
	letters = last.length; 
	console.log(letters); 
	media = Math.floor(letters/2);
	console.log(media); 

	ln_size(letters);

	chars_lastname = last.split('');
	console.log(chars_lastname); 

	var fl = chars_lastname[0];
	console.log(0);
	console.log(fl);

	if(/\s/.test(fl)){
		$('#last_c').append('<span class="normal_letter" style="width:' + space + ';"></span>');
	}else{
		first_letter(fl);
	}

	console.log('quiero poner las letras que faltan con mi nueva función bonita');
	get_nl(1, media);

	// for (i = 1; i < (letters/2); i++) { 
	//     nl = chars_lastname[i].toLowerCase();
	//     console.log(nl);
	//     normal_letter(nl);
	// }

	if (letters>=3){
		console.log('el apellido tiene 3 o más caracteres');
		ml = chars_lastname[media];
		console.log(media);
		console.log(ml);
		if(/\s/.test(ml)){
			$('#last_c').append('<span class="normal_letter" style="width:' + space + ';"></span>');
		}else{
			medium_letter(ml);
		}
	}

	
	console.log('quiero poner las letras que faltan con mi nueva función bonita, otra vez');
	get_nl(media+1, letters-1);

	// for (i = (letters/2)+1; i < letters-1; i++) { 
	//     nl = chars_lastname[i].toLowerCase();
	//     console.log(nl);
	//     normal_letter(nl);
	// }
	if (letters>=2){
		ll = chars_lastname[letters-1];
		console.log(letters-1);
		console.log(ll);
		if(/\s/.test(ll)){
			$('#last_c').append('<span class="normal_letter" style="width:' + space + ';"></span>');
		}else{
			last_letter(ll);
		}
	}

	letterSpacing(letters);
	if(simbolos.test(last)){
		console.log(last);
		console.log('hay acento en este apellido');
		if(img_acento){
			line_h = margin_img_a;
		}else{
			line_h = margin_nl_a;
		}
	}
	margins(line_h, line_h_y);
}

function ln_size(letters){
	console.log('estas son las letras que tiene el apellido' + letters);
	switch (true) {
		case letters <= 3:
			console.log('tengo 3 letras o menos');
			height = '150';
			line_h = '15px';
			line_h_y = '18px';
			height_a = '198';
			margin_img_a = '-9px';
			space = '67px';
			break;
		case letters == 4:
		case letters == 5:
			console.log('tengo 4 o 5 letras');
			height = '130';
			f_size = '184';
			line_h = '-14px';
			line_h_y = '-8px';
			height_a = '172';
			margin_img_a = '-9px';
			margin_nl_a = '4px';
			space = '59px';
			break; 
		case letters == 6:
			console.log('tengo 6 letras');
			height = '112';
			f_size = '157';
			line_h = '-10px'
			line_h_y = '-4px';
			height_a = '147';
			margin_img_a = '-9px';
			margin_nl_a = '2px';
			space = '50px';
			break;
		case letters == 7:
			console.log('tengo 7 letras');
			height = '94';
			f_size = '132';
			line_h = '-5px';
			line_h_y = '0px';
			height_a = '124';
			margin_img_a = '-9px';
			margin_nl_a = '1px';
			space = '48px';
			break;
		case letters == 8:
			console.log('tengo 8 letras');
			height = '84';
			f_size = '119';
			line_h = '-2px';
			line_h_y = '1px';
			height_a = '111';
			margin_img_a = '-9px';
			margin_nl_a = '0';
			space = '41px';
			break;
		case letters == 9:
			console.log('tengo 9 letras');
			height = '73';
			f_size = '103';
			line_h = '0';
			line_h_y = '3px';
			height_a = '97';
			margin_img_a = '-8px';
			margin_nl_a = '-1px';
			space = '37px';
			break;
		case letters == 10:
			console.log('tengo 10 letras');
			height = '67';
			f_size = '94';
			line_h = '5px'
			line_h_y = '4px';
			height_a = '88';
			margin_img_a = '-6px';
			margin_nl_a = '1px';
			space = '34px';
			break;
		case letters == 11:
			console.log('tengo 11 letras');
			height = '59';
			f_size = '83';
			line_h = '3px';
			line_h_y = '6px';
			height_a = '78';
			margin_img_a = '-4px';
			margin_nl_a = '3px';
			space = '30px';
			break;
		case letters > 11:
			console.log('tengo 12 letras o más');
			height = '56';
			f_size = '79';
			line_h = '5px'; 
			line_h_y = '6px';
			height_a = '74';
			margin_img_a = '-3px';
			margin_nl_a = '3px';
			space = '29px';
			break;
		default:
			console.log('estoy usando el default');
			height = '56';
			f_size = '78';
			line_h = '5px'
			line_h_y = '6px';
			height_a = '74';
			margin_img_a = '0px';
			margin_nl_a = '9px';
			space = '29px';
	}
}

function get_nl(since, until){
	for (i = since; i < until; i++) { 
	    nl = chars_lastname[i];
	    console.log(i);
	    console.log(nl);
	    if(/\s/.test(nl)){
			$('#last_c').append('<span class="normal_letter" style="width:' + space + ';"></span>');
		}else{
	    	normal_letter(nl);
	    }
	}
}

function first_letter(first_l){
	console.log('voy a poner la primer letra en azul');
	if(acentos.test(first_l)){
		console.log('esta letra tiene un acento y lo quiero quitar de forma bonita');
		first_l = accentsTidy(first_l);
		first_l = first_l + '_acento';
		console.log(first_l);
		$('#last_c').prepend('<img class="first_letter" height="' + height_a + '" src="/avatar/font/' + img_f + '/az/' + first_l + '.png">');
		img_acento = true;
	}else{
		console.log('esta letra no tiene un acento');
		$('#last_c').prepend('<img class="first_letter" height="' + height + '" src="/avatar/font/' + img_f + '/az/' + first_l + '.png">');
	}	
}

function normal_letter(letter){
	$('#last_c').append('<span class="normal_letter" style="font-size:' + f_size + 'px; color:' + font + ';">' + letter + '</span>');
}

function medium_letter(medium_l){
	console.log('voy a poner la letra de en medio en amarillo');
	if(acentos.test(medium_l)){
		console.log('esta letra tiene un acento y lo quiero quitar de forma bonita');
		medium_l = accentsTidy(medium_l);
		medium_l = medium_l + '_acento';
		console.log(medium_l);
		$('#last_c').append('<img class="medium_letter" height="' + height_a + '" src="/avatar/font/' + img_f + '/am/' + medium_l + '.png">');
		img_acento = true;
	}else{
		console.log('esta letra no tiene un acento');
		$('#last_c').append('<img class="medium_letter" height="' + height + '" src="/avatar/font/' + img_f + '/am/' + medium_l + '.png">');
	}
	
}

function last_letter(last_l){
	console.log('voy a poner la última letra en naranja');
	if(acentos.test(last_l)){
		console.log('esta letra tiene un acento y lo quiero quitar de forma bonita');
		last_l = accentsTidy(last_l);
		last_l = last_l + '_acento';
		console.log(last_l);
		$('#last_c').append('<img class="last_letter" height="' + height_a + '" src="/avatar/font/' + img_f + '/n/' + last_l + '.png">');
		img_acento = true;
	}else{
		console.log('esta letra no tiene un acento');
		$('#last_c').append('<img class="last_letter" height="' + height + '" src="/avatar/font/' + img_f + '/n/' + last_l + '.png">');
	}
}

/**
 * Remove diacritics (accents) from a string
 * @param {string} str The input string from which we will remove strings with diacritics
 * @returns {string}
 * @see http://goo.gl/zCBxkM
 */
accentsTidy = function(s){
    var r=s.toLowerCase();
    r = r.replace(new RegExp(/\s/g),"");
    r = r.replace(new RegExp(/[àáâãäå]/g),"a");
    r = r.replace(new RegExp(/æ/g),"ae");
    r = r.replace(new RegExp(/ç/g),"c");
    r = r.replace(new RegExp(/[èéêë]/g),"e");
    r = r.replace(new RegExp(/[ìíîï]/g),"i");
    r = r.replace(new RegExp(/ñ/g),"n");                
    r = r.replace(new RegExp(/[òóôõö]/g),"o");
    r = r.replace(new RegExp(/œ/g),"oe");
    r = r.replace(new RegExp(/[ùúûü]/g),"u");
    r = r.replace(new RegExp(/[ýÿ]/g),"y");
    r = r.replace(new RegExp(/\W/g),"");
    return r;
};


function letterSpacing(number){
	if(number == 2){
		console.log('quiero un interletrado de 2 letras');
		$('#last_c img:first-child').addClass('m_right');
		// $('#last_c img:nth-child(1)').addClass('m_right');
	}else if(number == 3){
		console.log('quiero un interletrado de 3 letras');
		$('#last_c img:first-child, #last_c img:nth-child(2)').addClass('m_right');
	}else if(number == 4){
		console.log('quiero un interletrado de 3 letras');
		$('#last_c img:nth-child(3)').addClass('m_right');
	}

}

function margins(first, year){
	console.log('quiero poner los márgenes');
	$('#first').css('margin-bottom', first);
	$('#year').css('margin-top', year);
}

function createImg(){
	console.log('Estas satisfecho con la foto');
	var avatar = document.getElementById('avatar');

	function filter (node) {
	    return (node.tagName !== 'i');
	}

	domtoimage.toSvg(document.getElementById('avatar'), {filter: filter})
	    .then(function (dataUrl) {
	        var svg = dataUrl.substring(dataUrl.indexOf('svg'));
	        console.log(svg);
	    });

	// domtoimage.toJpeg(avatar)
	//     .then(function (dataUrl) {
	//         var img = new Image();
	//         img.src = dataUrl;
	//         document.body.appendChild(img);
	//     })
	//     .catch(function (error) {
	//         console.error('oops, something went wrong!', error);
	//     });


	// html2canvas(document.querySelector('#avatar'), {logging: true}).then(canvas => {
	//     document.querySelector('#container-canvas').append(canvas);
	//     canvas.id = "imgexport";
	    // console.log(token);
		// PostImageToFacebook(token);
	// });   
		    
}

function inputs(){
	$('.correction').addClass('show');
	$('.correct .button').addClass('hide');
}

function newAvatar(){
	$('#avatar').remove();
	img_acento = false;
	var fname_input = $("input#fname_input").val();
	console.log(fname_input);
	first = fname_input.toLowerCase();
	var lname_input = $("input#lname_input").val();
	console.log(lname_input);
	last = lname_input.toLowerCase();
	$('#img-container').prepend('<div id="avatar"><div id="text"><div id="first"></div><div id="last_c"></div><div id="year"></div></div></div>');
	createAvtr(first, last);
}

// Script de avatar

function toDataUrl(url, callback) {
	  var xhr = new XMLHttpRequest();
	  xhr.responseType = 'blob';
	  xhr.onload = function() {
	    var reader = new FileReader();
	    reader.onloadend = function() {
	      callback(reader.result);
	    }
	    reader.readAsDataURL(xhr.response);
	  };
	  xhr.open('GET', url);
	  xhr.send();
	}

function PostImageToFacebook(authToken)
{
    var canvas = document.getElementById("imgexport");
    console.log(canvas);
    var imageData  = canvas.toDataURL("image/png");
    var linkpag = "http://www.migustoes.com.mx/";
    try {
        blob = dataURItoBlob(imageData);
    }
    catch(e) {
        console.log(e);
    }
    var fd = new FormData();
    fd.append("access_token",authToken);
    fd.append("source", blob);
    fd.append("place", "107808742592552");
    fd.append("link", linkpag);
    try {
        $.ajax({
            url:"https://graph.facebook.com/me/photos?access_token=" + authToken,
            type:"POST",
            data:fd,
            processData:false,
            contentType:false,
            cache:false,
            success:function(data){
                console.log("success " + data);
            },
            error:function(shr,status,data){
                console.log("error " + data + " Status " + shr.status);
            },
            complete:function(){
                alert("Tu foto ha sido publicada en Facebook");
            }
        });
    }
    catch(e) {
        console.log(e);
    }
}

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}

	

	


