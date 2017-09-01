function generateWinningNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function shuffle(arr) {
    var m = arr.length;
    var i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t
    }
    return arr;

}

function Game() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();

}

Game.prototype.difference = function() {
    winningNumber = Math.abs(this.playersGuess - this.winningNumber);
    return winningNumber;
}

Game.prototype.isLower = function() {
    if (this.playersGuess < this.winningNumber) {
        return true;
    } else {
        return false;
    }
    // this.playersGuess < this.winningNumber ? true : false
}

Game.prototype.playersGuessSubmission = function(num) {
    this.playersGuess = num;
    return this.checkGuess(this.playersGuess);
}

Game.prototype.checkGuess = function() {
    //should I change to typeof?
    if (this.playersGuess < 1 || this.playersGuess > 100 || isNaN(this.playersGuess)) {
        $('#subtitle').removeClass();
        $('#subtitle').addClass('alert alert-danger center lead');
        $('#subtitle').text('Bro, dat ain\'t a number');
        throw "That is an invalid guess."
    } else if (this.playersGuess === this.winningNumber) {
        $('#subtitle').removeClass();
        $('#subtitle').addClass('alert alert-success center lead');
        $('#subtitle').text('You win!');
        return 'You Win!';
    } else if (this.playersGuess !== this.winningNumber && this.pastGuesses.indexOf(this.playersGuess) === -1) {
        this.pastGuesses.push(this.playersGuess);
    } else if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
        $('#subtitle').removeClass();
        $('#subtitle').addClass('alert alert-warning center lead');
        $('#subtitle').text('You have already guessed that number.');
        return 'You have already guessed that number.';
    }
    if (this.pastGuesses.length === 5 && this.playersGuess !== this.winningNumber) {
        $('#subtitle').removeClass();
        $('#subtitle').addClass('alert alert-dark center lead');
        $('#subtitle').text('Bro, you lost');
        return 'You Lose.';
    }
    if (Math.abs(this.playersGuess - this.winningNumber) < 10) {
        $('#subtitle').removeClass();
        $('#subtitle').addClass('alert alert-light center lead');
        $('#subtitle').text('More!');
        return 'You\'re burning up!';
    }
    if (Math.abs(this.playersGuess - this.winningNumber) < 25) {
        $('#subtitle').removeClass();
        $('#subtitle').addClass('alert alert-light center lead');
        $('#subtitle').text('Close!');
        return 'You\'re lukewarm.';
    }
    if (Math.abs(this.playersGuess - this.winningNumber) < 50) {
        $('#subtitle').removeClass();
        $('#subtitle').addClass('alert alert-light center lead');
        $('#subtitle').text('meh not too close');
        return 'You\'re a bit chilly.';
    }
    if (Math.abs(this.playersGuess - this.winningNumber) < 100) {
        $('#subtitle').removeClass();
        $('#subtitle').addClass('alert alert-light center lead');
        $('#subtitle').text('Nope.');
        return 'You\'re ice cold!';
    }
}

function newGame() {
    var game = new Game();
    return game;
}

Game.prototype.provideHint = function() {
    var hintArr = [];
    while (hintArr.length < 2) {
        hintArr.push(generateWinningNumber())
    }
    hintArr.push(this.winningNumber)
    return shuffle(hintArr);
}

var guessCount = 0;

function makeAGuess(game) {
    var guess = $('#player-input').val();
    // $("#guesses li").last().replaceWith('<li>' + guess + '</li>');
    // $('#guesses li').last().addClass('guess');
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess, 10));
    if(output !== this.winningNumber && $('.guess').val('-')){
          $('.guess').eq(guessCount).text(guess);
          guessCount++;
    }
}



$(document).ready(function() {
    var game = new Game();

    $('#submit').click(function(e) {
        makeAGuess(game);
        console.log(game.winningNumber);
    });

    $('#player-input').keypress(function(event) {
        if (event.which == 13) {
            makeAGuess(game);
        }
    });

    $('#hint').click(function() {
        var hints = game.provideHint();
        $('#subtitle').removeClass();
        $('#subtitle').addClass('alert alert-info center lead');
        $('#subtitle').text('The winning number is ' + hints[0] + ', ' + hints[1] + ', or ' + hints[2]);
    });
    $('#reset').click(function() {
        game = newGame();
        guessCount = 0;
        $('#title').text('..::Guessing Game::..');
        $('#subtitle').removeClass();
        $('#subtitle').addClass('lead center')
        $('#subtitle').text('Guess a number from 1-100!')
        $('.guess').text('-');
        $('#hint, #submit').prop("disabled", false);

    })
});