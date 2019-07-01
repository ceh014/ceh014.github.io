// Stack class 
class Stack { 
  
    // Array is used to implement stack 
    constructor() 
    { 
        this.items = []; 
    } 
  
    // Functions to be implemented 
    //push(item)
    push(element) { 
    // push element into the items 
    this.items.push(element); 
    } 
    
    // pop() 
    pop() { 
    // return top most element in the stack 
    // and removes it from the stack 
    // Underflow if stack is empty 
    if (this.items.length == 0) 
        return "Underflow"; 
    return this.items.pop(); 
    }

    // peek() 
    peek(){ 
    // return the top most element from the stack 
    // but does'nt delete it. 
    return this.items[this.items.length - 1]; 
    } 
    // isEmpty() 
    isEmpty() { 
    // return true if stack is empty 
    return this.items.length == 0; 
    } 
    // printStack() 
    printStack() { 
    var str = ""; 
    for (var i = 0; i < this.items.length; i++) 
        str += this.items[i] + " "; 
    return str; 
    }

} 

//Used to sort a string in alphabetical order.
function sortString(str){
    var arr = str.split('');
    var sorted = arr.sort();
    return sorted.join('');
  }


//Function used to initialize a table
function buildTable(numParam) { 
    var numRows = Math.pow(2.0,numParam);
    var array2D = new Array(numRows);

      for (var h = 0; h < numRows; h++)
      {
            array2D[h] = new Array(numParam+1);

            for (var w = 0; w < numParam+1; w++)
            {
                  // fill in some initial values
                  // (filling in zeros would be more logic, but this is just for the example)
                  array2D[h][w] = 0;
            }
      }

      return array2D;
} 

//Funciton used to print out a table of boolean variables.
function printTable(currTable, numParam) { 
    var numRows = Math.pow(2.0,numParam);
    for (var h = 0; h < numRows; h++)
      {
            for (var w = 0; w < numParam + 1; w++)
            {
                  /*cout<< " " << currTable[h][w] << " ";
                  if(w != numParam) { 
                      cout<<"|";*/
                //var cell = document.getElementById("cell" + h + w);
                //cell.innerHTML = currTable[h][w];
                console.log(currTable);
                if(w != numParam) { 
                    //document.write("|");
                }
            }
            //document.write("<br>");
      }
}

//Function used to populate the table varaibles with the
//correct numbers.
function popParams(currTable, numParam) { 
    var numRows = Math.pow(2.0,numParam);
    var temp = numRows;
    var whichCol = 0;
    var zeroorone = 0;
    var counter = 0;

    for (var w = numParam-1; w >= 0; w--){
        for (var h = 0; h < numRows; h++) {
            var whichMod = Math.pow(2.0, whichCol);
            currTable[h][w] = zeroorone;
            counter++;
            if(counter == whichMod) {
                 if(zeroorone == 0) { 
                     zeroorone = 1;
                 }
                 
                 else{ 
                     zeroorone = 0;
                 }
                 counter  = 0;
            }
        }
            whichCol++;
    }
}

