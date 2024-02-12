const passwordLengthSlider = document.getElementById("password-length-slider");
const passwordOptions = document.querySelectorAll(".password-options input");
const inputBoxIcon = document.querySelector(".input-box span");
const passwordTextBox = document.querySelector(".input-box input");
const passwordGreenLight = document.querySelector(".password-indicator");
const buttonGenerate = document.getElementById("generate-button");

const character = {
    wantLowercase: "abcdefghijklmnopqrstuvwxyz",
    wantUppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    wantNumbers: "0123456789",
    wantSymbols: "!$%&|[](){}:;.,*+-#@<>~",
};

// updates the green light
function updateGreenlight() {
    /*
        switch passlength
        case <=10 weak
        >10 <=15 medium
        >15 strong
    */
    passwordGreenLight.id = passwordLengthSlider.value <= 8 ? "weak": passwordLengthSlider.value <= 13 ? "medium" : "strong";
    return true;
}

// checks the updates on the slider and calls update greenlight
function passwordLengthSliderUpdate() {
    document.getElementById("password-length-span").innerText = passwordLengthSlider.value;
    updateGreenlight();
    passwordGenerate();
    return true;
}

// Generates a password based on the params
function passwordGenerate() {
    let stillPassword = "",
    generatedPassword = "",
    wantDuplicate = false,
    passwordLength = passwordLengthSlider.value;
    let i = 0;
    
    passwordOptions.forEach(options => {
        if(options.checked){
// other checkboxes are checked, adds the contents of their characters to the still password
/*
    for example:
            stillPassword = ""
            lowercase is checked
            stillPassword = abcdefghijklmnopqrstuvwxyz
            uppercase is checked
            stillPassword = abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
            etc. etc.
*/
            if(options.id !== "wantDuplicates" && options.id !== "wantSpaces"){
                stillPassword += character[options.id];
// want spaces is checked, adds spaces to the still password
            } else if (options.id === "wantSpaces"){
                stillPassword += `  ${stillPassword}  `;
// want duplicates is checked, ticks the bool
            } else if (options.id === "wantDuplicates") {
                wantDuplicate = true;
            }
        }
    });

    for(let i = 1; i <= passwordLength; i++){
// gets a random character from the stillPassword string
        let rng = Math.floor(Math.random() * stillPassword.length);
        console.log(rng);
        let randomCharacter = stillPassword[rng];
// if duplicates are permitted, appends it to the string
        if(wantDuplicate){
            generatedPassword += randomCharacter;
        } else {
// else, checks if the new character does not exist in generated password or is a space
// if it doesnt, appends it
// if it does, does not append it and lowers the counter
            !generatedPassword.includes(randomCharacter) || randomCharacter === " " ? generatedPassword += randomCharacter : i--;; 
        }
    }
    console.log(stillPassword);
    passwordTextBox.value = generatedPassword;
    return true;
}

// Code for password copy event listener
function passwordCopy() {
    navigator.clipboard.writeText(passwordTextBox.value);
    inputBoxIcon.innerText = "check";
    inputBoxIcon.style.color = "#4285f4";
    setTimeout(() => {
        inputBoxIcon.innerText = "copy_all";
        inputBoxIcon.style.color = "#707070";
    }, 1500);
    return true;
}

inputBoxIcon.addEventListener("click", passwordCopy);
buttonGenerate.addEventListener("click", passwordGenerate);
passwordLengthSlider.addEventListener("input", passwordLengthSliderUpdate);

passwordLengthSliderUpdate();