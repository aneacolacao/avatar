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

var token, first, last, letters, media; //nombre, apellido, letras en apellido, la mitad redondeado abajo
var chars_lastname, height, f_size, line_h, line_h_y, nl, ml, ll; //array de apellido, altura de imagen, font size, margin de first, margin de year, letra normal, letra de en medio, última letra
var height_a, margin_img_a; //altura imagen c/acento, margin de first c/acento


var acentos = /^[\u00C0-\u00FF]+$/;
var l_acento = false;

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
      // first = response.first_name;
      // last = response.last_name;
      first = 'Maura Andrea Guadalupe'.toLowerCase();
      var lastName = 'Aramburuzávala'.toLowerCase();

      if (/\s/.test(lastName)) {
	    console.log('este apellido tiene un espacio');
	  	var last_n = lastName.split(' ');
	  	console.log(last_n);
      	last = last_n[0]; 
	  }else{
	  	last = lastName;
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
	console.log('estoy jalando el fondo del avatar');
	// $('#avatar').css('background-image', 'url("http://www.picoadworks.com/avatar/images/bg-avatar.jpg")');
	$('#avatar').css('background-color', '#acacac');
	$('#first').prepend(first);
	$('#last').prepend(last);
	lastName(last);
	$('#year').prepend('2018');
	console.log('esto es el lato de linea de first' + line_h);
	console.log('esto es el lato de linea de year' + line_h_y);
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

	first_letter(fl);

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
		medium_letter(ml);
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

		last_letter(ll);
	}

	letterSpacing(letters);
	if(accentsTidy(last)){
		line_h = margin_img_a;
	}
	margins(line_h, line_h_y);
}

function ln_size(letters){
	console.log('estas son las letras que tiene el apellido' + letters);
	switch (true) {
		case letters < 3:
			console.log('tengo 3 letras o menos');
			height = '150';
			line_h = '20px';
			line_h_y = '16px';
			height_a = '198';
			margin_img_a = '-10px';
			break;
		case letters == 4:
		case letters == 5:
			console.log('tengo 4 o 5 letras');
			height = '130';
			f_size = '184';
			line_h = '-9px';
			line_h_y = '-4px';
			height_a = '172';
			margin_img_a = '-10px';
			margin_nl_a = '4px';
			break; 
		case letters == 6:
			console.log('tengo 6 letras');
			height = '112';
			f_size = '157';
			line_h = '0px'
			line_h_y = '0px';
			height_a = '147';
			margin_img_a = '-10px';
			margin_nl_a = '2px';
			break;
		case letters == 7:
			console.log('tengo 7 letras');
			height = '94';
			f_size = '132';
			line_h = '0px';
			line_h_y = '4px';
			height_a = '124';
			margin_img_a = '-10px';
			margin_nl_a = '1px';
			break;
		case letters == 8:
			console.log('tengo 8 letras');
			height = '84';
			f_size = '117';
			line_h = '5px';
			line_h_y = '5px';
			height_a = '111';
			margin_img_a = '-8px';
			margin_nl_a = '0';
			break;
		case letters == 9:
			console.log('tengo 9 letras');
			height = '73';
			f_size = '103';
			line_h = '5px';
			line_h_y = '7px';
			height_a = '97';
			margin_img_a = '-4px';
			margin_nl_a = '4px';
			break;
		case letters == 10:
			console.log('tengo 10 letras');
			height = '67';
			f_size = '94';
			line_h = '10px'
			line_h_y = '10px';
			height_a = '88';
			margin_img_a = '0px';
			margin_nl_a = '5px';
			break;
		case letters == 11:
			console.log('tengo 11 letras');
			height = '59';
			f_size = '83';
			line_h = '10px';
			line_h_y = '10px';
			height_a = '78';
			margin_img_a = '0px';
			margin_nl_a = '8px';
			break;
		case letters > 11:
			console.log('tengo 12 letras o más');
			height = '56';
			f_size = '78';
			line_h = '10px'; 
			line_h_y = '10px';
			height_a = '74';
			margin_img_a = '0px';
			margin_nl_a = '9px';
			break;
		default:
			console.log('estoy usando el default');
			height = '56';
			f_size = '78';
			line_h = '10px'
			line_h_y = '10px';
			height_a = '74';
			margin_img_a = '0px';
			margin_nl_a = '9px';
	}
}

