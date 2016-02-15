$(document).ready(function() {
	$("#contactNavbar").addClass("active");
	
	contextPath = getAjaxContextPath("/contact");
	
	var validator = $("#contactForm").validate({
		rules: {
			name: {
				required : true
			},
			email: {
				required : true
			},
			subject: {
				required : true
			},
			text: {
				required : true
			}, 
			recaptcha_challenge_field: {
				required : true
			}, 
			recaptcha_response_field: {
				required : true
			}
		},
		messages: {
			name: {
				required : "Please provide a name"
			},
			email: {
				required : "Please provide a valid email address"
			},
			subject: {
				required : "Subject is empty"
			},
			text: {
				required : "Text is empty"
			}, 
			recaptcha_response_field: {
				required : "Verification is empty"
			}, 
			recaptcha_challenge_field: {
				required : "Verification is empty"
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.next());
		},
		submitHandler: function() {
			var jsonData = {
				name : $("input#name").val(),
				email : $("input#email").val(),
				subject : $("input#subject").val(),
				text : $("textarea#text").val(),
				recaptcha_response_field : encodeURIComponent($("input#recaptcha_response_field").val()),
				recaptcha_challenge_field : encodeURIComponent($("input#recaptcha_challenge_field").val())
			};

			$.ajax({  
				type: "POST",  
				url: contextPath + "/contact",
				data: jsonData,
				dataType: "json",
				success: function(response,status,xhr) {
					var htmlResultText = "<div id=\"resultAlert\" class=\"alert alert-info\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" + response + "</div>"
					$('#mailResult').html(htmlResultText);		
					resetForm();
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert(thrownError);
				}
			});  
			return false; 
		},
		success: function(label) {
		}
	});
	cancelButtonHandler();
});

/**
 * Cancel button handler
 */
function cancelButtonHandler(){
	$("#cancelButton").click(function() {
		document.location.href = contextPath + '/contact';
	});	
}

function resetForm() {
	$("input#name").val($("input#name").attr("data-reset"));
	$("input#email").val($("input#email").attr("data-reset"));
	$("input#subject").val($("input#subject").attr("data-reset"));
	$("textarea#text").val($("textarea#text").attr("data-reset"));
	Recaptcha.reload();

	setTimeout(function(){$('#resultAlert').alert('close')}, 3000);
}