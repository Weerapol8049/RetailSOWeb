function create()
{
    Swal.fire({
        title: 'Do you want to save the changes?',
        //text: "You won't be able to revert this!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#41BD23',
        cancelButtonColor: '#CFCECE',
        confirmButtonText: 'SAVE',
        cancelButtonText: 'CANCEL'
      }).then((result) => {
        if (result.isConfirmed) {
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
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Add order completed.',
                            showConfirmButton: false,
                            timer: 1500
                          }).then(() => {
                                window.location = 'OrdersPage.html';
                          });
                    }
                }
            }
        }
    });
}

function edit()
{
    Swal.fire({
        title: 'Do you want to save the changes?',
        //text: "You won't be able to revert this!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#41BD23',
        cancelButtonColor: '#CFCECE',
        confirmButtonText: 'SAVE',
        cancelButtonText: 'CANCEL'
      }).then((result) => {
        if (result.isConfirmed) {
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
                        
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Edit order completed.',
                            showConfirmButton: false,
                            timer: 1500
                          }).then(() => {
                                window.location = 'OrdersPage.html';
                          });
                    }
        
                }
            }
        }
      })
}
function getElementVal(element) {
    return document.getElementById(element).value;
}







