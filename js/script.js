// Input Fields
let expenseNameField = document.querySelector(".expense-name--field");
let amountField = document.querySelector(".amount-field");
let selectField = document.querySelector(".select-field");
let datetimeField = document.querySelector(".datetime-field");
let addButton = document.getElementById("add-button");
let removeButton = document.getElementById("remove-button");

// Template
let expenseTemplate = document.getElementById("expense-template");

// Class for Expense Data
class ExpenseData {
  constructor(expenseName, amount, select, dateTime) {
    this.expenseName = expenseName;
    this.amount = amount;
    this.select = select;
    this.dateTime = dateTime;
    this.id = Date.now()
  }
}

// Class for Expense Operations (localStorage and logic)
class ExpenseOperation {
  constructor() {
    this.newArr = JSON.parse(localStorage.getItem("expense-data")) || [];
    this.dynamicExpenseList = document.querySelector(".expense-list--div");
  }
// set expense
  setExpense(expenseName, amount, select, dateTime) {
    let expenseData = new ExpenseData(expenseName, amount, select, dateTime);
    this.newArr.push(expenseData);
    localStorage.setItem("expense-data", JSON.stringify(this.newArr));
  }

  getExpense() {
    return JSON.parse(localStorage.getItem("expense-data")) || [];
  }

  removeExpense(event) {
    let updatedData = 
    localStorage.removeItem("expense-data");
  }
}

// Class for Displaying Expenses
class ExpenseDisplay extends ExpenseOperation {
  displayExpense() {
    this.dynamicExpenseList.innerHTML = ""; // Clear to prevent duplication
    let data = super.getExpense();

    data.forEach((element) => {
      const { expenseName, amount, dateTime } = element;

      let templateClone = document.importNode(expenseTemplate.content, true);

      // Correctly target template child elements
      templateClone.querySelector(".datetime-tag").textContent = dateTime;
      templateClone.querySelector(".expense-info--tag").textContent = expenseName;
      templateClone.querySelector(".amount-tag").textContent = amount;

      

      templateClone.getElementById("remove-button").addEventListener("click", (event) => {
        super.removeExpense(event);
        this.dynamicExpenseList.remove()
      });
      this.dynamicExpenseList.append(templateClone);
    });
  }
}

// Create instances
let expenseOp = new ExpenseOperation();
let expenseDis = new ExpenseDisplay();

// Load existing data on page load
expenseDis.displayExpense();

// Add Button Event
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

  // Refresh Display after adding
  expenseDis.displayExpense();

  // Optional: Clear input fields after adding
  expenseNameField.value = "";
  amountField.value = "";
  selectField.value = "";
  datetimeField.value = "";
});

// Remove All Button Event

