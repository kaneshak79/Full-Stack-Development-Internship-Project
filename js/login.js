// $(document).ready(function () {

//     $("#loginForm").on("submit", function (event) {

//         event.preventDefault();

//         const email = $("#email").val().trim();
//         const password = $("#password").val();

//         $("#loginMessage").html("");

//         $.ajax({
//             url: "php/login.php",
//             type: "POST",
//             dataType: "json",

//             data: {
//                 email: email,
//                 password: password
//             },

//             success: function (response) {

//                 if (response.success) {

//                     localStorage.setItem("sessionToken", response.token);

//                     window.location.href = "profile.html";

//                 } else {

//                     $("#loginMessage").html(
//                         '<div class="alert alert-danger">' +
//                         response.message +
//                         '</div>'
//                     );
//                 }
//             },

//             error: function (xhr) {

//                 console.log("AJAX Error:", xhr.responseText);

//                 $("#loginMessage").html(
//                     '<div class="alert alert-danger">' +
//                     'Something went wrong. Please try again.' +
//                     '</div>'
//                 );
//             }
//         });

//     });

// });





// $(document).ready(function () {

//     $("#loginForm").on("submit", function (event) {

//         event.preventDefault();

//         const email = $("#email").val().trim();
//         const password = $("#password").val();

//         $("#loginMessage").html("");

//         $.ajax({
//             url: "php/login.php",
//             type: "POST",
//             dataType: "json",

//             data: {
//                 email: email,
//                 password: password
//             },

//             success: function (response) {

//                 console.log("Server response:", response);

//                 if (response.success) {

//                     localStorage.setItem("sessionToken", response.token);

//                     window.location.href = "profile.html";

//                 } else {

//                     $("#loginMessage").html(
//                         '<div class="alert alert-danger">' +
//                         response.message +
//                         '</div>'
//                     );
//                 }
//             },

//             error: function (xhr, status, error) {

//                 console.log("HTTP Status:", xhr.status);
//                 console.log("Status:", status);
//                 console.log("Error:", error);
//                 console.log("Server Response:", xhr.responseText);

//                 $("#loginMessage").html(
//                     '<div class="alert alert-danger">' +
//                     'Server Error: ' +
//                     xhr.responseText +
//                     '</div>'
//                 );
//             }
//         });

//     });

// });




// $(document).ready(function () {

//     $("#loginForm").on("submit", function (event) {

//         event.preventDefault();

//         const email = $("#email").val().trim();
//         const password = $("#password").val();

//         $("#loginMessage").html("");

//         $.ajax({
//             url: "php/login.php",
//             type: "POST",
//             dataType: "json",

//             data: {
//                 email: email,
//                 password: password
//             },

//             success: function (response) {

//                 console.log("Server response:", response);

//                 if (response.success) {

//                     localStorage.setItem("sessionToken", response.token);

//                     window.location.href = "profile.html";

//                 } else {

//                     let message = response.message;

//                     if (response.errorType === "email") {
//                         message = "Email is incorrect.";
//                     }

//                     if (response.errorType === "password") {
//                         message = "Password is incorrect.";
//                     }

//                     $("#loginMessage").html(
//                         '<div class="alert alert-danger">' +
//                         message +
//                         '</div>'
//                     );
//                 }
//             },

//             error: function (xhr, status, error) {

//                 console.log("HTTP Status:", xhr.status);
//                 console.log("Status:", status);
//                 console.log("Error:", error);
//                 console.log("Server Response:", xhr.responseText);

//                 $("#loginMessage").html(
//                     '<div class="alert alert-danger">' +
//                     'Something went wrong. Please try again.' +
//                     '</div>'
//                 );
//             }
//         });

//     });

// });




$(document).ready(function () {

    $("#loginForm").on("submit", function (event) {

        event.preventDefault();

        const email = $("#email").val().trim();
        const password = $("#password").val();

        $.ajax({
            url: "php/login.php",
            type: "POST",
            dataType: "json",

            data: {
                email: email,
                password: password
            },

            success: function (response) {

                console.log("Server response:", response);

                if (response.success) {

                    localStorage.setItem("sessionToken", response.token);

                    window.location.href = "profile.html";

                } else {

                    let message = response.message;

                    if (response.errorType === "email") {
                        message = "Email is incorrect.";
                    }

                    if (response.errorType === "password") {
                        message = "Password is incorrect.";
                    }

                    $("#loginToastMessage").text(message);

                    const toast =
                        bootstrap.Toast.getOrCreateInstance(
                            document.getElementById("loginToast")
                        );

                    toast.show();
                }
            },

            error: function (xhr, status, error) {

                console.log("HTTP Status:", xhr.status);
                console.log("Status:", status);
                console.log("Error:", error);
                console.log("Server Response:", xhr.responseText);

                $("#loginToastMessage").text(
                    "Something went wrong. Please try again."
                );

                const toast =
                    bootstrap.Toast.getOrCreateInstance(
                        document.getElementById("loginToast")
                    );

                toast.show();
            }
        });

    });

});