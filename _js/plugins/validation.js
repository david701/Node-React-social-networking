import $ from 'jquery';
import validator from 'validator';

const isValid = (validate,value) => {
    let valid = true;
    switch (validate) {
        case "email":
            valid = validator.isEmail(value);
            break;
        case "url":
            valid = validator.isURL(value);
            break;
        case "required":
            valid = value.length > 0;
            break;
    }
    return valid;
}

//validates one value at a time
const validate = (event) => {
    let input = event.target,
    validations = input.dataset.validation.split(','),
    all_valid = true;

    validations.map(function(validation,index){
        //only validate if there is a value or required
        if(input.value.length || validation === "required"){
            all_valid = all_valid && isValid(validation,input.value)
        }
    });

    if(all_valid){
        input.parentNode.classList.remove('field-error');
        $(input.parentNode).find('.help-text').hide();
    }else{
        input.parentNode.classList.add('field-error');
        $(input.parentNode).find('.help-text').show();
    }
}

export { validate };
