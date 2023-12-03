'use strict';

const toAdd = document.querySelector('.data-table');


let details;
const getData = function() {
    const request = new XMLHttpRequest();
    request.open('GET', `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
    request.send();

    request.addEventListener('load', function() {
        const data = JSON.parse(this.responseText);
        details = data;
        init(details);
    });

};


getData();

const init = function(Arr) {
    toAdd.innerHTML = '';
    for (let i = 0; i < Arr.length; i++) {
        const d = Arr[i];
        const html = `<tr>
                        <td>${d.name}</td>
                        <td>${d.email}</td>
                        <td>${d.role}</td>
                        <td>
                            <button class="btn edit-btn" onclick="editUser(${i})">Edit</button>
                            <button class="btn delete-btn" onclick="deleteUser(${i})">Delete</button>
                        </td>
                    </tr>`;
        toAdd.insertAdjacentHTML('beforeend', html);
    }
}

function editUser(idx) {
    const a = prompt("What dow you want to edit: name or email or role");
    if (!["name", "email", "role"].includes(a)) {
        alert("Wrong input");
        return;
    }
    const b = prompt(`What will be the new ${a}`);
    if (a == "name") {
        details[idx].name = b;
    }
    else if (a == "email") {
        details[idx].email = b;
    }
    else if (a == "role") {
        details[idx].role = b;
    }
    init(details);
};
let cnt =0;
function deleteUser(index) {
    const table = document.querySelector('.data-table');
    table.deleteRow(index-cnt);
    cnt += 1;
    // Adding 1 because the table header is at index 0
  }
  
