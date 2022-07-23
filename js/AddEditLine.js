
let pool   = sessionStorage.getItem("pool_line_val");
let action = sessionStorage.getItem("action_line");
let series = sessionStorage.getItem("series_val");
let model  = sessionStorage.getItem("model_val");

if (action == "add") {
    clear()

    var today = new Date();
    var date = today.getFullYear()+'-'+
                (today.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-'+
                today.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

    loadEdit('salesDate_line', date);
} else {
    loadEdit('line_recId', sessionStorage.getItem("recId_line_val"));
    loadEdit('salesDate_line', sessionStorage.getItem("date_line_val"));
    loadEdit('line_qty', sessionStorage.getItem("qty_line_val"));
    loadEdit('line_amount', sessionStorage.getItem("amount_line_val"));
    loadEdit('series', series);
    loadEdit('model', model);
    loadEdit('sink', sessionStorage.getItem("sink_val"));
    loadEdit('top', sessionStorage.getItem("top_val"));
}

loadSeries(series, pool, "");
loadModel(model, series, "");

function loadEdit(element, selected) {
    document.getElementById(element).value = selected;
}

 function loadSeries(selected, pooledit, pool_s)
{
    let pool = pooledit == "" ? pool_s : pooledit;
   
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
      
                 if (selected == _series)
                     trHTML += `<option value="${_series}" selected>${_series}</option>`;
                 else
                    trHTML += `<option value="${_series}">${_series}</option>`;
            }
            document.getElementById("series").innerHTML = trHTML;
        }
    }
}

 function loadModel(selected, seriesedit, series_s)
{
    let series = seriesedit == "" ? series_s : seriesedit;
 
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST","http://localhost:4462/api/retailsoline/model");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "series" : series
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
       
            var trHTML = '';
            const objects = JSON.parse(this.responseText);
            
            trHTML += ` <option selected disabled>Select one</option>`;
            for (let object of objects)
            {
                let _model = object['Model'];
              
                 if (selected == _model)
                     trHTML += `<option value="${_model}" selected>${_model}</option>`;
                 else
                    trHTML += `<option value="${_model}">${_model}</option>`;
            }
            document.getElementById("model").innerHTML = trHTML;
        }
    }
}

function getStock() {
    let series = document.getElementById("series").value;
    let model = document.getElementById("model").value;
    
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://localhost:4462/api/stock/"+ series + "/" + model+ "/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //<label>ยอดคงเหลือ : 220</label>
            let valHTML = "";
            const objects = JSON.parse(this.responseText);
            
            for (let object of objects)
            {
                let _val = object['AvailPhysical'];
                sessionStorage.setItem("stock_series", document.getElementById("series").value);
                sessionStorage.setItem("stock_model", document.getElementById("model").value);
                valHTML += `<label>ยอดคงคลัง : ${_val} &nbsp; <a href="StockPage.html" style="text-align: right;">ตรวจสอบยอด</a></label>`;  
            }
            document.getElementById("display_stock").innerHTML = valHTML;
        }
    }
}

function clear() {
    sessionStorage.setItem("recId_line_val","");
    sessionStorage.setItem("date_line_val","");
    sessionStorage.setItem("amount_line_val","");
    sessionStorage.setItem("qty_line_val","");
    series = "";
    model = "";
    sessionStorage.setItem("sink_val","");
    sessionStorage.setItem("top_val","");
}