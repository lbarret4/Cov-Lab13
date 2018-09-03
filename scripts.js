let $UpperKeyboard = $('#keyboard-upper-container');
let $LowerKeyboard = $('#keyboard-lower-container');
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentenceIndex = 0;
let numOfWords = sentences[sentenceIndex].split(" ").length;
let numOfChar = sentences[sentenceIndex].length;
let target = sentences[sentenceIndex][0];
let markCode = ["10004", "10008"];
let wpm = 0;
let tStart = 0;
let $yHighlighter = $('#yellow-block');
let yLength = 17;
let $targetLetter = $('#target-letter');


$UpperKeyboard.hide();
$(`<p>${sentences[sentenceIndex]}</p>`).appendTo('#sentence');
$targetLetter.text(sentences[sentenceIndex].charAt(0));



$('body').on('keypress keyup', function (e) {
    if (e.key != 'Shift') {

        let UtfCode = e.key.codePointAt();
        let currentPos = $yHighlighter.width();
        $(`#${UtfCode}`).toggleClass('key-highlight');

        if (e.type != 'keyup') {

            typeSentence(e.key, currentPos);



        }


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


function typeSentence(char, currentPos) {

  

    switch (currentPos) {
        case 0:
            if (sentenceIndex == 0) {
                tStart=timer();
            }
            placeMark(char);
            charHighlighter(currentPos + yLength);
            target = targeChar(currentPos + 1);
            break;

        case (numOfChar * yLength):
            let $feedback = $('#feedback');
            $feedback.empty();
            adjustSentence(sentenceIndex);
            charHighlighter(0);
            target = targeChar(0);
            break;

        default:
            placeMark(char);
            charHighlighter(currentPos + yLength);
            target = targeChar(currentPos);
            break;


    }



}

function adjustSentence(index) {

    if (index < sentences.length - 1) {

        index++;
        numOfWords = sentences[index].split(" ").length;
        numOfChar = sentences[index].length;

        $('p').remove();
        $(`<p>${sentences[index]}</p>`).appendTo('#sentence');
        sentenceIndex++;

    }
    else {
        index = 0;
        sentenceIndex = 0;
        numOfWords = sentences[index].split(" ").length;
        numOfChar = sentences[index].length;

        $('p').remove();
        $(`<p>${sentences[index]}</p>`).appendTo('#sentence');





    }


}

function charHighlighter(currentPos) {

    $yHighlighter.width(`${currentPos}px`);
}


function targeChar(currentPos) {

    if (currentPos == (numOfChar - 1) * yLength) {

        if (sentenceIndex != sentences.length - 1) {
            $targetLetter.text('Press any key to contine !');
        } else {
            wpm = typeSpeed(tStart);
            $targetLetter.text(`WPM is ${wpm}`);
            setTimeout(function () {
                $targetLetter.text('Press any key to play again !');
            }, 5000);
            wpm = 0;
        }


    } else if (currentPos == 0) {
        $targetLetter.text(sentences[sentenceIndex].charAt(currentPos / yLength));

    } else {
        $targetLetter.text(sentences[sentenceIndex].charAt((currentPos / yLength) + 1));
    }
    return $targetLetter.text();
}

function placeMark(char) {

    let $feedback = $('#feedback');

    if (char == " ") {
        $(`<span class="invisible">&#${markCode[1]};</span>`).appendTo($feedback);

    } else if (target == char) {
        $feedback.append(`<span class='feedback-check'>&#${markCode[0]};</span>`);

    } else {
        $feedback.append(`<span class='feedback-ex'>&#${markCode[1]};</span>`);
    }


}


function typeSpeed(start) {
    let end = timer();
    let numOfMisakes = $('#feedback span.feedback-ex').length;
    let minutes = (end - start) * (60000) ** -1;
    return ((numOfWords * minutes ** -1) - numOfMisakes *(2/numOfWords) ).toFixed(2);
  

}

function timer() {
    return performance.now();

}