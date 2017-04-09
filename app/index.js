"use strict";
import "./styles/style.less";
import{getGeoLocation} from "./script/location";
import {apiRequest} from "./script/api";
import {forecast_day} from "./script/date";
import {localStorage} from "./script/localStorage";

const QUANTITY_DAYS_FORECAST = 4;
let nextWeekDays = forecast_day.getNextNamesDayOfWeek(QUANTITY_DAYS_FORECAST);

getGeoLocation()
    .then(
        resolve => {
            return apiRequest(resolve);
        },
        reject => {
            alert(`${reject}! Cant resolve your position. Try to enter your city`);
            return reject();
        }
    )
    .then(
        resolve => {
            handleDataForecast(resolve);
            addTemplateToHtml(resolve);
            setDeleteEvent();
            localStorage.setDataToLocalStorage(resolve.city.name, resolve);
        },
        reject => {}
    );

$("#form").on("submit", function (event) {
    let city = this.elements.city.value;

    if(localStorage.isDataInStorage(city)){
        let data = localStorage.getDataFromLocalStorage(city);
        addTemplateToHtml(data);
        setDeleteEvent();
    }else{
        apiRequest(city)
            .then(
                resolve => {
                    handleDataForecast(resolve);
                    addTemplateToHtml(resolve);
                    localStorage.setDataToLocalStorage(city, resolve);
                    setDeleteEvent();
                },
                reject => {}
            )
    }
   event.preventDefault();
});

function handleDataForecast (data) {
    let indexOfNextDays = searchIndexofNextDaysForecast(forecast_day.getDateNextDays(QUANTITY_DAYS_FORECAST), data);
    data.next_days = [];
    data.current_day_info = forecast_day.current_day_info;
    transformKelvinToCelsius(data, 0);
    for(let i = 0; i < QUANTITY_DAYS_FORECAST; i++){
        data.next_days.push({
            weekDay: nextWeekDays[i],
            temp: data.list[indexOfNextDays[i]].main.temp,
            image: data.list[indexOfNextDays[i]].weather[0].icon
        })
    }
}

function setDeleteEvent() {
    $(".delete_button").on("click", (e)=>{
        e.target.parentElement.remove();
    });
}

function addTemplateToHtml(data) {
    let htmlTemp = $("#template").html();
    let template = Handlebars.compile(htmlTemp);
    let result = template(data);
    $("#main").append(result);
}

function searchIndexofNextDaysForecast(dateArray, data) {
    let arr = [];
    let result = [];
    dateArray.forEach((item, index) => {
        arr[index] = item + " 15:00:00";
    });
    data.list.forEach((item, index) => {
        arr.forEach((arg) => {
            if(arg === item.dt_txt){
                result.push(index);
                transformKelvinToCelsius(data, index);
            }
        })
    });
    return result;
}

function transformKelvinToCelsius(data, index) {
    if(parseInt(data.list[index].main.temp - 273.15, 10 ) > 0){
        data.list[index].main.temp = "+" + parseInt(data.list[index].main.temp - 273.15, 10 )
    }else{
        data.list[index].main.temp = parseInt(data.list[index].main.temp - 273.15, 10)
    }
}
Handlebars.registerHelper("week_day", function () {
    return Handlebars.escapeExpression(this.weekDay) + "";
});

Handlebars.registerHelper("icon", function () {
    return Handlebars.escapeExpression(this.image) + "";
});

Handlebars.registerHelper("temp", function () {
    return Handlebars.escapeExpression(this.temp) + "";
});
