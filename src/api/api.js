import {countries_codes, month_names} from "./country_months";
class API {
    constructor() {
        this.api = 'https://api.covid19api.dev';
    }
    async init() {
        const url = this.api + '/token';
        var params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "username": "public_user", "password": "public_pass" })
        }
        var data = await this.makeRequest(url, params);
        var key = "Bearer " + data["Document"];
        return key;
    }
    async makeRequest(url, param) {
        var resp = await fetch(url, param);
        //console.log(resp);
        return resp.json();
    }
    async getData(type, callbackFn) {
        const url = `${this.api}/time_series_${type}_global`;
        //console.log(key);
        var key;
        var country;
        if (this.key) {
            key = this.key;
        } else {
            key = await this.init();
            this.key=key;
        }
        //console.log(key);
        var params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": key
            }
        };
        var data_arr;
        var data;
        var cases={};
        //var date=d;
        this.makeRequest(url, params).then(d => {
            //console.log(d);
            data_arr = d.Document;
            for (data in data_arr) {
                //console.log(data_arr[data]);
                //console.log(data_arr[data]);
                delete data_arr[data]["id"];
                delete data_arr[data]["province_state"];
                delete data_arr[data]["latitude"];
                delete data_arr[data]["longitude"];
                country=data_arr[data]["country_region"];
                delete data_arr[data]["country_region"];
                cases[country]=data_arr[data];
            }
            //console.log(cases);
            return callbackFn(cases);
        }
        );
    }
} 
const dateToString = (date) => {
    var dd=date.getDate().toString();
    if (dd.length===1) {
        dd="0"+dd;
    }
    var full_year=date.getFullYear();
    var month=date.getMonth();
    var mon=month_names[month];
    return `${mon}${dd}${full_year}`;
}
const countryCodeToString = (code) => {
    return countries_codes[code];
}
const graphFormat = (data, country, month, year_str) => {
    var res=[];
    if (data["recovered"]===null) {
        return res;
    }
    var date;
    var type;
    var temp;
    var c=countryCodeToString(country);
    var month_name=month_names[month];
    //console.log(data["recovered"][c]);
    for (date in data["confirmed"][c]) {
        if (date.includes(month_name) && date.includes(year_str)) {
            console.log(date);
            temp={};
            temp["date"]=date;
            for (type in data) {
                temp[type]=data[type][c][date];
            }
            //console.log(temp);
            res.push(temp);
        }
    }
    console.log(res);
    return res;
}
export default API;
export {dateToString, countryCodeToString, graphFormat};