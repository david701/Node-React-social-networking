import $ from 'jquery';

let prop = 'night-mode';
let nightModeStatus = localStorage.getItem(prop);

//toggle night mode on click
const toggleNightMode = (event) => {
    nightModeStatus = localStorage.getItem(prop) === "true" ? false : true;
    localStorage.setItem(prop, nightModeStatus);

    if(nightModeStatus){
        $('body').attr('id',prop);
    }else{
        $('body').attr('id','');
    }
}

//enable or disable night mode on load
const activateNightMode = (event) => {
    if(nightModeStatus === null){
        localStorage.setItem(prop, false);
    }else{
        if(nightModeStatus === "true"){
            $('body').attr('id',prop);
        }
    }
}

const isNightMode = () => {
    return localStorage.getItem(prop) === "true";
}

export { activateNightMode, toggleNightMode, isNightMode };
