$(document).ready(function () {
    // create a slider, set its min/max values, use slide option with function to attatch slide to id height and width  
    $('#slider').slider({
        min: 3,
        max: 30,
        slide: function (event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            // $("#pat").height(ui.value);
        }
    });

    //declare variables

    //painting / erasing or not 
    var paint = false;   


    //painting or erasing
    var paint_erase = "paint";
    

    //get canvas and context and store in variables
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");

    //get the canvas container
    var container = $(".container");

    //mouse position
    var mouse = {x: 200, y: 200};   // this is an object with two properties set to zero


    //onload load saved work from localStorage
    if(localStorage.getItem("imgCanvas") != null){
       
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0,0);
        }
        img.src = localStorage.getItem("imgCanvas");
    };

    //set drawing parameters (lineWidth, lineJoin, lineCap)
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.linecap = "round";

    
  
    //click inside container
    container.mousedown(function(e){
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y);
    });
    
    
    //move the mouse while holding mouse key
    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                //get color input
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        
    });
    //mouse up->we are not painting erasing anymore
        container.mouseup(function(){
            paint = false;
        });

    //if we leave the container we are not painting erasing anymore
    container.mouseup(function(){
        paint = false;
    });

    //click on the reset button
    $("#reset").click(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("erasemode");
        
    });

    //click on save button
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("imgCanvas", canvas.toDataURL());

            window.alert(localStorage.getItem("imgCanvas"));

        }else{
            window.alert("Your browser does not support local storage!");
        }
    })

    //click on the erase button
        $("#erase").click(function(){ // when we click erase button
            if(paint_erase == "paint"){ // if we are 
                paint_erase = "erase";
            }else{
                paint_erase = "paint";
            }
            $(this).toggleClass("erasemode");
        });

    //change color input
    $("#paintColor").change(function(){
        $("#circle").css("background-color", $(this).val());
    })

    //change lineWidth using slider
    
    $('#slider').slider({
        min: 3,
        max: 30,
        slide: function (event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            // $("#pat").height(ui.value);
            ctx.lineWidth = ui.value;
        }
    });
    



});
    
    






// only used this code for Learning canvas section

    //  var canvas = document.getElementById("paint");
    // var context = canvas.getContext("2d");

    // //draw a line
    // //declare new path
    // context.beginPath();

    // //set line width
    // context.lineWidth = 40;
    // //set color of line
    // context.strokeStyle = '#42e565';
    // //set cap to the line (round, butt, square)
    // context.lineCap = "round";
    // //set line join style (bevel, round, miter)
    // context.lineJoin = "round";

    // //positioned the context point which is start point
    // context.moveTo(50,50);
    
    // // draw a straight line from starting point to a new position
    // context.lineTo(200,200);
    //  //draw another line
    //  context.lineTo(400,100);
    // //make line visible
    // context.stroke();

    // //practice (draw line like this / to complete an x )
    // context.moveTo(50,200);
    // context.lineTo(200,50);
    // context.stroke();
    // });
