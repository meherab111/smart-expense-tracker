// Input Fields
let expenseNameField = document.querySelector(".expense-name--field");

let amountField = document.querySelector(".amount-field");

let selectField = document.querySelector(".select-field");

let datetimeField = document.querySelector(".datetime-field");

let addButton = document.getElementById("add-button");

let newArr = [];

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

class ExpenseOperation {
  constructor(expenseName, amount, select, dateTime) {
    this.expenseName = expenseName;
    this.amount = amount;
    this.select = select;
    this.dateTime = dateTime;
    
  }

  setExpense() {
    newArr.push(this.expenseName, this.amount, this.select, this.dateTime);

    let convertedArr = JSON.stringify(newArr);

    localStorage.setItem("expense-data", convertedArr) || [];
  }

  getExpense() {
    let storageData = localStorage.getItem("expense-data");

    let convertedData = JSON.parse(storageData);

    return convertedData;
  }

  removeExpense() {
    localStorage.removeItem("expense-data");
  }
}

class ExpenseDisplay extends ExpenseOperation {
  displayExpense() {
    let x = super.getExpense();

    x.forEach((element) => {
      console.log(element);
    });
  }
}

// Click Event

addButton.addEventListener("click", () => {
  let formattedDate = new Date(datetimeField.value);

  let newMonth = formattedDate.getMonth() + 1;

  let newDay = formattedDate.getDate();

  let newTime = formattedDate.toLocaleTimeString();

  let newYear = formattedDate.getFullYear();

  let dateTimeFormatted = `${newMonth}-${newDay}-${newYear} | ${newTime}`;

  let expenseOp = new ExpenseOperation(
    expenseNameField.value,
    amountField.value,
    selectField.value,
    dateTimeFormatted
  );

  expenseOp.setExpense();

  let expenseDis = new ExpenseDisplay();

  expenseDis.displayExpense();
});
