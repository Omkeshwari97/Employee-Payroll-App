let isUpdate = false;
let employeePayrollObj = {};

class Employee
{
    get name()
    {
        return this._name;
    }

    set name(name)
    {
        const nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if(nameRegex.test(name))
        {
            this._name = name;
        }
        else
        {
            throw "Name is incorrect";
        }
    }

    get id()
    {
        return this._id;
    }

    set id(id)
    {
        this._id = id;
    }

    get profileimg()
    {
        return this._profile;
    }

    set profileimg(profile)
    {
        this._profile = profile;
    }

    get gender()
    {
        return this._gender;
    }

    set gender(gender)
    {
        this._gender = gender;
    }

    get department()
    {
        return this._department;
    }

    set department(department)
    {
        this._department = department;
    }

    get salary()
    {
        return this._salary;
    }

    set salary(salary)
    {
        this._salary = salary;
    }

    get startDate()
    {
        return this._startDate;
    }

    set startDate(startDate)
    {
        let now = new Date();

        if(startDate > now) 
        {
            throw 'Start Date is a Future Date!';
        }
        
        var diff = Math.abs(now - this._startDate);
        if (diff / (1000 * 60 * 60 * 24) > 30)
        {
            throw 'Start Date is beyond 30 days!';
        }

        this._startDate = startDate;
    }

    get notes()
    {
        return this._notes;
    }

    set notes(notes)
    {
        this._notes = notes;
    }

    /*toString()
    {
        const options = {year : 'numeric', month : 'long', day : 'numeric'};
        const empDate = !this._startDate? "undefined" : this._startDate.toLocaleDateString("en-US", options);
        return "id = " + this._id + ", name = " + this._name + ", gender = " + this._gender + ", profilePic = " + this._profile + ", department = " + this._department +
         ", salary = " + this._salary + ", start date = " + empDate + ", notes = " + this._notes ;
    }*/

    toString()
    {
        const options = {year : 'numeric', month : 'long', day : 'numeric'};
        const empDate = !this._startDate? "undefined" : this._startDate.toLocaleDateString("en-US", options);
        console.log(this.profile);
        return "id=" + this._id +
                "name=" + this._name +
                "gender=" + this._gender +
                "profilepic=" + this.profile +
                "department=" + this._department +
                "salary=" + this._salary +
                "start date=" + this._startDate + 
                "notes = " + this._notes;
    }
}

const save = () =>{
    try
    {
        let employeeData = createEmployeePayrollData();
        createAndUpdateStorage(employeeData);
    }
    catch(e)
    {
        return;
    }
}

const createEmployeePayrollData = () =>{
    let employeeData = new Employee();

    try
    {
        employeeData.name = getInputValueById('#name');
    }
    catch(e)
    {
        setTextValue('.text-error', e);
        throw e;
    }

    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    employeeData.id = employeePayrollList.length + 1;
    employeeData.profile = getSelectedValues('[name=profile]').pop();
    employeeData.gender = getSelectedValues('[name=gender]').pop();
    employeeData.department = getSelectedValues('[name=department]');
    employeeData.salary = getInputValueById('#salary');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeeData.date = Date.parse(date);
    employeeData.notes = getInputValueById('#notes');
    console.log(employeeData);
    alert(employeeData.toString());
    return employeeData;
}

const getSelectedValues = (propertyValue) => {
    console.log(propertyValue);
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item => {
        console.log(item);
        if(item.checked)
        {
            selectedItems.push(item.value);
        }
    });
    return selectedItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

function createAndUpdateStorage(employeeData)
{
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList != undefined)
    {
        employeePayrollList.push(employeeData);
    }
    else
    {
        employeePayrollList = [employeeData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const resetForm = () => {
    setTextValue('#name','');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    unsetSelectedValues('[name=profile]');
    setValue('#salary','');
    setTextValue('#notes','');
    setSelectedValues('#day', '1');
    setSelectedValues('#month', 'January');
    setSelectedValues('#year', '2020');
}

const unsetSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) =>{
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) =>{
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedValues = (propertyValue, value)=>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }else if(item.value == value){
            item.checked = true;
        }
    });
} 

const checkForUpdate = () =>{
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () =>{
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profile);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._notes);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

window.addEventListener('DOMContentLoaded', (event) => {

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });    

    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function(){
        if(name.value.length == 0)
        {
            textError.textContent = "";
            return;
        }
        
        try
        {
            let employee = new Employee();
            employee.name = name.value;
            textError.textContent = "";
        }
        catch(e)
        {
            textError.textContent = e;
        }
        checkForUpdate();
    });

    const date = document.querySelector('#date');
    const dateError = document.querySelector('.date-error');
    date.addEventListener('input', function() {
        const startDate = new Date(Date.parse(getInputValueById('#day') + " " + getInputValueById('#month')+" "+getInputValueById('#year')));
        try
        {
            let employee = new Employee();
            employee.startDate = startDate;
            dateError.textContent = "";
        }
        catch(e)
        {
            dateError.textContent = e;
        }
    });
});