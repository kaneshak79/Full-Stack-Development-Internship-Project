// $(document).ready(function () {

//     const token = localStorage.getItem("sessionToken");

//     if (!token) {
//         window.location.href = "login.html";
//         return;
//     }

//     loadProfile();


//     function loadProfile() {

//         $.ajax({
//             url: "php/profile.php",
//             type: "POST",
//             dataType: "json",

//             data: {
//                 action: "get",
//                 token: token
//             },

//             success: function (response) {

//                 if (response.success) {

//                     $("#name").val(response.user.name);
//                     $("#email").val(response.user.email);

//                     $("#age").val(response.profile.age || "");
//                     $("#dob").val(response.profile.dob || "");
//                     $("#contact").val(response.profile.contact || "");
//                     $("#gender").val(response.profile.gender || "");
//                     $("#address").val(response.profile.address || "");

//                 } else {

//                     localStorage.removeItem("sessionToken");

//                     $("#profileMessage").html(
//                         '<div class="alert alert-danger">' +
//                         response.message +
//                         '</div>'
//                     );

//                     setTimeout(function () {
//                         window.location.href = "login.html";
//                     }, 1500);
//                 }
//             },

//             error: function (xhr) {

//                 console.log("Profile Load Error:", xhr.responseText);

//                 $("#profileMessage").html(
//                     '<div class="alert alert-danger">' +
//                     'Unable to load profile.' +
//                     '</div>'
//                 );
//             }
//         });
//     }


//     $("#profileForm").on("submit", function (event) {

//         event.preventDefault();

//         $.ajax({
//             url: "php/profile.php",
//             type: "POST",
//             dataType: "json",

//             data: {
//                 action: "update",
//                 token: token,
//                 age: $("#age").val(),
//                 dob: $("#dob").val(),
//                 contact: $("#contact").val().trim(),
//                 gender: $("#gender").val(),
//                 address: $("#address").val().trim()
//             },

//             success: function (response) {

//                 if (response.success) {

//                     $("#profileMessage").html(
//                         '<div class="alert alert-success">' +
//                         response.message +
//                         '</div>'
//                     );

//                 } else {

//                     $("#profileMessage").html(
//                         '<div class="alert alert-danger">' +
//                         response.message +
//                         '</div>'
//                     );
//                 }
//             },

//             error: function (xhr) {

//                 console.log("Profile Update Error:", xhr.responseText);

//                 $("#profileMessage").html(
//                     '<div class="alert alert-danger">' +
//                     'Unable to update profile.' +
//                     '</div>'
//                 );
//             }
//         });
//     });


//     $("#logoutBtn").on("click", function () {

//         $.ajax({
//             url: "php/profile.php",
//             type: "POST",
//             dataType: "json",

//             data: {
//                 action: "logout",
//                 token: token
//             },

//             success: function () {

//                 localStorage.removeItem("sessionToken");

//                 window.location.href = "login.html";
//             },

//             error: function () {

//                 localStorage.removeItem("sessionToken");

//                 window.location.href = "login.html";
//             }
//         });
//     });

// });





// new ui updated




