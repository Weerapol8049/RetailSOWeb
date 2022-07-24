import { onDelete } from "./AddEdit";


loaddata2('http://localhost:4462/api/retailso/loaddata');

async function loaddata2(url) {
    const _data = {
        name: 'จินตนา',//localStorage.getItem("usr"),
        type: 1,//localStorage.getItem("type"),
        page: 1,
        limit: 10,
        search: ""
      }

    const othePram = {
        headers : {"content-type" : "application/json;charset=UTF-8"},
        body: JSON.stringify(_data),
        method : "POST"
      };

      fetch(url, othePram)
      .then(data => {return data.json()})
      .then(res => {
        
        const table = document.querySelector("table");
        const tableBody = table.querySelector("tbody");
        
        tableBody.innerHTML = "";
       
        for (const row of res) {
            const rowElement = document.createElement("tr");
            rowElement.setAttribute("class", row["Class"]);

            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const td5 = document.createElement("td");
            const td6 = document.createElement("td");
            const td7 = document.createElement("td");
            const td8 = document.createElement("td");//RecId
            const td9 = document.createElement("td");
            const td10 = document.createElement("td");
            td8.setAttribute("class", "rowHide");
            td8.style.display = "none";
            
            const tdAction = document.createElement("td");
            tdAction.setAttribute("class", "project-actions text-right");

            const btnEdit = document.createElement("button");
            btnEdit.innerHTML = 'Edit';
            btnEdit.onclick = function() {
              sessionStorage.setItem("emp_val", '');
              sessionStorage.setItem("store_val", row["StoreId"]);
              sessionStorage.setItem("pool_val", row["Pool"]);
              sessionStorage.setItem("qty_val", row["Qty"]);
              sessionStorage.setItem("amount_val", row["Amount"]);
              sessionStorage.setItem("custName_val", row["CustName"]);
              sessionStorage.setItem("date_val", row["Date"].substring(0,10));
              sessionStorage.setItem("confirmdate_val", row["ConfirmDate"].substring(0,10));
              sessionStorage.setItem("salesId_val", row["SalesId"]);
              sessionStorage.setItem("purchId_val", row["PurchId"]);
              sessionStorage.setItem("userId_val", row["PersonnelNumber"]);
              sessionStorage.setItem("recId_val", row["RecId"]);
              window.location = 'OrderEditPage.html';
            };

            const btnDelete = document.createElement("button");
            btnDelete.innerHTML = 'Delete';
            btnDelete.onclick = function() {
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#CFCECE',
                confirmButtonText: 'YES',
                cancelButtonText: 'CANCEL'
              }).then((result) => {
                onDelete
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your order has been deleted.',
                    'success'
                  )
                }
              })
            }
           
            const btnLine = document.createElement("button");
            btnLine.innerHTML = 'Line';
            btnLine.onclick = function(){
              sessionStorage.setItem("recId_val", row["RecId"]);
              sessionStorage.setItem("pool_line_val", row["Pool"]);
              window.location='LinePage.html';
            };

            td1.textContent = row["No"];   
            td2.textContent = row["Date"].substring(0, 10).replace("-", "/").replace("-", "/") + ' - ' + row["ConfirmDate"].substring(0, 10).replace("-", "/").replace("-", "/") ;   
            td3.textContent = row["StoreId"];   
            td4.textContent = row["Pool"];   
            td5.textContent = row["Qty"].toLocaleString("en-US");   
            td6.textContent = row["Amount"].toLocaleString("en-US");   
            td7.textContent = row["CustName"];   
            td8.textContent = row["RecId"];  
            td9.textContent = row["SalesId"];   
            td10.textContent = row["PurchId"];  

            rowElement.appendChild(td1);
            rowElement.appendChild(td2);
            rowElement.appendChild(td3);
            rowElement.appendChild(td4);
            rowElement.appendChild(td5);
            rowElement.appendChild(td6);
            rowElement.appendChild(td9);
            rowElement.appendChild(td10);
            rowElement.appendChild(td7);
            rowElement.appendChild(td8);

            tdAction.appendChild(btnEdit);
            tdAction.appendChild(btnDelete);
            tdAction.appendChild(btnLine);
            rowElement.appendChild(tdAction);
           
            tableBody.appendChild(rowElement);
            //console.log(rowElement);
        }

      })
      .catch(error => console.log(error))
}
function loaddata(Url, table) {
    // จินตนา S001 rst@1212 Sales
    // สุทธิศักดิ์ S012 cmi@2375
    //const Url = 'http://localhost:4462/api/retailso/loaddata';
    
    const _data = {
        name: 'จินตนา',//localStorage.getItem("usr"),
        type: 1,//localStorage.getItem("type"),
        page: 1,
        limit: 10,
        search: ""
      }

      const othePram = {
        headers : {"content-type" : "application/json;charset=UTF-8"},
        body: JSON.stringify(_data),
        method : "POST"
      };

      fetch(Url, othePram)
      .then(data => {return data.json()})
      .then(res => {
        show(res);
        //getPagination("#table-id");
      })
      .catch(error => console.log(error))

}

function show(objects) {
    let trBody = "";
    let page = 0;
    let tabindex = 'tabindex="0"';
    for (let data of objects) {
        //_totalPage = Math.ceil(object["Total"] / pageLimit);
        //for (let data of object.data) 
        {
            let _class = data["Class"];
            let _userId = data["PersonnelNumber"];
            let _recid = data["RecId"];
            let _store = data["StoreId"];
            let _pool = data["Pool"];
            let _salesId = data["SalesId"];
            let _purchId = data["PurchId"];
            let _custName = data["CustName"];
            let _name = data["EmpName"];
            let _qty = data["Qty"];
            let strQty = _qty.toLocaleString("en-US");
            let _amount = data["Amount"];
            let strAmount = _amount.toLocaleString("en-US");
            if (page <= 9)
            {
              trBody += `<tr class="${_class}">
                            <td class="sorting_1 dtr-control" ${tabindex}>${data["No"]}</td>
                            <td>${data["Date"].substring(0, 10).replace("-", "/").replace("-", "/")} - 
                            ${data["ConfirmDate"].substring(0, 10).replace("-", "/").replace("-", "/")}
                            </td>
                            <td>${_store}</td>
                            <td>${_pool}</td>
                            <td>${strQty}</td>
                            <td>${strAmount}</td>
                            <td>${_custName}</td>
                            <td class="project-actions text-right">
                                <a class="btn btn-info btn-sm" href="#">
                                    <i class="fas fa-pencil-alt">
                                    </i>
                                    Edit
                                </a>
                                <a class="btn btn-danger btn-sm" href="#">
                                    <i class="fas fa-trash">
                                    </i>
                                    Delete
                                </a>
                            </td>
                        </tr>`;
                        
                        if (page == 9) {
                          page = 0;
                          tabindex = "";
                        }
            }
            page++;
            

        }
    }
    document.getElementById("body-data").innerHTML = trBody; 
    console.log(trBody)           
}

function addOrder(){

}