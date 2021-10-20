
$(function(){


// 1. declare variables
var myArray;
var inputLength;
var reading = false;
var counter;
var action;
var frequency = 200;

// 2. on page load --> hide elements we dont need, leave only text area and start button
$("#new").hide();
$("#resume").hide();
$("#pause").hide();
$("#controls").hide();
$("#result").hide();
$("#error").hide();


// 3. Click on Start Reading
$("#start").click(function(){
    //get text and split it into words stored inside an array
    // \s matches spaces, tabs, new lines, etc and + means one or more.
myArray = $("#userinput").val().split(/\s+/);

// get the number of words
inputLength = myArray.length;

if(inputLength>1){// there is enough input

    //move to reading mode
    reading = true;

    //hide start, error, user input, and show new, pause, controls
    $("#start").hide();
    $("#error").hide();
    $("#userinput").hide();
    $("#new").show();
    $("#pause").show();
    $("#controls").show();

    //text progressslider max      //question why -1 ?
    $("#progressslider").attr("max", inputLength-1);

        //start counter at zero
        counter = 0;

        //show reading box with the first word
        $("#result").show();
        $("#result").text(myArray[counter]);

        //starting reading from 1st word
        action = setInterval(read, frequency)

}else{//not enough input
    $("#error").show();
};
});


//4. Click on New
$("#new").click(function(){
    //reload page
    location.reload();
});

//5. Click on Pause
$("#pause").click(function(){
    // stop reading and switch to not reading mode
    clearInterval(action);
    reading = false;
    //hide pause and show resume
    $("#pause").hide();
    $("#resume").show();

});

//6. Click on Resume
$("#resume").click(function(){
    // start reading
    action = setInterval(read, frequency)
    //go back to reading mode
    reading = true;
    $("#resume").hide();
    $("#pause").show();

});


//7. Change FontSize
$("#fontSizeSlider").on("slidestop", function(event,ui){
    //refresh slider
    $("#fontSizeSlider").slider("refresh");

    //get the value of slider
    var sliderValue = parseInt($("#fontSizeSlider").val());

    $("#result").css("fontSize", sliderValue);
    $("#fontsize").text(sliderValue);

});

//8. Change Speed
$("#speedSlider").on("slidestop", function(event,ui){
    //refresh slider
    $("#speedSlider").slider("refresh");

    //get the value of slider
    var sliderValue = parseInt($("#speedSlider").val());

    $("#speed").text(sliderValue);

    //stop reading
    clearInterval(action);

    // change frequency
    frequency = 60000/sliderValue;

    //resume reading
    if(reading){
        action = setInterval(read, frequency);
    }

});

//9. progress slider
$("#progressSlider").on("slidestop", function(event,ui){
    //refresh slider
    $("#progressSlider").slider("refresh");

    //get the value of slider
    var sliderValue = parseInt($("#progressSlider").val());

    //stop reading
    clearInterval(action);

    // change counter
    counter = sliderValue;

    // change word
    $("#result").text(myArray[counter]);

    //change value of progress percentage
    $("#percentage").text(Math.floor(counter/(inputLength-1)*100));

    //resume reading
    if(reading){
        action = setInterval(read, frequency);
    }

});

//10. functions

function read(){
if(counter == inputLength-1){// last word
    clearInterval(action);
    reading = false; //moved now to not reading mode
    $("#pause").hide();
}else{
    // increase counter by one
    counter++;

    //get word
    $("#result").text(myArray[counter]);

    //changing progress slider value and refresh slider
    $("#progressSlider").val(counter).slider("refresh");
    $("#progressSlider").slider("refresh");

    //change the text of percentage
    $("#percentage").text(Math.floor(counter/(inputLength-1)*100));
}
}

});