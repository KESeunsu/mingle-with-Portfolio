document.addEventListener('DOMContentLoaded',init);
let buttons=document.body.querySelectorAll('[rel="js-buttons"]');
let detail_terms=document.getElementById('agree-item detail');
let elCheckbox = document.body.querySelectorAll('[rel="js-register-agree-check"]')[0];
let elWarning = document.body.querySelectorAll('[rel="js-register-warning"]')[0];
let elCover = document.body.querySelectorAll('[rel="js-cover"]')[0];

let elBaseRegister=document.body.querySelectorAll(
    '[rel="js-form-register"]')[0];

/*window.onkeypress=(function(e){
    if(e.which == 27){
        elBaseRegister.classList.remove('shown-phase2');
        elCover.classList.remove('shown-phase2');
    }
});*/
//---------------------이용,개인,한계----------------------

buttons[0].addEventListener('click', function () {
    buttons[1].classList.remove('active');
    buttons[2].classList.remove('active');
    buttons[0].classList.add('active');

});
buttons[1].addEventListener('click', function () {
    buttons[2].classList.remove('active');
    buttons[0].classList.remove('active');
    buttons[1].classList.add('active');

    detail_terms.innerHTML='개인';
});
buttons[2].addEventListener('click', function () {
    buttons[1].classList.remove('active');
    buttons[0].classList.remove('active');
    buttons[2].classList.add('active');

    detail_terms.innerHTML='한계';
});

//-------------------------------------------
if(agree_item1<0 || agree_item2<0) {
    elCheckbox.addEventListener('click', function () {
        if (elWarning.classList.contains('shown')) {
            elWarning.classList.remove('shown');
        }
    })
}
function init(){
    document.body.querySelectorAll('[rel="js-register"]')[0].addEventListener('click',register);
    document.body.querySelectorAll('[rel="js-register-next"]')[0].addEventListener('click',Register.registerStepAgreement);

    let elCheckboxes=document.body.querySelectorAll('div.object-checkbox');

    for(let i=0; i<elCheckboxes.length; i++){
        elCheckboxes[i].addEventListener('click',function () {
            if(elCheckboxes[i].classList.contains('checked')){
                elCheckboxes[i].classList.remove('checked');}
            else{
                elCheckboxes[i].classList.add('checked');
            }
        })
    }
}
function register() {

    elCover.classList.add('shown-phase1');

    setTimeout(function () {
        elCover.classList.add('shown-phase2');
        elBaseRegister.classList.add('shown-phase2');

    },500);
}
class Register {
    static registerStepAgreement() {
        if (!elCheckbox.classList.contains('checked')) {
            elWarning.classList.add('shown');
        }
    }
}
