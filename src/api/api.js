import country_codes from "./country_codes";
class API {
    async init() {
        this.api='https://api.covid19api.dev';
        const url=this.api+'/token';
        var params={
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"username": "public_user", "password": "public_pass"})
        }
        var data=await this.makeRequest(url, params);
        var key="Bearer "+data["Document"];
        return key;
    }
    async makeRequest(url, param) {
        var resp=await fetch(url, param);
        //console.log(resp);
        return resp.json();
    }
    async getData(type, country_abrv, date, fn, key) {
        var country=country_codes[country_abrv];
        const url=this.api+'/time_series_'+type+'_global';
        //console.log(key);
        key=await key;
        //console.log(key);
        var params={
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": key
            }
        };
        this.makeRequest(url, params).then(d => {
                //console.log(d);
                var data_arr=d.Document;
                var data;
                for (data in data_arr) {
                    //console.log(data_arr[data]);
                    if (data_arr[data].country_region === country) {
                        fn(data_arr[data][date]);
                    }
                }
            }
        );
    }
}
/*
fn=(i, j) => {
    console.log(i);
    console.log(j);
}

var a=new API();
k=a.init();
a.getData("recovered", "Afghanistan", "mar232021", fn, k);
*/
export default API;
