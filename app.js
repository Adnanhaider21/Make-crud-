let id = null;
selectData();

function manageData() {
    document.getElementById('msg').innerHTML = "";

    let name = document.getElementById('name').value.trim();
    let age = document.getElementById('age').value.trim();
    let email = document.getElementById('email').value.trim();

        if (id === null) {
            addData(name, age, email);
            document.getElementById('msg').innerHTML = 'Data added';
        } else {
            updateData(id, name, age, email);
            document.getElementById('msg').innerHTML = 'Data updated';
        }

        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('email').value = '';

        id = null;
        selectData();
    }

function selectData() {
    let arr = getCrudData();
    if (arr !== null) {
        let html = '';
        arr.forEach((item, index) => {
            html += `<tr>
                        <td>${index + 1}</td>
                        <td>${item.name}</td>
                        <td>${item.age}</td>
                        <td>${item.email}</td>
                        <td>
                            <a href="#" onclick="editData(${index})">Edit</a>
                            <a href="#" onclick="deleteData(${index})">Delete</a>
                        </td>
                    </tr>`;
        });
        document.getElementById('root').innerHTML = html;
    }
}

function editData(index) {
    id = index;
    let arr = getCrudData();
    document.getElementById('name').value = arr[index].name;
    document.getElementById('age').value = arr[index].age;
    document.getElementById('email').value = arr[index].email;
}

function deleteData(index) {
    let arr = getCrudData();
    arr.splice(index, 1);
    setCrudData(arr);
    selectData();
}

function addData(name, age, email) {
    let arr = getCrudData() || [];
    arr.push({ name: name, age: age, email: email });
    setCrudData(arr);
}

function updateData(index, name, age, email) {
    let arr = getCrudData();
    arr[index] = { name: name, age: age, email: email };
    setCrudData(arr);
}

function getCrudData() {
    return JSON.parse(localStorage.getItem('crud'));
}

function setCrudData(arr) {
    localStorage.setItem('crud', JSON.stringify(arr));
}
