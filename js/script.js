let expenseNameField = document.querySelector(".expense-name--field")

let amountField = document.querySelector(".amount-field")

let selectField = document.querySelector(".select-field")

let datetimeField = document.querySelector(".datetime-field")

let addButton = document.getElementById("add-button")


// Class 

class ExpenseTracker{

    addExpense(expenseName, amount, select, dateTime){

        this.expenseName = expenseName
        this.amount = amount
        this.select = select
        this.dateTime = dateTime
        
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