//Function used to decode a string and set it to 0 or 1.
function decode(expression) { 
    //transform(expression.begin(), expression.end(), expression.begin(), ::tolower); 
    console.log(expression);
    expression = expression.toString().toLowerCase();
    var uniquechars = new String();
    console.log(expression);
    
    for(var i = 0; i < expression.length; i++) { 
        if(97 <= expression[i] && expression[i] <= 122) {
            var found = uniquechars.search(expression[i]);
            if(found == -1) { 
                uniquechars += expression[i];
            }
        }
    }

    console.log(uniquechars);
    var returnedTable = buildTable(uniquechars.length);
    popParams(returnedTable,uniquechars.length);

    uniquechars = sortString(uniquechars);
    //vector<char> copyoflist;

    //Print the variables in the table.
    /*for(var i = 0; i < uniquechars.length;i++) { 
       /*cout<<" "<<listofChars.top()<< " |";
        copyoflist.push_back(listofChars.top());
        listofChars.pop();*/
    /*    document.write(" ");
        document.write(uniquechars[i]);
        document.write("|"); 

    }

    document.write("<br>");

    var sep = 4 * (uniquechars.length - 1) + 5;
    for(var i = 0; i < sep+1; i++) { 
        document.write("=");
    }

    document.write("<br>");
*/
    var numParam = uniquechars.length;
    var numRows = Math.pow(2.0,numParam);
    var keys = new Array();

    for (var h = 0; h < numRows; h++){
        
        //Push the current line of 0's or 1's into a 
        //vector key.
        for (var w = 0; w < numParam; w++){
            keys.push(returnedTable[h][w]);
        }

        var newexpre = new String();
        //Translate the alphabet letters to 0 or 1's from boolean table.
        for(var i = 0; i < expression.length;i++) { 
            if(97 <= expression[i] && expression[i] <= 122) {
                for(var uletter = 0; uletter < uniquechars.length;uletter++) { 
                    if(expression[i] == uniquechars[uletter]) {
                        var tostr = (returnedTable[h][uletter]).toString(10);
                        newexpre += tostr;
                    }
                }
            }
            else { 
                newexpre += expression[i];
            }
        }


        /*var postfixexp = new Stack();
        postfixexp = intopostfix(newexpre);
        var lineresult = evaluate(postfixexp);
        returnedTable[h][numParam] = lineresult;*/
    }

    printTable(returnedTable,uniquechars.length);  


    
}

function prec(op) { 
    if(op == '-') { //used to be - in order to represent not.
        return 3; 
    }

    else if(op == '*' || op == '&'){ 
        return 2; 
    }

    else if(op == '+'|| op == '|'){
        return 1;
    } 

    else { 
        return -1; 
    }
}

function intopostfix(expr) { 
    var oppost = new Stack();
    var numpost = new Stack();

    var counter = 0;
    while(counter < expr.length) {
        if(expr[counter] == ' ') {
            counter++; 
            continue;
        } 

        if(expr[counter] >= '0' && expr[counter] <= '9') { 
            numpost.push(expr[counter]);
        }

        else if(expr[counter] == '(') { 
            oppost.push(expr[counter]);
        }

        else if(expr[counter] == ')') { 
            while(oppost.top() != '(') { 
                numpost.push(oppost.pop());
            }
            oppost.pop();
        }

        else {
            while(oppost.isEmpty() != false &&  (prec(expr[counter]) < (prec(oppost.top())))) { 
                numpost.push(oppost.pop());
            }
            oppost.push(expr[counter]);
        }
        counter++;

    }

    while(!(oppost.isEmpty())) { 
        numpost.push(oppost.pop());
    }

    while(!(numpost.isEmpty())) { 
        oppost.push(numpost.pop());
    }
    return oppost;
}


function evaluate(postfixexp) { 
    var numresult = new Stack();
    var operand1;
    var operand2;
    var result;

    while(!(postfixexp.empty())) { 
        if(postfixexp.peek() >= '0' && postfixexp.peek() <= '9') { 
            numresult.push((postfixexp.peek())-'0');
        }

        else if(postfixexp.peek() == '-') { 
            operand1 = numresult.pop();
            if(operand1 == 0) { 
                result = 1;
            }

            else { 
                result = 0;
            }
            numresult.push(result);
        }

        else if(postfixexp.peek() == '*' || postfixexp.peek() == '&') { 
            operand1 = numresult.pop();
            operand2 = numresult.pop();
            result = operand1 & operand2;
            numresult.push(result);
        }

        else if(postfixexp.peek() == '+' || postfixexp.peek() == '|') { 
            operand1 = numresult.pop();
            operand2 = numresult.pop();
            result = operand1 | operand2;
            numresult.push(result);
        }
        postfixexp.pop();
    }

    return numresult.pop();
}

function myFunction() { 
  document.write("fuck");
}

