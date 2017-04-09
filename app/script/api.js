"use strict";

export function apiRequest(settings) {
    let url;
    if(typeof settings === "string"){
        url = `http://api.openweathermap.org/data/2.5/forecast?q=${settings}&APPID=447928fbfad655830ae35b93c34bbedb`
    }else{
        url = `http://api.openweathermap.org/data/2.5/forecast?lat=${settings.lat}&lon=${settings.lon}&APPID=447928fbfad655830ae35b93c34bbedb` ;
    }
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            dataType: "json",
            type: "GET",
            crossDomain: true,
            error: (xhr) => {
                if(xhr.status == 404){
                    alert("404 Not found your city")
                }else{
                    alert(`Cant access to server. Request status: ${xhr.status}.`)
                }
                reject();
            },
            success:(data) => {
                resolve(data);
            }
        })
    })
}