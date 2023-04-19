// Import stylesheets
import './style.css';

// Write Javascript code!
 const names = ["Jan", "Hana", "Marie", "miloš","Daniela", "pavol", "Kraus", "luboš","peter"];
 const names2 = ["Hana"]
 const hardConsonants = /[bcdfghjklmnprtv]/;
const softConsonants = /[čšřžjďťň]/;

const changes = {
  szxMatch: "i",
  hardconsonantsMatch: ".e",
  softConsonantsMatch: ".i",
  aMatch: "o",
  eMatch: "e",
  ekekMatch: "ku",
  alOlElMatch: "le",
  erMatch: "re",
  usAsEsOsMatch: "",
};

function inflectedNames(names) {
  let newNames = [];

  for (let name in names) {
    const lastLetter = names[name][names[name].length - 1];
    const twoLastLetters = names[name].slice(-2);
    
    const alOlElMatch = /(al|ol|el)\b/.test(twoLastLetters);
    const usAsEsOsMatch = /(us|as|es|os)\b/.test(twoLastLetters);
    const aMatch = /a$/.test(twoLastLetters);
    const eMatch = /e$/.test(lastLetter);
    const ekMatch = /ek$/.test(lastLetter);
    const szxMatch = /[szx]$/.test(lastLetter);
    const softConsonantsMatch = softConsonants.test(lastLetter);
    const hardconsonantsMatch = hardConsonants.test(lastLetter);
    //const erMatch = /er$/.test(lastLetter);

    const matchVariables = {
      alOlElMatch,
      usAsEsOsMatch,
      aMatch,
      eMatch, 
      ekMatch,
      szxMatch,
      softConsonantsMatch,
      hardconsonantsMatch,
      //erMatch,
    };

    const matchVariableNames = Object.keys(matchVariables);

    const matchedVariable = matchVariableNames.find(
      (variableName) => matchVariables[variableName]
    );

    if (!matchedVariable) {
      newNames.push(names[name]);
      continue;
    }

    const letterToReplaceWith = changes[matchedVariable];
  console.log( changes[matchedVariable],matchedVariable,names[name],letterToReplaceWith.length,"x")
    let newName = names[name].slice(0, -1) + letterToReplaceWith;
    if(matchedVariable=="usAsEsOsMatch"){newName =  names[name].slice(0, -2);}
    if (newName.indexOf(".") !== -1) {
    
      // Extract the last character of the old name
      const lastChar = names[name][newName.indexOf(".")];
      console.log(lastChar)
      // Replace the dot with the letter to replace with
      newName = newName.replace(".", lastChar);
      // Replace the last character of the new name with the extracted last character of the old name
     // newName = newName.slice(0, -1) + lastChar;
    }

    newNames.push(newName);
  }

  return newNames;
}
function handleClick() {
  const inputField = document.getElementById("input-field");
  const inputValue = inputField.value;
  const result = inflectedNames([inputValue]);
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Ahoj," + result[0];
  inputField.value = ""
}
document.getElementById("inflect-button").addEventListener("click", handleClick);
function handleKeyPress(event) {
  if (event.keyCode === 13) {
    handleClick();
  }
}

const inputField = document.getElementById("input-field");
inputField.addEventListener("keydown", handleKeyPress);
document.getElementById("inflect-button").addEventListener("click", handleClick);
  
//změň měnění 5.pádu tak aby to odpovídalo pravidlům čes. jazyka