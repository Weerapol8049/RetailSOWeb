//import {API_LOAD_LINE} from '../js/api.js';

loadTableLine("http://localhost:4462/api/retailsoline/loaddata", sessionStorage.getItem("recId_val"));

function loadTableLine(url, id) {
    console.log("asdfs");
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST",url);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "recid" : id
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const table = document.querySelector("table");
            const tableBody = table.querySelector("tbody");
            const tableFoot = table.querySelector("tfoot");
            tableBody.innerHTML = "";

            const objects = JSON.parse(this.responseText);
            for (let data of objects)
            {
                const rowElement = document.createElement("tr");
                if (data["No"] > 0)
                {
                    
                    //rowElement.setAttribute("class", row["Class"]);

                    const td1 = document.createElement("td");
                    const td2 = document.createElement("td");
                    const td3 = document.createElement("td");
                    const td4 = document.createElement("td");
                    const td5 = document.createElement("td");
                    const td6 = document.createElement("td");
                    const td7 = document.createElement("td");
                    const td8 = document.createElement("td");
                    const td9 = document.createElement("td");
                    const td10 = document.createElement("td");
                    td9.style.display = "none";
                    
                    const tdAction = document.createElement("td");
                    tdAction.setAttribute("class", "project-actions text-right");

                    const btnEdit = document.createElement("button");
                    btnEdit.innerHTML = 'Edit';
                    btnEdit.onclick = function() {
                        sessionStorage.setItem("action_line", "EditLine");
                        sessionStorage.setItem("series_val", data["Series"]);
                        sessionStorage.setItem("model_val", data["Model"]);
                        sessionStorage.setItem("qty_line_val", data["Qty"]);
                        sessionStorage.setItem("amount_line_val", data["Amount"]);
                        sessionStorage.setItem("date_line_val", data["Date"].substring(0,10));
                        sessionStorage.setItem("sink_val", data["Sink"]);
                        sessionStorage.setItem("top_val", data["Top"]);
                        sessionStorage.setItem("recId_line_val", data["RecId"]);
                        window.location = 'LineAddPage.html';
                    };

                    const btnDelete = document.createElement("button");
                    btnDelete.innerHTML = 'Delete';
                    btnDelete.onclick = function(){
                    
                    };

                    td1.textContent = data["No"];   
                    td2.textContent = data["Date"].substring(0, 10).replace("-", "/").replace("-", "/");   
                    td3.textContent = data["Series"];   
                    td4.textContent = data["Model"]; 
                    td5.textContent = data["Sink"];     
                    td6.textContent = data["Top"]; 
                    td7.textContent = data["Qty"].toLocaleString("en-US");   
                    td8.textContent = data["Amount"].toLocaleString("en-US");   
                    td9.textContent = data["RecId"];  
                    td10.textContent = data["ItemId"]; 

                    rowElement.appendChild(td1);
                    rowElement.appendChild(td2);
                    rowElement.appendChild(td3);
                    rowElement.appendChild(td4);
                    rowElement.appendChild(td10);
                    rowElement.appendChild(td5);
                    rowElement.appendChild(td6);
                    rowElement.appendChild(td7);
                    rowElement.appendChild(td8);
                    rowElement.appendChild(td9);

                    tdAction.appendChild(btnEdit);
                    tdAction.appendChild(btnDelete);

                    rowElement.appendChild(tdAction);
                
                    tableBody.appendChild(rowElement);
                } else {
                    const td1 = document.createElement("th");
                
                    const td2 = document.createElement("th");
                    const td3 = document.createElement("th");

                    td1.setAttribute("colspan", "7");
                    td1.textContent = "รวม";

                    td2.textContent = data["Qty"].toLocaleString("en-US");   
                    td3.textContent = data["Amount"].toLocaleString("en-US");  
                    
                    rowElement.appendChild(td1);
                    rowElement.appendChild(td2);
                    rowElement.appendChild(td3);
                    tableFoot.appendChild(rowElement);
                }
                
            }
        }
    }
}

function createline()
{
    sessionStorage.setItem("action_line", "add");
    location.href='LineAddPage.html';
}