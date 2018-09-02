$(document).ready(function () {
    let $UpperKeyboard = $('#keyboard-upper-container');
    let $LowerKeyboard = $('#keyboard-lower-container');
    toggleVisibility($UpperKeyboard);








    function toggleVisibility($jObject) {
        $jObject.toggleClass('collapse');
    }




});