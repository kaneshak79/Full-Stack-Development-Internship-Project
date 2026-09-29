// $(document).ready(function () {

//     $("#registerForm").on("submit", function (event) {

//         event.preventDefault();

//         const name = $("#name").val().trim();
//         const email = $("#email").val().trim();
//         const password = $("#password").val();

//         $.ajax({
//             url: "php/register.php",
//             type: "POST",
//             data: {
//                 name: name,
//                 email: email,
//                 password: password
//             },

//             success: function (response) {

//                 if (response.success) {

//                     $("#registerMessage").html(
//                         '<div class="alert alert-success">' +
//                         response.message +
//                         '</div>'
//                     );

//                     $("#registerForm")[0].reset();

//                 } else {

//                     $("#registerMessage").html(
//                         '<div class="alert alert-danger">' +
//                         response.message +
//                         '</div>'
//                     );
//                 }
//             },

//             error: function () {

//                 $("#registerMessage").html(
//                     '<div class="alert alert-danger">' +
//                     'Something went wrong. Please try again.' +
//                     '</div>'
//                 );
//             }
//         });
//     });

// });






// $(document).ready(function () {

//     $("#registerForm").on("submit", function (event) {

//         event.preventDefault();

//         const name = $("#name").val().trim();
//         const email = $("#email").val().trim();
//         const password = $("#password").val();

//         $("#registerMessage").html("");

//         $.ajax({
//             url: "php/register.php",
//             type: "POST",
//             dataType: "json",
//             data: {
//                 name: name,
//                 email: email,
//                 password: password
//             },

//             success: function (response) {

//                 // if (response.success) {

//                 //     $("#registerMessage").html(
//                 //         '<div class="alert alert-success">' +
//                 //         response.message +
//                 //         '</div>'
//                 //     );

//                 //     $("#registerForm")[0].reset();

//                 // } 

//                if (response.success) {

//     window.location.href = "login.html";

// }

                
//                 else {

//                     $("#registerMessage").html(
//                         '<div class="alert alert-danger">' +
//                         response.message +
//                         '</div>'
//                     );
//                 }
//             },

//             error: function (xhr) {

//                 console.log("AJAX Error:", xhr.responseText);

//                 $("#registerMessage").html(
//                     '<div class="alert alert-danger">' +
//                     'Something went wrong. Please try again.' +
//                     '</div>'
//                 );
//             }
//         });

//     });

// });




$(document).ready(function () {

    $("#registerForm").on("submit", function (event) {

        event.preventDefault();

        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const password = $("#password").val();

        $("#registerMessage").html("");

        $.ajax({
            url: "php/register.php",
            type: "POST",
            dataType: "json",
            data: {
                name: name,
                email: email,
                password: password
            },

            // success: function (response) {


                success: function (response) {
    if (response.success) {
        window.location.href = "login.html";
    } else {
        $("#registerToastMessage").text(response.message);
        $("#registerToast").toast("show");
    // }
// }

                // if (response.success) {

                //     window.location.href = "login.html";

                // } else {

                //     $("#registerMessage").html(
                //         '<div class="alert alert-danger">' +
                //         response.message +
                        // '</div>'
                    // );
                }
            },

            error: function (xhr) {

                console.log("AJAX Error:", xhr.responseText);

                $("#registerMessage").html(
                    '<div class="alert alert-danger">' +
                    'Something went wrong. Please try again.' +
                    '</div>'
                );
            }
        });

    });

});



// $(document).ready(function () {

//     $("#registerForm").on("submit", function (event) {

//         event.preventDefault();

//         const name = $("#name").val().trim();
//         const email = $("#email").val().trim();
//         const password = $("#password").val();

//         $.ajax({

//             url: "php/register.php",
//             type: "POST",
//             dataType: "json",

//             data: {
//                 name: name,
//                 email: email,
//                 password: password
//             },

//             success: function (response) {

//                 console.log("Server response:", response);

//                 if (response.success) {

//                     window.location.href = "login.html";

//                 } else {

//                     $("#registerToastMessage").text(response.message);

//                     const toast =
//                         bootstrap.Toast.getOrCreateInstance(
//                             document.getElementById("registerToast")
//                         );

//                     toast.show();
//                 }
//             },

//             error: function (xhr, status, error) {

//                 console.log("HTTP Status:", xhr.status);
//                 console.log("Status:", status);
//                 console.log("Error:", error);
//                 console.log("Server Response:", xhr.responseText);

//                 $("#registerToastMessage").text(
//                     "Something went wrong. Please try again."
//                 );

//                 const toast =
//                     bootstrap.Toast.getOrCreateInstance(
//                         document.getElementById("registerToast")
//                     );

//                 toast.show();
//             }
//         });

//     });

// });




