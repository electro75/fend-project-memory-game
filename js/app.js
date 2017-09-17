$(function(){
/*
 * Create a list that holds all of your cards
 */
var cardList=["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt",
              "fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle",
               "fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb",
               "fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"]; // stores all the cards
var time=0; //to store the time
var previousClick=[];
var openList=[];// stores the cards that are open
var matched=0; //store the number of correct guesses
var moves=0;
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
    var gameTimer = setInterval(function(){ 
    ++time; 
    $('#timer').children().text(time+"s");
    if(matched==8){
        clearInterval(gameTimer);
        $('#countdown').removeClass('btn-primary').addClass('btn-success').text("You Won!")
        console.log("you won");
        console.log("moves :"+moves);
        console.log("Time :"+time);
        // return;
    }
   },1000);
    return;
};
function displayCard(evt){  //displays the card that is clicked on
    $(evt.target).addClass("show open");
    return;
}
function check(e){  //tries to check the two cards.
    var targetChild=$(e).children();
    var str=targetChild[0].className;
    var target=$(e);
    var str1=target[0].className;
    if (openList.length==1){
        if(openList[0]==str && previousClick[0]!=str1){
            $('.show').addClass('match');
            $('.show').removeClass('open');
            $('match').off('click');
            matched++
            // console.log(matched);
        }
        else if(openList!=str && previousClick[0]!=str1){
            $('.show').removeClass('show open');
        }
        else if(previousClick[0]==str1){
            return;
        }
        openList=[];
        previousClick=[];
    }
    else{
        openList[0]=str;
        previousClick[0]=str1;
        moves++;
    }
return;
}
function openForFive(){ //gives a preview of the shuffled deck for 8 seconds
    $('.deck').children().addClass("show");
    $('#countdown').off('click');
    var timeleft = 8;
    var shuffledDeck= shuffle(cardList);
    displayShuffled(shuffledDeck);
    var countdown= setInterval(function(){
    timeleft--;
    $('#countdown').text(" "+timeleft);
    if(timeleft <= 0){

        clearInterval(countdown);
        displayBlank();
        timerStart();
        $('#countdown').text("Start Matching!");
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
console.log(matched)
});