// Assigning dictionary of phrases and definitions
var wordList = [['Avast ye', 'Pay attention'],
['Black spot', 'Death threat'],
['Dance the hempen jig', 'To hang someone'],
['Dungbie', 'Rear end'],
['Hempen halter', 'The noose used to hang people'],
['Hornswaggle', 'To cheat'],
['Shiver me timbers', 'An expression used to show shock or disbelief'],
['Abaft', 'Back area of the boat'],
['Binnacle', 'Where the compass is kept on board the ship'],
['Cackle fruit', 'Chicken eggs'],
['Coaming', 'A surface that prevented water on the deck from dripping to lower levels of the ship'],
['Duffle', "A sailor's belongings"],
['Head', 'Toilet on board the ship'],
['Holystone', 'Sandstone that was used to scrub the ships'],
["Jacob's Ladder", 'Rope ladder that was used to climb aboard ships'],
['Monkey', 'Small cannon'],
['Monkey jacket', 'Short jacket worn by some of those aboard the ship'],
['Orlop', 'Deck where cables are stored away'],
['Poop deck', 'Deck that is the highest and farthest back'],
['Cockswain', 'The helmsman'],
['Flibustier', 'Pirates of the Golden Age'],
['Freebooter', 'Refers to an actual pirate'],
['Landlubber', 'A person who is not incredibly skilled at sea'],
['Powder monkey', "A gunner's assistant"],
['Black jack', 'Large drinking cups'],
["Davy Jones' Locker", 'Refers to death'],
['Ahoy', 'Hello'],
['Ahoy, matey', 'Hello, friend'],
['Batten down the hatches', 'A signal to prepare the ship for an upcoming storm'],
['Blimey!', 'Something said when one is in a state of surprise'],
['Blow the man down', 'A command which means to kill somebody'],
['Booty', 'Treasure'],
['Buccaneer', 'Name for a pirate'],
["Crow's nest", 'The place on the ship where the lookout stand is built'],
['Cutlass', 'Type of sword used by the pirates'],
['Feed the fish', 'Meaning that an individual or group of individuals will soon die'],
['Heave ho', 'Instruction to put some strength into whatever one is doing'],
['Jolly Roger', 'The famous pirate flag with a skull and crossbones on it'],
['Man-O-War', 'The name used for a pirate ship that is all set and ready to go to war'],
['Old salt', 'A sailor that has a great deal of experience on the seas'],
['Privateer', 'Pirates who are sponsored by the government'],
['Scallywag', 'A name that is used as an insult to someone'],
['Scuttle', 'To sink a ship'],
['Seadog', 'An old sailor or pirate'],
['Shark bait', 'Going to die soon'],
['Thar she blows!', 'An expression used when a whale is spotted from the ship'],
['Son of a biscuit eater', 'An insult'],
['Three sheets to the wind', 'Someone who is quite drunk'],
['Walk the plank', 'A punishment which entails someone who walks over the side of the ship off of the plank. Their hands are often tied so that they cannot swim and they drowned.'],
['Yo Ho Ho', 'There is often used to express some sort of cheer but also can be used to call attention to the speaker.'],
['All handshoay', 'Everyone get on the deck']]

// Assigning smaller DOM elements to variables
var topWave = document.querySelector("#topWave");
var bottomWave = document.querySelector("#bottomWave");
var pirateShip = document.querySelector("#pirateShip");
var pirateShipImage = document.querySelector("#pirateShipImage");
var startButton = document.querySelector("#startGameButton")
var instructionsButton = document.querySelector("#instructionsButton");
var wrongLettersDisplay = document.querySelector("#wrongLettersDisplay p");
var hiddenPhraseDisplay = document.querySelector("#hiddenPhraseDisplay p");
var playerCharacter = document.querySelector("#player");
var phraseMeaningDisplay = document.querySelector("#phraseMeaning");

// Assigning audio to variables
var mainSong = document.querySelector("#tomfooleryMP3");
var winningSong = document.querySelector("#twelfthStRagMP3");

//Assigning DOM elements that contain different states of the game to variables
var gameMasterContainer = document.querySelector("#gameMasterContainer");
var startMenu = document.querySelector("#startMenu");
var allScreens = [startMenu, gameMasterContainer];

// Assignment of variables used in game functions
var angle = 0;
var lastTime = null;
var anglePlayer = 0.8;
var inputReady = false;
var phraseDefHiddenPhrase;
var incorrectLettersString = "";
var incorrectLettersArray = [];
var allLettersGuessed = [];
var playerPosition = 0;
var playerYPosition = 0;

