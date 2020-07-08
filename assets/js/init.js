
var myHeaders = new Headers();

myHeaders.append("Authorization", "bearer XifhC06DQnHbqCmO2tHiytz2BWI2MOyXfIpluIrChcH6P18MECkcTpeaTbCf");


var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
};

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.common['Authorization'] = 'bearer XifhC06DQnHbqCmO2tHiytz2BWI2MOyXfIpluIrChcH6P18MECkcTpeaTbCf';

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
})

window.convertToFormData = function (data) {
    formdata = new FormData();
    for (var key in data){
        formdata.append(key, data[key]);
    }
    return formdata;
}
