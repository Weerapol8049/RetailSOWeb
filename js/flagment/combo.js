//import {API_EMPLOYEE } from "../api";

export default function loadEmployee(id) {
    console.log(id);
    // const xhttp = new XMLHttpRequest();
    // xhttp.open("POST",API_EMPLOYEE);
    // xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhttp.send(JSON.stringify({
    //     "id" : ""
    // }));
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         //console.log(this.responseText);
    //         var trHTML = '';
    //         const objects = JSON.parse(this.responseText);
    //         trHTML += ` <option selected disabled>Select one</option>`;
    //         for (let object of objects)
    //         {
    //             let _number = object['PersonnelNumber'];
    //             if (selected == _number)
    //                 trHTML += `<option value="${_number}" selected>${_number} (${object['Name']})</option>`;
    //             else
    //                 trHTML += `<option value="${_number}">${_number} (${object['Name']})</option>`;
    //         }
    //         document.getElementById("empId").innerHTML = trHTML;
    //     }
    // }
}