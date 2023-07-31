// Write your helper functions here!
require('isomorphic-fetch');

// Maintain div id "missionTarget"
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    //the HTML formatting for our mission target div
    const missionTarget = document.getElementById("missionTarget");
       missionTarget.innerHTML = `
           <h2>Mission Destination</h2>
              <ol>
                  <li>Name: ${name}</li>
                  <li>Diameter: ${diameter} </li>
                  <li>Star: ${star}</li>
                  <li>Distance from Earth: ${distance}</li>
                  <li>Number of Moons: ${moons}</li>
             </ol>
             <img src=${imageUrl}>
           `;
 }

 // Validate string and number input from testForm
 // Use Chapter 17.3. Exceptions as Control Flow try\catch for exceptions
 function validateInput(testInput) {
    try {
       if (testInput === "") {
          console.log("Empty");
          return "Empty";
        }
        else if (isNaN(Number(testInput))) {
             console.log("Not a Number");
             return "Not a Number";
        }
        else { (!isNaN(Number(testInput)))
             return "Is a Number";
        }
    } catch(error) {
        console.error(error);
    }
 }

 // Retrieve Validated input from testForm form, and perform relational edits.
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    // div id="faultyItems"
    // format faultyItems from document.getElementById("faultyItems"); 
    let faultyItems = list; 
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus"); //h2 id="launchStatus"

    //
    // Updating launchStatusCheck. launchStatus (division)
    //
    // Check Cargo and Fuel values
    //
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
         list.style.visibility = "hidden"; //redundant?
         launchStatus.innerHTML = "Awaiting Information Before Launch";
         launchStatus.style.color = "black";
         alert("All fields are required before submiting.");
     }
     else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
         list.style.visibility = "hidden"; //redundant?
         launchStatus.innerHTML = "Awaiting Information Before Launch";
         launchStatus.style.color = "black";
         alert("Enter only letters for the Pilot and Co-Pilot fields.");
     }
     else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
         list.style.visibility = "hidden"; //redundant?
         launchStatus.innerHTML = "Awaiting Information Before Launch";
         launchStatus.style.color = "black";
         alert("Enter only numbers for the Fuel Level and Cargo Mass fields.");
     }
      else {
        //
        // Perform relational edits
        //
        if (fuelLevel < 10000 && cargoLevel > 10000) {
            // fuel level too low (less than 10,000L), 
            // launchStatus equals "Shuttle Is Not Ready For Launch" And Color = "red"
             faultyItems.style.visibility = "visible"; 
             pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
             copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
             fuelStatus.innerHTML = "Fuel level is too low for launch"; //fuelLevel
             cargoStatus.innerHTML = "Cargo mass is too heavy for launch" //cargoLevel
             launchStatus.innerHTML = "Shuttle Is Not Ready For Launch"; //h2
             launchStatus.style.color = "red";
         }

         else if (fuelLevel < 10000 && cargoLevel <= 10000) { 
            // fuel level too low (less than 10,000L)
            // launchStatus equals "Shuttle Is Not Ready For Launch"  And Color = "red"
            faultyItems.style.visibility = "visible"; //list.style.visibility
             pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
             copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
             fuelStatus.innerHTML = "Fuel level is too low for launch"; //fuelLevel
             cargoStatus.innerHTML = "Cargo mass is low enough for launch" //cargoLevel
             launchStatus.innerHTML = "Shuttle Is Not Ready For Launch"; //h2
             launchStatus.style.color = "red";
         }
         else if (fuelLevel >= 10000 && cargoLevel > 10000) { 
             // fuel level OK (less than 10,000L), cargo level too large (more than 10,000kg)
             // launchStatus equals "Shuttle Is Not Ready For Launch"  And Color = "red"
             faultyItems.style.visibility = "visible";      // set list.style.visibility = true
             pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
             copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
             fuelStatus.innerHTML = "Fuel level is high enough for launch"  // fuelLevel
             cargoStatus.innerHTML = "Cargo mass is too heavy for launch";  // cargoLevel
             launchStatus.innerHTML = "Shuttle Is Not Ready For Launch";    //h2
             launchStatus.style.color = "red";
         }
         else {
            // fuel level OK (greater than 10,000L), cargo level OK (less than 10,000kg)
            // launchStatus equals "Shuttle Is Ready For Launch" And Color = "green"
            faultyItems.style.visibility = "visible";  // set list.style.visibility = true
             pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
             copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
             fuelStatus.innerHTML = "Fuel level is high enough for launch"; //fuelLevel
             cargoStatus.innerHTML = "Cargo mass is low enough for launch"; //cargoLevel
             launchStatus.innerHTML = "Shuttle Is Ready For Launch"; //h2
             launchStatus.style.color = "green";
         }

     } 

 } 

 // Fetch data for the planets (json)
async function myFetch() {
     let planetsReturned;
     planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
     .then(function(response) {
         if (response.status >= 400) { //error code: 400s and 500s ??
             throw new Error ("Error: bad fetch response");
         } else {
             let data = response.json();
             console.log(data);
             return data;
         }
     });
     return planetsReturned;
 }

 // Select Random planet from planets array (myFetch.data)
 function pickPlanet(planets) {
     let randomSelectedPlanet = planets[Math.floor(Math.random() * planets.length)];
     return randomSelectedPlanet;
 }

 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet;
 module.exports.myFetch = myFetch;



 //NOTES:
 //.catch(error) => { console.log(error); };

// faultyItems.style.visibility = "hidden"
// pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
// copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
// cargoStatus.innerHTML = "Cargo mass low enough for launch"
// launchStatus.innerHTML = "Shuttle is ready for launch";
// launchStatus.style.color = "green";
