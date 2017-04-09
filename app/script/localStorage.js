"use strict";
export let localStorage = new Storage();

function Storage() {

    this.getDataFromLocalStorage = (key) =>{
        return JSON.parse(sessionStorage.getItem(key));
    };
    this.setDataToLocalStorage = (key, value) => {
        let data = JSON.stringify(value);
        sessionStorage.setItem(key, data);
    };
    this.isDataInStorage = (key) => {
        return sessionStorage.getItem(key) != null
    }
}