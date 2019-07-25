var firebaseConfig = {
    apiKey: "AIzaSyCowwHcthI-LeWa4WcDWQlMn6gvmzvF9V4",
    authDomain: "raed-a06f8.firebaseapp.com",
    databaseURL: "https://raed-a06f8.firebaseio.com",
    projectId: "raed-a06f8",
    storageBucket: "raed-a06f8.appspot.com",
    messagingSenderId: "1069485403041",
    appId: "1:1069485403041:web:018291e2fafe4656"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



$(function () {
    var messagesRef = firebase.database().ref('raed');

    function submitForm(e) {
        e.preventDefault();
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();
        saveMessage(name,email,subject,message);

    }

    function saveMessage(name,email,subject,message) {
        var newMessageRef = messagesRef.push();
        newMessageRef.set({
            name: name,
            email: email,
            subject: subject,
            message: message
        });
    }

    $('#contact-form').submit(function (event) {
        submitForm(event);
        $(".status").append("<div class='alert alert-primary'>Message envoyée</div>")
    })
})
