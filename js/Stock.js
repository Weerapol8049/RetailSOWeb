//import { loadSeries } from "./AddEditLine";
let poolParm = sessionStorage.getItem("pool_line_val");
let seriesParm = sessionStorage.getItem("stock_series");
let modelParm = sessionStorage.getItem("stock_model");
loadPool(poolParm);
loadSeries(seriesParm, '', poolParm);
loadStock('',seriesParm, modelParm, '');
loadModel(modelParm, '', seriesParm);
loadItem();
loadStock(poolParm, seriesParm, modelParm, "");

function getFilter(element) {
   
    return document.getElementById(element).value;
}
function onSearch() {
    loadStock(getFilter("pool"), getFilter("series"), getFilter("model"), '')
}

function loadPool(selected) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://localhost:4462/api/retailsoline/pool");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = '';
            const objects = JSON.parse(this.responseText);

            trHTML += ` <option value="" selected></option>`;
            for (let object of objects)
            {
                let _pool = object['PoolId'];
                if (selected == _pool)
                    trHTML += `<option value="${_pool}" selected>${_pool}</option>`;
                else
                    trHTML += `<option value="${_pool}">${_pool}</option>`;
            }
            document.getElementById("pool").innerHTML = trHTML;
        }
    }
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

            trHTML += ` <option value="" selected></option>`;
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
    let series = "";
    if  (getFilter("pool") != "") {
        series = seriesedit == "" ? series_s : seriesedit;
    }
   
    console.log(series);
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
            
            trHTML += ` <option value="" selected></option>`;
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
function loadItem() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://localhost:4462/api/stock/item");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = '';
            const objects = JSON.parse(this.responseText);

            trHTML += ` <option value="" selected></option>`;
            for (let object of objects)
            {
                let _ItemId = object['ItemId'];
                let _name = object['Name'];
                trHTML += `<option value="${_ItemId}">${_ItemId} (${_name} )</option>`;
            }
            document.getElementById("itemId").innerHTML = trHTML;
        }
    }
}
function loadStock(pool, series, model, itemid) {
    console.log(model);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://localhost:4462/api/stock/"+ series + "/" + model+ "/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //<label>ยอดคงเหลือ : 220</label>
          
            const table = document.querySelector("table");
            const tableBody = table.querySelector("tbody");
     
            tableBody.innerHTML = "";
            const objects = JSON.parse(this.responseText);
            
            for (let data of objects)
            {
                const rowElement = document.createElement("tr");
                if (data["Seq"] > 0) {
                    const td1 = document.createElement("td");
                    const td2 = document.createElement("td");
                    const td3 = document.createElement("td");
                    const td4 = document.createElement("td");
                    const td5 = document.createElement("td");
                    const td6 = document.createElement("td");
                    const td7 = document.createElement("td");
                    const td8 = document.createElement("td");
                    const td9 = document.createElement("td");

                    td1.textContent = data["Seq"];   
                    td2.textContent = data["Series"];   
                    td3.textContent = data["Model"];   
                    td4.textContent = data["ItemId"]; 
                    td5.textContent = data["Name"];     
                    td6.textContent = data["PhysicalInv"].toLocaleString("en-US"); 
                    td7.textContent = data["OnOrder"].toLocaleString("en-US");   
                    td8.textContent = data["AvailPhysical"].toLocaleString("en-US");   
                    td9.textContent = data["Unit"];  

                    rowElement.appendChild(td1);
                    rowElement.appendChild(td2);
                    rowElement.appendChild(td3);
                    rowElement.appendChild(td4);
                    rowElement.appendChild(td5);
                    rowElement.appendChild(td6);
                    rowElement.appendChild(td7);
                    rowElement.appendChild(td8);
                    rowElement.appendChild(td9);

                    tableBody.appendChild(rowElement);
                }//if
            }//for
        }//if
    }
}
