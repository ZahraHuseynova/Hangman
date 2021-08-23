let songGame = {
    
    
    artists: {
        nirvana:{
            picture:"nirvana.jpg",
            song:"Teen Spirit",
        },

        twoPac:{
            picture:"2pac.jpg",
            song:"changes",
        },

        radioHead: {
            picture:"radiohead.jpg",
            song:"Tear Drops",
        },

        korn:{
            picture:"korn.jpg",
            song:"The nothing",
        },

        oasis:{
            picture:"oasis.jpg",
            song:"wonderwall",
        },

        prince:{
            picture:"prince.jpg",
            song:"purple rain",
        }
        



    },


    wordInGame:null,
    letters:[],
    sameLetters:[],
    guessedLetters:[],
    left:0,
    total:0,
    forGuess:null,
    wins:0,

    setupGame: function(){
        let objKeys= Object.keys(this.artists);
        this.wordInGame = objKeys[Math.floor(Math.random() * objKeys.length)];

        this.letters=this.wordInGame.split('');
        this.rebuildWordView();
        this.processUpdateTotalGuesses();

    },

    updatePage: function (letter){
        if (this.left===0) {
            this.restartGame() ;
        }
        else {
            this.updateGuesses(letter);

            this.upsateSameLetters(letter);
            
            this.updateWordView(letter);

            if (this.updateWins()===true){
                this.restartGame();
            }


        }
    },


    updateGuesses:function(letter) {
        if ((this.guessedLetters.indexOf(letter)===-1)&& (this.letters.indexOf(letter)===-1)) {

            this.guessedLetters.push(letter);

            this.left--;

            document.querySelector("#guesses-remaining").innerHTML=this.left;
            document.querySelector("letters-guessed").innerHTML=this.guessedLetters.join(",");

        }

    },

    totalGuesses: function(){
        this.total=this.letters.length+5;
        this.left=this.total;
        document.querySelector("#guesses-remaining").innerHTML=this.left;
    },

    updateSameLatters: function(letter){
        for (let i=0; i<this.letters.length; i++) {
            if ((letter===this.letters[i])&& (this.sameLetters.indexOf(letter)===-1)){
                this.sameLetters.push(letter);
            }

        }
    },

    rebuildWordView: function() {
        let wordView= "",

        for (let k = 0; k < this.letters.length; k++) {
            if (this.sameLetters.indexOf(this.letters[k])!== -1) {
                wordView+= this.letters[k];
            }
            else{
                wordView += "&nbsp;_&nbsp;";
            }
            
           
        }
        document.querySelector("#current-word").innerHTML=wordView; 
    },


    restartGame: function() {
        document.querySelector ("letters-guessed").innerHTML="";
        this.letters= [];
        this.wordInGame= null;
        this.sameLetters=[];
        this.guessedLetters=[];
        this.left=0;
        this.total=0;
        this.forGuess=null;
        this.setupGame();
        this.rebuildWordView();
    },

    updateWins: function() {
        let win ;

        if (this.sameLetters.length===0) {
            win= false;
        }
        else {
            win= true;
        }

        for (let l = 0; l < this.letters.length; l++) {
            if (this.sameLetters.indexOf(this.letters[i])===-1){
                win=false;
            }
            
        }

        if (win) {
            this.wins=this.wins+1

            document.querySelector("#wins").innerHTML=this.wins;

            document.querySelector("#music").innerHTML=this.artists[this.wordInGame].song+"By"+this.wordInGame;
            document.querySelector("#game-img").innerHTML= "<img class='band-image' src='./asset/"+this.artists[this.wordInGame].picture+ 
            "' alt='" +this.artists[this.wordInGame].song+"'>";

            return true;
        }

        return false;

    }



};

songGame.setupGame();

document.onkeyup = function(event) {
    songGame.forGuess=String.fromCharCode(event.which).toLowerCase();
    songGame.updatePage(songGame.forGuess);

};