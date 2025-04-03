// Input Fields
let expenseNameField = document.querySelector(".expense-name--field");

let amountField = document.querySelector(".amount-field");

let selectField = document.querySelector(".select-field");

let datetimeField = document.querySelector(".datetime-field");

let addButton = document.getElementById("add-button");

let removeButton = document.getElementById("remove-button");

// Template
let expenseTemplate = document.getElementById("expense-template");

// ExpenseData Class
class ExpenseData {
  constructor(expenseName, amount, selectCategory, dateTime) {

    this.expenseName = expenseName;
    this.amount = amount;
    this.selectCategory = selectCategory;
    this.dateTime = dateTime;

  }
}

// ExpenseOperation Class
class ExpenseOperation {
  constructor() {

    this.arrayObjects = JSON.parse(localStorage.getItem("expense-storage")) || [];
    this.dynamicExpenseList = document.querySelector(".expense-list--div");

  }

  // setExpense Method
  setExpense(expenseName, amount, selectCategory, dateTime) {

    this.arrayObjects = JSON.parse(localStorage.getItem("expense-storage")) || [];

    let expenseDataObject = new ExpenseData(expenseName, amount, selectCategory, dateTime);
    this.arrayObjects.push(expenseDataObject);
    this.updateExpense()
    
  }

  // getExpense Method
  getExpense() {

    return JSON.parse(localStorage.getItem("expense-storage")) || [];
    
  }

  // updateExpense Method
  updateExpense(){

    return localStorage.setItem("expense-storage", JSON.stringify(this.arrayObjects));

  }

  // removeExpense Method
  removeExpense(event, dateTimeFound) {

    if (event && dateTimeFound) {

      this.arrayObjects = JSON.parse(localStorage.getItem("expense-storage"))

      this.arrayObjects = this.arrayObjects.filter((element) => {

        const { dateTime } = element;
        return dateTimeFound !== dateTime

      })
      
      this.updateExpense()
      
    }

  }

}

// ExpenseDisplay Class Inheritance With ExpenseOperation Class
class ExpenseDisplay extends ExpenseOperation {

  // displayExpense Method
  displayExpense() {
    // Call of Parent Class Constructor Automatically

    this.dynamicExpenseList.innerHTML = "";

    let expenseData = super.getExpense(); // Calling Parent Class Method

    expenseData.forEach((element) => {

      const { expenseName, amount, dateTime, selectCategory } = element;
      let templateClone = document.importNode(expenseTemplate.content, true);

      // Remove Button Functionality
      templateClone.getElementById("remove-button").addEventListener("click", (event) => {
        confirm("Are You Sure, You Want To Delete❌ This Expense?")
        super.removeExpense(event, dateTime); // Calling Parent Class Method
        this.displayExpense()

      });
      
      templateClone.querySelector(".datetime-tag").textContent = dateTime;
      templateClone.querySelector(".select-category--tag").textContent=`( ${selectCategory} )`
      templateClone.querySelector(".expense-info--tag").textContent = `${expenseName} -`;
      templateClone.querySelector(".amount-tag").textContent = `${amount} /-`;

      this.dynamicExpenseList.append(templateClone);

    });

  }
  
}

// Create Of Objects
let expenseOperationObj = new ExpenseOperation();
let expenseDisplayObj = new ExpenseDisplay();

// Loading All The Infos
expenseDisplayObj.displayExpense();

// Add Button Functionality
addButton.addEventListener("click", () => {

    let expenseName = expenseNameField.value.trim();
    let amount = amountField.value.trim();
    let category = selectField.value.trim();
    let dateValue = datetimeField.value;

  
    if (!expenseName || !category || !dateValue) {

      console.log(typeof(amount));
      
      
      alert("Please Fill Out All The Fields!✅");

      return;

    }

    if (amount <= 0 || !amount) {
      
      alert("Please Enter A Valid Amount!✅");

      amountField.value = "";

      return;

    }
  


  let formattedDate = new Date(dateValue);
  let newMonth = formattedDate.getMonth() + 1;
  let newDay = formattedDate.getDate();
  let newTime = formattedDate.toLocaleTimeString();
  let newYear = formattedDate.getFullYear();

  let dateTimeFormatted = `${newMonth}-${newDay}-${newYear} | ${newTime}`;

  // Sending Input values
  expenseOperationObj.setExpense(
    expenseName,
    amount,
    category,
    dateTimeFormatted
  );

  alert("Expense Added, Successfully! ✅")
  expenseDisplayObj.displayExpense();

  // Clear Input Fields
  expenseNameField.value = "";
  amountField.value = "";
  datetimeField.value = "";

});



