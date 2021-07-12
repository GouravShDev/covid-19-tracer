import {countries_codes, month_names} from "./country_codes";
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
    dateToString(date) {
        var dd=date.getDate().toString();
        if (dd.length===1) {
            dd="0"+dd;
        }
        var full_year=date.getFullYear();
        var month=date.getMonth();
        var mon=month_names[month];
        return `${mon}${dd}${full_year}`;
    }
    async getData(type, country_abrv, d, callbackFn) {
        var country = countries_codes[country_abrv];
        const url = `${this.api}/time_series_${type}_global`;
        //console.log(key);
        let key;

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
        var date=this.dateToString(d);
        //var date=d;
        console.log(date);
        this.makeRequest(url, params).then(d => {
            //console.log(d);
            var data_arr = d.Document;
            var data;
            for (data in data_arr) {
                //console.log(data_arr[data]);
                if (data_arr[data].country_region === country) {
                    console.log(data_arr[data][date]);
                    callbackFn(data_arr[data][date]);
                }
            }
        }
        );
    }
} export default API;
