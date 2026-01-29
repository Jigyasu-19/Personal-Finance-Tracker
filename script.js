const expenseCategories = ["Food", "Transportation", "Entertainment", "Shopping", "Bills", "Healthcare", "Education", "Other"];

const incomeCategories = ["Salary", "Freelance", "Investment", "Gift", "Other"];

// Load transactions from localStorage or initialize empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let currentType = "expense";

// DOM element references
const categorySelect = document.getElementById("category");
const typeButtons = document.querySelectorAll(".type-btn");
const transactionForm = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");
const categoryChart = document.getElementById("categoryChart");

// Update category dropdown based on selected transaction type
function updateCategoryOptions() {
  categorySelect.innerHTML = '<option value="">Select category</option>';
  const categories = currentType === "expense" ? expenseCategories : incomeCategories;
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Handle expense/income toggle button clicks
typeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    typeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentType = btn.dataset.type;
    updateCategoryOptions();
  });
});

// Handle transaction form submission
transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Create transaction object
  const transaction = {
    id: Date.now(),
    type: currentType,
    description: document.getElementById("description").value,
    amount: parseFloat(document.getElementById("amount").value),
    category: categorySelect.value,
  };

  // Add transaction to the beginning of array
  transactions.unshift(transaction);
  transactionForm.reset();
  updateUI();
});

// Update all UI components and save data
function updateUI() {
  updateSummary();
  updateTransactionList();
  updateCategoryChart();
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Update income, expense, and balance summary
function updateSummary() {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  document.getElementById("totalIncome").textContent = `₹${income.toFixed(2)}`;
  document.getElementById("totalExpense").textContent = `₹${expense.toFixed(2)}`;
  document.getElementById("netBalance").textContent = `₹${balance.toFixed(2)}`;
}

// Render transaction list
function updateTransactionList() {
  if (transactions.length === 0) {
    transactionList.innerHTML = '<div class="empty-state">No transactions yet. Add your first one!</div>';
    return;
  }

  transactionList.innerHTML = transactions
    .map((t) => `<div class="transaction-item">
                    <div class="transaction-info">
                      <div class="transaction-description">${t.description}</div>
                      <span class="transaction-category">${t.category}</span>
                    </div>
                    <div class="transaction-amount ${t.type}">
                      ${t.type === "income" ? "+" : "-"}₹${t.amount.toFixed(2)}
                    </div>
                    <button class="delete-btn" onclick="deleteTransaction(${t.id})">Delete</button>
                  </div>`,
    ).join("");
}

// Delete a transaction by ID
function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  updateUI();
}

// Generate category-wise expense chart
function updateCategoryChart() {
  const expenses = transactions.filter((t) => t.type === "expense");

  if (expenses.length === 0) {
    categoryChart.innerHTML =
      '<div class="empty-state">Add transactions to see your spending breakdown</div>';
    return;
  }

  // Calculate total expense per category
  const categoryTotals = {};
  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const maxAmount = Math.max(...Object.values(categoryTotals));

  // Render bars sorted by highest spending
  categoryChart.innerHTML = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, amount]) => {
      const percentage = ((amount / maxAmount) * 100).toFixed(1);
      return `<div class="category-bar">
                <div class="category-label">${cat}</div>
                <div class="bar-container">
                  <div class="bar-fill" style="width: ${percentage}%">
                    ₹${amount.toFixed(2)}
                  </div>
                </div>
              </div>`;
    }).join("");
}

// Initial setup
updateCategoryOptions();
updateUI();
