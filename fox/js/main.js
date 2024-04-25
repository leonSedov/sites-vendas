;
(function() {

    'use strict';

    var wowAnimation = function() {
        var wow = new WOW({
            animateClass: 'animated',
            offset: 150,
            callback: function(box) {
                console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
            }
        });
        wow.init();
    }


    var contactForm = function() {
        if ($('#fh5co_contact_form').length > 0) {
            $("#fh5co_contact_form").validate({
                rules: {
                    name: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true,
                        minlength: 5
                    }
                },
                messages: {
                    name: "Please enter your name",
                    email: "Please enter a valid email address",
                    message: "Please enter a message"
                },
                /* submit via ajax */
                submitHandler: function(form) {
                    var $submit = $('.submitting'),
                        waitText = 'Submitting...';

                    $.ajax({
                        type: "POST",
                        url: "php/sendEmail.php",
                        data: $(form).serialize(),

                        beforeSend: function() {
                            $submit.css('display', 'block').text(waitText);
                        },
                        success: function(msg) {
                            if (msg == 'OK') {
                                $('#form-message-warning').hide();
                                setTimeout(function() {
                                    $('#contactForm').fadeOut();
                                }, 1000);
                                setTimeout(function() {
                                    $('#form-message-success').fadeIn();
                                }, 1400);

                            } else {
                                $('#form-message-warning').html(msg);
                                $('#form-message-warning').fadeIn();
                                $submit.css('display', 'none');
                            }
                        },
                        error: function() {
                            $('#form-message-warning').html("Something went wrong. Please try again.");
                            $('#form-message-warning').fadeIn();
                            $submit.css('display', 'none');
                        }
                    });
                }

            });
        }
    };



    (function($) {
        wowAnimation();
        contactForm()
    })(jQuery);


}());