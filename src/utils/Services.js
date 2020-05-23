class Services {

    static baseUrl = 'https://schedules-api-dev.herokuapp.com/';


    static async GetItems(url){
        var response = await fetch(this.baseUrl + url)
        var status = response.status;
        var data = await response.json();
        return {status: status, data: data};
    }

    static async StoreItems(url, options){
        var response = await fetch(this.baseUrl + url, options)
        var status = response.status;
        var data = await response.json();
        return {status: status, data: data};

    }
}

export default Services;