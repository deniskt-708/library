$(function () {
    // alert('Hello World');
    $(document).on("submit", "#user-signup", function (e) {
        e.preventDefault();
        let form = $(this);
        let username = form.find("#Username");
        let Firstname = form.find("#Firstname");
        let Lastname = form.find("#Lastname");
        let Email = form.find("#Email");
        let Password = form.find("#Password");
        let Error = form.find("#Error");

        if (username.val() !== "" && Firstname.val() !== "" && Lastname.val() !== "" && Email.val() !== "" && Password.val() !== "") {
            Error.addClass("hidden");
            $.post({
                url: "/",
                data: form.serialize(),
            }).then(function (data) {
                if (data.app_status) {
                    console.log(data.message);
                } else {
                    Error.removeClass("hidden").html(data.message);
                }
            });
        } else {
            Error.removeClass("hidden").html("All fields are required");
        }

        // alert("submitting...");
        // console.log(username.val());
        // return false;
    });
});