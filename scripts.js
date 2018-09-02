$(document).ready(function () {
    let $UpperKeyboard = $('#keyboard-upper-container');
    let $LowerKeyboard = $('#keyboard-lower-container');
    $UpperKeyboard.hide();


    $('body').on('keypress keyup', function (e) {
        if (e.key != 'Shift') {
            let UtfCode = e.key.codePointAt();
            $(`#${UtfCode}`).toggleClass('highlight');

        } else if (e.key == 'Shift' && e.type == 'keyup') {
            $UpperKeyboard.hide();
            $LowerKeyboard.show();
        }

    });
    $('body').on('keydown.Shift', function (e) {
        if (e.key == 'Shift' && e.type == 'keydown') {

            if (e.defaultPrevented) {
                return;
            }
            $UpperKeyboard.show();
            $LowerKeyboard.hide()

            e.preventDefault();
        }

    });



});