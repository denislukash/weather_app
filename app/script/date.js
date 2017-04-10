"use strict";

export let forecast_day = new NextDays();
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