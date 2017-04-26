var index =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = apiRequest;


function apiRequest(settings, apiKey) {
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return forecast_day; });


let forecast_day = new NextDays();
//class for working with date, I try to create universal methods for reuse this code
//methods in this class can give you all current day info with full names of month and day weeks
// next days info from current date, name of month,
//name of day weeks and dates
function NextDays() {
    
    let days_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"];
    let date = new Date();
    let current_day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    this.current_day_info = {
            day_of_week: days_of_week[date.getDay()],
            month: month[date.getMonth()],
            number_day: date.getDate(),
            time: `${date.getHours()} : ${date.getMinutes()}`
    };
    //get array with next X days from current day
    this.getDateNextDays = (quantity_days_for_forecast) => {
        let date_now = current_day.split("-");
        let result = [];
        
        for(let i = +date_now[2] + 1, j = 0; j < quantity_days_for_forecast; j++, i++ ){
            let day = i;
            let month = date_now[1];
            
            if(day > date.daysInMonth()){
                day = 1;
                month = (+month + 1) + "";
            }
            //in result I need dates in format "2017-04-05" for next search in api response
            if(9 >= month)month = "0" + month;
            if(9 >= day)day = "0" + day;
            let data = `${date_now[0]}-${month}-${day}`;
            result.push(data);
        }
        return result;
    };
    //get array with names of days in week
    this.getNextNamesDayOfWeek = (quantity_days_for_forecast) => {
        let result = [];
        
        for(let i = date.getDay() + 1, j = 0; j < quantity_days_for_forecast; i++, j++ ){
            if(i > days_of_week.length - 1) i = 0;
            result.push(days_of_week[i])
        }
        return result;
    };
}

//custom method for get quantity days in current month
Date.prototype.daysInMonth = function() {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return localStorage; });

let localStorage = new Storage();
//class for working with session storage, including method for add, get and check info from storage
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

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getGeoLocation;


function getGeoLocation() {
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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_style_less__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_style_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_style_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__script_location__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__script_api__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__script_date__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__script_localStorage__ = __webpack_require__(2);







const QUANTITY_DAYS_FORECAST = 4;
const API_KEY = "447928fbfad655830ae35b93c34bbedb";
let nextWeekDays = __WEBPACK_IMPORTED_MODULE_3__script_date__["a" /* forecast_day */].getNextNamesDayOfWeek(QUANTITY_DAYS_FORECAST);

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__script_location__["a" /* getGeoLocation */])()
    .then(
        resolve => {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__script_api__["a" /* apiRequest */])(resolve, API_KEY);
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
            __WEBPACK_IMPORTED_MODULE_4__script_localStorage__["a" /* localStorage */].setDataToLocalStorage(resolve.city.name, resolve);
        },
        reject => {}
    );

$("#form").on("submit", function (event) {
    let city = this.elements.city.value;

    if( __WEBPACK_IMPORTED_MODULE_4__script_localStorage__["a" /* localStorage */].isDataInStorage(city) ){
        let data = __WEBPACK_IMPORTED_MODULE_4__script_localStorage__["a" /* localStorage */].getDataFromLocalStorage(city);
        addTemplateToHtml(data);
        setDeleteEvent();
        
    }else{
        
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__script_api__["a" /* apiRequest */])(city, API_KEY)
            .then(
                resolve => {
                    handleDataForecast(resolve);
                    addTemplateToHtml(resolve);
                    //after each new api request I save data to session storage, then if user search this city again
                    //before request I check in storage is this city available
                    __WEBPACK_IMPORTED_MODULE_4__script_localStorage__["a" /* localStorage */].setDataToLocalStorage(city, resolve);
                    setDeleteEvent();
                },
                reject => {}
            )
    }
   event.preventDefault();
});

//add to forecast object info about current day and search forecast on next 4 days
function handleDataForecast (data) {
    let indexOfNextDays = searchIndexofNextDaysForecast(__WEBPACK_IMPORTED_MODULE_3__script_date__["a" /* forecast_day */].getDateNextDays(QUANTITY_DAYS_FORECAST), data);
    transformKelvinToCelsius(data, 0);

    data.next_days = [];
    data.current_day_info = __WEBPACK_IMPORTED_MODULE_3__script_date__["a" /* forecast_day */].current_day_info;

    for(let i = 0; i < QUANTITY_DAYS_FORECAST; i++){
        data.next_days.push({
            weekDay: nextWeekDays[i],
            temp: data.list[indexOfNextDays[i]].main.temp,
            image: data.list[indexOfNextDays[i]].weather[0].icon
        })
    }
}

//after each append template to html, I need set handle for delete block
function setDeleteEvent() {
    $(".delete_button").on("click", (e)=>{
        e.target.parentElement.remove();
    });
}

//work with handlebars
function addTemplateToHtml(data) {
    let htmlTemp = $("#template").html();
    let template = Handlebars.compile(htmlTemp);
    let result = template(data);
    $("#main").append(result);
}

//for next days forecast I choose time 15:00 for get temperature,I search necessary to me date and save
//index to array, than I use that index in handlebars template
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

//helper function for add to template next days forecast with loops
Handlebars.registerHelper("week_day", function () {
    return Handlebars.escapeExpression(this.weekDay) + "";
});

Handlebars.registerHelper("icon", function () {
    return Handlebars.escapeExpression(this.image) + "";
});

Handlebars.registerHelper("temp", function () {
    return Handlebars.escapeExpression(this.temp) + "";
});


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map