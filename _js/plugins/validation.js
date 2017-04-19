import $ from 'jquery';
import validator from 'validator';

const formValid = (input) => {
    let errors = false;
    let form = $(input).closest('form');

    $(form).find('label span').each(function(){
        let $this = $(this).closest('li');
        let input = $this.find('input,select');
        errors = errors || ($this.hasClass('field-error') || input.val() === "");
    })

    if(errors){
        $(form).find('input[type="submit"]').attr('disabled','disabled');
    }else{
        $(form).find('input[type="submit"]').removeAttr('disabled');
    }
}

const isValid = (validate,input) => {
    let valid = true,
    value = input.value;
    switch (validate) {
        case "name":
            valid = /^([^0-9]*)$/.test(value);
            break;
        case "email":
            valid = validator.isEmail(value);
            break;
        case "url":
            valid = validator.isURL(value,{protocols: ['http','https'],require_protocol: true});
            break;
        case "required":
            valid = !validator.isEmpty(value);
            break;
        case "password":
            valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/.test(value);
            break;
        case "confirmPassword":
            valid = validator.equals(value, input.dataset.password);
            break;
        case "date":
            valid = validator.isBefore(value);
            break;
    }
    return valid;
}

//validates one value at a time
const validate = (event) => {
    let input = event.target,
    validations = input.dataset.validation ? input.dataset.validation.split(',') : ["date","required"],
    all_valid = true;

    validations.map(function(validation,index){
        //only validate if there is a value or required
        if(input.value.length || validation === "required"){
            all_valid = all_valid && isValid(validation,input)
        }
    });

    if(all_valid){
        $(input).closest('li').removeClass('field-error');
        $(input).closest('li').find('.help-text').hide();
    }else{
        $(input).closest('li').addClass('field-error');
        $(input).closest('li').find('.help-text').show();
    }

    formValid(input)
}

export { validate };