function get_nl(since, until){
	for (i = since; i < until; i++) { 
	    nl = chars_lastname[i];
	    console.log(i);
	    console.log(nl);
	    normal_letter(nl);
	}
}

function first_letter(first_l){
	console.log('voy a poner la primer letra en azul');
	if(acentos.test(first_l)){
		console.log('esta letra tiene un acento y lo quiero quitar de forma bonita');
		first_l = accentsTidy(first_l);
		first_l = first_l + '_acento';
		console.log(first_l);
		$('#last_c').prepend('<img class="first_letter" height="' + height_a + '" src="/avatar/font/az/' + first_l + '.png">');
	}else{
		console.log('esta letra no tiene un acento');
		$('#last_c').prepend('<img class="first_letter" height="' + height + '" src="/avatar/font/az/' + first_l + '.png">');
	}	
}

function normal_letter(letter){
	$('#last_c').append('<span class="normal_letter" style="font-size:' + f_size + 'px;">' + letter + '</span>');
}

function medium_letter(medium_l){
	console.log('voy a poner la letra de en medio en amarillo');
	if(acentos.test(medium_l)){
		console.log('esta letra tiene un acento y lo quiero quitar de forma bonita');
		medium_l = accentsTidy(medium_l);
		medium_l = medium_l + '_acento';
		console.log(medium_l);
		$('#last_c').append('<img class="medium_letter" height="' + height_a + '" src="/avatar/font/am/' + medium_l + '.png">');
	}else{
		console.log('esta letra no tiene un acento');
		$('#last_c').append('<img class="medium_letter" height="' + height + '" src="/avatar/font/am/' + medium_l + '.png">');
	}
	
}

function last_letter(last_l){
	console.log('voy a poner la última letra en naranja');
	if(acentos.test(last_l)){
		console.log('esta letra tiene un acento y lo quiero quitar de forma bonita');
		last_l = accentsTidy(last_l);
		last_l = last_l + '_acento';
		console.log(last_l);
		$('#last_c').append('<img class="last_letter" height="' + height_a + '" src="/avatar/font/n/' + last_l + '.png">');
	}else{
		console.log('esta letra no tiene un acento');
		$('#last_c').append('<img class="last_letter" height="' + height + '" src="/avatar/font/n/' + last_l + '.png">');
	}
}

function margins(first, year){
	console.log(first);
	console.log(year);
	console.log('quiero poner los márgenes');
	$('#first').css('margin-bottom', first);
	$('#year').css('margin-top', year);
}

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

// Script de avatar

//When click button of login facebook // CREO QUE NO ME FUNCIONA AQUÍ
// function fblogin() {    	    
// 	console.log('Quieres iniciar sesion');
// 	FB.login(function(response) {
// 	   statusChangeCallback(response);
// 	},
// 	{scope: 'public_profile,email,user_photos,publish_actions'}
// 	); 
// }

//When click button of Logout facebook   // CREO QUE NO ME FUNCIONA AQUÍ
// function fblogout() {
//     console.log('Quieres cerrar sesion'); 
//     FB.getLoginStatus(function(response) {
//         if (response && response.status === 'connected') {
//             FB.logout(function(response) {
//                 document.location.reload();
//             });
//         }
//     });
// }

//When click button to back // CREO QUE NO ME FUNCIONA AQUÍ
// function fbback(){
// 	console.log('Quiero regresar');
// 	if($('#fotos').css("display") == "block"){
// 		$('.fotos').remove();
// 		$('#fotos').hide();
// 		$('#fbback').hide();
// 		fbupload();
// 	}
// 	else if($('#imagen').css("display") == "block"){
// 		$('#foto_img').removeAttr("src");
// 		$('#imagen').hide();
// 		$('#handle').remove();
// 		$('#status').show();
// 		$('#fotos').show();
// 	}
// }






