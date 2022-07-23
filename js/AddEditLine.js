var path = window.location.pathname;
var page = path.split("/").pop();
//console.log(sessionStorage.getItem("pool_line_val"));
loadSeries(sessionStorage.getItem("series_val"), sessionStorage.getItem("pool_line_val"));


if (page == "LineAddPage.html") {
    window.sessionStorage.clear(); 
    console.log("Add");
    var today = new Date();

    var date = today.getFullYear()+'-'+
                (today.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-'+
                today.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

    loadEdit('salesDate_line', date);
} else {
    
}


function loadEdit(element, selected) {
    document.getElementById(element).value = selected;
}


function loadSeries(selected, pool)
{
    console.log(pool);
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST","http://localhost:4462/api/retailsoline/series");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "pool" : pool 
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var trHTML = '';
            const objects = JSON.parse(this.responseText);

            trHTML += ` <option selected disabled>Select one</option>`;
            for (let object of objects)
            {
                
                let _series = object['ProdSeries'];
                console.log(_series);
                 if (selected == _series)
                     trHTML += `<option value="${_series}" selected>${_series}</option>`;
                 else
                    trHTML += `<option value="${_series}">${_series}</option>`;
            }
            document.getElementById("series").innerHTML = trHTML;
        }
    }
}

function loadModel()
{
    let selected = sessionStorage.getItem("model_val");
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST","http://localhost:4462/api/retailsoline/model");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "series" : document.getElementById('series').value
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var trHTML = '';
            const objects = JSON.parse(this.responseText);
            
            trHTML += ` <option selected disabled>Select one</option>`;
            for (let object of objects)
            {
                let _model = object['Model'];
                console.log(_model);
                 if (selected == _model)
                     trHTML += `<option value="${_model}" selected>${_model}</option>`;
                 else
                    trHTML += `<option value="${_model}">${_model}</option>`;
            }
            document.getElementById("model").innerHTML = trHTML;
        }
    }
}