const balance = document.querySelector("#balance");
const income = document.querySelector("#income");
const expense = document.querySelector("#expense");
const text = document.querySelector("#text");
const amount = document.querySelector("#amount");
const history = document.querySelector("#history");
const addbtn = document.querySelector("#addbtn");

let transactions = [];

function addTransaction() {
  let textValue = text.value.trim();
  let amountValue = parseFloat(amount.value.trim());
  if (textValue === "" || isNaN(amountValue)) {
    alert("Please enter a valid text and amount");
    return;
  }

  const transaction = {
    id: generateID(),
    text: textValue,
    amount: amountValue,
  };
  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  updateLocalStorage();
  text.value = "";
  amount.value = "";
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `${transaction.text} <span>${
    transaction.amount < 0 ? "-" : "+"
  }₹ ${Math.abs(
    transaction.amount
  )}</span><button id="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
    `;
  history.appendChild(item);
}
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const incomeTotal = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expenseTotal = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerHTML = `₹.${total}`;
  income.innerHTML = `₹.${incomeTotal}`;
  expense.innerHTML = `₹.${expenseTotal}`;
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
function init() {
  const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions")
  );

  transactions =
    localStorageTransactions !== null ? localStorageTransactions : [];
  history.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

// Event listeners
addbtn.addEventListener("click", addTransaction);

init();
