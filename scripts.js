(function () {

    let $UpperKeyboard = $('#keyboard-upper-container');
    let $LowerKeyboard = $('#keyboard-lower-container');

    $UpperKeyboard.hide();


    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let sentenceIndex = 0;
    let numOfWords = sentences[sentenceIndex].split(" ").lenght;
    let numOfChar = sentences[sentenceIndex].length;


    $(`<p>${sentences[0]}</p>`).appendTo('#sentence');



    let $yHighlighter = $('#yellow-block');
    let yLenght = 17;
    $yHighlighter
    $('#target-letter').text(sentences[sentenceIndex].charAt(0));



    $('body').on('keypress keyup', function (e) {
        if (e.key != 'Shift') {
            let UtfCode = e.key.codePointAt();
            $(`#${UtfCode}`).toggleClass('key-highlight');
            let currentPos = $yHighlighter.width();
            if (e.type != 'keyup') {
                //             console.log(currentPos);
                typeSentence(currentPos);



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


    function typeSentence(currentPos) {



        switch (currentPos) {
            case 0:
                charHighlighter(currentPos + yLenght);
                targeChar(currentPos + 1);
                break;
            case (numOfChar * yLenght):
                adjustSentence(sentenceIndex);
                charHighlighter(0);
                targeChar(0);

                break;
            default:
                charHighlighter(currentPos + yLenght);
                targeChar(currentPos);
                break;


        }



    }

    function adjustSentence(index) {

        if (index < sentences.length - 1) {
            index++;
            numOfWords = sentences[index].split(" ").lenght;
            numOfChar = sentences[index].length;
            $('p').remove();
            $(`<p>${sentences[index]}</p>`).appendTo('#sentence');
            sentenceIndex++;

        }
        else {
            index = 0;
            numOfWords = sentences[index].split(" ").lenght;
            numOfChar = sentences[index].length;
            $('p').remove();
            $(`<p>${sentences[index]}</p>`).appendTo('#sentence');
            sentenceIndex = 0;

        }


    }

    function charHighlighter(currentPos) {
        $yHighlighter.width(`${currentPos}px`);
    }


    function targeChar(currentPos) {
        if (currentPos == (numOfChar - 1) * yLenght) {
            $('#target-letter').text('Press any key to contine');
        } else if (currentPos == 0) {
            $('#target-letter').text(sentences[sentenceIndex].charAt(currentPos / yLenght));
        }

        else {
            $('#target-letter').text(sentences[sentenceIndex].charAt((currentPos / yLenght) + 1));
        }

    }






}());