//Load albums of user // NO CREO
// function fbupload(){
// 	console.log('Abriste los albumes');
// 	FB.api(
// 	  '/me',
// 	  'GET',
// 	  {"fields":"albums{name,cover_photo,id}"},
// 	  function(response) {
// 	  	console.log('imprimir fotos');
// 		var alb = response.albums.data;
// 		alb.forEach(function(covers) {
// 		   var name = covers.name;
// 		   var id_alb = covers.id;
// 		   if(covers.cover_photo){
// 		   	   var id_cover = covers.cover_photo.id;
// 			   FB.api(
// 				  id_cover,
// 				  'GET',
// 				  {"fields":"images"},
// 				  function(response) {
// 				  	var array = response.images;
// 				  	var leng = array.length;
// 				  	var largo = -Math.abs(leng);
// 				  	var num = find_in_array(array, leng, largo, 180);
// 				  	var album_obj = array[num];
// 				  	show_photos(name, id_alb, 'c_album', 'albumes', album_obj);
// 				  }
// 			   );
// 			}   
// 		});	
// 	});
// }

//Click on album and get data(photos, id) // NO CREO
// function clic_album(cont){
//     cont.addEventListener("click", function(e) {
//     	var id_album = cont.getAttribute('id');
//     	var url_album = '/'+id_album;
//     	console.log(url_album);
//     	FB.api(
// 		  url_album,
// 		  'GET',
// 		  {"fields":"photos{images,id}"},
// 		  function(response) {
// 		  	var fotos_alb = response.photos.data;
// 			fotos_alb.forEach(function(datos) {
// 			   var array = datos.images;
// 			   var leng = array.length;
// 			   var largo = -Math.abs(leng);
// 			   var num = find_in_array(array, leng, largo, 180);
// 			   var objeto = array[num];
// 			   var id_alb = datos.id;
// 			   show_photos("Altar MGE", id_alb, 'c_foto', 'fotos', objeto);	
// 			});	
// 		  });
// 	$('#albumes').hide();
//     $('#fbback').show();
// }, false);
// }

//NO CREO 

// function show_photos(name, id_p, cont_id, col_id, objeto) {
// 	var contenedor = document.createElement('div');
//     contenedor.className += "col-md-2 col-sm-3 col-xs-12 "+col_id;
// 	var cont_img = document.createElement('div');
// 	cont_img.className = cont_id;
//     cont_img.setAttribute('id', id_p); 
//     var imagen = document.createElement('img');
//     imagen.src = objeto.source;
//     imagen.alt = name;
//     imagen.id = id_p;
//     cont_img.appendChild(imagen);
//     contenedor.appendChild(cont_img);
//     if(col_id == 'albumes'){
//     	var nombre = document.createTextNode(name);
// 	    var nombre_alb = document.createElement('p');    
// 	    nombre_alb.appendChild(nombre);
// 	    contenedor.appendChild(nombre_alb);
//     }
//     document.getElementById(col_id).appendChild(contenedor);
//     $('#'+col_id).show();
//     var alto_p = objeto.height;
//     var ancho_p = objeto.width;
//     resizear(imagen, alto_p, ancho_p);
//     if(col_id == 'albumes'){
//     	clic_album(cont_img);
//     }
//     else if(col_id == 'fotos'){
//     	click_photo(cont_img);
// 	}
// }

//NO CREO

// function click_photo(photo){
// 	photo.addEventListener("click", function(e) {
// 	   	console.log('estas eligiendo una foto');
// 	   	var id_photo = photo.getAttribute('id');
// 	   	var url_photo = '/'+id_photo;
// 	   	console.log(url_photo);
// 	   	FB.api(
// 		  url_photo,
// 		  'GET',
// 		  {"fields":"images"},
// 		  function(response) {
// 		  	console.log(response);
// 		  	var foto = response.images[0];
// 			console.log(foto);
// 			var foto_url = foto.source;
// 			var height = foto.height;
// 			var width = foto.width;
// 			console.log(height);

// 			toDataUrl(foto_url, function(base64Img) {
// 				var display_foto = document.getElementById('foto_img');
// 				display_foto.src = base64Img;
// 				var contenedor = document.getElementById('contenedor-imagen');
// 				contenedor.appendChild(display_foto);
// 			});

