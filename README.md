// for the google strategyss

//npm install passport passport-google-oauth20 --save

 <nav>
            <ul>
                <% if (user) { %>
                <li><a href="/auth/logout">Log out</a></li>
                <% } else { %>
                <li><a href="/auth/login">Login</a></li>
                <% } %>
                <li><a href="/">Homepage</a></li>
                
                <li><a href="/profile">Profile</a></li>
            </ul>
        </nav>
        
        
        Romain
        
        
        
        <script type="text/javascript">
/* Script is loaded when the page is */
window.addEventListener("load", gTracking, false);
function gTracking() {
	/* Check if page URL contains a part (contact here) */
	if(window.location.href.indexOf("contact") > -1) {
		// send a event if user click on a link that start with mailto:info@ident-clinic.be"
		jQuery( 'a[href^="mailto:info@ident-clinic.be"]').one( 'click', function() {
			ga('send', 'event', 'email', 'click', window.location.href );
		});
	}
}
</script>



<script type="text/javascript">
window.addEventListener("load", gTracking, false);
function gTracking() {
	if(window.location.href.indexOf("contact") > -1) {
	      // Create an interval that will reload the function each 1000ms
	  var checkExist = setInterval(function() {
			// Check if the DOM element (class/id) contains a specific text
	    if (jQuery('#response-container:contains("Message Sent Successfully")').length) {
				//If yes, send an event and spot the function
				ga('send', 'event', 'formulaire', 'envoyé');
	      clearInterval(checkExist);
	   } 
	  }, 1000);
	}
}
</script>

<script type="text/javascript">
window.addEventListener("load", gTracking, false);
function gTracking() {
	if(window.location.href.indexOf("contact") > -1) {
	  // Create a interval taht will reload the function each 1000ms
	  var checkExist = setInterval(function() {
			//Get the text of a specific DOM element
			var t1 = document.querySelector('#response-container').innerText;
			// Check if that contains a specific text
			if(t1.indexOf("Message Sent Successfully") > -1) {
				//If yes, send an event and spot the function
				ga('send', 'event', 'formulaire', 'envoyé');
	      clearInterval(checkExist);
	   } 
	  }, 1000);
	}
}
</script>



// Some example without jQuery
if(window.location.href.indexOf("contact") > -1) {  
  document.getElementById("contact").onsubmit = function() {goog_report_conversion();};
  document.getElementById("FORM_CONTACT").onsubmit = function() {goog_report_conversion();};
}  



<script type="text/javascript">
jQuery( document ).ready(function() {
	if(window.location.href.indexOf("boutique") > -1) {
		jQuery( '.addtocart-button' ).one( 'click', function() {
			var p_name = jQuery('.product-title').text();
			ga('send', 'event', 'Addtocart', 'click', p_name);
		});
	}  
});
</script>


<script type="text/javascript">
// Document ready (more or less the same that the listener on the pageload)
jQuery( document ).ready(function() {
	jQuery('.vc_custom_1481806766459 .buttonhome').click(function(){
		ga('send', 'event', 'buttonhome', 'click', jQuery(this).text());
	});
});
</script>


<script type="text/javascript">
window.onload=function() {
	// find the closest link (going up in the Dom Tree) to the containier titreck that contains the text Réservatoin
	jQuery('.titreck:contains("Réservation")').closest('a').one( 'click', function() {
		ga('send', 'event', 'Catégorie', 'Action', 'label');
	});
}
</script>



<script type="text/javascript">
/* Failsafe Ecommerce prestashop checkout */
{literal}
jQuery( document ).ready(function() {
	if(window.location.href.indexOf("commande") > -1) {
		var failsafeecomm = function(){
		  ga('send','event','ecommerce','checkout', {'nonInteraction': 1});
		};
		setTimeout(failsafeecomm, 500);
	}
});
{/literal}
</script>





<script>
	// Contact Form 7 listener (gtag)
document.addEventListener( 'wpcf7mailsent', function( event ) {
	gtag('event', 'clic', {
	  'event_category': 'demande de devis',
	  'event_label': window.location.href
	});
}, false );
</script>


<script>
document.addEventListener( 'wpcf7mailsent', function( event ) {
    ga('send', 'event', 'Offre spéciale', 'formulaire');
}, false );
</script>


function() {
	var t1 = document.querySelector('.download-form-stable span.small-text p').innerText;
	var n = t1.indexOf(' (');
	t1 = t1.substring(0, n != -1 ? n : s.length);
  console.log(t1);
	return t1
}



		var dimensionValue = {{Product id - Product Page}};
		ga('set', 'dimension5', dimensionValue);
		ga('send','event','dynRMK','all pages', {'nonInteraction': 1});


<script type="text/javascript">
window.addEventListener("load", gTracking, false);
function gTracking() {
	jQuery('.typeform-share.button').one( 'click', function() {
		ga('send', 'event', 'Devis typeform', 'clic', window.location.href );
	});
	if(window.location.href.indexOf("contact") > -1) {
		jQuery('.et_pb_contact_form').one( 'submit', function() {
			ga('send', 'event', 'Formulaire contact', 'clic', window.location.href );
		});
	} else {
		jQuery('.et_pb_contact_submit').one( 'click', function() {
			ga('send', 'event', 'Devis formulaire', 'clic', window.location.href );
		});
	}
}
</script>

<script>
document.addEventListener( 'wpcf7mailsent', function( event ) {
    _gaTracker('send', 'event', 'formulaire', 'contact');
}, false );
</script>

<script>
	{literal}
		var id_order = decodeURIComponent((new RegExp('[?|&]' + 'id_order' + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
		var revenue = jQuery('.price').text().match(/[\d,]+/gi)[0].replace(/,/g,".");
		ga('require', 'ec');
		ga('set', 'currencyCode', 'EUR'); // Set tracker currency to Euros.

		ga('ec:setAction', 'purchase', {
		'id': id_order,
		'revenue':revenue
		});
		ga('send', 'event', 'Ecommerce','Transaction' );
	{/literal}
</script>