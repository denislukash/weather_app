"use strict";

export function apiRequest(settings, apiKey) {
    let url;
    //if user accept share his coordinates - use request by coordinates
    //if denided, suggest to user search by city name
    if(typeof settings === "string"){
        url = `http://api.openweathermap.org/data/2.5/forecast?q=${settings}&APPID=${apiKey}`
    }else{
        url = `http://api.openweathermap.org/data/2.5/forecast?lat=${settings.lat}&lon=${settings.lon}&APPID=${apiKey}` ;
    }
    return new Promise((resolve, reject) => {
        $.getJSON(url, function (data) {
            resolve(data);
        })
            .fail(function (data) {
                if(data.status == 404){
                    alert("404 Not found your city")
                }else{
                    alert(`Cant access to server. Request status: ${data.status}.`)
                }
                reject();
            });
    })
}