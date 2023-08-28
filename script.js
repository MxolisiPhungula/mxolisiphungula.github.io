function sendMail() {
    var params = {
        from_name : document.getElementById("fullName").value,
        email_Id : document.getElementById("email").value,
        message : document.getElementById("message").value
    }
    emailjs.send("service_ezewpqg", "template_lk54y9t", params).then(function (res) {
        alert("Success"+ res.status);
    })
}