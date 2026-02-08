const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");
const filterCategory = document.getElementById("filterCategory");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editId = null;

addBtn.addEventListener("click", handleSubmit);
filterCategory.addEventListener("change", renderExpenses);
window.addEventListener("load", renderExpenses);

function handleSubmit() {
    if (editId === null) {
        addExpense();
    } else {
        updateExpense();
    }
}

function addExpense() {
    const expense = getExpenseFromInput();
    if (!expense) return;

    expense.id = Date.now();
    expenses.push(expense);

    saveAndRender();
}

function updateExpense() {
    const expense = getExpenseFromInput();
    if (!expense) return;

    expenses = expenses.map(exp =>
        exp.id === editId ? { ...expense, id: editId } : exp
    );

    editId = null;
    addBtn.textContent = "Add Expense";
    saveAndRender();
}

function editExpense(id) {
    const expense = expenses.find(exp => exp.id === id);

    descriptionInput.value = expense.description;
    amountInput.value = expense.amount;
    categorySelect.value = expense.category;

    editId = id;
    addBtn.textContent = "Update Expense";
}

function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveAndRender();
}

function renderExpenses() {
    expenseList.innerHTML = "";
    let total = 0;

    const selectedCategory = filterCategory.value;

    expenses
        .filter(exp => selectedCategory === "All" || exp.category === selectedCategory)
        .forEach(expense => {
            total += expense.amount;

            const li = document.createElement("li");
            li.innerHTML = `
                <span>${expense.description} (${expense.category})</span>
                <span>
                    ₹${expense.amount}
                    <button onclick="editExpense(${expense.id})">✏️</button>
                    <button onclick="deleteExpense(${expense.id})">❌</button>
                </span>
            `;
            expenseList.appendChild(li);
        });

    totalEl.textContent = total;
}

function getExpenseFromInput() {
    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categorySelect.value;

    if (description === "" || !amount || amount <= 0 || category === "") {
        alert("Please enter valid expense details");
        return null;
    }

    return { description, amount, category };
}

function saveAndRender() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    clearInputs();
    renderExpenses();
}

function clearInputs() {
    descriptionInput.value = "";
    amountInput.value = "";
    categorySelect.value = "";
}
