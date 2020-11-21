/*uc8 */
window.addEventListener('input', function(){
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });    
});

/*uc9 */
class Employee
{
    get name()
    {
        return this._name;
    }

    set name(name)
    {
        const nameRegex = RegExp('^[A-za-z\\s]');
        if(nameRegex.test(name))
        {
            this._name = name;
        }
        else
        {
            throw "Name is incorrect";
        }
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
        return "id = " + this.id + ", name = " + this.name + ", salary = " + this.salary + 
                   ", start date = " + empDate;
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
        throw e;
    }

    employeeData.name = getInputValueById('#salary');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeeData.date = Date.parse(date);
    alert(employeeData.toString());
    return employeeData;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}