// Game object
var game = {

    // This functions selects one screen and hides all other screens that are in the global array named allScreens
    selectScreen: function (selectedScreen) {
        allScreens.forEach(function (screen) {
            if (screen == selectedScreen) {
                screen.style.display = "block";
            } else {
                screen.style.display = "none";
            }
        })
    },

    startMenuScreen: {
        initializeStartMenu: function () {
            game.selectScreen(startMenu);
        },
        showInstructions: function () {
            instructionsButton.innerHTML = "<div id='instructionsArticle'> <p> Given the meaning, try to solve the pirate phrase by selecting letters on your keyboard </p> <br> <p> Get too many guesses wrong and you will fall off the plank! </p> </div>";
        }
    },

    gameScreen: {
        getPhraseDefHiddenPhrase: function () {
            // returns an array of the original phrase, its definition, and the hidden version of the phrase
            var wordArray = wordList[Math.floor(wordList.length * Math.random())];
            return wordArray.concat(this.hidePhrase(wordArray[0]));
        },

        hidePhrase: function (inputPhrase) {
            var outputPhrase = "";
            for (let i = 0; i < inputPhrase.length; i++) {
                if (/[a-z]/i.test(inputPhrase[i])) {
                    outputPhrase += "_";
                } else {
                    outputPhrase += inputPhrase[i];
                }
            };
            return outputPhrase;
        },

        animate: function (time) {
            if (lastTime != null) angle += (time = lastTime) * 0.00005;
            lastTime = time;
            topWave.style.top = (Math.sin(angle) * 1.5) + 48 + "vh";
            topWave.style.left = (Math.cos(angle) * 5) + "vh";

            bottomWave.style.top = (Math.sin(angle + Math.PI) * 1.5) + 50 + "vh";
            bottomWave.style.left = (Math.cos(angle + Math.PI) * 5) + "vh";

            pirateShip.style.top = (Math.sin(angle) * 30) - 577 + "px";
            requestAnimationFrame(game.gameScreen.animate);
        },

        movePlayerForward: function (newPosition) {
            var id = setInterval(frame, 20);
            function frame() {
                if (playerPosition == newPosition) {
                    clearInterval(id);
                } else {
                    playerPosition++;
                    playerCharacter.style.left = -playerPosition + 30 + "vw";
                }
            }
        },

        fallOffPlank: function () {
            var id = setInterval(frame, 20);
            function frame() {
                if (playerYPosition == 100) {
                    clearInterval(id);
                } else {
                    playerYPosition++;
                    playerCharacter.style.top = playerYPosition + "vh";
                };
            };
        },

        lose: function () {
            this.fallOffPlank();
            setTimeout(function () {
                alert("You lose! The phrase was " + phraseDefHiddenPhrase[0]);
                var tryAgain = confirm("Try again?");
                if (tryAgain) {
                    game.gameScreen.reset();
                    game.gameScreen.initializeGame();
                } else {
                    mainSong.pause();
                    game.gameScreen.reset();
                    game.selectScreen(startMenu);
                };
            }, 500);
        },

        win: function () {
            mainSong.pause();
            winningSong.play();
            setTimeout(function () {
                alert("You win!");
                var tryAgain = confirm("Try again?");
                if (tryAgain) {
                    game.gameScreen.reset();
                    game.gameScreen.initializeGame();
                } else {
                    winningSong.pause();
                    game.gameScreen.reset();
                    game.selectScreen(startMenu);
                };
            }, 50);
        },

        reset: function () {
            /* cancelAnimationFrame(game.gameScreen.animate);
            mainSong.currentTime = 0;
            winningSong.currentTime = 0;
            incorrectLettersArray = [];
            incorrectLettersString = "";
            anglePlayer = 0.8;
            playerPosition = 0;
            playerYPosition = 0;
            wrongLettersDisplay.innerHTML = ""; */
            location.reload();
            this.initializeGame();

        },

        initializeGame: function () {
            phraseDefHiddenPhrase = this.getPhraseDefHiddenPhrase()
            game.selectScreen(gameMasterContainer);
            hiddenPhraseDisplay.innerHTML = phraseDefHiddenPhrase[2];
            requestAnimationFrame(game.gameScreen.animate);
            inputReady = true;
            phraseMeaningDisplay.innerHTML = "Meaning: " + phraseDefHiddenPhrase[1];
            mainSong.play();
        },

        guessLetter: function (key) {
            if (incorrectLettersArray.length <= 10) {
                var letterGuessed = key.toLowerCase();
                if (/[a-z]/i.test(letterGuessed) && letterGuessed.length == 1 && !(allLettersGuessed.includes(letterGuessed))) {
                    inputReady = false;
                    if (phraseDefHiddenPhrase[0].toLowerCase().indexOf(letterGuessed) == -1) {
                        incorrectLettersString += letterGuessed.toUpperCase();
                        wrongLettersDisplay.innerHTML = incorrectLettersString;
                        allLettersGuessed.push(letterGuessed.toLowerCase());
                        incorrectLettersArray.push(letterGuessed.toLowerCase());
                        if (incorrectLettersArray.length % 5 == 0) {
                            incorrectLettersString += "<br>";
                        };
                        if (incorrectLettersArray.length <= 9) {
                            this.movePlayerForward(4 * incorrectLettersArray.length);
                        } else {
                            game.gameScreen.lose();
                        }
                    } else {
                        this.findAndSwitchLetters(letterGuessed);
                        hiddenPhraseDisplay.innerHTML = phraseDefHiddenPhrase[2];
                        allLettersGuessed.push(letterGuessed.toLowerCase());
                        if (!(phraseDefHiddenPhrase[2].includes("_"))) {
                            game.gameScreen.win();
                        };
                    };
                    inputReady = true;
                };
            };
        },

        findAndSwitchLetters: function (letter) {
            var pos = 0;
            var j = -1;
            var newString = "";
            while (pos != -1) {
                pos = phraseDefHiddenPhrase[0].toLowerCase().indexOf(letter, j + 1);
                if (pos == -1) { break; }
                newString = phraseDefHiddenPhrase[2].substring(0, pos) + phraseDefHiddenPhrase[0][pos] + phraseDefHiddenPhrase[2].substring(pos + 1);
                phraseDefHiddenPhrase[2] = newString;
                j = pos;
            }
        }
    }
};

game.startMenuScreen.initializeStartMenu();
document.onkeyup = function (event) {
    if (inputReady) {
        game.gameScreen.guessLetter(event.key);
    };
};