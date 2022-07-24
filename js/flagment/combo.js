
var title = document.getElementsByTagName("title")[0].innerText;

const sessionVal = {
    recId: getValue("recId_val"),
    date: getValue("date_val"),
    qty: getValue("qty_val"),
    amount: getValue("amount_val"),
    custName: getValue("custName_val"),
    salesId: getValue("salesId_val"),
    purchId: getValue("purchId_val"),
    dateConfirm: getValue("confirmdate_val"),
    empId: getValue("emp_val"),
    storeId: getValue("store_val"),
    pool: getValue("pool_val")
}

const { recId, date, qty, amount, custName, salesId, purchId, dateConfirm, empId, storeId, pool } = sessionVal;


if (title == "Add Order") {
    window.sessionStorage.clear(); 
    var today = new Date();
    console.log("add");
    var _date = today.getFullYear()+'-'+
                (today.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-'+
                today.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                setElementVal('salesDate', _date);
                loadEmployee('');
                loadStore('', localStorage.getItem("usr_val"), localStorage.getItem("type_val"));
                loadPool('');
} 
else if (title == "Edit Order") {
    console.log("edit");
    setElementVal('recId', recId);
    setElementVal('salesDate', date);
    setElementVal('qty', qty);
    setElementVal('amount', amount);
    setElementVal('custName', custName);
    setElementVal('salesOrder', salesId);
    setElementVal('purchOrder', purchId);
    setElementVal('confirmDate', dateConfirm);

    loadEmployee(empId);
    loadStore(storeId, localStorage.getItem("usr_val"), localStorage.getItem("type_val"));
    loadPool(pool);
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
    console.log(user);
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

function getValue(element) {
    return sessionStorage.getItem(element);
}
function getElementVal(element) {
    console.log(document.getElementById(element).value);
    return document.getElementById(element).value;
}
function setElementVal(element, selected) {
    document.getElementById(element).value = selected;
}