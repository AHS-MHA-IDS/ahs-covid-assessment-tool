if(!document.referrer.endsWith("/Assessment.aspx") && window.location.hostname.indexOf("auth-myhealth") < 0) { 
	window.location.href = "Assessment.aspx";
}  

$.getScript("https://www.google.com/recaptcha/api.js?render=6LciTuIUAAAAANNabMKIgFps9ZRNDOfrF35Yt6Up");

$(document).ready(function () {

    var assessment = {
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        City: "",
        HealthCareNumber: "",
        FormCode: formCode,
        Recaptcha: "",
		Other: ""
    };
	
	var other = {};
	
    // Start Submit and Validate 
    var submitted = false;

    function submitAssessment() {
        if (submitted) {
            return;
        }

        submitted = true;

        grecaptcha.execute('6LciTuIUAAAAANNabMKIgFps9ZRNDOfrF35Yt6Up', { action: 'covid19form' }).then(function (token) {
			assessment.FormCode = formCode;
            assessment.Recaptcha = token;
			
			$('#contactForm input[data-field]').each(function(){
				var field = $(this).attr('data-field');
				if(field.toLowerCase().startsWith("other."))
				{
					field = field.slice(field.indexOf('.')+1);
					other[field] = $(this).val().trim();
				}
				else
				{
					assessment[field] = $(this).val().trim() || "N/A";
				}
			});
			
            assessment.Other = JSON.stringify(other);
			
            //console.log(assessment);

            $.ajax({
                type: "POST",
                data: JSON.stringify(assessment),
                url: "/COVIDServicePOST/api/assessment",
                contentType: "application/json",
                success: function (data) { successFunction(data); },
                error: function (data) { errorFunction(data); }
            });
        });
    };

    function successFunction(data) {
        //console.log(data);
        window.location = "Success.aspx";
    };

    function errorFunction(data) {
        //console.log(data);
        window.location = "Error.aspx";
    };
	
	$requiredInput = $('input[required]:visible, select[required]:visible');
	$requiredInput.on('keyup change', function(){
		$('#inputDOB').val($('#inputDOBMon').val() + ' ' + $('#inputDOBday').val() + ', ' + $('#inputDOByear').val());
		
		var valid = $requiredInput.filter(function () {
			return $.trim($(this).val()).length == 0
		}).length == 0;
		
		valid = valid && validateDate();
		
        $('#submitButton').prop("disabled", !valid);
	});

    $('#submitButton').on('click', submitAssessment);
	
	function validateDate() {
	  var month = +$("#inputDOBMon").prop('selectedIndex') - 1;
	  var day = +$('#inputDOBday').val();
	  var year = +$('#inputDOByear').val();
	  var date = new Date(year, month, day); // Use the proper constructor

	  return date.getFullYear() == year && date.getMonth() == month && date.getDate() == day;
	}
    // End Submit and Validate
});