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

// Initial setup of typing game with upper keyboard hidden, first sentence and next letter displayed
$UpperKeyboard.hide();
$(`<p>${sentences[sentenceIndex]}</p>`).appendTo('#sentence');
$targetLetter.text(sentences[sentenceIndex].charAt(0));


//Adds event listener for keypress and keyup events that highlights corresponding keys for either events and advances the next key cursor and next letter prompt. Also shows the  lower keyboard and hides the upper keyboard if the shift key is pressed.   
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

// Adds event listener for keydown events that hides lower keyboard and shows upper keyboard if the shift key is pressed down. 
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

// Responds to user input to advances the next key cursor and next letter prompt,adds marks for accuracy, changes sentence once user reaches the end and resets cursor and next letter prompt
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
//Cycles through sentences on the display and resets sentences after reaching the ends of all sentences 
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

//Moves the next letter cursor and highlights characters upto the provided  current position  
function charHighlighter(currentPos) {

    $yHighlighter.width(`${currentPos}px`);
}

// // Returns the next letter and changes next letter displayed based upon character position within the sentence.
function targeChar(currentPos) {

    if (currentPos == (numOfChar - 1) * yLength) {

        if (sentenceIndex != sentences.length - 1) {
            $targetLetter.text('Press any key to contine to next line!');
        } else {
            wpm = typeSpeed(tStart);
            $targetLetter.text(`WPM is ${wpm}`);
            setTimeout(function () {
                $targetLetter.text('Press any key to play again!');
            }, 3500);
            wpm = 0;
        }


    } else if (currentPos == 0) {
        $targetLetter.text(sentences[sentenceIndex].charAt(currentPos / yLength));

    } else {
        $targetLetter.text(sentences[sentenceIndex].charAt((currentPos / yLength) + 1));
    }
    return $targetLetter.text();
}

//Places a check mark or an ex mark if the typed key matches or does not match the target key. It leaves an empty space unless the key typed is not a space.
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

// Calculates words per minute using formula numberOfWords / minutes -  numberOfMistakes *(2/numberOfWords)
function typeSpeed(start) {
    let end = timer();
    let numOfMisakes = $('#feedback span.feedback-ex').length;
    let minutes = (end - start) * (60000) ** -1;
    return ((numOfWords * minutes ** -1) - numOfMisakes *(2/numOfWords) ).toFixed(2);
  

}

// Returns current time stamp in milliseconds
function timer() {
    return performance.now();

}