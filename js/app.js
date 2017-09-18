$(function(){

var cardList=["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt",
              "fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle",
               "fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb",
               "fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"]; // stores all the cards.
var time=0; //to store the time.
var previousClick=[];//stores the previous clicked card. (fooproofing against double click).
var openList=[];// stores the cards that are open.
var matched=0; //store the number of correct guesses.
var moves=0;
var rating=0;

function calculateRating(){ //calculates "rating" of a player based on the number of moves made.
    if(moves<=10){
        return 3;
    }else if(moves>10 && moves <=17){
        return 2;
    }else if(moves >17){
        return 1;
    }
}

function endGame(){
    $('.btn').hide();
    $('.score-panel').find('.1').addClass('alert alert-success');
    $('.alert').text("You won!! Moves:"+ moves+"    Time: "+time+" seconds");
    $('.alert').append("<ul>Player Rating: <i></i></ul>");
    var stars=calculateRating();
    var currentStar=$('.alert').find('i');

    for (var i=0; i<stars;i++){
        currentStar.addClass('fa fa-star');
        $('.alert').children().append("<i></i>");
        currentStar=currentStar.next();
    }

    $('.alert').append("<span> Restart? <i></i>");
    $('.alert').find('span').children().addClass('fa fa-repeat');
    $('.alert').find('span').children().on('click',function(){
        location.reload();
        return;
    });

    return;
}

function displayShuffled(array){  //displaying the shuffled deck by accpeting the shuffled array from shuffle()
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

function timerStart(){ //starts the timer
    var gameTimer = setInterval(function(){ 
    ++time; 
    $('#timer').children().text(time+"s");

    if(matched==8){
        clearInterval(gameTimer);
        endGame()
        // return;
    }
   },1000);

    return;
};

function displayCard(evt){  //displays the card that is clicked on
    $(evt.target).addClass("show open");
    return;
}

function check(e){  //checks the two cards for similarities and differences
    var targetChild=$(e).children();
    var str=targetChild[0].className;
    var target=$(e);
    var str1=target[0].className;

    if (openList.length==1){

        if(openList[0]==str && previousClick[0]!=str1){     //success condition: Where the class of the icons match but not their parents
            $('.show').addClass('match');
            $('.show').removeClass('open');
            $('.match').off('click');
            matched++
        }else if(openList!=str && previousClick[0]!=str1){  //failed condtion : where player clicks on the wrong card
            $('.show').removeClass('show open');
        }
        else if(previousClick[0]==str1){       //foolproofing from double-click: do nothing
            return;
        }
        openList=[];
        previousClick=[];
    }
    else{                               //condition for first click
        openList[0]=str;
        previousClick[0]=str1;
        moves++;
    }

return;
}

function openForFive(){         //gives a preview of the shuffled deck for 10 seconds
    $('.deck').children().addClass("show");
    $('#countdown').off('click');
    var timeleft = 10;
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


//event-listeners

$('.btn-primary').on('click',function(){
   openForFive();
 });

$('.card').on('click',function(e){
    displayCard(e);
    check(this);
 });

$('.restart').on('click',function(){
    location.reload();
 })
});