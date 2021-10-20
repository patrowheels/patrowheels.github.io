
    //are we playing?
        //yes
            //reload page
        //no
            //show trials left
            //change button text to reset game


            // 1. create random fruit 
            //define a random step
            //2. move fruit down by one step evry 30 secs
                //is fruit too low?
                    //no--> repeat nb2
                    //yes--> any trials?

                        //yes?: remove heart repeat nb1
                        //no?: show game over message, button text: start game




//slice a fruit
    //play sound in background
    //explode fruit


var playing = false;
var score;
var trialsLeft;
var fruits = ['pineapple','apple','bananas','cherry','grapes','mango','orange','peach','pear','tomato','watermelon'];
var step;
var moveAction; // used for setInterval function

$(function(){

    // click on start or reset button
$("#startreset").click(function(){

//are we playing?
if(playing == true){

   //reload page
   location.reload();
}else{

    //we are not playing
    playing = true; //game initiated
    $("#gameOver").hide();

    //set score to zero
    score = 0;
    $("#scorevalue").html(score);

    //show trials left
    $("#trialsLeft").show();
    trialsLeft = 3;
    addHearts();

    //change button text to reset game
    $("#startreset").html("Reset Game");

    //start sending fruits
    startAction();
}

});

$("#fruit1").mouseover(function(){
 score++ 
 $("#scorevalue").html(score); // update score 

 document.getElementById("sliceSound").play(); //play sound
// $("#slicesound")[0].play();

    //stop fruit and hide it
    clearInterval(moveAction);

    //hide fruit
    $("#fruit1").hide("explode", 500); //slice  //this form of hide method require jquery UI


    // send new fruit
    setTimeout(startAction, 800);
    
});

//slice a fruit
    //play sound in background
    //explode fruit


//functions

function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append(' <img src="images/heart.png" class="life"> ');
        
    }
    // this below way of showing fruit take alot of memory each time
    // $("#fruitsContainer").append(' <img src="images/apple.png" class="Fruits"> ');
}

function startAction(){

    // 1. shows the an img element from class of fruits
    $("#fruit1").show();

    // 2. give img a src attribute
    chooseFruit(); //choose a random fruit

     
    //side notes we paid attention to the positions in css of fruit container and fruit and we also used 550 to keep within the width.. 
    //....of our fruit container.

    // 3. position fruit above -50 and horozontally in random number from 0-550
    $("#fruit1").css({
        left: Math.round(550*Math.random()),
         top: -50});

    //4. generate a random step
    step = 1 + Math.round(5*Math.random()); // changes the step from 1-6 dosent allow 0

    // move fruit down by one step every 10ms
    moveAction = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step);

        // check if fruit is below fruits container
        if($("#fruit1").position().top > $("#fruitsContainer").height()){

            //check if we have any trials left
            if(trialsLeft > 1){
                
            $("#fruit1").show(); //1. repeat
            chooseFruit(); //2. repeat
            $("#fruit1").css({ //3. repeat
                left: Math.round(550*Math.random()),
                top: -50});
            step = 1 + Math.round(5*Math.random()); //4. repeat

                //reduce trials by one
                trialsLeft --;

                //populate new trials in trialsleft box
                addHearts();

            }else{ // game over
                playing = false;
                $("#startreset").html("Start Game");
                $("#gameOver").show();
                $("#gameOver").html("<p>Game over!</p><p>Your score is " + score + '</p>');
                $("#trialsLeft").hide();
                stopAction();

            }
        }
    }, 10);
}

// generate a random fruit
// side note: reducing the image sizes generally instead of using css to reduce size will use less memory

function chooseFruit(){
    $("#fruit1").attr('src' , 'images/' + fruits[Math.round(10*Math.random())] + '.png');
}

function stopAction(){
    clearInterval(moveAction);
    $("#fruit1").hide();

};
});