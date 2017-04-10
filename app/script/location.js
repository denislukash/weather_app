"use strict";

export function getGeoLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let coordinates = {};
            coordinates.lat = position.coords.latitude;
            coordinates.lon = position.coords.longitude;
            
            resolve(coordinates);
            
        }, (error) => {
            switch(error.code) {
                case 0: reject(new Error("UNKNOWN_ERROR"));
                    break;
                case 1: reject(new Error("PERMISSION DENIED"));
                    break;
                case 2: reject(new Error("POSITION UNAVAILABLE"));
                    break;
                case 3: reject(new Error("TIMEOUT"));
                    break;
            }
        }, {
            timeout: 5000,
            maximumAge: 600000
            });
    })
}