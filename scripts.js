$(document).ready(function () {
    let $UpperKeyboard = $('#keyboard-upper-container');
    let $LowerKeyboard = $('#keyboard-lower-container');
   $UpperKeyboard.hide();


   $('body').on('keydown.Shift',function(e){
    if (e.defaultPrevented) {
    return;
    }
    $UpperKeyboard.show();
    $LowerKeyboard.hide()

    e.preventDefault();
});


$('body').on('keyup.Shift',function(){ 
    $UpperKeyboard.hide();
    $LowerKeyboard.show();

});

$('body').on('keypress keyup',function(e){
    let UtfCode= e.key.codePointAt();
    $(`#${UtfCode}`).toggleClass('highlight');
             
    
});



});