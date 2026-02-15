//create the validation object 
var mclValidation = (function (id) {
    //check the key up of the text box
    $(document).on("keyup", "#" + id + " input[type='text'], #" + id + " textarea, #" + id + " input[type='password']", function (e) {
        e.preventDefault();

        //is this a required text box?
        if ($(this).hasClass("req")) {
            add_errors(this, get_data(this));
        }
    });

    //check the blur of the text box
    $(document).on("blur", "#" + id + " input[type='text'], #" + id + " textarea, #" + id + " input[type='password']", function (e) {
        e.preventDefault();

        //is this a required text box?
        if ($(this).hasClass("req")) {
            add_errors(this, get_data(this));
        }
    });


    //check the change event for the validation objects to see if they are valid after their values are changed 
    $(document).on("change", "#" + id + " input[type='text'], #" + id + " textarea, #" + id + " input[type='password']", function (e) {
        //is this a required text box?
        if ($(this).hasClass("req")) {
            add_errors(this, get_data(this));
        }
    });



    //private class variable to see if there are any errors
    var noErrors = true;

    //check for any errors on form submit 
    $(document).on("submit", "#" + id, function (e) {
        //method var to see if there were any errors 
        $("#" + id + " input[type='text'], #" + id + " textarea, #" + id + " input[type='password']").each(function (i, obj) {
            //is this a required text box?
            if ($(obj).hasClass("req")) {
                if (add_errors(obj, get_data(obj))) {
                    noErrors = false;
                }

                if ($(obj).hasClass("mclError2")) { //so that I can add an error to a form field that is unrelated to this validation class, but this class will consider it invalid
                    noErrors = false;
                }

                if ($(obj).val() == $(obj).attr("placeholder")) {
                    $(obj).addClass("mclError");
                    noErrors = false;
                }
            }
        });


        //were there any errors while checking the form ?
        if (noErrors == false) {
            noErrors = true;
            return false;
        }
    });



    //public property for ajax submissions
    this.submitErrors = (function () {
        var errors = true;

        //run the same thing as the submit fucntion, but make it an actual function 
        $("#" + id + " input[type='text'], #" + id + " textarea, #" + id + " input[type='password']").each(function (i, obj) {
            //is this a required text box?
            if ($(obj).hasClass("req")) {
                if (add_errors(obj, get_data(obj))) {
                    errors = false;
                }

                if ($(obj).hasClass("mclError2")) {
                    errors = false;
                }
            }
        });

        return errors;
    });


    //private function to add the error classes 
    function add_errors(obj, error) {
        if (!error) {
            $(obj).addClass("mclError");
            return true;
        } else {
            $(obj).removeClass("mclError");
            return false;
        }
    }


    //private function to determine which case to send to reg_check()
    function get_data(obj) {
        //obj is the HTML element that is being validated 
        //availabe classes so far are email, phone, text, and zip.. others can easily be added at a later date
        if ($(obj).hasClass("email")) {
            return reg_check($(obj).val(), "email");
        } else if ($(obj).hasClass("phone")) {
            return reg_check($(obj).val(), "phone");
        } else if ($(obj).hasClass("zip")) {
            return reg_check($(obj).val(), "zip");
        } else if ($(obj).hasClass("txt")) {
            return reg_check($(obj).val(), "text");
        } else if ($(obj).hasClass("date")) {
            return reg_check($(obj).val(), "date");
        } else if ($(obj).hasClass("number")) {
            return reg_check($(obj).val(), "number");
        } else if ($(obj).hasClass("wholeNumber")) {
            return reg_check($(obj).val(), "wholeNumber");
        } else if ($(obj).hasClass("creditCard")) {
            return reg_check($(obj).val(), "creditCard");
        }
    }


    //private function to check regex for the different items
    function reg_check(string, type) {
        switch (type) {
            case "email":
                var regEx = /\S+@\S+\.\S+/;
                return regEx.test(string);
                break;


            case "phone":
                var regEx = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
                return regEx.test(string);
                break;


            case "text":
                if (string.length > 0) { return true; } else { return false; }
                break;


            case "zip":
                var regEx = /^\d{5}(?:[-\s]\d{4})?$/;
                return regEx.test(string);
                break;


            case "date":
                var regEx = /^[0-9]{4}-(0[0-9]|1[0-2])-(0[0-9]|[0-2][0-9]|3[0-1])$/;
                return regEx.test(string);
                break;

            case "number":
                var regEx = /(?:^(-)?|\s)([0-9](?:\d*|(?:\d{0,2})(?:,\d{3})*)(?:\.\d*[0-9])?|0?\.\d*[0-9]|0)(?:\s|$)/;
                return regEx.test(string);
                break;

            case "wholeNumber":
                var regEx = /^\d+$/;
                return regEx.test(string);
                break;

            case "creditCard":
                return LuhnCheck(string);
                break;
                //TODO: add any other cases to this to test for other possibilities I didn't consider
        }

    };


    //valid credit card algorithm
    var LuhnCheck = (function () {
        var luhnArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
        return function (str) {
            var counter = 0;
            var incNum;
            var odd = false;
            var temp = String(str).replace(/[^\d]/g, "");
            if (temp.length == 0)
                return false;
            for (var i = temp.length - 1; i >= 0; --i) {
                incNum = parseInt(temp.charAt(i), 10);
                counter += (odd = !odd) ? incNum : luhnArr[incNum];
            }
            return (counter % 10 == 0);
        };
    })();


    //########################################################
    //Fake JS placeholder text
    this.clear_placeholder = (function () {
        $("#" + id + " input[type='text']").each(function (i, obj) {
            if ($(obj).val() == $(obj).attr("placeholder")) {
                if ($(obj).hasClass("req")) { } else {
                    $(obj).val("");
                }
            }
        });
    });

    //Fake placeholder js
    // var placeholder = null;
    $(document).on("focus", "input[type='text']", function () {
        if ($(this).attr("placeholder")) {
            if ($(this).val() == $(this).attr("placeholder")) {
                //placeholder = $(this).attr("placeholder");
                $(this).val("");
            }
        }
    });

    $(document).on("blur", "input[type='text']", function () {
        if ($(this).attr("placeholder")) {
            if ($(this).val() == "") {
                $(this).val($(this).attr("placeholder"));
            }
        }
    });
    //########################################################
});