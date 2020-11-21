/*uc8 */
window.addEventListener('DOMContentLoaded', (event) => {

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });    
});

/**uc9 */
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

    toString()
    {
        const options = {year : 'numeric', month : 'long', day : 'numeric'};
        const empDate = this._startDate === undefined ? "undefined" : 
        this._startDate.toLocaleDateString("en-US", options);
        return "id = " + this._id + ", name = " + this._name + ", salary = " + this._salary + ", start date = " + empDate;
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

    employeeData.salary = getInputValueById('#salary');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeeData.date = Date.parse(date);
    alert(employeeData.toString());
    return employeeData;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

/**uc10 */
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