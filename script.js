const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let total = 0;

addBtn.addEventListener("click", addExpense);
window.addEventListener("load", loadExpenses);

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
    saveExpenses();
    renderExpenses();
    clearInputs();
}

function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveExpenses();
    renderExpenses();
}

function renderExpenses() {
    expenseList.innerHTML = "";
    total = 0;

    expenses.forEach(expense => {
        total += expense.amount;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${expense.description} (${expense.category})</span>
            <span>
                ₹${expense.amount}
                <button onclick="deleteExpense(${expense.id})">❌</button>
            </span>
        `;

        expenseList.appendChild(li);
    });

    totalEl.textContent = total;
}

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpenses() {
    renderExpenses();
}

function clearInputs() {
    descriptionInput.value = "";
    amountInput.value = "";
    categorySelect.value = "";
}
