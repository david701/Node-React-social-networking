import $ from 'jquery';
import validator from 'validator';

//validates overall form to toggle submit
const formValid = (event) => {
    //hacks for the date plugin
    let requiredValuesExist = true,
    //the horrible date plugin hack
    input = event._isAMomentObject || !('validation' in event.target.dataset) ? {name: "bday", value: $('#bday').val(), dataset: {validation: "date,required" }} : event.target,
    validations = input.dataset.validation.split(','),
    //doing more hacks for this damn date plugin
    form = (input.name === "bday") ? $('#bday').closest('form') : $(input).closest('form');

    //Validate the input field you're typing in. This gives us real time status.
    validate(event);

    //lastly check if there are values in required fields
    $(form).find('label span').closest('li').each(function(){
        requiredValuesExist = requiredValuesExist && $(this).find('input,select').val().length > 0;
    });

    //Check to see if any errors are showing.
    let formErrors = $(form).find('.field-error').length > 0;

    //is the current input invalid or any other errors showing?
    if(formErrors || !requiredValuesExist){
        $(form).find('input[type="submit"]').attr('disabled','disabled');
    }else{
        $(form).find('input[type="submit"]').attr('disabled',null);
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
    let input = event._isAMomentObject || !('validation' in event.target.dataset) ? {name: "bday", value: $('#bday').val(), dataset: {validation: "date,required" }} : event.target,
    validations = input.dataset.validation.split(','),
    all_valid = true;

    //run all validations on input field
    validations.map(function(validation,index){
        //only validate if there is a value or required
        if(input.value.length || validation === "required"){
            all_valid = all_valid && isValid(validation,input)
        }
    });

    //if its valid, toggle error
    if(all_valid){
        $(input).closest('li').removeClass('field-error');
        $(input).closest('li').find('.help-text').hide();
    }else{
        $(input).closest('li').addClass('field-error');
        $(input).closest('li').find('.help-text').show();
    }
}

export { validate, formValid };
