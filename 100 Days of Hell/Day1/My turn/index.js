/**
Variables
let variables
    - you can change the value anytime
    - can only be accessed within the block it was declared in
    - are not initialized until the line they are defined in are passed. meaning if you access it in a line before it is initialized, it returns an error
    - you cannot redeclare variables with the same name within the same scope
var variables
    - you can change the value anytime
    - can be accessed globally or within a block, depending on where it is declared
    - automatically initialized at the start, but will still need to pass through the line it is declared in before it is useable
    - you can redeclare with the same name 
const variables
    - you cannot change the value
    - only accessible within its own block, like let
    - only initialized after its line is passed, like let
    - cannot be redeclared, like let
*/

//Preparing components to be used
let container = document.querySelector(".grid-container");
let btnCreateGrid = document.getElementById("create-grid-button");
let btnClearGrid = document.getElementById("clear-grid-button");
let colorInput = document.getElementById("color-input");
let btnErase = document.getElementById("erase-button");
let btnPaint = document.getElementById("paint-button");
let sldrWidth = document.getElementById("width-slider");
let sldrHeight = document.getElementById("height-slider");
let spnWidth = document.getElementById("width-slider-value");
let spnHeight = document.getElementById("height-slider-value");

let deviceType = "";
let drawMode = false;
let eraseMode = false;

//Collection of events
let mouseEvents = {
    //Collection of mouse event
    mouseUsed: {
        //property name : PRE DEFINED property
        btnPressed: "mousedown",
        movePointer: "mousemove",
        btnReleased: "mouseup"
    },
    touchUsed:{
        btnPressed: "touchstart",
        movePointer: "touchmove",
        btnReleased: "touchend"
    }
};

/*
const methods: doesnt actually hold value
if you call a const method it runs the function and returns it, without actually saving the value to itself
you can change the variables within the const method and the return value will change to reflect the values during run time
*/
const isMobileDevice = () => {
    // Imma be honest, what the fuck does any of this mean
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    if(mobileRegex.test(userAgent) && window.innerWidth <=  800){ deviceType = "touchUsed"; return true; } 
    else { deviceType = "mouseUsed"; return false; }
};

isMobileDevice();

//clears the container
btnClearGrid.addEventListener("click",() =>{
    container.innerHTML = "";
});

//toggles on the erase mode
btnErase.addEventListener("click", () =>{eraseMode = true; });

//toggles off the erase mode
btnPaint.addEventListener("click", ()=>{eraseMode = false;});

//changes the value of the span based on the slider
sldrWidth.addEventListener("input", () =>{
    /*conditional value
    variable = (condition) ? then : else
    ? means then
    : means else
    for inline references use TICKS
    */

    // if sldrWidth.value is less than 10 then print 0 + sldrWidth.value, else print sldrWidth.value
    spnWidth.innerHTML = sldrWidth.value < 10 ? `0${sldrWidth.value}` : sldrWidth.value;
});

sldrHeight.addEventListener("input", ()=>{
    spnHeight.innerHTML = sldrHeight.value < 10 ? `0${sldrHeight.value}` : sldrHeight.value;
});

//You pass the element ID of a cell inside the container
function paint(elementId){
    //selects all the columns in the created grid
    let gridColumns = document.querySelectorAll(".grid-columns");
    //finds the cell you passed
    gridColumns.forEach((element)=>{
        if(elementId == element.id){
            //if not in erase mode, draws
            if(drawMode && !eraseMode){
                //changes the bg.color of the cell by the color of the colorInput
                element.style.backgroundColor = colorInput.value;
            }
            //if in erase mode, erases
            else if (drawMode && eraseMode){
                element.style.backgroundColor = "transparent";
            }
        }
    });
};

btnCreateGrid.addEventListener("click", () =>{
    console.log(`Rows: ${sldrHeight.value} \nColumns: ${sldrWidth.value}`);
    //empties the contents of the container before working
    container.innerHTML = "";
    let count = 0;
    //for each row
    for(let i = 0; i < sldrHeight.value; i++){
        //count will be the cell's id
        count += 2;
        //creates a div
        let row = document.createElement("div");
        //attaches a grid-row class to the newly created div
        row.classList.add("grid-rows");
        
        //in each row, creates a column
        for (let j=0; j < sldrWidth.value; j++){
            count += 2;
            //creates a div
            let col = document.createElement("div");
            col.classList.add("grid-columns");
            //attaches an ID to the cell
            col.setAttribute("id", `cell #${count}`);
            //attaches an event listener to check if the cell is pressed
            col.addEventListener(mouseEvents[deviceType].btnPressed, (e) =>{
                drawMode = true;
                /* I'm gonna try to use the defined checker instead 
                if(erase){
                    col.style.backgroundColor = "transparent";
                }
                else{
                    col.style.backgroundColor = colorInput.value;
                }
                */
               paint(e.target.id);
            });

            col.addEventListener(mouseEvents[deviceType].movePointer, (e)=>{
                /*
                let elementId = document.elementFromPoint(
                    isMobileDevice() ? e.touches[0].clientX: e.clientX,
                    isMobileDevice() ? e.touches[0].clientY: e.clientY
                ).id;
                console.log(elementId);
                paint(elementId);
                */
                console.log(e.target.id);
                paint(e.target.id);
                
            });

            col.addEventListener(mouseEvents[deviceType].btnReleased, () =>{
                drawMode = false;
            });

            row.appendChild(col);
            //console.log(`Created column #${count}`);
        }
        container.appendChild(row);
    }
});
