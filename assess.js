$(document).ready(function () {


    /* ---------- Global Variables for Storing Answers ---------- */
    var prev = q1;
    var stack = [];


    /* ---------- Question Pages ---------- */
    var q1 = $("#q1"),
        q2 = $("#q2"),
        q3 = $("#q3"),
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
        nResult19 = $("#nResult19"),
        contactForm = $("#contactForm");

    /* ---------- Arrays of Question/Rec pages ---------- */
    var qArray = [q1, q2, q3, q9];
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
        nResult19,
        contactForm
    ];

    /* ---------- BUTTON VARIABLES ---------- */
    var backBtn = $("#backBtn");
    var resetBtn = $("#resetBtn");

    // event handler for back and reset buttons 
    $("body").on("click", "#backBtn", function () {
        goBack();
    });

    $("body").on("click", "#resetBtn", function () {
        doReset();
    });

    // Form submit 
    $('.submitFollowupForm').on('click', function () {
        window.location.href = "Covid-assessment-follow-up.aspx";
    });

    $('.submitEssentialRolesForm').on('click', function () {
        window.location.href = "PESAssessForm.aspx";
    });

    /*$('.submitSixtyFivePlusForm').on('click', function () {
        window.location.href = "65plustesting.aspx";
    });*/

    $('.submitSixtyFivePlusForm').on('click', function () {
        window.location.href = "publicexptest.aspx";
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
    $("#emergencyCheckYes").click(function () {
        prev = q1;
        disable(q1);
        reveal(emergencyInfo);
        stack.push(q1);
    });
    $("#emergencyCheckNo").click(function () {
        prev = q1;
        disable(q1);
        reveal(q2);
        stack.push(q1);
    });

    /* q2 btns  */
    $("#emergencyCheckTwoYes").click(function () {
        prev = q1;
        disable(q2);
        reveal(callNurse);
        stack.push(q2);
    });
    $("#emergencyCheckTwoNo").click(function () {
        prev = q2;
        disable(q2);
        reveal(q3);
        stack.push(q2);
    });

    /* q2 btns  */
    $("#testingRequiredNo").click(function () {
        prev = q3;
        disable(q3);
        reveal(q9);
        stack.push(q3);
    });

    /* q9 btns */
    $("#generalReturnTravelYes").click(function () {
        prev = q9;
        disable(q9);
        reveal(nResult16a);
        stack.push(q9);
    });
    $("#generalReturnTravelNo").click(function () {
        prev = q9;
        disable(q9);
        reveal(nResult18);
        stack.push(q9);
    });

});