var path = window.location.pathname;
var page = path.split("/").pop();

const sessionVal2 = {
    recId: getValue("recId_line_val"),
    date: getValue("date_line_val"),
    pool: getValue("pool_line_val"),
    action: getValue("action_line"),
    series: getValue("series_val"),
    model: getValue("model_val"),
    sink: getValue("sink_val"),
    top: getValue("top_val"),
    qty: getValue("qty_line_val"),
    amount: getValue("amount_line_val")
}

// const elementVal = {
//     recId_ele : getElement('recId'),
//     date_ele : getElement('salesDate'),
//     conf_ele : getElement('confirmDate'), 
//     store_ele: getElement('store'), 
//     sales_ele : getElement('salesOrder'), 
//     purch_ele : getElement('purchOrder'),
//     custname_ele : getElement('custName'),
//     pool_ele: getElement('pool'), 
//     qty_ele: getElement('qty'),
//     amount_ele : getElement('amount')
// }

const { recId, date, pool, action, series, model, sink, top, qty, amount } = sessionVal;

if (action == "add") {
    clear()

    var today = new Date();
    var _date = today.getFullYear()+'-'+
                (today.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-'+
                today.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

                setElement('salesDate_line', _date);
} else {
    setElement('line_recId', recId);
    setElement('salesDate_line', date);
    setElement('line_qty', qty);
    setElement('line_amount', amount);
    setElement('series', series);
    setElement('model', model);
    setElement('sink', sink);
    setElement('top', top);
}

loadSeries(series, pool, "");
loadModel(model, series, "");

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
    let series = getElement("series");
    let model = getElement("model");
    
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
                sessionStorage.setItem("stock_series", getElement("series"));
                sessionStorage.setItem("stock_model", getElement("model"));
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

function getValue(element) {
    return sessionStorage.getItem(element);
}
function getElement(element) {
    return document.getElementById(element).value;
}
function setElement(element, selected) {
    document.getElementById(element).value = selected;
}