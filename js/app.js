$(function(){
/*
 * Create a list that holds all of your cards
 */
var cardList=["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt",
              "fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle",
               "fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb",
               "fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"]; // stores all the cards
var time=0; //to store the time

var openList=[];// stores the cards that are open
var matched=0; //store the number of correct guesses
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayShuffled(array){  //displaying the shuffled deck
    var i=0;
    var len=array.length;
    var currentCard=$('.deck').children().first();
    for(i=0;i<len;i++){
        currentCard.append("<i></i>");
        currentCard.children().addClass(array[i]);
        currentCard=currentCard.next();
    }
    return;
};
function displayBlank(){    //hides the cards
    $('.card').removeClass("match show open");
    return ;
};
function timerStart(){ //starts the times
    var id = setInterval(function(){ 
    time++; 
    $('#timer').children().text(time+"s");
    
   },1000);
    return;
};
function displayCard(evt){  //displays the card that is clicked on
    $(evt.target).addClass("show open");
    return;
}
function check(e){  //tries to check the two cards? i think im going wrong here
    var selected=$(e).children();
    var str=selected[0].className;
    //console.log(str);
     if(openList.length==1){
        if(openList[0]==str){
            $('.show').addClass('match');
            $('.show').removeClass('open');
            matched++;
        }
        else{
            $('.show').removeClass("show open");
        }
        openList=[];
    }
    else{
        openList[0]=str;
    }
return;
}
function openForFive(){ //gives a preview of the shuffled deck
    $('.deck').children().addClass("show");
    var timeleft = 8;
    var shuffledDeck= shuffle(cardList);
    displayShuffled(shuffledDeck);
    var startTimer = setInterval(function(){
    timeleft--;
    document.getElementById("countdown").textContent = " "+timeleft;
    if(timeleft <= 0){

        clearInterval(startTimer);
        displayBlank();
        timerStart();
        
    }
    },1000);
    return;
    };


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 //event-listeners
 $('.btn-primary').on('click',function(){
   openForFive();
 });
 $('.fa-repeat').on('click',function(){
   displayBlank();
 });
 $('.card').on('click',function(e){
    displayCard(e);
    check(this);


});

});