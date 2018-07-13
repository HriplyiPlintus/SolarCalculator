"use strict"

function addMonths(tagName){
    var annualUseKw = 0,
    dailyUseKw = 0

    //annual kw usage
    var months = document.getElementById(tagName).getElementsByTagName('input')

    for(var i = 0; i < months.length; i++){
        annualUseKw += Number(months[i].value)
    }

    return dailyUseKw = annualUseKw / 365
}

function sunHours(){
    var hrs
    var sunshineZone = document.forms.solarForm.zone.selectedIndex
    sunshineZone += 1

    switch(sunshineZone){
        case 1:
            hrs = 6;
            break;
        case 2: 
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;
        case 4:
            hrs = 4.5;
            break;
        case 5:
            hrs = 4;
            break;
        case 6:
            hrs = 3.5;
            break;
        default:
            hrs = 0;
    }
    return hrs
}

function calculateSolar(){
    var dailyUseKw = addMonths('mpc')
    
    var sunHoursPerDay = sunHours()
    
    var minKwNeeds = dailyUseKw / sunHoursPerDay
    
    var realKwNeeds = minKwNeeds * 1.25
    
    var realWattNeeds = realKwNeeds * 1000
    
    var panelInfo = calculatePanel();
    var panelOutput = panelInfo[0]
    var panelName = panelInfo[1]
    
    var panelsNeeded = Math.ceil(realWattNeeds / panelOutput)
    
    var feedback = ""
    feedback += "<p>Based on your average daily use of " + Math.round(dailyUseKw) + " kWh, you will need to purchase " + panelsNeeded + " " + panelName + " brand solar panels to offset 100% of your electricity bill.</p>"
    feedback += "<p>Your average daily electricity consumption: " + Math.round(dailyUseKw) + " Kwh per day.</p>"
    feedback += "<Average sunshine hours per day: " + sunHoursPerDay + " hours</p>"
    feedback += "<p>Realistic watts needed per hour: " +Math.round(realKwNeeds) + " watts/hour.</p>"
    feedback += "<p>The " + panelName + " panel you selected generates about " + panelOutput + " watts per hour.</p>"
    
    document.getElementById("feedback").innerHTML = feedback
}

function calculatePanel(){
    //selected panel
    var panels = document.forms.solarForm.panel
    var userChoise = panels.selectedIndex
    var name = panels[userChoise].text
    var power = panels[userChoise].value
    
    var x;
    return x = [power, name]
}

document.getElementById("calculateSolar").addEventListener('click', calculateSolar)