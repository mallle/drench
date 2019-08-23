let colors = ["rgb(255, 86, 0)", "rgb(255, 153, 0)", "rgb(234, 0, 55)", "rgb(0, 170, 114)", "rgb(152, 0, 35)", "rgb(96, 212, 174)"];
let columns = 49;
let rows = 49;
let board = [];


fillBoard();
paint();
paintButtons();


function fillBoard() {
    for (let column = 0; column <= columns; column++){
        board[column] = [];
        for(let row = 0; row <= rows; row++){
            board[column].push({
                id: column +  "c-r" + row,
                //color: "rgb(255, 153, 0)",
                color: colors[Math.round(Math.random()*5)],
                visited: false
            });

        }
    }
}


function paint() {
    for (let column = 0; column <= columns; column++){
        for(let row = 0; row <= rows; row++){

            let div = document.createElement('div');

            div.id = column +  "c-r" + row ;

            document.getElementById("box").appendChild(div);

            div.style.height = "10px";
            div.style.width = "10px";
            div.style.backgroundColor = board[column][row].color;

        }
    }
}


function rePaint() {
    for (let column = 0; column <= columns; column++){
        for(let row = 0; row <= rows; row++){


            let item = $('#' + column +  "c-r" + row);

            item.css({"backgroundColor" : board[column][row].color});

            board[column][row].visited = false;

        }
    }
}

/**************************
 * Buttons
 ***************************/
function paintButtons() {

    for ( var i = 1; i <= 6; i++){
        let div = document.createElement('button');
        div.id = "btn" + i;
        div.className = "button";

        document.getElementById("button-box").appendChild(div);

        div.display = "inline-block";
        div.style.height = "45px";
        div.style.width = "45px";
        div.style.borderRadius = "100%";
        div.style.backgroundColor = colors[i-1];
        div.style.margin = "18px";

    }

}


/**************************
 * Update View -
 * Couter
 ***************************/
let counter = 120;

function updateCouter() {
    counter -= 1;

    $("#counter").text(counter);

    didThePlayerWin();

    if(didThePlayerWin() && counter == 0){
        $(".button").attr("disabled", true);

        $("#text").text("You won");
    }


    if(didThePlayerWin()){
        $(".button").attr("disabled", true);
        $("#text").text("You won");
    }

    if (counter <= 0) {

        $(".button").attr("disabled", true);
        $("#text").text("You don't have any moves left! So you kind a lost the game!");

        $(".button").each(function (){
            this.removeEventListener('click', this);
        });


    }

}


/**************************
 * Actionlistener
 ***************************/

$(".button").each(function () {

    let button = this;

    button.addEventListener('click', (e) => {
        //e.preventDefault();

        let firstFlag = $("#0c-r0");

        let colorButton = button.style.backgroundColor;
        let firstFlagColor = firstFlag.css("background-color");

        getNeighbours(0,0, firstFlagColor, colorButton);

        firstFlag.css({backgroundColor: colorButton});

        rePaint();

        updateCouter();

    })

});



/**************************
 * Function to find Neightbours
 ***************************/
function getNeighbours(column, row, firstFlagColor, colorButton) {

    let item = board[column][row];

    //top
    if(row > 0 ||(column != 0 && row != 0)){
        topRow = row-1;
        let top = board[column][topRow];

        topColor = top.color;

        if(topColor === firstFlagColor && !top.visited){

            getNeighbours(column, topRow, firstFlagColor, colorButton);

            top.visited = true;

        }

    }

    //right
    if( column <  columns ||(column < columns && row < rows)){
        rightColumn =  column + 1;
        let right = board[rightColumn][row];

        rightColor = right.color;

        if(rightColor === firstFlagColor && !right.visited){

            right.visited = true;

            getNeighbours(rightColumn, row, firstFlagColor, colorButton);

        }

    }

    //bottom
    if(row < rows || (column < columns && row < rows)){
        bottomRow =  row + 1;
        let bottom = board[column][bottomRow];

        bottomColor = bottom.color;

        if(bottomColor === firstFlagColor && !bottom.visited){

            bottom.visited = true;

            getNeighbours(column, bottomRow, firstFlagColor, colorButton);

        }

        //left
        if(column > 0 || (column != 0 && row != 0)){
            leftColumn = column - 1;
            let left = board[leftColumn][row];

            leftColor = left.color;

            if(leftColor === firstFlagColor && !left.visited){

                left.visited = true;

                getNeighbours(leftColumn, row, firstFlagColor, colorButton);

            }
        }

    }

    item.color = colorButton;
}

function didThePlayerWin() {

    let won = true;

    for (let column = 0; column <= columns; column++) {
        for (let row = 0; row <= rows; row++) {

            if(won){
                if(!(board[0][0].color === board[column][row].color)){
                    won = false;
                }
            }

        }
    }

    return won;

}