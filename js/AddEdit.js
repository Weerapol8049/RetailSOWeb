var path = window.location.pathname;
var page = path.split("/").pop();

if (page == "OrderAdd.html") {
    window.sessionStorage.clear(); 
    var today = new Date();

    var date = today.getFullYear()+'-'+
                (today.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-'+
                today.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

    loadEdit('salesDate', date);
} else {
    loadEdit('recId', sessionStorage.getItem("recId_val"));
    loadEdit('salesDate', sessionStorage.getItem("date_val"));
    loadEdit('qty', sessionStorage.getItem("qty_val"));
    loadEdit('amount', sessionStorage.getItem("amount_val"));
    loadEdit('custName', sessionStorage.getItem("custName_val"));
    loadEdit('salesOrder', sessionStorage.getItem("salesId_val"));
    loadEdit('purchOrder', sessionStorage.getItem("purchId_val"));
    loadEdit('confirmDate', sessionStorage.getItem("confirmdate_val"));
}
    
loadEmployee(sessionStorage.getItem("emp_val"));
loadStore(sessionStorage.getItem("store_val"), localStorage.getItem("usr_val"), localStorage.getItem("type_val"));
loadPool(sessionStorage.getItem("pool_val"));

function loadEdit(element, selected) {
    document.getElementById(element).value = selected;
}

function loadEmployee(selected) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST",'http://localhost:4462/api/retailsoline/employee');
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "id" : ""
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var trHTML = '';
            const objects = JSON.parse(this.responseText);
            trHTML += ` <option selected disabled>Select one</option>`;
            for (let object of objects)
            {
                let _number = object['PersonnelNumber'];
                if (selected == _number)
                    trHTML += `<option value="${_number}" selected>${_number} (${object['Name']})</option>`;
                else
                    trHTML += `<option value="${_number}">${_number} (${object['Name']})</option>`;
            }
            document.getElementById("empId").innerHTML = trHTML;
        }
    }
}

function loadStore(selected, user, type) {

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST","http://localhost:4462/api/retailso/stored");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "name" : user, "type" : type
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var trHTML = '';
            
            const objects = JSON.parse(this.responseText);
            trHTML += ` <option selected disabled>Select one</option>`;
            for (let object of objects)
            {
                let _store = object['StoreId'];
                if (selected == _store)
                    trHTML += `<option value="${_store}" selected>${_store} (${object['StoreName']})</option>`;
                else
                    trHTML += `<option value="${_store}">${_store} (${object['StoreName']})</option>`;
            }
            document.getElementById("store").innerHTML = trHTML;
           
        }
    }
}

function loadPool(selected) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://localhost:4462/api/retailso/pool");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var trHTML = '';
            const objects = JSON.parse(this.responseText);
            trHTML += ` <option selected disabled>Select one</option>`;
            for (let object of objects)
            {
                let _pool = object['PoolId'];
             
                if (selected == _pool)
                    trHTML += `<option value="${_pool}" selected>${_pool} (${object['Name']})</option>`;
                else
                    trHTML += `<option value="${_pool}">${_pool} (${object['Name']})</option>`;
            }
            document.getElementById("pool").innerHTML = trHTML;
        }
    }
}

function create()
{
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST","http://localhost:4462/api/retailso/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "Date" : document.getElementById('salesDate').value,
        "ConfirmDate" : document.getElementById('confirmDate').value, 
        "StoreId": document.getElementById('store').value, 
        "SalesId" : document.getElementById('salesOrder').value, 
        "PurchId" : document.getElementById('purchOrder').value ,
        "CustName" : document.getElementById('custName').value,
        "Pool": document.getElementById('pool').value, 
        "Qty": document.getElementById('qty').value ,
        "Amount":document.getElementById('amount').value,
        "CreateBy":''
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var trHTML = '';
            
            const objects = JSON.parse(this.responseText);
            if (objects == "OK") {
                window.location = 'OrdersPage.html';
            }
            
        }
    }
}

function edit()
{
    console.log(sessionStorage.getItem("recId_val"));
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST","http://localhost:4462/api/retailso/edit");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "RecId" : document.getElementById('recId').value,
        "Date" : document.getElementById('salesDate').value,
        "ConfirmDate" : document.getElementById('confirmDate').value, 
        "StoreId": document.getElementById('store').value, 
        "SalesId" : document.getElementById('salesOrder').value, 
        "PurchId" : document.getElementById('purchOrder').value ,
        "CustName" : document.getElementById('custName').value,
        "Pool": document.getElementById('pool').value, 
        "Qty": document.getElementById('qty').value ,
        "Amount":document.getElementById('amount').value,
        "CreateBy":''
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var trHTML = '';
            
            const objects = JSON.parse(this.responseText);
            if (objects == "OK") {
                window.location = 'OrdersPage.html';
            }

        }
    }
}




