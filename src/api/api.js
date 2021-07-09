import country_codes from "./country_codes";
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
    async getData(type, country_abrv, date, callbackFn) {
        var country = country_codes[country_abrv];
        const url = `${this.api}/time_series_${type}_global`;
        //console.log(key);
        let key;

        if (this.key) {
            key = this.key;
        } else {
            key = await this.init();
        }
        console.log(key);
        var params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": key
            }
        };
        this.makeRequest(url, params).then(d => {
            //console.log(d);
            var data_arr = d.Document;
            var data;
            for (data in data_arr) {
                //console.log(data_arr[data]);
                if (data_arr[data].country_region === country) {
                    callbackFn(data_arr[data][date]);
                }
            }
        }
        );
    }
} export default API;
