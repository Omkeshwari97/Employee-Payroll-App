window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    let employeePayrollList = createEmployeePayrollJSON();
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

createEmployeePayrollJSON = () =>{
    let employeePayrollList = [
        {
            _name : 'Maria',
            _gender: 'Female',
            _department: [
                'HR',
                'Finance'
            ],
            _salary: '400000',
            _startDate: '1 October 2020',
            _note: '',
            _id: new Date().getTime(),
            _profilePic:  '../assets/profile-images/Ellipse 1.png'
        },
        {
            _name : 'Rafel',
            _gender: 'Male',
            _department: [
                'Engineering'
            ],
            _salary: '400000',
            _startDate: '1 November 2020',
            _note: '',
            _id: new Date().getTime(),
            _profilePic:  '../assets/profile-images/Ellipse -5.png'
        }
    ];
    return employeePayrollList;
} 

const getDeptHtml = (deptList) => {
    let deptHtml ='';
    for (const dept of deptList){
        deptHtml = `${deptHtml}<div class = "dept-label">${dept}</div>`;
    }
    return deptHtml;
}