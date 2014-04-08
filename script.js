function Game (n) {
    this.n_digits = n;
    this.maxtry = 10;
    
    this.newGame = function() {
        this.n_guesses = 0;

        this.answer = [];
        this.guesses =[];
        this.feedback = [];
        this.win = false;


        while (this.answer.length < this.n_digits) {
            rand = Math.floor(Math.random() * 10);  //random digits from 0-9 
            console.log(rand);
            console.log($.inArray(rand, this.answer));
            if ($.inArray(rand, this.answer) < 0) {
                this.answer.push(rand);
            }
        }
    };
 
    this.feedbackGame = function(guess) {
        var place_hits = 0;
        var digit_hits = 0;
        
        for (var i=0; i < this.answer.length; i++) {
            for (var j=0; j < guess.length; j++) {
                if (this.answer[i] === guess[j]) {
                    if (i===j) {
                        place_hits += 1; //both place and digit
                    }
                    else {
                        digit_hits += 1; //only digit but no place hit
                    }
                }
            }
        }
    this.feedback.push([place_hits, digit_hits]); 
    };

    this.validate = function(guess) {
        // length = n_digits and consists of only digits
        return (guess.length == this.n_digits && /^\d+$/.test(guess));

    };

    this.submitGuess = function(guess) {
        this.n_guesses += 1;
        this.guesses.push(guess);
        this.feedbackGame(guess);
   
        return this.feedback[this.n_guesses-1];
    };

    this.toArrayGuess = function(guess) {
        return guess.split('').map(function(item) {
            return parseInt(item, 10);
        });
    }
}

var currGame = new Game(4);

$(document).ready(function() {
    $('#newbutton').click(function() {        
        currGame.newGame();
        console.log(currGame.answer);

    });
    
    $('#submitbutton').click(function() {
        
        //got text from submit
        var guess = $("#guesstext").val();
        if (!currGame.validate(guess)) {
            alert("Go to hell!");
        }
        else {
            //make guess an array
            var lastfb = currGame.submitGuess(currGame.toArrayGuess(guess));
            
            //append last feedback
            $("#hist").append("Last guess: " + guess + "----" + lastfb[0] + " As " + " and " + lastfb[1] + " Bs correctly. <br/>");
            //get feedback
            //display something
            //..test if win already.
        }
    });
});


/*
$(document).ready(function() {
     var testArray = ["test1","test2","test3","test4"];
        var vPool="";
        jQuery.each(testArray, function(i, val) {
          vPool += val + "<br /> is the best <br />";
        });

       //We add vPool HTML content to #myDIV
       $('#myDIV').html(vPool);
        vPool=""; //clear vPool for next round in the loop 
});
*/



/*

var game_answer = new_game(4);
console.log(game_answer);
var guesses = 0;
var win = false;

while (guesses < 3) {
    var guess = prompt("Enter four digits from 0-9, separated by comma: \n");
    guess = guess.split(",").map(function(item) {
        return parseInt(item, 10);
    });

    console.log(guess);

    var feedback = get_feedback(game_answer, guess);

    if (feedback[0] === 4) {
        win = true;
        alert("Congratulations! You win!!!");
        break;
          
    }

    else {
        var str = "You got " + feedback[0] + " As and " + feedback[1] + " Bs correctly. ";
        alert(str);

        guesses += 1;
        
    }
}

if (!win) {
    var failstr = "Time's up! You failed!!! Loser is at Loserville......";
    alert(failstr);

}
*/