$(document).ready(function () {

    const token = localStorage.getItem("sessionToken");


    if (!token) {

        window.location.href = "login.html";

        return;
    }


    loadProfile();



    // =========================================
    // LOAD PROFILE
    // =========================================

    function loadProfile() {

        $.ajax({

            url: "php/profile.php",

            type: "POST",

            dataType: "json",

            data: {

                action: "get",

                token: token

            },


            success: function (response) {


                if (response.success) {


                    // =================================
                    // MYSQL USER DETAILS
                    // =================================

                    const name = response.user.name;

                    const email = response.user.email;


                    $("#sidebarUserName").text(name);

                    $("#sidebarUserEmail").text(email);


                    $("#profileHeaderName").text(name);

                    $("#profileHeaderEmail").text(email);


                    $("#viewName").text(name);

                    $("#viewEmail").text(email);


                    // First letter for avatar

                    if (name && name.length > 0) {

                        $("#profileAvatarLetter").text(
                            name.charAt(0).toUpperCase()
                        );

                    } else {

                        $("#profileAvatarLetter").text("U");

                    }



                    // =================================
                    // MONGODB PROFILE DETAILS
                    // =================================

                    const profile = response.profile;


                    const age =
                        profile.age !== undefined &&
                        profile.age !== null &&
                        profile.age !== ""
                            ? profile.age
                            : "";


                    const dob =
                        profile.dob !== undefined &&
                        profile.dob !== null &&
                        profile.dob !== ""
                            ? profile.dob
                            : "";


                    const contact =
                        profile.contact !== undefined &&
                        profile.contact !== null &&
                        profile.contact !== ""
                            ? profile.contact
                            : "";


                    const gender =
                        profile.gender !== undefined &&
                        profile.gender !== null &&
                        profile.gender !== ""
                            ? profile.gender
                            : "";


                    const address =
                        profile.address !== undefined &&
                        profile.address !== null &&
                        profile.address !== ""
                            ? profile.address
                            : "";



                    // =================================
                    // VIEW MODE
                    // =================================

                    $("#viewAge").text(
                        age !== ""
                            ? age
                            : "Not provided"
                    );


                    $("#viewDob").text(
                        dob !== ""
                            ? dob
                            : "Not provided"
                    );


                    $("#viewContact").text(
                        contact !== ""
                            ? contact
                            : "Not provided"
                    );


                    $("#viewGender").text(
                        gender !== ""
                            ? gender
                            : "Not provided"
                    );


                    $("#viewAddress").text(
                        address !== ""
                            ? address
                            : "Not provided"
                    );



                    // =================================
                    // EDIT MODE VALUES
                    // =================================

                    $("#age").val(age);

                    $("#dob").val(dob);

                    $("#contact").val(contact);

                    $("#gender").val(gender);

                    $("#address").val(address);


                } else {


                    localStorage.removeItem("sessionToken");


                    $("#profileMessage").html(

                        '<div class="alert alert-danger">' +

                        response.message +

                        '</div>'

                    );


                    setTimeout(function () {

                        window.location.href = "login.html";

                    }, 1500);

                }

            },


            error: function (xhr) {


                console.log(
                    "Profile Load Error:",
                    xhr.responseText
                );


                $("#profileMessage").html(

                    '<div class="alert alert-danger">' +

                    'Unable to load profile.' +

                    '</div>'

                );

            }

        });

    }



    // =========================================
    // OPEN EDIT MODE
    // =========================================

    $("#editProfileBtn").on("click", function () {

        $("#profileView").hide();

        $("#profileEdit").show();

        $("#profileMessage").html("");

    });



    // =========================================
    // CANCEL EDIT
    // =========================================

    $("#cancelEditBtn").on("click", function () {

        $("#profileEdit").hide();

        $("#profileView").show();

        $("#profileMessage").html("");

        loadProfile();

    });



    // =========================================
    // UPDATE PROFILE
    // =========================================

    $("#profileForm").on("submit", function (event) {

        event.preventDefault();


        $.ajax({

            url: "php/profile.php",

            type: "POST",

            dataType: "json",

            data: {

                action: "update",

                token: token,

                age: $("#age").val(),

                dob: $("#dob").val(),

                contact: $("#contact").val().trim(),

                gender: $("#gender").val(),

                address: $("#address").val().trim()

            },


            success: function (response) {


                if (response.success) {


                    // Return to view mode

                    $("#profileEdit").hide();

                    $("#profileView").show();


                    // Reload MongoDB data

                    loadProfile();


                    // Temporary notification

                    $("#profileMessage").html(

                        '<div class="alert alert-success">' +

                        'Profile updated successfully.' +

                        '</div>'

                    );


                    setTimeout(function () {

                        $("#profileMessage").html("");

                    }, 2500);


                } else {


                    $("#profileMessage").html(

                        '<div class="alert alert-danger">' +

                        response.message +

                        '</div>'

                    );

                }

            },


            error: function (xhr) {


                console.log(
                    "Profile Update Error:",
                    xhr.responseText
                );


                $("#profileMessage").html(

                    '<div class="alert alert-danger">' +

                    'Unable to update profile.' +

                    '</div>'

                );

            }

        });

    });



    // =========================================
    // LOGOUT
    // =========================================

    $("#logoutBtn").on("click", function () {


        $.ajax({

            url: "php/profile.php",

            type: "POST",

            dataType: "json",

            data: {

                action: "logout",

                token: token

            },


            success: function () {

                localStorage.removeItem("sessionToken");

                window.location.href = "login.html";

            },


            error: function () {

                localStorage.removeItem("sessionToken");

                window.location.href = "login.html";

            }

        });

    });

});