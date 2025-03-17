let expenseNameField = document.querySelector(".expense-name--field")

let amountField = document.querySelector(".amount-field")

let selectField = document.querySelector(".select-field")

let datetimeField = document.querySelector(".datetime-field")

let addButton = document.getElementById("add-button")

let newArr = []

// Class 

class ExpenseTracker{

    addExpense(expenseName, amount, select, dateTime){

        this.expenseName = expenseName
        this.amount = amount
        this.select = select
        this.dateTime = dateTime

        newArr.push(this.expenseName, this.amount, this.select, this.dateTime)
        
    }

}

class ExpenseOperation extends ExpenseTracker{
    
        loadExpense(){
            console.log(newArr);
        }

}




let expenses = new ExpenseTracker()

// Click Event

addButton.addEventListener("click", () => {
    
    let formattedDate = new Date(datetimeField.value)

    let newMonth = formattedDate.getMonth()+1

    let newDay = formattedDate.getDate()

    let newTime = formattedDate.toLocaleTimeString()

    let newYear = formattedDate.getFullYear()

    let dateTimeFormatted = `${newMonth}-${newDay}-${newYear} | ${newTime}`

    expenses.addExpense(expenseNameField.value, amountField.value,selectField.value, dateTimeFormatted)
   
})