import country_codes from "./country_codes";

class API {
    constructor() {
        this.api='https://api.covid19api.dev';
        this.confirmed_req = new XMLHttpRequest();
        this.recovered_req = new XMLHttpRequest();
        this.deaths_req = new XMLHttpRequest();
        this.url_confirmed=this.api+'/time_series_confirmed_global';
        this.url_recovered=this.api+'/time_series_recovered_global';
        this.url_deaths=this.api+'/time_series_deaths_global';
        const url=this.api+'/token';
        this.key_req = new XMLHttpRequest();
        var params=JSON.stringify({"username": "public_user", "password": "public_pass"});
        this.key_req.open("POST", url);
        this.key_req.setRequestHeader('Content-Type', 'application/json');
        this.key_req.send(params);
        this.key_req.onreadystatechange = (e) => {
            if (this.key_req.readyState===4) {
                this.key='Bearer '+JSON.parse(this.key_req.responseText).Document;
                //console.log(Http.responseText);
            }
        }
        //this.key='Bearer '+key; 
    }
    async getData(country_abrv, date, fn) {
        var country=country_codes[country_abrv];
        this.confirmed_req.open("GET", this.url_confirmed, true);
        this.recovered_req.open("GET", this.url_recovered, true);
        this.deaths_req.open("GET", this.url_deaths, true);
        this.confirmed_req.setRequestHeader('Content-Type', 'application/json');
        this.recovered_req.setRequestHeader('Content-Type', 'application/json');
        this.deaths_req.setRequestHeader('Content-Type', 'application/json');
        this.confirmed_req.setRequestHeader('Authorization', this.key);
        this.recovered_req.setRequestHeader('Authorization', this.key);
        this.deaths_req.setRequestHeader('Authorization', this.key);
        this.confirmed_req.send();
        this.recovered_req.send();
        this.deaths_req.send();
        this.confirmed_req.onreadystatechange = (e) => {
            if (this.confirmed_req.readyState===4) {
                var data_arr=JSON.parse(this.confirmed_req.responseText).Document;
                var data;
                for (data in data_arr) {
                    //console.log(data_arr[data]);
                    if (data_arr[data].country_region === country) {
                        fn(data_arr[data][date], 0);
                    }
                }
            }
        }
        this.recovered_req.onreadystatechange = (e) => {
            if (this.recovered_req.readyState===4) {
                var data_arr=JSON.parse(this.recovered_req.responseText).Document;
                var data;
                for (data in data_arr) {
                    //console.log(data_arr[data]);
                    if (data_arr[data].country_region === country) {
                        fn(data_arr[data][date], 2);
                    }
                }
            }
        }
        this.deaths_req.onreadystatechange = (e) => {
            if (this.deaths_req.readyState===4) {
                var data_arr=JSON.parse(this.deaths_req.responseText).Document;
                var data;
                for (data in data_arr) {
                    //console.log(data_arr[data]);
                    if (data_arr[data].country_region === country) {
                        fn(data_arr[data][date], 1);
                    }
                }
            }
        }
    }
}

//var a=new API();
//console.log(a.getData("recovered", "Afghanistan", "mar232021"));
export default API;
