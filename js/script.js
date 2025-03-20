// Input Fields
let expenseNameField = document.querySelector(".expense-name--field");

let amountField = document.querySelector(".amount-field");

let selectField = document.querySelector(".select-field");

let datetimeField = document.querySelector(".datetime-field");

let addButton = document.getElementById("add-button");



// Template

let dynamicExpenseList = document.querySelector(".expense-list--div");

let expenseTemplate = document.getElementById("expense-template");

let expenseTemplateClone = expenseTemplate.content.cloneNode(true);

// Template Tags

let dateTimeTag = document.querySelector(".datetime-tag");

let expenseInfoTag = document.querySelector(".expense-info--tag");

let amountTag = document.querySelector(".amount-tag");

let removeButton = document.getElementById("remove-button");

// Class

class ExpenseData{
  constructor(expenseName, amount, select, dateTime) {
    this.expenseName = expenseName;
    this.amount = amount;
    this.select = select;
    this.dateTime = dateTime;
  }
}

class ExpenseOperation {

  constructor(){

    this.newArr = JSON.parse(localStorage.getItem("expense-data")) || []
  }

  
  setExpense(expenseName, amount, select, dateTime) {
    let expenseData = new ExpenseData(expenseName, amount, select, dateTime)

    this.newArr.push(expenseData);

    // console.log(this.newArr);
    

    let convertedArr = JSON.stringify(this.newArr);

    localStorage.setItem("expense-data", convertedArr);
  }

  getExpense() {
    let storageData = JSON.parse(localStorage.getItem("expense-data"));

    return storageData;
  }

  removeExpense() {
    localStorage.removeItem("expense-data");
  }
}

class ExpenseDisplay extends ExpenseOperation {
  displayExpense() {
    let x = super.getExpense() || [];
    
    x.forEach((element) => {
      console.log(element.expenseName);
    });
  }
}

let expenseOp = new ExpenseOperation();

let expenseDis = new ExpenseDisplay();

// Click Event

addButton.addEventListener("click", () => {
  let formattedDate = new Date(datetimeField.value);
  
  let newMonth = formattedDate.getMonth() + 1;
  
  let newDay = formattedDate.getDate();
  
  let newTime = formattedDate.toLocaleTimeString();
  
  let newYear = formattedDate.getFullYear();
  
  let dateTimeFormatted = `${newMonth}-${newDay}-${newYear} | ${newTime}`;
  
  
  expenseOp.setExpense(
    expenseNameField.value,
    amountField.value,
    selectField.value,
    dateTimeFormatted
  );
  
  expenseDis.displayExpense();
});
