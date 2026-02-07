const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");

let expenses = [];
let total = 0;

addBtn.addEventListener("click", addExpense);

function addExpense() {
    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categorySelect.value;

    if (description === "" || !amount || category === "") {
        alert("Please fill all fields correctly");
        return;
    }

    const expense = {
        id: Date.now(),
        description,
        amount,
        category
    };

    expenses.push(expense);
    total += amount;

    renderExpense(expense);
    updateTotal();

    clearInputs();
}

function renderExpense(expense) {
    const li = document.createElement("li");

    li.innerHTML = `
        <span>${expense.description} (${expense.category})</span>
        <span>₹${expense.amount}</span>
    `;

    expenseList.appendChild(li);
}

function updateTotal() {
    totalEl.textContent = total;
}

function clearInputs() {
    descriptionInput.value = "";
    amountInput.value = "";
    categorySelect.value = "";
}
