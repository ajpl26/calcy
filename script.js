var input = document.getElementById('input'),
    number = document.querySelectorAll(".numbers button"),
    operator = document.querySelectorAll(".operators button"),
    result = document.getElementById("equals-to"),
    clear = document.getElementById("clear"),
    resultDisplayed = false;


for(var i=0; i<number.length; i++){
    number[i].addEventListener("click",function(e){
        var currString = input.innerHTML;
        var lastChar = currString[currString.length -1];

        if(resultDisplayed === false){
            input.innerHTML += e.target.innerHTML;
        }
        else if(resultDisplayed === true && lastChar=== "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷"){
            //  if result is already displayed on screnn then the user press an operator ..... we need to keep adding to the string for next operation

            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        }
        else{
            // after result is display and then user press an number
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }

    });
}

// adding click handlers to operator buttons.
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function(e) {
  
     
      var currentString = input.innerHTML;
      var lastChar = currentString[currentString.length - 1];
  
      // if last character entered is an operator, replace it with the currently pressed one
      if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
        input.innerHTML = newString;
      } else if (currentString.length == 0) {
        // if first key pressed is an opearator, don't do anything
        console.log("Enter a number");
      } else {
        // else just add the operator pressed to the input
        input.innerHTML += e.target.innerHTML;
      }
  
    });
  }



  result.addEventListener("click", function(){

    // taking the string that is displayed on the screen and inputed by the user.
    var inputStr = input.innerHTML;


    // spliting the string into arrays of number that is seperated by the operator
    // for eg:- String =>-10+26+33-56*34/23 || output => ["10", "26", "33", "56", "34", "23"]
    var nums = inputStr.split(/\+|\-|\×|\÷/g);


    // forming arrays of operators
    var op = inputStr.replace(/[0-9]|\./g, "").split("");

    // Now we are looping through tha array and doing operation
    // first divide , then multiply, then minus, then addition

    // division
    var divide = op.indexOf("÷");
    while(divide != -1){
      nums.splice(divide,2,nums[divide]/nums[divide+1]);
      op.splice(divide,1);
      divide = op.indexOf("÷");
    }

    // multiplication
    var mul = op.indexOf("×");
    while(mul != -1){
      nums.splice(mul,2,nums[mul]*nums[mul+1]);
      op.splice(mul,1);
      mul = op.indexOf("×");
    }

    // subtraction
    var subs = op.indexOf("-");
    while(subs != -1){
      nums.splice(subs,2,nums[subs]-nums[subs+1]);
      op.splice(subs,1);
      subs = op.indexOf("-");
    }

    // Addition

    var addi = op.indexOf("+");
    while(addi != -1){
      nums.splice(addi,2,parseFloat(nums[addi])+ parseFloat(nums[addi+1]));
      op.splice(addi,1);
      addi = op.indexOf("+");
    }


    input.innerHTML = nums[0]; // Displaying the output

    resultDisplayed = true;




  })
  


// clearing the input on press of clear
clear.addEventListener("click", function() {
    input.innerHTML = "";
})