// 			var handle = document.createElement('div');
// 			handle.id = "handle";
// 			var cambiar = document.createTextNode('cambiar');
// 			handle.appendChild(cambiar);
// 			handle.className = "ui-resizable-handle ui-resizable-e"
// 			$('.contenedor-img').append(handle);
// 			console.log('aspect ratio');
// 			var maxWidth = 121; // Max width for the image
// 			var minHeight = 129;    // Max height for the image
// 			var ratio = 0;  // Used for aspect ratio
// 			var contheight = 0;
// 			var contwidth = 0;
// 	        // Check if the current width is larger than the max
// 	        if(width > maxWidth){
// 	            ratio = maxWidth / width;   // get ratio for scaling image
// 	            console.log(maxWidth);
// 	            console.log(ratio);
// 	            $('.contenedor-img').css({"width": maxWidth, "min-width": maxWidth}); // Set new width
// 	            $('.contenedor-img').css({"height": height * ratio, "min-height": height * ratio});  // Scale height based on ratio
// 	            contheight = height * ratio;    // Reset height to match scaled image
// 	            console.log(contheight);
// 	            contwidth = width * ratio;    // Reset width to match scaled image

// 		        if(contheight<minHeight){
// 		           	ratio = minHeight/contheight;
// 		           	console.log(ratio);
// 		           	$('.contenedor-img').css({"height": minHeight, "min-height": minHeight}); // Set new height
// 		           	$('.contenedor-img').css({"width": contwidth * ratio, "min-width": contwidth * ratio});  // Scale height based on ratio
// 		           	contheight = contheight * ratio;    // Reset height to match scaled image
// 		            console.log(contheight);
// 		            contwidth = contwidth * ratio;    // Reset width to match scaled image
// 		        }
// 		    }
		        
// 	        console.log(contwidth);
// 	        var pos_handle = contwidth-25;
// 	        console.log(pos_handle);
// 	        $('#handle').css("right", pos_handle);
// 			// Check if current height is larger than max
// 	        /*if(height > maxHeight){
// 	            ratio = maxHeight / height; // get ratio for scaling image
// 	            $(this).css("height", maxHeight);   // Set new height
// 	            $(this).css("width", width * ratio);    // Scale width based on ratio
// 	            width = width * ratio;    // Reset width to match scaled image
// 	            height = height * ratio;    // Reset height to match scaled image
// 	        }*/
// 			var posicion = $('#foto_img').position();
// 			console.log(posicion);
// 			$('.contenedor-img').resizable({handles: {'e': '#handle'},
// 					aspectRatio: true});
// 			$('#foto_img').draggable({
// 				  	drag: function( event, ui ) {
// 						// Keep the left edge of the element
// 						// at least 100 pixels from the container
// 						var foto_height = $('#foto_img').height();
// 					    var foto_width = $('#foto_img').width();
// 					    var side_l = -Math.abs(foto_width-maxWidth);
// 					    var side_t = -Math.abs(foto_height-minHeight);
// 					    if(ui.position.left<side_l){
// 					    	ui.position.left = side_l;
// 					    }
// 					    else{
// 					    	ui.position.left = Math.min( 0, ui.position.left);
// 					    }
// 					    if(ui.position.top<side_t){
// 					    	ui.position.top = side_t;
// 					    }
// 					    else{
// 					    	ui.position.top = Math.min( 0, ui.position.top );
// 						}   
// 					}
// 			});
				
			
// 		});
// 		$('#imagen').show();
// 		$('#fotos, #status').hide();
// 	}, false);
// }	  	



//Filer image > 180 of an array of images // NO CREO
// function find_in_array(arr, leng, largo, value) {
//     for (var i = leng-1; i>largo; i--) {
//         if (arr[i].width >= value && arr[i].height >= value){ 

//         	return i;
//         }
//     };
//     return false;
// }

// //Resize image to fill width and height of container
// function resizear(foto, alto_alb, ancho_alb){
//     if(ancho_alb > alto_alb){
// 	    $(foto).css({"height": "100%", "width": "auto"});
// 	}
// 	else if(alto_alb >= ancho_alb){
// 		$(foto).css({"width": "100%", "height": "auto"});
// 	}	

// }



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





function fbready(){
	console.log('Estas satisfecho con la foto');
	$('#fbready').hide();
	$('#fbback').hide();
	$('.contenedor-img #handle').hide();
	
	html2canvas($('#imagen'),{
		onrendered: function(canvas){
		    theCanvas = canvas;
		    document.body.appendChild(canvas);
		    canvas.id = "imageexport";
		    //$('canvas').show();
		    console.log('listo');
		    console.log(token);
		    PostImageToFacebook(token);
		    
		    
		}
	});
}

function PostImageToFacebook(authToken)
{
    var canvas = document.getElementById("imageexport");
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

	

	


