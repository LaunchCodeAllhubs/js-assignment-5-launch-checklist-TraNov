// Write your JavaScript code here!

window.addEventListener("load", function() {

    // Set list to faultyItems
    let list = document.getElementById("faultyItems"); 
    // Set form to html testForm
    let form = document.querySelector("form"); 
    // Process Form data-testid (testForm) 
   form.addEventListener("submit", function(event) {
        event.preventDefault();
      // Format form testForm Input fields
       let document = window.document
       let pilot= document.querySelector("input[name=pilotName]").value;
       let copilot = document. querySelector("input[name=copilotName]").value;
       let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
       let cargoLevel = document.querySelector("input[name=cargoMass]").value;
       // Edit form testForm fields using scriptHelper.validateInput
       formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);

    }) 

    // Set listedPlanetsResponse equal to the value returned by calling scriptHelper.myFetch()
      let listedPlanets;
     // Call scriptHelper.myFetch to return Planets into listedPlanetsResponse array
     let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (response) {
      listedPlanets = response;
      console.log(listedPlanets);
    })
     .then(function() {
        console.log(listedPlanets);
        // Call scriptHelper.pickPlanet to select a random planet from the listedPlanetsResponse array.
      let randomSelectedPlanet = pickPlanet(listedPlanets);
      console.log(randomSelectedPlanet);

      addDestinationInfo(document, randomSelectedPlanet.name, randomSelectedPlanet.diameter, randomSelectedPlanet.star, randomSelectedPlanet.distance, randomSelectedPlanet.moons, randomSelectedPlanet.image);
   })

});