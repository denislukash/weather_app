"use strict";

export function apiRequest(settings) {
    let url;
    //if user accept share his coordinates - use request by coordinates
    //if denided, suggest to user search by city name
    if(typeof settings === "string"){
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${settings}&APPID=447928fbfad655830ae35b93c34bbedb`
    }else{
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${settings.lat}&lon=${settings.lon}&APPID=447928fbfad655830ae35b93c34bbedb` ;
    }
    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.send();

        if( xhr.status != 200 ){
            alert(`Error! Cant get response from server! ${xhr.status} - ${xhr.statusText}`);
            reject();
        }else{
            let data = JSON.parse(xhr.responseText);
            resolve(data);
        }
    })
}

// export function apiRequest(settings) {
//     let url;
//     //if user accept share his coordinates - use request by coordinates
//     //if denided, suggest to user search by city name
//     if(typeof settings === "string"){
//         url = `http://api.openweathermap.org/data/2.5/forecast?q=${settings}&APPID=447928fbfad655830ae35b93c34bbedb`
//     }else{
//         url = `http://api.openweathermap.org/data/2.5/forecast?lat=${settings.lat}&lon=${settings.lon}&APPID=447928fbfad655830ae35b93c34bbedb` ;
//     }
//     return new Promise((resolve, reject) => {
//         $.getJSON(url, function (data) {
//             resolve(data);
//         })
//             .fail(function (data) {
//                 if(data.status == 404){
//                     alert("404 Not found your city")
//                 }else{
//                     alert(`Cant access to server. Request status: ${data.status}.`)
//                 }
//                 reject();
//             });
//     })
// }