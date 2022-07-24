function create()
{
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST","http://localhost:4462/api/retailso/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "Date" : getElementVal('salesDate'),
        "ConfirmDate" : getElementVal('confirmDate'), 
        "StoreId": getElementVal('store'), 
        "SalesId" : getElementVal('salesOrder'), 
        "PurchId" : getElementVal('purchOrder'),
        "CustName" : getElementVal('custName'),
        "Pool": getElementVal('pool'), 
        "Qty": getElementVal('qty'),
        "Amount": getElementVal('amount'),
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
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST","http://localhost:4462/api/retailso/edit");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "RecId" : getElementVal('recId'),
        "Date" : getElementVal('salesDate'),
        "ConfirmDate" : getElementVal('confirmDate'), 
        "StoreId": getElementVal('store'), 
        "SalesId" : getElementVal('salesOrder'), 
        "PurchId" : getElementVal('purchOrder'),
        "CustName" : getElementVal('custName'),
        "Pool": getElementVal('pool'), 
        "Qty": getElementVal('qty'),
        "Amount":getElementVal('amount'),
        "CreateBy":''
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            const objects = JSON.parse(this.responseText);
            if (objects == "OK") {
                window.location = 'OrdersPage.html';
            }

        }
    }
}
function getElementVal(element) {
    return document.getElementById(element).value;
}
export function onDelete()
{
    console.log("DELTE");
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://localhost:4462/api/retailso/delete/" + getElementVal('recId'));
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            const objects = JSON.parse(this.responseText);
            if (objects == "OK") {
                alert("Delete completed!");
            }

        }
    }
}






