let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    employeePayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    if(employeePayrollList.length == 0) return;
    for(const employeePayrollData of employeePayrollList)
    {
        innerHtml = `${innerHtml}
        <tr> 
        <td><img class = "profile" src = "${employeePayrollData._profilePic}" alt = ""></td>
        <td>${employeePayrollData._name}</td>
        <td>${employeePayrollData._gender}</td>
        <td>${getDeptHtml(employeePayrollData._department)}</td>
        <td>${employeePayrollData._salary}</td>
        <td>${employeePayrollData._startDate}</td>
        <td>
            <img id = "${employeePayrollData._id}" src = "../assets/icons/delete-black-18dp.svg" onclick = "remove(this)" alt = "delete">
            <img id = "${employeePayrollData._id}" src = "../assets/icons/create-black-18dp.svg" onclick = "update(this)" alt = "edit">
        </td>
        </tr>    
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml =``;
    for (const dept of deptList){
        deptHtml = `${deptHtml}<div class = "dept-label">${dept}</div>`;
    }
    return deptHtml;
}

const getEmployeePayrollDataFromStorage = () =>{
    console.log(JSON.parse(localStorage.getItem('EmployeePayrollList')));
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}