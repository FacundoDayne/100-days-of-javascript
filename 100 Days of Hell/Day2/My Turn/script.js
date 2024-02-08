let btnOption = document.querySelectorAll(".option-button");
let inputAdvOptions = document.querySelectorAll(".adv-option-button");

let dropDownFontName = document.getElementById("dropDownFontName");
let dropDownFontSize = document.getElementById("dropDownFontSize");
let divTextField = document.getElementById("text-field");
let btnHyperlink = document.getElementById("btnHyperlink");

let btnAlign = document.querySelectorAll(".align");
let btnSpacing = document.querySelectorAll(".spacing");
let btnFormat = document.querySelectorAll(".format");
let btnScript = document.querySelectorAll(".script");

let maxFontSize = 30;

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive"
];

// Attaches an event listener to all the buttons that you pass through it
const highlighter = (className, onlyOne) => {
    console.log(`EventListeners added to ${className}`);
    className.forEach((button) => {
        button.addEventListener("click", () =>{
// checks if there can only be one active at a time
            if(onlyOne){
                let alreadyActive = false;
                // checks if the button is active
                if(button.classList.contains("active")){
                    alreadyActive = true;
                }
                // removes the active class from the all buttons
                highlighterRemover(className);
                // if the button was active before removal, keeps it inactive
                // if the button was inactive before removal, makes it active
                if(!alreadyActive){
                    console.log(`${button} toggled`);
                    button.classList.toggle("active");
                }
            }
// if not onlyOne, makes it a toggle
            else{
                console.log(`${button} toggled`);
                button.classList.toggle("active");
            }
        });
    });
}

const highlighterRemover = (className) =>{
// removes the active status from every other button with the same class
    className.forEach((button) =>{
        button.classList.remove("active");
    });
}
const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

function formatButtonListener(){
    // When a format button is clicked, 
    btnFormat.forEach((button) =>{
        button.addEventListener("click", () =>{
            btnFormat.forEach((button)=>{
                if(button.classList.contains("active")){
                    let command = button.getAttribute('data-command');
                    activeFormats.push(command);
                }
                else{
                    if(activeFormats.includes(button.getAttribute('data-command'))){
                        activeFormats.filter(item => item !== button.getAttribute('data-command'));
                    }
                }
            });
            activeFormats.forEach(command => {
                console.log(`${command} active`);
                document.execCommand(command, null, null);
            });
        });
    });
}

const initializer = () =>{
    highlighter(btnAlign, true);
    highlighter(btnSpacing, true);
    highlighter(btnScript, true);
    highlighter(btnFormat, false);

// I assume *.map() works like a foreach
    fontList.map((value) => {
        //creates an option element
        let option = document.createElement("option");
        //sets the value of a font to the option
        option.value = value;
        option.innerHTML = value;
        //appends it to list of font names
        dropDownFontName.appendChild(option);
    });

    for(let i = 1; i<= maxFontSize; i++){
         //creates an option element
         let option = document.createElement("option");
         var fontsize = i;
         if (fontsize < 10){
            fontsize = `0${i}`;
         }
         //sets the number of a font to the option
         option.value = fontsize;
         option.innerHTML = fontsize;
         //appends it to list of font sizes
         dropDownFontSize.appendChild(option);
    }
// sets the default value of fontsize to 3
    dropDownFontSize.selectedIndex = 5;

    //formatButtonListener();
}

btnOption.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.getAttribute("data-command"), false, null);
    });
});

inputAdvOptions.forEach((button) =>{
    button.addEventListener("change", ()=>{
        modifyText(button.getAttribute("data-command"), false, button.value);
    });
} );

btnHyperlink.addEventListener("click", () => {
    let userLink = prompt("Enter a URL?");
    if(/http/i.test(userLink)){
        modifyText(btnHyperlink.getAttribute("data-command"), false, userLink);
    }
    else{
        userLink = "http://" +userLink;
        modifyText(btnHyperlink.getAttribute("data-command"), false, userLink);
    }
});

window.onload = initializer();