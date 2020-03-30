$(document).ready(function(){
    
    //logging
    var assessment = {
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        City: '',
        HealthCareNumber: '',
        Q1: null,
        Q2: null,
        Q3: null,
        Q4: null,
        Q5: null,
        Q6: null,
        Q7: null,
        Q8: null,
        Q9: null
    };


/* ---------- Global Variables for Storing Answers ---------- */ 
    var prev = q1;
    var stack = [];


/* ---------- Question Pages ---------- */ 
    var q1 = $("#q1"),
    q2 = $("#q2"),
    q3 = $("#q3"),
    q4 = $("#q4"),
    q5 = $("#q5"),
    q6 = $("#q6"),
    q7 = $("#q7"),
    q8 = $("#q8"),
    q9 = $("#q9");

/* ---------- Recommendation Pages ---------- */ 
    var emergencyInfo = $("#emergencyInfo"),
    callNurse = $("#callNurse"),
    nResult15 = $("#nResult15"),
    nResult15a = $("#nResult15a"),
    nResult16 = $("#nResult16"),
    nResult16a = $("#nResult16a"),
    nResult17 = $("#nResult17"),
    nResult18 = $("#nResult18"),
    nResult18a = $("#nResult18a"),
    selfIsolate = $("#selfIsolate"),
    contactForm = $("#contactForm");

/* ---------- Arrays of Question/Rec pages ---------- */
    var qArray = [q1, q2, q3, q4, q5, q6, q7, q8, q9];
    var rArray = [
    emergencyInfo,
    callNurse,    
    nResult15,
    nResult15a,
    nResult16,
    nResult16a,
    nResult17,
    nResult18,
    nResult18a,
    selfIsolate,
    contactForm
    ];

/* ---------- BUTTON VARIABLES ---------- */
    var backBtn = $("#backBtn");
    var resetBtn = $("#resetBtn");

    // event handler for back and reset buttons 
    $("body").on("click", "#backBtn", function() {
    goBack();
    });

    $("body").on("click", "#resetBtn", function() {
    doReset();
    });

    // Form submit 
    $('#submitButton').on('click', function() {
    submitAssessment();
    });


/* ---------- FUNCTIONS ---------- */
    init();

    function init() {
    // reveal the first question/buttons
    reveal(q1);
    }

    function disable(x) {
    // hide the element on the page via fadeOut 
    x.fadeOut(200);
    }

    function reveal(x) {
    x.delay(300).fadeIn();
    }

    function goBack() {
    // hide all questions elements on the page 
    for (var i = 0; i < qArray.length; i++) {
    disable(qArray[i]);
    }
    // hide all answers elements on the page 
    for (var i = 0; i < rArray.length; i++) {
    disable(rArray[i]);
    }

    // state management for returning to specified questions in flow 
    reveal(stack.pop());
    }

    function doReset() {
    location.reload();
    }

/* ---------- QUESTION YES/NO BUTTON ACTIONS ---------- */
    /* q1 btns */
    $("#emergencyCheckYes").click(function() {
        assessment.Q1 = true;
        prev = q1;
        disable(q1);
        reveal(emergencyInfo);
        stack.push(q1);
    });
    $("#emergencyCheckNo").click(function() {
        assessment.Q1 = false;
        prev = q1;
        disable(q1);
        reveal(q2);
        stack.push(q1);
    });

    /* q2 btns  */
    $("#emergencyCheckTwoYes").click(function() {
        assessment.Q2 = true;
        prev = q1;
        disable(q2);
        reveal(callNurse);
        stack.push(q2);
    });
    $("#emergencyCheckTwoNo").click(function() {
        assessment.Q2 = false;
        prev = q2;
        disable(q2);
        reveal(q3);
        stack.push(q2);
    });

    /* q3 btns  */
    $("#testingRequiredYes").click(function() {
        assessment.Q3 = true;
        prev = q3;
        disable(q3);
        reveal(selfIsolate);
        stack.push(q3);
    });
    $("#testingRequiredNo").click(function() {
        assessment.Q3 = false;
        prev = q3;
        disable(q3);
        reveal(q8);
        stack.push(q3);
    });

    /* Intercept Self Isolation */
    $("#selfIsolateContinuation").click(function() {
        prev = selfIsolate;
        disable(selfIsolate);
        reveal(q4);
        //stack.push(selfIsolate); // Going back to Q3 and Prev state is Q3 not Self Isolation 
    });
    /* Intercept Self Isolation */

    /* q4 btns */
    $("#exposedYes").click(function() {
        assessment.Q4 = true;
        prev = q4;
        disable(q4);
        reveal(contactForm);
        stack.push(q4);
    });
    $("#exposedNo").click(function() {
        assessment.Q4 = false;
        prev = q4;
        disable(q4);
        reveal(q5);
        stack.push(q4);
    });

    /* q5 btns */
    $("#travelWithinCanadaYes").click(function() {
        assessment.Q5 = true;
        prev = q5;
        disable(q5);
        reveal(contactForm);
        stack.push(q5);
    });
    $("#travelWithinCanadaNo").click(function() {
        assessment.Q5 = false;
        prev = q5;
        disable(q5);
        reveal(q6);
        stack.push(q5);
    });

    /* q6 btns */
    $("#travelOutsideCanadaYes").click(function() {
        assessment.Q6 = true;
        prev = q6;
        disable(q6);
        reveal(q7);
        stack.push(q6);
    });
    $("#travelOutsideCanadaNo").click(function() {
        assessment.Q6 = false;
        prev = q6;
        disable(q6);
        reveal(nResult15);
        stack.push(q6);
    });

    /* q7 btns */
    $("#contactedPersonTravelledYes").click(function() {
        assessment.Q7 = true;
        prev = q6;
        disable(q7);
        reveal(contactForm);
        stack.push(q7);
    });
    $("#contactedPersonTravelledNo").click(function() {
        assessment.Q7 = false;
        prev = q7;
        disable(q7);
        reveal(nResult15a);
        stack.push(q7);
    });

    /* q8 btns */
    $("#travelCloseContactConfirmedYes").click(function() {
        assessment.Q8 = true;
        prev = q7;
        disable(q8);
        reveal(nResult16);
        stack.push(q8);
    });
    $("#travelCloseContactConfirmedNo").click(function() {
        assessment.Q8 = false;
        prev = q8;
        disable(q8);
        reveal(q9);
        stack.push(q8);
    });

    /* q9 btns */
    $("#generalReturnTravelYes").click(function() {
        assessment.Q9 = true;
        prev = q9;
        disable(q9);
        reveal(nResult16a);
        stack.push(q9);
    });
    $("#generalReturnTravelNo").click(function() {
        assessment.Q9 = false;
        prev = q9;
        disable(q9);
        reveal(nResult18);
        stack.push(q9);
    });

});